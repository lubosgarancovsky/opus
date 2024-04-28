package io.github.lubosgarancovsky.Opus.api.collaborations.controller;

import io.github.lubosgarancovsky.Opus.api.collaborations.model.CollabMapper;
import io.github.lubosgarancovsky.Opus.api.collaborations.model.Collaboration;
import io.github.lubosgarancovsky.Opus.api.collaborations.service.CollaborationService;
import io.github.lubosgarancovsky.Opus.shared.pagination.PageEntity;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/project/{id}/collaboration")
public class CollaborationsByProjectController {

    private final CollaborationService collaborationService;

    public CollaborationsByProjectController(CollaborationService collaborationService) {
        this.collaborationService = collaborationService;
    }

    @GetMapping
    public ResponseEntity<?> listCollaborations(@PathVariable String id,
                                                @RequestParam(name = "page", defaultValue = "1", required = false) int page,
                                                @RequestParam(name = "page-size", defaultValue = "10", required = false) int pageSize,
                                                @RequestParam(name = "filter", required = false) String filter){
        Page<Collaboration> pageResponse = this.collaborationService.listCollaborations(id, page, pageSize, filter);
        return ResponseEntity.ok(
                new PageEntity<>(pageResponse, CollabMapper::toCollaboration).map()
        );
    }
}
