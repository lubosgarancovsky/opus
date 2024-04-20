package io.github.lubosgarancovsky.Opus.api.story.controller;

import io.github.lubosgarancovsky.Opus.api.story.dao.NewStoryDao;
import io.github.lubosgarancovsky.Opus.api.story.model.StoryMapper;
import io.github.lubosgarancovsky.Opus.api.story.service.StoryService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/story")
public class StoryController {
    private final StoryService storyService;

    public StoryController(StoryService storyService) {
        this.storyService = storyService;
    }

    @GetMapping
    public ResponseEntity<?> getStories(
            HttpServletRequest request,
            @RequestParam(name = "filter", required = false) String filter
    ) {
        return ResponseEntity.ok(this.storyService.getStoriesByAssignee(request, filter).stream().map(StoryMapper::toStory).toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getStoryDetail(@PathVariable String id) {
        return ResponseEntity.ok(StoryMapper.toStory(this.storyService.getStoryDetail(id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateStory(@PathVariable String id, @RequestBody NewStoryDao dao) {
        return ResponseEntity.ok(StoryMapper.toStory(this.storyService.updateStory(id, dao)));
    }
}
