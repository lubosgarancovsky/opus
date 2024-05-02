package io.github.lubosgarancovsky.Opus.api.service.users;

import io.github.lubosgarancovsky.Opus.api.model.User;
import io.github.lubosgarancovsky.Opus.api.repository.UsersRepository;
import io.github.lubosgarancovsky.Opus.error.ApiException;
import io.github.perplexhub.rsql.RSQLJPASupport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UsersRepository usersRepository;

    public UserService (UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public User findById (String id) {
        return usersRepository.findById(id).orElseThrow(
                () -> new ApiException(404, "User not found")
        );
    }

    public Page<User> listUsers (int page, int pageSize, String filter, String sort) {
        Sort order = Sort.by(Sort.Direction.ASC, "firstName", "lastName");
        Pageable pageable = PageRequest.of(page - 1, pageSize, order);
        return this.usersRepository.findAll(RSQLJPASupport.toSpecification(filter), pageable);
    }
}
