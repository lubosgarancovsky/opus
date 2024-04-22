package io.github.lubosgarancovsky.Opus.api.project.service;

import io.github.lubosgarancovsky.Opus.api.project.dao.NewProjectDao;
import io.github.lubosgarancovsky.Opus.api.project.model.Project;
import io.github.lubosgarancovsky.Opus.api.project.repository.ProjectRepository;
import io.github.lubosgarancovsky.Opus.error.ApiException;
import io.github.lubosgarancovsky.Opus.utils.JwtUtil;
import io.github.perplexhub.rsql.RSQLJPASupport;
import jakarta.persistence.criteria.JoinType;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final JwtUtil jwtUtil;

    public ProjectService(ProjectRepository projectRepository, JwtUtil jwtUtil) {
        this.projectRepository = projectRepository;
        this.jwtUtil = jwtUtil;
    }

    public Project createProject(HttpServletRequest request, NewProjectDao dao) {

        String userId = jwtUtil.extractSubject(request);

        Project newProject = new Project();
        newProject.setTitle(dao.title());
        newProject.setDescription(dao.description());
        newProject.setIsPublic(dao.isPublic());
        newProject.setCreatedBy(userId);
        newProject.setCode(dao.code());
        newProject.setCreatedAt(LocalDateTime.now());

        return this.projectRepository.save(newProject);
    }

    public Page<Project> listPrivateProjects(HttpServletRequest request, int page, int pageSize, String filter, String sort, String list) {
        Sort order = Sort.by(Sort.Direction.DESC, sort != null ? sort : "createdAt");
        Pageable pageable = PageRequest.of(page - 1, pageSize, order);

        String userId = jwtUtil.extractSubject(request);

        Specification<Project> specification = ((root, query, criteriaBuilder) -> {
            if (list == null || list.isEmpty() || list.equals("all")) {
                return criteriaBuilder.or(
                        criteriaBuilder.equal(root.join("collaborations", JoinType.LEFT).get("collaboratorId"), userId),
                        criteriaBuilder.equal(root.get("createdBy"), userId)
                );
            } else if (list.equals("owned")) {
                return criteriaBuilder.equal(root.get("createdBy"), userId);
            } else if (list.equals("collaborations")) {
                return criteriaBuilder.equal(root.join("collaborations", JoinType.LEFT).get("collaboratorId"), userId);
            } else {
                throw new ApiException(400, "Invalid list parameter value. Valid values are [ all, owned, collaborations ]");
            }
        });

        Specification<Project> specification2 = RSQLJPASupport.toSpecification(filter);

        return this.projectRepository.findAll(
                Specification.where(specification).and(specification2),
                pageable);
    }

    public Page<Project> listPublicProjects(int page, int pageSize, String filter) {
        Sort order = Sort.by(Sort.Direction.DESC, "createdAt");
        Pageable pageable = PageRequest.of(page - 1, pageSize, order);

        Specification<Project> filterSpec = RSQLJPASupport.toSpecification(filter);
        Specification<Project> publicSpec = ((root, query, criteriaBuilder) -> criteriaBuilder.and(
                criteriaBuilder.equal(root.get("isPublic"), true)
        ));


        return this.projectRepository.findAll(filterSpec.and(publicSpec), pageable);
    }

    public Project getProject(String id) {
        return this.projectRepository.findById(id).orElseThrow(() -> new ApiException(404, "Project not found"));
    }
}
