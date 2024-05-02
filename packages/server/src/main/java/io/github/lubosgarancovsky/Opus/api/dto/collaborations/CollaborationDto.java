package io.github.lubosgarancovsky.Opus.api.dto.collaborations;

import io.github.lubosgarancovsky.Opus.api.dto.users.PublicDetailsDto;

public record CollaborationDto(
        String id,
        String createdAt,
        PublicDetailsDto collaborator
) {
}
