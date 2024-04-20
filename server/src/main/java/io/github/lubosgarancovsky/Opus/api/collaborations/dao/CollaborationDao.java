package io.github.lubosgarancovsky.Opus.api.collaborations.dao;

import io.github.lubosgarancovsky.Opus.api.user.dao.PublicDetailsDao;

public record CollaborationDao(
        String id,
        String createdAt,
        PublicDetailsDao collaborator
) {
}
