package io.github.lubosgarancovsky.Opus.api.controller;

import io.github.lubosgarancovsky.Opus.api.dto.requests.NewRequestDto;
import io.github.lubosgarancovsky.Opus.api.model.Request;
import io.github.lubosgarancovsky.Opus.api.mapper.CollabMapper;
import io.github.lubosgarancovsky.Opus.api.service.requests.RequestService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RequestController extends BaseController {

    private final RequestService requestService;

    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    @GetMapping(BASE_REQUESTS_URL)
    public ResponseEntity<?> listRequests(HttpServletRequest request,
                                          @RequestParam(name = "filter", required = false) String filter) {

        List<Request> requests = this.requestService.listRequests(request, filter);
        return ResponseEntity.ok(requests.stream().map(CollabMapper::toRequest).toList());
    }

    @PostMapping(BASE_REQUESTS_URL)
    public ResponseEntity<?> createRequest(HttpServletRequest request, @RequestBody NewRequestDto dao) {
        return ResponseEntity.ok(this.requestService.createRequest(request, dao));
    }

    @PostMapping(BASE_REQUESTS_URL + "/{id}/accept")
    public ResponseEntity<?> acceptRequest(HttpServletRequest request, @PathVariable String id) {
        return ResponseEntity.ok(this.requestService.acceptRequest(request, id));
    }

    @DeleteMapping(BASE_REQUESTS_URL + "/{id}/decline")
    public ResponseEntity<?> declineRequest(HttpServletRequest request, @PathVariable String id) {
        return ResponseEntity.ok(this.requestService.declineRequest(request, id));
    }
}
