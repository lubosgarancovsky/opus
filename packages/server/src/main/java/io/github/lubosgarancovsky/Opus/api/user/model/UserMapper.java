package io.github.lubosgarancovsky.Opus.api.user.model;

import io.github.lubosgarancovsky.Opus.api.user.dao.PublicDetailsDao;
import io.github.lubosgarancovsky.Opus.api.user.dao.UserDao;

public final class UserMapper {

    public static PublicDetailsDao toPublicDetails (User user) {
        return new PublicDetailsDao(
                user.getId(),
                user.getDisplayName()
        );
    }
}
