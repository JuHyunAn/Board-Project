import './Board.css';
import React, {useEffect, useState} from "react";
import axios from "axios";

// User Custom HTML Elements = Component

// <header>
function Header(props) {

    return (
        <header className="List-header">
            <h1>
                <a className="header-a" href="https://localhost:8080/api/board" target="_blank" rel="noopener noreferrer"
                   onClick={(e) => {
                       props.clickFunction();
                   }}>
                    {props.title}   {/* React Dev */}
                </a>
            </h1>
        </header>
    )
}

// <table>
function Body(props) {

    // 지역변수 정의
    const [boards, setBoards] = useState();   // board: 기본값, setBoard(n): 설정값

    // 외부 요소를 참조할 수 있도록하는 hook
    useEffect(() => {
        async function getBoard() { // 비동기로 board 클래스 객체 호출시작

            const response = await axios.get(`api/board`);
            const object = response.data;

            setBoards(object);
        }

        getBoard(); // return
    }, []);

    return (
        <table className="board">
            {/* 게시글 상단 분류명 */}
            <thead className="board-box-header">
                <th className="board-title">제목</th>
                <th className="board-author">글쓴이</th>
                <th className="board-regdate">작성일</th>
            </thead>

            {/* 게시글 목록 반복문 생성 */}
            <tbody>
                {
                    // boards를 map 배열 함수로 반복문 처리
                    boards ? boards.map((params) =>
                            <tr key={params.id} className="board-box-list">
                                <td className="board-id">{params.id}</td>
                                <td className="board-title">{params.title}</td>
                                <td className="board-author">{params.author}</td>
                                <td className="board-regdate">{params.regdate}</td>
                            </tr>
                    ) : null    // 예외처리
                }
            </tbody>
        </table>
    )
}

// <nav>
function Nav(props) {

    const lis = [];

    for (let i = 0; i < props.bodylist.length; i++) {   // props.bodylist == navItems
        let contents = props.bodylist[i];

        lis.push(
            // 반복문은 key값 필수
            <li key={contents.id} className="List-nav">
                <a className="nav-a" href={'https://localhost:8080/api/board/' + contents.id}
                   target="_blank" rel="noopener noreferrer"
                   onClick={(e) => {
                       props.clickFunction(contents.title); // alert 발생
                   }}>
                    {contents.title}
                </a>
            </li>
        );
    }

    return (
        <nav className="List-nav">
            {lis}
        </nav>
    )
}


// <App>
function Board() {

    // nav items
    const navItems = [
        {id: 1, title: '자유게시판', text: '해당 페이지로 이동합니다.'},
        {id: 2, title: 'Q&A', text: '해당 페이지로 이동합니다.'},
    ];

    // view
    return (
        <div className="List">
            <Header title="Simple Board" clickFunction={() => {
                alert('Move to List');
            }} />
            <Nav bodylist={navItems} clickFunction={(text) => {
                alert(text);
            }}/>
            <Body />
        </div>
    );
}

export default Board;