package com.board.simpleborad.controller;

import com.board.simpleborad.model.Board;
import com.board.simpleborad.service.BoardService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@Controller
@RequestMapping("/board")
@AllArgsConstructor
public class BoardController {   // Service에서 만든 기능(각 Method)을 작동시키는 로직

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


/*
＃ 오류사항 정리
Check your ViewResolver setup! (Hint: This may be the result of an unspecified view, due to default view name generation.)] with root cause..
    → 서버 내에 View를 구성하지 않고 별도로 프론트(React)를 구성했기 때문에,
      @Controller로 의해 반환 될 View(JSP, Thymeleaf 등)가 없어 오류가 발생!
    → 뷰가 아닌 데이터(JSON)를 반환하는 @RestController를 사용하여 데이터를 통신한다.
    → 기존에는 Controller의 URL자체가 해당하는 뷰 페이지를 호출했지만,
      별도로 구성한 경우에는 데이터(JSON)만 호출해서 분리된 프론트단의 뷰 페이지에 뿌려준다.
*/