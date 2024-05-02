package io.github.lubosgarancovsky.Opus.api.mapper;

import io.github.lubosgarancovsky.Opus.api.dto.requests.RequestDto;
import io.github.lubosgarancovsky.Opus.api.dto.collaborations.CollaborationDto;
import io.github.lubosgarancovsky.Opus.api.model.Collaboration;
import io.github.lubosgarancovsky.Opus.api.model.Request;

public final class CollabMapper {

    public static RequestDto toRequest(Request request) {
        return new RequestDto(
            request.getId(),
            request.getCreatedAt().toString(),
            ProjectMapper.toProjectInRequest(request.getProject()),
            UserMapper.toPublicDetails(request.getSender()),
            UserMapper.toPublicDetails(request.getRecipient())
        );
    }

    public static CollaborationDto toCollaboration(Collaboration collaboration) {
        return new CollaborationDto(
            collaboration.getId(),
            collaboration.getCreatedAt().toString(),
            UserMapper.toPublicDetails(collaboration.getCollaborator())
        );
    }
}
