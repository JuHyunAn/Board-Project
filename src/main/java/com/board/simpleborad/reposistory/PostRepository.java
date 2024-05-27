package com.board.simpleborad.reposistory;

import com.board.simpleborad.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {    // model을 참조
}
