package io.github.lubosgarancovsky.Opus.api.dto.projects;

public record NewProjectDto(
    String title,
    String description,
    boolean isPublic,
    String code
) {
}
