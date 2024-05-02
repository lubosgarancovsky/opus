package io.github.lubosgarancovsky.Opus.api.controller;

import io.github.lubosgarancovsky.Opus.api.service.collaborations.CollaborationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/collaboration")
public class CollaborationController extends BaseController {

    private final CollaborationService collaborationService;

    public CollaborationController(CollaborationService collaborationService) {
        this.collaborationService = collaborationService;
    }

    @DeleteMapping(BASE_COLLABORATIONS_URL + "/{id}")
    public ResponseEntity<?> deleteCollaboration(@PathVariable String id) {
        return ResponseEntity.ok(this.collaborationService.deleteCollaboration(id));
    }
}
