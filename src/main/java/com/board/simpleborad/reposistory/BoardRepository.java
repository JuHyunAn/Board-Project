package com.board.simpleborad.reposistory;

import com.board.simpleborad.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {    // model을 참조
}
