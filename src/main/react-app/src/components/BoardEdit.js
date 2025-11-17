import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const BoardEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [board, setBoard] = useState({
        title: '',
        author: '',
        content: ''
    });

    // 기존 게시글 데이터 로드
    useEffect(() => {
        async function getBoard() {
            try {
                const response = await axios.get(`/board/${id}`);
                setBoard({
                    title: response.data.title,
                    author: response.data.author,
                    content: response.data.content
                });
            } catch (error) {
                console.error('게시글 로드 실패:', error);
                alert('게시글을 불러오는데 실패했습니다.');
                navigate('/');
            }
        }
        getBoard();
    }, [id, navigate]);

    // 입력값 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBoard({
            ...board,
            [name]: value
        });
    };

    // 수정 제출
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 유효성 검사
        if (!board.title.trim() || !board.author.trim() || !board.content.trim()) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        try {
            await axios.put(`/board/${id}`, board);
            alert('게시글이 수정되었습니다.');
            navigate(`/board/${id}`); // 상세 페이지로 이동
        } catch (error) {
            console.error('글 수정 실패:', error);
            alert('게시글 수정에 실패했습니다.');
        }
    };

    // 취소 버튼
    const handleCancel = () => {
        navigate(`/board/${id}`);
    };

    return (
        <div className="board-edit">
            <h2>게시글 수정</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">제목</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={board.title}
                        onChange={handleChange}
                        placeholder="제목을 입력하세요"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author">작성자</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={board.author}
                        onChange={handleChange}
                        placeholder="작성자를 입력하세요"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">내용</label>
                    <textarea
                        id="content"
                        name="content"
                        value={board.content}
                        onChange={handleChange}
                        placeholder="내용을 입력하세요"
                        rows="10"
                    />
                </div>
                <div className="button-group">
                    <button type="submit" className="btn-submit">수정</button>
                    <button type="button" className="btn-cancel" onClick={handleCancel}>취소</button>
                </div>
            </form>
        </div>
    );
};

export default BoardEdit;
