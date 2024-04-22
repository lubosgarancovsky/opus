package io.github.lubosgarancovsky.Opus.api.collaborations.service;

import io.github.lubosgarancovsky.Opus.api.collaborations.dao.NewCollabRequestDao;
import io.github.lubosgarancovsky.Opus.api.collaborations.model.CollabRequest;
import io.github.lubosgarancovsky.Opus.api.collaborations.model.Collaboration;
import io.github.lubosgarancovsky.Opus.api.collaborations.repository.CollabRequestRepository;
import io.github.lubosgarancovsky.Opus.api.collaborations.repository.CollaborationRepository;
import io.github.lubosgarancovsky.Opus.api.project.model.Project;
import io.github.lubosgarancovsky.Opus.api.project.repository.ProjectRepository;
import io.github.lubosgarancovsky.Opus.api.user.model.User;
import io.github.lubosgarancovsky.Opus.api.user.repository.UserRepository;
import io.github.lubosgarancovsky.Opus.error.ApiException;
import io.github.lubosgarancovsky.Opus.utils.JwtUtil;
import io.github.perplexhub.rsql.RSQLJPASupport;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CollabRequestService {

    private final CollabRequestRepository collabRequestRepository;
    private final CollaborationRepository collaborationRepository;
    private final ProjectRepository projectRepository;

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public CollabRequestService(
            CollabRequestRepository collabRequestRepository,
            CollaborationRepository collaborationRepository,
            JwtUtil jwtUtil,
            ProjectRepository projectRepository,
            UserRepository userRepository
    ) {
        this.collabRequestRepository = collabRequestRepository;
        this.collaborationRepository = collaborationRepository;
        this.jwtUtil = jwtUtil;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public String createRequest(HttpServletRequest request, NewCollabRequestDao dao) {

        String senderId = jwtUtil.extractSubject(request);
        Project project = this.projectRepository.findById(dao.projectId()).orElseThrow(() -> new ApiException(404, "Project not found"));

        String recipientId;
        if(dao.recipient().isPresent()) {
            User recipient = this.userRepository.findByEmail(dao.recipient().get()).orElse(null);

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

        CollabRequest newRequest = new CollabRequest();
        newRequest.setProjectId(dao.projectId());
        newRequest.setRecipientId(recipientId);
        newRequest.setSenderId(senderId);
        newRequest.setCreatedAt(LocalDateTime.now());

        this.collabRequestRepository.save(newRequest);
        return "OK";
    }

    public Page<CollabRequest> listRequests(HttpServletRequest request, int page, int pageSize, String filter) {

        String userId = this.jwtUtil.extractSubject(request);

        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        Specification<CollabRequest> spec = RSQLJPASupport.toSpecification(filter);
        Specification<CollabRequest> spec2 = RSQLJPASupport.toSpecification("senderId==" + userId + ",recipientId==" + userId);

        PageRequest pageRequest = PageRequest.of(page - 1, pageSize, sort);

        return this.collabRequestRepository.findAll(spec.and(spec2), pageRequest);
    }

    public String acceptRequest(HttpServletRequest request, String id) {
        String recipientId = this.jwtUtil.extractSubject(request);
        CollabRequest collabRequest = this.collabRequestRepository.findById(id).orElseThrow(() -> new ApiException(404, "Request not found"));
        Project project = this.projectRepository.findById(collabRequest.getProjectId()).orElseThrow(() -> new ApiException(404, "Project not found"));

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

        this.collaborationRepository.save(collaboration);
        this.collabRequestRepository.deleteById(collabRequest.getId());

        return "OK";

    }

    public String declineRequest(HttpServletRequest request, String id) {
        String recipientId = this.jwtUtil.extractSubject(request);
        CollabRequest collabRequest = this.collabRequestRepository.findById(id).orElseThrow(() -> new ApiException(404, "Request not found"));

        if(!recipientId.equals(collabRequest.getRecipientId()) && !recipientId.equals(collabRequest.getSenderId())) {
            throw new ApiException(403, "You are not allowed to decline this request");
        }

        this.collabRequestRepository.deleteById(collabRequest.getId());

        return "OK";
    }
}
