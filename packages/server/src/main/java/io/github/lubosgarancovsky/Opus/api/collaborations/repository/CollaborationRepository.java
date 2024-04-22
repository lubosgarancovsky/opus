package io.github.lubosgarancovsky.Opus.api.collaborations.repository;

import io.github.lubosgarancovsky.Opus.api.collaborations.model.Collaboration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CollaborationRepository extends JpaRepository<Collaboration, String>, JpaSpecificationExecutor<Collaboration> {
}
