package com.board.simpleborad.service;

import com.board.simpleborad.model.Board;
import com.board.simpleborad.reposistory.BoardRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service    // Interface를 가져와 객체 별 기능 생성
@Transactional
@AllArgsConstructor // Lombok에서 @Autowired 대체해서 사용
public class BoardService {

    // @Autowired
    private BoardRepository boardRepository;  // Interface 호출


    // DB 객체를 리스트 형태로 가져옴
    public List<Board> getAllBoardModel() {
        return boardRepository.findAll();    // SELECT * FROM BOARD
    }

    // Model로 부터 id를 가져옴
    public Board getId(Long id) {
        return boardRepository.findById(id)  // SELECT * FROM BOARD WHERE ID = ?
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다.")); // 예외처리
    }

    // 게시글 작성 완료 시, DB에 정보를 날려서 저장(post) → 매개변수를 DB 객체가 정의된 Model로 설정
    public Board createBoard(Board board) {
        return boardRepository.save(board);
        // INSERT INTO BOARD(ID, TITLE, AUTHOR, CONTENT) VALUES (...) WHERE ID = ?
    }


    // JPA에서 Update 진행 시, Dirty Checking 동작
    public Board updateBoard(Long id, @RequestBody Board boardDetails) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));

        // dirty Checking
        // key값을 기준으로, 쿼리 상 SET 부분에 변경이 있으면 update 진행

        // UPDATE BOARD SET TITLE = ?, AUTHOR = ?, CONTENT = ? WHERE ID = ?
        board.setTitle(boardDetails.getTitle());
        board.setAuthor(boardDetails.getAuthor());
        board.setContent(boardDetails.getContent());

        return boardRepository.save(board);
    }


    // 게시글 삭제
    public void deleteBoard(Long id) {   // 게시글 id로 찾아서 삭제
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));

        boardRepository.delete(board);   // 해당 객체(id) 삭제
    }
}
