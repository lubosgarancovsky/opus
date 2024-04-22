package io.github.lubosgarancovsky.Opus.api.collaborations.dao;

import io.github.lubosgarancovsky.Opus.api.project.dao.ProjectInRequestDao;
import io.github.lubosgarancovsky.Opus.api.user.dao.PublicDetailsDao;

public record CollabRequestDao(
        String id,
        String createdAt,

        ProjectInRequestDao project,

        PublicDetailsDao sender,

        PublicDetailsDao recipient
) {
}
