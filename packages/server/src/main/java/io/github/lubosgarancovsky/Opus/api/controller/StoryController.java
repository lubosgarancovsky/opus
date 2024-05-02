package io.github.lubosgarancovsky.Opus.api.controller;

import io.github.lubosgarancovsky.Opus.api.dto.stories.NewStoryDto;
import io.github.lubosgarancovsky.Opus.api.mapper.StoryMapper;
import io.github.lubosgarancovsky.Opus.api.service.stories.StoryService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class StoryController extends BaseController {
    private final StoryService storyService;

    public StoryController(StoryService storyService) {
        this.storyService = storyService;
    }

    @GetMapping(BASE_STORIES_URL)
    public ResponseEntity<?> getStories(
            HttpServletRequest request,
            @RequestParam(name = "filter", required = false) String filter
    ) {
        return ResponseEntity.ok(this.storyService.getStoriesByAssignee(request, filter).stream().map(StoryMapper::toStory).toList());
    }

    @GetMapping(BASE_STORIES_URL + "/{id}")
    public ResponseEntity<?> getStoryDetail(@PathVariable String id) {
        return ResponseEntity.ok(StoryMapper.toStory(this.storyService.getStoryDetail(id)));
    }

    @PutMapping(BASE_STORIES_URL + "/{id}")
    public ResponseEntity<?> updateStory(@PathVariable String id, @RequestBody NewStoryDto dao) {
        return ResponseEntity.ok(StoryMapper.toStory(this.storyService.updateStory(id, dao)));
    }
}
