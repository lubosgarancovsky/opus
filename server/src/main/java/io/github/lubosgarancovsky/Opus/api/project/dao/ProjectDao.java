package io.github.lubosgarancovsky.Opus.api.project.dao;

import io.github.lubosgarancovsky.Opus.api.collaborations.model.Collaboration;
import io.github.lubosgarancovsky.Opus.api.user.dao.PublicDetailsDao;

import java.util.List;

public record ProjectDao(
        String id,
        String title,
        String description,
        boolean isPublic,
        String code,
        PublicDetailsDao owner,
        String createdAt
) {
}
