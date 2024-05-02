package io.github.lubosgarancovsky.Opus.api.mapper;

import io.github.lubosgarancovsky.Opus.api.dto.stories.StoryDto;
import io.github.lubosgarancovsky.Opus.api.model.Story;
import io.github.lubosgarancovsky.Opus.api.model.User;

public final class StoryMapper {

    public static StoryDto toStory(Story story) {
        User assignedTo = story.getAssigned();

        return new StoryDto(
                story.getId(),
                story.getTitle(),
                story.getDescription(),
                story.getProjectId(),
                story.getCreatedAt().toString(),
                UserMapper.toPublicDetails(story.getCreator()),
                assignedTo != null ? UserMapper.toPublicDetails(assignedTo): null,
                story.getStatus(),
                story.getType(),
                story.getCode(),
                story.getPriority()
        );
    }
}
