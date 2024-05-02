package io.github.lubosgarancovsky.Opus.api.dto.stories;

import io.github.lubosgarancovsky.Opus.api.dto.users.PublicDetailsDto;

public record StoryDto(
    String id,
    String title,
    String description,
    String projectId,
    String createdAt,
    PublicDetailsDto createdBy,
    PublicDetailsDto assignedTo,
    String status,
    String type,
    String code,
    int priority


) {
}
