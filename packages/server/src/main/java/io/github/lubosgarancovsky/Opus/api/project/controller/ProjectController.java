package io.github.lubosgarancovsky.Opus.api.project.controller;

import io.github.lubosgarancovsky.Opus.api.project.dao.NewProjectDao;
import io.github.lubosgarancovsky.Opus.api.project.model.Project;
import io.github.lubosgarancovsky.Opus.api.project.model.ProjectMapper;
import io.github.lubosgarancovsky.Opus.api.project.service.ProjectService;
import io.github.lubosgarancovsky.Opus.shared.pagination.PageEntity;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/project")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public ResponseEntity<?> createProject(HttpServletRequest request, @RequestBody NewProjectDao dao) {
        return ResponseEntity.ok(this.projectService.createProject(request, dao));
    }

    @GetMapping
    public ResponseEntity<?> listPrivateProjects(
            HttpServletRequest request,
            @RequestParam(name = "page", defaultValue = "1", required = false) int page,
            @RequestParam(name = "page-size", defaultValue = "10", required = false) int pageSize,
            @RequestParam(name = "filter", required = false) String filter,
            @RequestParam(name = "sort", required = false) String sort,
            @RequestParam(name = "list", required = false) String list
    ) {
        Page<Project> pageResponse = this.projectService.listPrivateProjects(request, page, pageSize, filter, sort, list);

        return ResponseEntity.ok(
            new PageEntity<>(pageResponse, ProjectMapper::toProject).map()
        );
    }

    @GetMapping("/public")
    public ResponseEntity<?> listPublicProjects(
            @RequestParam(name = "page", defaultValue = "1", required = false) int page,
            @RequestParam(name = "page-size", defaultValue = "10", required = false) int pageSize,
            @RequestParam(name = "filter", required = false) String filter
    ) {
        Page<Project> pageResponse = this.projectService.listPublicProjects(page, pageSize, filter);
        return ResponseEntity.ok(
                new PageEntity<>(pageResponse, ProjectMapper::toProject).map()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProject(@PathVariable String id) {
        return ResponseEntity.ok(ProjectMapper.toProject(this.projectService.getProject(id)));
    }
}
