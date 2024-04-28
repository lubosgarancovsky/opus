package io.github.lubosgarancovsky.Opus.api.collaborations.service;

import io.github.lubosgarancovsky.Opus.api.collaborations.model.Collaboration;
import io.github.lubosgarancovsky.Opus.api.collaborations.repository.CollaborationRepository;
import io.github.perplexhub.rsql.RSQLJPASupport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class CollaborationService {

    private final CollaborationRepository collaborationRepository;

    public CollaborationService(CollaborationRepository collaborationRepository) {
        this.collaborationRepository = collaborationRepository;
    }

    public Page<Collaboration> listCollaborations(String id, int page, int pageSize, String filter) {
        PageRequest pageRequest = PageRequest.of(page - 1, pageSize);
        Specification<Collaboration> specification = (root, query, criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get("projectId"), id);
        };

        Specification<Collaboration> filterSpecification = RSQLJPASupport.toSpecification(filter);

        return this.collaborationRepository.findAll(specification.and(filterSpecification), pageRequest);
    }

    public String deleteCollaboration(String id) {
        this.collaborationRepository.deleteById(id);
        return "OK";
    }

}
