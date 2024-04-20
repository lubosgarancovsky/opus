package io.github.lubosgarancovsky.Opus.api.collaborations.controller;

import io.github.lubosgarancovsky.Opus.api.collaborations.service.CollaborationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/collaboration")
public class CollaborationsController {

    private final CollaborationService collaborationService;

    public CollaborationsController(CollaborationService collaborationService) {
        this.collaborationService = collaborationService;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCollaboration(@PathVariable String id) {
        return ResponseEntity.ok(this.collaborationService.deleteCollaboration(id));
    }
}
