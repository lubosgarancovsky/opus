package io.github.lubosgarancovsky.Opus.api.service.requests;

import io.github.lubosgarancovsky.Opus.api.dto.requests.NewRequestDto;
import io.github.lubosgarancovsky.Opus.api.model.Request;
import io.github.lubosgarancovsky.Opus.api.model.Collaboration;
import io.github.lubosgarancovsky.Opus.api.repository.RequestsRepository;
import io.github.lubosgarancovsky.Opus.api.repository.CollaborationsRepository;
import io.github.lubosgarancovsky.Opus.api.model.Project;
import io.github.lubosgarancovsky.Opus.api.repository.ProjectsRepository;
import io.github.lubosgarancovsky.Opus.api.model.User;
import io.github.lubosgarancovsky.Opus.api.repository.UsersRepository;
import io.github.lubosgarancovsky.Opus.error.ApiException;
import io.github.lubosgarancovsky.Opus.utils.JwtUtil;
import io.github.perplexhub.rsql.RSQLJPASupport;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RequestService {

    private final RequestsRepository requestsRepository;
    private final CollaborationsRepository collaborationsRepository;
    private final ProjectsRepository projectsRepository;

    private final UsersRepository usersRepository;
    private final JwtUtil jwtUtil;

    public RequestService(
            RequestsRepository requestsRepository,
            CollaborationsRepository collaborationsRepository,
            JwtUtil jwtUtil,
            ProjectsRepository projectsRepository,
            UsersRepository usersRepository
    ) {
        this.requestsRepository = requestsRepository;
        this.collaborationsRepository = collaborationsRepository;
        this.jwtUtil = jwtUtil;
        this.projectsRepository = projectsRepository;
        this.usersRepository = usersRepository;
    }

    public String createRequest(HttpServletRequest request, NewRequestDto dao) {

        String senderId = jwtUtil.extractSubject(request);
        Project project = this.projectsRepository.findById(dao.projectId()).orElseThrow(() -> new ApiException(404, "Project not found"));

        String recipientId;
        if(dao.recipient().isPresent()) {
            User recipient = this.usersRepository.findByEmail(dao.recipient().get()).orElse(null);

            // Return 200 so emails can't be brute forced
            if(recipient == null) {
                return "OK";
            }

            recipientId = recipient.getId();
        } else {
            recipientId = project.getOwner().getId();
        }

        if(senderId.equals(recipientId)) {
            throw new ApiException(403, "You cannot send a request to yourself");
        }

        Request newRequest = new Request();
        newRequest.setProjectId(dao.projectId());
        newRequest.setRecipientId(recipientId);
        newRequest.setSenderId(senderId);
        newRequest.setCreatedAt(LocalDateTime.now());

        this.requestsRepository.save(newRequest);
        return "OK";
    }

    public List<Request> listRequests(HttpServletRequest request, String filter) {

        String userId = this.jwtUtil.extractSubject(request);

        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        Specification<Request> spec = RSQLJPASupport.toSpecification(filter);
        Specification<Request> spec2 = RSQLJPASupport.toSpecification("senderId==" + userId + ",recipientId==" + userId);

        return this.requestsRepository.findAll(spec.and(spec2), sort);
    }

    public List<Request> listRequestsByProjectId(String id) {
        return this.requestsRepository.findAllByProjectId(id);
    }

    public String acceptRequest(HttpServletRequest request, String id) {
        String recipientId = this.jwtUtil.extractSubject(request);
        Request collabRequest = this.requestsRepository.findById(id).orElseThrow(() -> new ApiException(404, "Request not found"));
        Project project = this.projectsRepository.findById(collabRequest.getProjectId()).orElseThrow(() -> new ApiException(404, "Project not found"));

        String collaboratorId = collabRequest.getSenderId();
        if(project.getOwner().getId().equals(collaboratorId)) {
            collaboratorId = recipientId;
        }

        if(!recipientId.equals(collabRequest.getRecipientId())) {
            throw new ApiException(403, "You are not allowed to accept this request");
        }

        Collaboration collaboration = new Collaboration();
        collaboration.setProjectId(collabRequest.getProjectId());
        collaboration.setCollaboratorId(collaboratorId);
        collaboration.setCreatedAt(LocalDateTime.now());

        this.collaborationsRepository.save(collaboration);
        this.requestsRepository.deleteById(collabRequest.getId());

        return "OK";

    }

    public String declineRequest(HttpServletRequest request, String id) {
        String recipientId = this.jwtUtil.extractSubject(request);
        Request collabRequest = this.requestsRepository.findById(id).orElseThrow(() -> new ApiException(404, "Request not found"));

        if(!recipientId.equals(collabRequest.getRecipientId()) && !recipientId.equals(collabRequest.getSenderId())) {
            throw new ApiException(403, "You are not allowed to decline this request");
        }

        this.requestsRepository.deleteById(collabRequest.getId());

        return "OK";
    }
}
