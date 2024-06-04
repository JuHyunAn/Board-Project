import './Board.css';
import React, {useEffect, useState} from "react";
import axios from "axios";

// User Custom HTML Elements = Component

// <header>
function Header(props) {

    return (
        <header className="List-header">
            <h1>
                <a className="header-a" href="http://localhost:8080/board" target="_blank" rel="noopener noreferrer"
                   onClick={(e) => {
                       props.clickFunction(); // alert 발생
                   }}>
                    {props.title}
                </a>
            </h1>
        </header>
    )
}

// <body>
// function Body(props) {
//
// }

// <nav>
function Nav(props) {

    const lis = [];

    for (let i = 0; i < props.bodylist.length; i++) {   // props.bodylist == navItems
        let contents = props.bodylist[i];

        lis.push(
            // 반복문은 key값 필수
            <li key={contents.id} className="List-nav">
                <a className="nav-a"
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


// <Board>
function Board() {

    // 서버로부터 가져올 데이터를 저장하는 지역변수
    const [boards, setBoards] = useState();   // board: 기본값, setBoard(n): 설정값

    // 외부요소를 참조할 수 있도록하는 hook
    useEffect(() => {
        async function getBoard() {
            
            // URL에 GET 요청을 통해 JSON 데이터를 가져옴
            const response = await axios.get('/board'); // = url: 'localhost:8080/board'
            const object = response.data;

            setBoards(object);
        }
        getBoard();
    }, []);


    // nav items
    const navItems = [
        {id: 1, title: '자유게시판', text: '해당 페이지로 이동합니다.'},
        {id: 2, title: 'Q&A', text: '해당 페이지로 이동합니다.'},
    ];

    // view
    return (
        <div className="List">
            <Header title="Simple Board" clickFunction={() => {
                alert('Simple Board 입니다!');
            }} />
            <Nav bodylist={navItems} clickFunction={(text) => {
                alert(text);
            }}/>
            {/* <Body /> */}
            <div>
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
                                <td className="board-title">{params.title}</td>
                                <td className="board-author">{params.author}</td>
                                <td className="board-regdate">{params.regDate}</td>
                            </tr>
                        ) : null    // 예외처리
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Board;