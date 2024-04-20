package io.github.lubosgarancovsky.Opus.api.collaborations.dao;

import java.util.Optional;

public record NewCollabRequestDao(
    String projectId,
    Optional<String> recipient
) {
}
