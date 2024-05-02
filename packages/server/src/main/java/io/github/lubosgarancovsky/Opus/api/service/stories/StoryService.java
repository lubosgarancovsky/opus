package io.github.lubosgarancovsky.Opus.api.service.stories;

import io.github.lubosgarancovsky.Opus.api.model.Project;
import io.github.lubosgarancovsky.Opus.api.repository.ProjectsRepository;
import io.github.lubosgarancovsky.Opus.api.dto.stories.NewStoryDto;
import io.github.lubosgarancovsky.Opus.api.model.Story;
import io.github.lubosgarancovsky.Opus.api.repository.StoriesRepository;
import io.github.lubosgarancovsky.Opus.error.ApiException;
import io.github.lubosgarancovsky.Opus.utils.JwtUtil;
import io.github.perplexhub.rsql.RSQLJPASupport;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StoryService {

    private final StoriesRepository storiesRepository;
    private final ProjectsRepository projectsRepository;
    private final JwtUtil jwtUtil;

    public StoryService(StoriesRepository storiesRepository, ProjectsRepository projectsRepository, JwtUtil jwtUtil) {
        this.storiesRepository = storiesRepository;
        this.jwtUtil = jwtUtil;
        this.projectsRepository = projectsRepository;
    }

    public String createStory(HttpServletRequest request, String projectId, NewStoryDto dao) {
        String userId = jwtUtil.extractSubject(request);

        Project project = this.projectsRepository.findById(projectId).orElseThrow(() -> new ApiException(404, "Project not found"));
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

        this.storiesRepository.save(newStory);

        return "OK";
    }

    public List<Story> getStories(String projectId, String filter ) {
        Specification<Story> spec = (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("projectId"), projectId);
        return this.storiesRepository.findAll(Specification.where(spec).and(RSQLJPASupport.toSpecification(filter)));
    }

    public List<Story> getStoriesByAssignee(HttpServletRequest request, String filter) {
        String assigneeId = jwtUtil.extractSubject(request);
        Specification<Story> spec = (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("assignedTo"), assigneeId);
        return this.storiesRepository.findAll(Specification.where(spec).and(RSQLJPASupport.toSpecification(filter)));
    }

    public Story updateStory(String id, NewStoryDto dao) {
        Story story = this.storiesRepository.findById(id).orElseThrow(() -> new ApiException(404, "Story not found"));
        story.setId(story.getId());
        story.setTitle(dao.title());
        story.setDescription(dao.description());
        story.setAssignedTo(dao.assignedTo().orElse(null));
        story.setType(dao.type());
        story.setPriority(dao.priority());
        story.setStatus(dao.status().orElse(story.getStatus()));
        return this.storiesRepository.save(story);
    }

    public Story getStoryDetail(String id) {
        return this.storiesRepository.findByCode(id).orElseThrow(() -> new ApiException(404, "Story not found"));
    }

    private long countStories(String projectId) {
        Specification<Story> spec = (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("projectId"), projectId);
        return this.storiesRepository.count(Specification.where(spec));
    }
}
