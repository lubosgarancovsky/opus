package io.github.lubosgarancovsky.Opus.api.story.controller;

import io.github.lubosgarancovsky.Opus.api.story.dao.NewStoryDao;
import io.github.lubosgarancovsky.Opus.api.story.model.StoryMapper;
import io.github.lubosgarancovsky.Opus.api.story.service.StoryService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/project/{id}/story")
public class StoryByProjectController {

    private final StoryService storyService;

    public StoryByProjectController(StoryService storyService) {
        this.storyService = storyService;
    }

    @PostMapping
    public ResponseEntity<?> createStory(HttpServletRequest request, @PathVariable String id, @RequestBody NewStoryDao dao) {
        return ResponseEntity.ok(this.storyService.createStory(request, id, dao));
    }

    @GetMapping
    public ResponseEntity<?> getStories(
            @PathVariable String id,
            @RequestParam(name = "filter", required = false) String filter
           ) {
        return ResponseEntity.ok(
                this.storyService.getStories(id, filter).stream().map(StoryMapper::toStory).toList()
        );
    }
}
