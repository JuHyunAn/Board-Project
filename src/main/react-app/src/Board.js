import './style/Board.css';
import './style/BoardDetail.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import axios from "axios";
import BoardList from "./components/BoardList";
import BoardDetail from "./components/BoardDetail";

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

    // nav items
    const navItems = [
        {id: 1, title: '자유게시판', text: '해당 페이지로 이동합니다.'},
        {id: 2, title: 'Q&A', text: '해당 페이지로 이동합니다.'},
    ];

    // view
    // 동적으로 변경될 영역은 <Routes>로 처리 (ex. 페이지 이동)
    return (
        <BrowserRouter>
            <div className="List">
                <Header title="Simple Board" clickFunction={() => {
                    alert('Simple Board 입니다!');
                }} />
                <Nav bodylist={navItems} clickFunction={(text) => {
                    alert(text);
                }}/>
                <div className="board-body">
                    {/* 기존 <table>태그를 컴포넌트로 변경 호출 */}
                    <Routes>
                        <Route path="/" element={<BoardList />} />
                        <Route path="/board/:id" element={<BoardDetail />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default Board;