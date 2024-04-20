package io.github.lubosgarancovsky.Opus.api.project.dao;

public record NewProjectDao(
    String title,
    String description,
    boolean isPublic,
    String code
) {
}
