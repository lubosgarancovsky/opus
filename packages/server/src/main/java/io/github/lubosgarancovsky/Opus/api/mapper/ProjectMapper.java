package io.github.lubosgarancovsky.Opus.api.mapper;

import io.github.lubosgarancovsky.Opus.api.dto.projects.ProjectDto;
import io.github.lubosgarancovsky.Opus.api.dto.projects.ProjectInRequestDto;
import io.github.lubosgarancovsky.Opus.api.model.Project;

public final class ProjectMapper {


    public static ProjectDto toProject(Project project) {
        return new ProjectDto(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getIsPublic(),
                project.getCode(),
                UserMapper.toPublicDetails(project.getOwner()),
                project.getCreatedAt().toString()
        );
    }

    public static ProjectInRequestDto toProjectInRequest(Project project) {
        return new ProjectInRequestDto(
                project.getId(),
                project.getTitle(),
                project.getCode()
        );
    }
}
