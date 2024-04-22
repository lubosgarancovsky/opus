package io.github.lubosgarancovsky.Opus.api.user.service;

import io.github.lubosgarancovsky.Opus.api.user.model.User;
import io.github.lubosgarancovsky.Opus.api.user.repository.UserRepository;
import io.github.lubosgarancovsky.Opus.error.ApiException;
import io.github.perplexhub.rsql.RSQLJPASupport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService (UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findById (String id) {
        return userRepository.findById(id).orElseThrow(
                () -> new ApiException(404, "User not found")
        );
    }

    public Page<User> listUsers (int page, int pageSize, String filter, String sort) {
        Sort order = Sort.by(Sort.Direction.ASC, "firstName", "lastName");
        Pageable pageable = PageRequest.of(page - 1, pageSize, order);
        return this.userRepository.findAll(RSQLJPASupport.toSpecification(filter), pageable);
    }
}
