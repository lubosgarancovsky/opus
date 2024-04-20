package io.github.lubosgarancovsky.Opus.api.user.service;

import io.github.lubosgarancovsky.Opus.api.user.dao.LoginDao;
import io.github.lubosgarancovsky.Opus.api.user.dao.NewUserDao;
import io.github.lubosgarancovsky.Opus.api.user.dao.TokensDao;
import io.github.lubosgarancovsky.Opus.api.user.model.User;
import io.github.lubosgarancovsky.Opus.api.user.repository.UserRepository;
import io.github.lubosgarancovsky.Opus.error.ApiException;
import io.github.lubosgarancovsky.Opus.utils.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public TokensDao registerUser(NewUserDao dao) {
        Optional<User> user = this.userRepository.findByEmail(dao.email());

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

        User savedUser = this.userRepository.save(newUser);

        return new TokensDao(
                this.jwtUtil.generateToken(savedUser),
                this.jwtUtil.generateRefreshToken(savedUser)
        );

    }

    public TokensDao getTokens(LoginDao dao) {
        User user = this.userRepository.findByEmail(dao.email())
                .orElseThrow(() -> new ApiException(403, "Invalid credentials"));

        if(!this.passwordEncoder.matches(dao.password(), user.getPassword())) {
            throw new ApiException(403, "Invalid credentials");
        }

        return new TokensDao(
                this.jwtUtil.generateToken(user),
                this.jwtUtil.generateRefreshToken(user));
    }

}
