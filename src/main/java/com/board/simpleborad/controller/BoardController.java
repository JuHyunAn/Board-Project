package com.board.simpleborad.controller;

import com.board.simpleborad.model.Board;
import com.board.simpleborad.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("api/board")
public class BoardController {   // Service에서 만든 기능(각 Method)을 작동시키는 로직

    @Autowired
    private BoardService boardService;    // Service 호출

    // 객체가 URL로 구분되면, 매개변수 작성 시 @PathVariable 필요
    // 쿼리 상 어떠한 글을 생성, 수정, 삭제했는지를 id로 구분하기 때문에 "/{id}" 필요

    @GetMapping
    public List<Board> getAllBoardModel() {
        return boardService.getAllBoardModel();
    }

    @GetMapping("/{id}")
    public Board getId(@PathVariable Long id) {
        return boardService.getId(id);
    }

    @PostMapping
    public Board createBoard(@RequestBody Board board) {
        return boardService.createBoard(board);
    }

    // void 타입은 return 개념 X
    @PutMapping("/{id}")    // ex.) http://example.com/board/reviews/13  → /13 부분이 게시글 번호
    public void updateBoard(@PathVariable Long id, @RequestBody Board boardDetails) {
        boardService.updateBoard(id, boardDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteBoard(@PathVariable Long id) {
        boardService.deleteBoard(id);
    }
}
