package io.github.lubosgarancovsky.Opus.api.dto.users;

public record UserDto(
        String firstName,
        String lastName,
        String displayName,
        String email
) {
}
