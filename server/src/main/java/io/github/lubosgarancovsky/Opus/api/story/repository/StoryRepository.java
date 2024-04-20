package io.github.lubosgarancovsky.Opus.api.story.repository;

import io.github.lubosgarancovsky.Opus.api.story.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface StoryRepository extends JpaRepository<Story, String>, JpaSpecificationExecutor<Story> {
    Optional<Story> findByCode(String code);
}
