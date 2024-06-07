import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const BoardList = () => {
    const [boards, setBoards] = useState();   // board: 기본값, setBoard(n): 설정값

    // 외부요소를 참조할 수 있도록하는 hook
    useEffect(() => {
        async function getBoard() {

            // 해당 URL에 GET 요청하여 JSON 데이터를 가져옴(Controller 참조)
            const response = await axios.get('/board'); // = url: 'localhost:8080/board'
            const object = response.data;

            setBoards(object);  // = boards
        }
        getBoard();
    }, []);

    return (
        <table className="board">
            <thead className="board-box-header">
                <tr>
                    <th className="board-id">No.</th>
                    <th className="board-title">제목</th>
                    <th className="board-author">작성자</th>
                    <th className="board-regdate">작성일</th>
                </tr>
            </thead>
            <tbody>
            {
                // boards를 map 배열 함수로 반복문 처리
                boards ? boards.map(params =>
                    <tr key={params.id} className="board-box-list">
                        <td className="board-id">{params.id}</td>
                        {/* 제목 선택 시, 상세화면으로 이동을 위해 URL(Link) 설정 */}
                        <Link to={`/board/${params.id}`}>{params.title}</Link>
                        <td className="board-author">{params.author}</td>
                        <td className="board-regdate">{params.regDate}</td>
                    </tr>
                ) : null    // 예외처리
            }
            </tbody>
        </table>
    );
};

export default BoardList;

