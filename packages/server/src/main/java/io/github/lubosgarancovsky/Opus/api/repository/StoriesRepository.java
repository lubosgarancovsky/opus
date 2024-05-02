package io.github.lubosgarancovsky.Opus.api.repository;

import io.github.lubosgarancovsky.Opus.api.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface StoriesRepository extends JpaRepository<Story, String>, JpaSpecificationExecutor<Story> {
    Optional<Story> findByCode(String code);
}
