package io.github.lubosgarancovsky.Opus.api.mapper;

import io.github.lubosgarancovsky.Opus.api.dto.users.PublicDetailsDto;
import io.github.lubosgarancovsky.Opus.api.model.User;

public final class UserMapper {

    public static PublicDetailsDto toPublicDetails (User user) {
        return new PublicDetailsDto(
                user.getId(),
                user.getDisplayName()
        );
    }
}
