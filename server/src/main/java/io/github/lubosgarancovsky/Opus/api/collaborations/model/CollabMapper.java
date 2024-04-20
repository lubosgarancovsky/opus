package io.github.lubosgarancovsky.Opus.api.collaborations.model;

import io.github.lubosgarancovsky.Opus.api.collaborations.dao.CollabRequestDao;
import io.github.lubosgarancovsky.Opus.api.collaborations.dao.CollaborationDao;
import io.github.lubosgarancovsky.Opus.api.project.model.ProjectMapper;
import io.github.lubosgarancovsky.Opus.api.user.model.UserMapper;

public final class CollabMapper {

    public static CollabRequestDao toRequest(CollabRequest request) {
        return new CollabRequestDao(
            request.getId(),
            request.getCreatedAt().toString(),
            ProjectMapper.toProjectInRequest(request.getProject()),
            UserMapper.toPublicDetails(request.getSender()),
            UserMapper.toPublicDetails(request.getRecipient())
        );
    }

    public static CollaborationDao toCollaboration(Collaboration collaboration) {
        return new CollaborationDao(
            collaboration.getId(),
            collaboration.getCreatedAt().toString(),
            UserMapper.toPublicDetails(collaboration.getCollaborator())
        );
    }
}
