package io.github.lubosgarancovsky.Opus.api.controller;

import io.github.lubosgarancovsky.Opus.api.mapper.CollabMapper;
import io.github.lubosgarancovsky.Opus.api.model.Request;
import io.github.lubosgarancovsky.Opus.api.service.requests.RequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RequestByProjectController extends BaseController {

    private RequestService requestService;

    public RequestByProjectController(RequestService requestService) {
        this.requestService = requestService;
    }

    @GetMapping(BASE_PROJECTS_URL + REQUESTS_BY_PROJECT_ID)
    public ResponseEntity<?> listRequestsByProjectId(@PathVariable String id ) {
        List<?> list = this.requestService.listRequestsByProjectId(id);
        return ResponseEntity.ok(list.stream().map(request -> CollabMapper.toRequest((Request) request)).toList());
    }
}
