package io.github.lubosgarancovsky.Opus.api.dto.requests;

import java.util.Optional;

public record NewRequestDto(
    String projectId,
    Optional<String> recipient
) {
}
