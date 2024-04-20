package io.github.lubosgarancovsky.Opus.api.project.repository;

import io.github.lubosgarancovsky.Opus.api.project.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface ProjectRepository extends JpaRepository<Project, String>, JpaSpecificationExecutor<Project> {

}
