import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

const BoardDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();   // 특정 값을 매개변수로 사용가능하도록 설정해준다.
    const [details, setDetails] = useState();

    useEffect(() => {
        async function getDetail() {

            // 해당 URL에 GET 요청하여 JSON 데이터를 가져옴(Controller 참조)
            const response = await axios.get(`/board/${id}`);
            const object = response.data;

            setDetails(object);  // = boards
        }
        getDetail();
    }, [id]);

    // 수정 버튼 클릭
    const handleEdit = () => {
        navigate(`/board/edit/${id}`);
    };

    // 삭제 버튼 클릭
    const handleDelete = async () => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            try {
                await axios.delete(`/board/${id}`);
                alert('게시글이 삭제되었습니다.');
                navigate('/');
            } catch (error) {
                console.error('삭제 실패:', error);
                alert('게시글 삭제에 실패했습니다.');
            }
        }
    };

    // 목록으로 버튼 클릭
    const handleList = () => {
        navigate('/');
    };

    // 데이터 매칭 오류 시 처리
    if (!details) {
        return <div>Post not Found</div>;
    }

    return (
        <div>
            <table className="detail">
                <thead className="detail-box-header">
                    <tr className="detail-header">
                        <th className="detail-id">No.</th>
                        <th className="detail-title">제목</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="detail-item">
                        <td className="detail-id">{details.id}</td>
                        <td className="detail-title">{details.title}</td>
                    </tr>
                    <tr className="detail-header">
                        <th className="detail-author">작성자</th>
                        <th className="detail-date">작성일</th>
                    </tr>
                    <tr className="detail-item">
                        <td className="detail-author">{details.author}</td>
                        <td className="detail-date">{details.regDate}</td>
                    </tr>
                    <tr className="detail-header">
                        <th colSpan="2" className="detail-content-header">내용</th>
                    </tr>
                    <tr className="detail-item">
                        <td colSpan="2" className="detail-content">{details.content}</td>
                    </tr>
                </tbody>
            </table>
            <div className="button-group">
                <button className="btn-list" onClick={handleList}>목록</button>
                <button className="btn-edit" onClick={handleEdit}>수정</button>
                <button className="btn-delete" onClick={handleDelete}>삭제</button>
            </div>
        </div>
    );
};

export default BoardDetail;

