package io.github.lubosgarancovsky.Opus.api.story.dao;

import io.github.lubosgarancovsky.Opus.api.user.dao.PublicDetailsDao;

public record StoryDao(
    String id,
    String title,
    String description,
    String projectId,
    String createdAt,
    PublicDetailsDao createdBy,
    PublicDetailsDao assignedTo,
    String status,
    String type,
    String code,
    int priority


) {
}
