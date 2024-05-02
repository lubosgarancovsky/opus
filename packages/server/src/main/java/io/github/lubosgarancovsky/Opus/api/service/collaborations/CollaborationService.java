package io.github.lubosgarancovsky.Opus.api.service.collaborations;

import io.github.lubosgarancovsky.Opus.api.model.Collaboration;
import io.github.lubosgarancovsky.Opus.api.repository.CollaborationsRepository;
import io.github.perplexhub.rsql.RSQLJPASupport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class CollaborationService {

    private final CollaborationsRepository collaborationsRepository;

    public CollaborationService(CollaborationsRepository collaborationsRepository) {
        this.collaborationsRepository = collaborationsRepository;
    }

    public Page<Collaboration> listCollaborations(String id, int page, int pageSize, String filter) {
        PageRequest pageRequest = PageRequest.of(page - 1, pageSize);

        Specification<Collaboration> specification = (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("projectId"), id);
        Specification<Collaboration> filterSpecification = RSQLJPASupport.toSpecification(filter);

        return this.collaborationsRepository.findAll(specification.and(filterSpecification), pageRequest);
    }

    public String deleteCollaboration(String id) {
        this.collaborationsRepository.deleteById(id);
        return "OK";
    }

}
