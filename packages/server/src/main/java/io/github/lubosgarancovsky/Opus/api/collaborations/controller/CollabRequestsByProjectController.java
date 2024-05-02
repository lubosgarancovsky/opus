package io.github.lubosgarancovsky.Opus.api.collaborations.controller;

import io.github.lubosgarancovsky.Opus.api.collaborations.model.CollabMapper;
import io.github.lubosgarancovsky.Opus.api.collaborations.model.CollabRequest;
import io.github.lubosgarancovsky.Opus.api.collaborations.service.CollabRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v1/project/{id}/collaboration-request")
public class CollabRequestsByProjectController {

    private CollabRequestService collabRequestService;

    public CollabRequestsByProjectController(CollabRequestService collabRequestService) {
        this.collabRequestService = collabRequestService;
    }

    @GetMapping
    public ResponseEntity<?> listRequestsByProjectId(@PathVariable String id ) {
        List<?> list = this.collabRequestService.listRequestsByProjectId(id);
        return ResponseEntity.ok(list.stream().map(request -> CollabMapper.toRequest((CollabRequest) request)).toList());
    }
}
