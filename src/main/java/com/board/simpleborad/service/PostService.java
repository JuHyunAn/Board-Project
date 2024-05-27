package com.board.simpleborad.service;

import com.board.simpleborad.model.Post;
import com.board.simpleborad.reposistory.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service    // Interface를 가져와 객체 별 기능 생성
@Transactional
public class PostService {

    @Autowired
    private PostRepository postRepository;  // Interface 호출


    // DB 객체를 리스트 형태로 가져옴
    public List<Post> getAllPostModel() {
        return postRepository.findAll();    // SELECT * FROM POST
    }

    // Model로 부터 id를 가져옴
    public Post getId(Long id) {
        return postRepository.findById(id)  // SELECT * FROM POST WHERE ID = ?
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다.")); // 예외처리
    }

    // 게시글 작성 완료 시, DB에 정보를 날려서 저장(post) → 매개변수를 DB 객체가 정의된 Model로 설정
    public Post createPost(Post post) {
        return postRepository.save(post);
        // INSERT INTO POST(ID, TITLE, AUTHOR, CONTENT) VALUES (...) WHERE ID = ?
    }


    // JPA에서 Update 진행 시, Dirty Checking 동작
    public Post updatePost(Long id, @RequestBody Post postDetails) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));

        // dirty Checking
        // key값을 기준으로, 쿼리 상 SET 부분에 변경이 있으면 update 진행

        // UPDATE POST SET TITLE = ?, AUTHOR = ?, CONTENT = ? WHERE ID = ?
        post.setTitle(postDetails.getTitle());
        post.setAuthor(postDetails.getAuthor());
        post.setContent(postDetails.getContent());

        return postRepository.save(post);
    }


    // 게시글 삭제
    public void deletePost(Long id) {   // 게시글 id로 찾아서 삭제
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));

        postRepository.delete(post);   // 해당 객체(id) 삭제
    }
}
