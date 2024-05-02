package io.github.lubosgarancovsky.Opus.api.repository;

import io.github.lubosgarancovsky.Opus.api.model.Collaboration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CollaborationsRepository extends JpaRepository<Collaboration, String>, JpaSpecificationExecutor<Collaboration> {
}
