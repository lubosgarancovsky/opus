package io.github.lubosgarancovsky.Opus.api.story.service;

import io.github.lubosgarancovsky.Opus.api.project.model.Project;
import io.github.lubosgarancovsky.Opus.api.project.repository.ProjectRepository;
import io.github.lubosgarancovsky.Opus.api.story.dao.NewStoryDao;
import io.github.lubosgarancovsky.Opus.api.story.model.Story;
import io.github.lubosgarancovsky.Opus.api.story.repository.StoryRepository;
import io.github.lubosgarancovsky.Opus.error.ApiException;
import io.github.lubosgarancovsky.Opus.utils.JwtUtil;
import io.github.perplexhub.rsql.RSQLJPASupport;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StoryService {

    private final StoryRepository storyRepository;
    private final ProjectRepository projectRepository;
    private final JwtUtil jwtUtil;

    public StoryService(StoryRepository storyRepository, ProjectRepository projectRepository, JwtUtil jwtUtil) {
        this.storyRepository = storyRepository;
        this.jwtUtil = jwtUtil;
        this.projectRepository = projectRepository;
    }

    public String createStory(HttpServletRequest request, String projectId, NewStoryDao dao) {
        String userId = jwtUtil.extractSubject(request);

        Project project = this.projectRepository.findById(projectId).orElseThrow(() -> new ApiException(404, "Project not found"));
        long count = this.countStories(projectId);

        Story newStory = new Story();
        newStory.setTitle(dao.title());
        newStory.setDescription(dao.description());
        newStory.setProjectId(projectId);
        newStory.setCreatedAt(LocalDateTime.now());
        newStory.setCreatedBy(userId);
        newStory.setAssignedTo(dao.assignedTo().orElse(null));
        newStory.setStatus("to-do");
        newStory.setType(dao.type());
        newStory.setPriority(dao.priority());
        newStory.setCode(project.getCode() + "-" + (count + 1));

        this.storyRepository.save(newStory);

        return "OK";
    }

    public List<Story> getStories(String projectId, String filter ) {
        Specification<Story> spec = (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("projectId"), projectId);
        return this.storyRepository.findAll(Specification.where(spec).and(RSQLJPASupport.toSpecification(filter)));
    }

    public List<Story> getStoriesByAssignee(HttpServletRequest request, String filter) {
        String assigneeId = jwtUtil.extractSubject(request);
        Specification<Story> spec = (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("assignedTo"), assigneeId);
        return this.storyRepository.findAll(Specification.where(spec).and(RSQLJPASupport.toSpecification(filter)));
    }

    public Story updateStory(String id, NewStoryDao dao) {
        Story story = this.storyRepository.findById(id).orElseThrow(() -> new ApiException(404, "Story not found"));
        story.setId(story.getId());
        story.setTitle(dao.title());
        story.setDescription(dao.description());
        story.setAssignedTo(dao.assignedTo().orElse(null));
        story.setType(dao.type());
        story.setPriority(dao.priority());
        story.setStatus(dao.status().orElse(story.getStatus()));
        return this.storyRepository.save(story);
    }

    public Story getStoryDetail(String id) {
        return this.storyRepository.findByCode(id).orElseThrow(() -> new ApiException(404, "Story not found"));
    }

    private long countStories(String projectId) {
        Specification<Story> spec = (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("projectId"), projectId);
        return this.storyRepository.count(Specification.where(spec));
    }
}
