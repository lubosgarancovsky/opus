package io.github.lubosgarancovsky.Opus.api.controller;

import io.github.lubosgarancovsky.Opus.api.mapper.CollabMapper;
import io.github.lubosgarancovsky.Opus.api.model.Collaboration;
import io.github.lubosgarancovsky.Opus.api.service.collaborations.CollaborationService;
import io.github.lubosgarancovsky.Opus.shared.pagination.PageEntity;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CollaborationByProjectController extends BaseController{

    private final CollaborationService collaborationService;

    public CollaborationByProjectController(CollaborationService collaborationService) {
        this.collaborationService = collaborationService;
    }

    @GetMapping(BASE_PROJECTS_URL + COLLABORATIONS_BY_PROJECT_ID)
    public ResponseEntity<?> listCollaborationsByProjectId(@PathVariable String id,
                                                @RequestParam(name = "page", defaultValue = "1", required = false) int page,
                                                @RequestParam(name = "page-size", defaultValue = "10", required = false) int pageSize,
                                                @RequestParam(name = "filter", required = false) String filter){

        Page<Collaboration> pageResponse = this.collaborationService.listCollaborations(id, page, pageSize, filter);

        return ResponseEntity.ok(
                new PageEntity<>(pageResponse, CollabMapper::toCollaboration).map()
        );
    }
}
