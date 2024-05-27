package com.board.simpleborad.controller;

import com.board.simpleborad.model.Post;
import com.board.simpleborad.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/board")
public class PostController {   // Service에서 만든 기능(각 Method)을 작동시키는 로직

    @Autowired
    private PostService postService;    // Service 호출

    // 객체가 URL로 구분되면, 매개변수 작성 시 @PathVariable 필요
    // 쿼리 상 어떠한 글을 생성, 수정, 삭제했는지를 id로 구분하기 때문에 "/{id}" 필요

    @GetMapping
    public List<Post> getAllPostModel() {
        return postService.getAllPostModel();
    }

    @GetMapping("/{id}")
    public Post getId(@PathVariable Long id) {
        return postService.getId(id);
    }

    @PostMapping
    public Post createPost(@RequestBody Post post) {
        return postService.createPost(post);
    }

    // void 타입은 return 개념 X
    @PutMapping("/{id}")    // ex.) http://example.com/board/reviews/13  → /13 부분이 게시글 번호
    public void updatePost(@PathVariable Long id, @RequestBody Post postDetails) {
        postService.updatePost(id, postDetails);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        postService.deletePost(id);
    }
}
