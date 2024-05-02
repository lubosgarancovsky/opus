package io.github.lubosgarancovsky.Opus.api.collaborations.controller;

import io.github.lubosgarancovsky.Opus.api.collaborations.dao.NewCollabRequestDao;
import io.github.lubosgarancovsky.Opus.api.collaborations.model.CollabRequest;
import io.github.lubosgarancovsky.Opus.api.collaborations.model.CollabMapper;
import io.github.lubosgarancovsky.Opus.api.collaborations.service.CollabRequestService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/collaboration/request")
public class CollabRequestController {

    private final CollabRequestService collabRequestService;

    public CollabRequestController(CollabRequestService collabRequestService) {
        this.collabRequestService = collabRequestService;
    }

    @PostMapping
    public ResponseEntity<?> createRequest(HttpServletRequest request, @RequestBody NewCollabRequestDao dao) {
        return ResponseEntity.ok(this.collabRequestService.createRequest(request, dao));
    }

    @GetMapping
    public ResponseEntity<?> listRequests(HttpServletRequest request,
                                          @RequestParam(name = "filter", required = false) String filter) {

        List<CollabRequest> requests = this.collabRequestService.listRequests(request, filter);
        return ResponseEntity.ok(requests.stream().map(CollabMapper::toRequest).toList());
    }

    @PostMapping("/{id}/accept")
    public ResponseEntity<?> acceptRequest(HttpServletRequest request, @PathVariable String id) {
        return ResponseEntity.ok(this.collabRequestService.acceptRequest(request, id));
    }

    @DeleteMapping("/{id}/decline")
    public ResponseEntity<?> declineRequest(HttpServletRequest request, @PathVariable String id) {
        return ResponseEntity.ok(this.collabRequestService.declineRequest(request, id));
    }
}
