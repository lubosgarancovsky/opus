package io.github.lubosgarancovsky.Opus.api.controller;

import io.github.lubosgarancovsky.Opus.api.dto.projects.NewProjectDto;
import io.github.lubosgarancovsky.Opus.api.model.Project;
import io.github.lubosgarancovsky.Opus.api.mapper.ProjectMapper;
import io.github.lubosgarancovsky.Opus.api.service.projects.ProjectService;
import io.github.lubosgarancovsky.Opus.shared.pagination.PageEntity;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProjectController extends BaseController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping(BASE_PROJECTS_URL)
    public ResponseEntity<?> createProject(HttpServletRequest request, @RequestBody NewProjectDto dao) {
        return ResponseEntity.ok(this.projectService.createProject(request, dao));
    }

    @GetMapping(BASE_PROJECTS_URL)
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

    @GetMapping(BASE_PROJECTS_URL + "/public")
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

    @GetMapping(BASE_PROJECTS_URL + "/{id}")
    public ResponseEntity<?> findProject(@PathVariable String id) {
        return ResponseEntity.ok(ProjectMapper.toProject(this.projectService.getProject(id)));
    }
}
