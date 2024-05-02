package io.github.lubosgarancovsky.Opus.api.repository;

import io.github.lubosgarancovsky.Opus.api.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface ProjectsRepository extends JpaRepository<Project, String>, JpaSpecificationExecutor<Project> {

}
