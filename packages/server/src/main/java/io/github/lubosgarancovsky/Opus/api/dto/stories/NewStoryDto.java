package io.github.lubosgarancovsky.Opus.api.dto.stories;

import java.util.Optional;

public record NewStoryDto(
    String title,
    String description,
    Optional<String> assignedTo,
    String type,
    int priority,
    Optional<String> status
) {
}
