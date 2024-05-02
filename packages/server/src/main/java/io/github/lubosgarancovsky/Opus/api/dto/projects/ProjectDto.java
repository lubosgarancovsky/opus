package io.github.lubosgarancovsky.Opus.api.dto.projects;

import io.github.lubosgarancovsky.Opus.api.dto.users.PublicDetailsDto;

public record ProjectDto(
        String id,
        String title,
        String description,
        boolean isPublic,
        String code,
        PublicDetailsDto owner,
        String createdAt
) {
}
