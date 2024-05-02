package io.github.lubosgarancovsky.Opus.api.dto.requests;

import io.github.lubosgarancovsky.Opus.api.dto.projects.ProjectInRequestDto;
import io.github.lubosgarancovsky.Opus.api.dto.users.PublicDetailsDto;

public record RequestDto(
        String id,
        String createdAt,

        ProjectInRequestDto project,

        PublicDetailsDto sender,

        PublicDetailsDto recipient
) {
}
