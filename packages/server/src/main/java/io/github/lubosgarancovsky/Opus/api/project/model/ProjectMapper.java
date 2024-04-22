package io.github.lubosgarancovsky.Opus.api.project.model;

import io.github.lubosgarancovsky.Opus.api.project.dao.ProjectDao;
import io.github.lubosgarancovsky.Opus.api.project.dao.ProjectInRequestDao;
import io.github.lubosgarancovsky.Opus.api.user.model.UserMapper;

public final class ProjectMapper {


    public static ProjectDao toProject(Project project) {
        return new ProjectDao(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getIsPublic(),
                project.getCode(),
                UserMapper.toPublicDetails(project.getOwner()),
                project.getCreatedAt().toString()
        );
    }

    public static ProjectInRequestDao toProjectInRequest(Project project) {
        return new ProjectInRequestDao(
                project.getId(),
                project.getTitle(),
                project.getCode()
        );
    }
}
