package io.github.lubosgarancovsky.Opus.api.story.model;

import io.github.lubosgarancovsky.Opus.api.story.dao.StoryDao;
import io.github.lubosgarancovsky.Opus.api.user.model.User;
import io.github.lubosgarancovsky.Opus.api.user.model.UserMapper;

public final class StoryMapper {

    public static StoryDao toStory(Story story) {
        User assignedTo = story.getAssigned();

        return new StoryDao(
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
