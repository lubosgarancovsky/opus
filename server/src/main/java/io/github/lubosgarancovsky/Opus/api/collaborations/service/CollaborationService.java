package io.github.lubosgarancovsky.Opus.api.collaborations.service;

import io.github.lubosgarancovsky.Opus.api.collaborations.model.Collaboration;
import io.github.lubosgarancovsky.Opus.api.collaborations.repository.CollaborationRepository;
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

    public Page<Collaboration> listCollaborations(String id, int page, int pageSize) {
        PageRequest pageRequest = PageRequest.of(page - 1, pageSize);
        Specification<Collaboration> specification = (root, query, criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get("projectId"), id);
        };

        return this.collaborationRepository.findAll(specification, pageRequest);
    }

    public String deleteCollaboration(String id) {
        this.collaborationRepository.deleteById(id);
        return "OK";
    }

}
