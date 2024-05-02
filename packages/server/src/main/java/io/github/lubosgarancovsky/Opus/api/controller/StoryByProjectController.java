package io.github.lubosgarancovsky.Opus.api.controller;

import io.github.lubosgarancovsky.Opus.api.dto.stories.NewStoryDto;
import io.github.lubosgarancovsky.Opus.api.mapper.StoryMapper;
import io.github.lubosgarancovsky.Opus.api.service.stories.StoryService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class StoryByProjectController extends BaseController {

    private final StoryService storyService;

    public StoryByProjectController(StoryService storyService) {
        this.storyService = storyService;
    }

    @PostMapping(BASE_PROJECTS_URL + STORIES_BY_PROJECT_ID)
    public ResponseEntity<?> createStory(HttpServletRequest request, @PathVariable String id, @RequestBody NewStoryDto dao) {
        return ResponseEntity.ok(this.storyService.createStory(request, id, dao));
    }

    @GetMapping(BASE_PROJECTS_URL + STORIES_BY_PROJECT_ID)
    public ResponseEntity<?> listStories(
            @PathVariable String id,
            @RequestParam(name = "filter", required = false) String filter
           ) {
        return ResponseEntity.ok(
                this.storyService.getStories(id, filter).stream().map(StoryMapper::toStory).toList()
        );
    }
}
