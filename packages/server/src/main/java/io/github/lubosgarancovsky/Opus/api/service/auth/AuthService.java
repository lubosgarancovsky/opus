package io.github.lubosgarancovsky.Opus.api.service.auth;

import io.github.lubosgarancovsky.Opus.api.dto.auth.LoginDto;
import io.github.lubosgarancovsky.Opus.api.dto.users.NewUserDto;
import io.github.lubosgarancovsky.Opus.api.dto.auth.TokensDto;
import io.github.lubosgarancovsky.Opus.api.model.User;
import io.github.lubosgarancovsky.Opus.api.repository.UsersRepository;
import io.github.lubosgarancovsky.Opus.error.ApiException;
import io.github.lubosgarancovsky.Opus.utils.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(
            UsersRepository usersRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public TokensDto registerUser(NewUserDto dao) {
        Optional<User> user = this.usersRepository.findByEmail(dao.email());

        if(user.isPresent()) {
            throw new ApiException(400, "User already exists");
        }

        User newUser = new User();
        newUser.setFirstName(dao.firstName());
        newUser.setLastName(dao.lastName());
        newUser.setEmail(dao.email());
        newUser.setDisplayName(dao.firstName() + " " + dao.lastName());
        newUser.setCreatedAt(LocalDateTime.now());
        newUser.setPassword(passwordEncoder.encode(dao.password()));

        User savedUser = this.usersRepository.save(newUser);

        return new TokensDto(
                this.jwtUtil.generateToken(savedUser),
                this.jwtUtil.generateRefreshToken(savedUser)
        );

    }

    public TokensDto getTokens(LoginDto dao) {
        User user = this.usersRepository.findByEmail(dao.email())
                .orElseThrow(() -> new ApiException(403, "Invalid credentials"));

        if(!this.passwordEncoder.matches(dao.password(), user.getPassword())) {
            throw new ApiException(403, "Invalid credentials");
        }

        return new TokensDto(
                this.jwtUtil.generateToken(user),
                this.jwtUtil.generateRefreshToken(user));
    }

}
