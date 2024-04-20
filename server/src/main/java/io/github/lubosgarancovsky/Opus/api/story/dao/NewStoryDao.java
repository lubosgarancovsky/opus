package io.github.lubosgarancovsky.Opus.api.story.dao;

import java.util.Optional;

public record NewStoryDao(
    String title,
    String description,
    Optional<String> assignedTo,
    String type,
    int priority,
    Optional<String> status
) {
}
