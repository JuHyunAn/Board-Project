import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

const BoardDetail = () => {

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
    }, []);

    // 데이터 매칭 오류 시 처리
    if (!details) {
        return <div>Post not Found</div>;
    }

    return (
        <table className="detail">
            <thead className="detail-box-header">
                <tr className="detail-header">
                    <th className="detail-id">No.</th>
                    <th className="detail-content">내용</th>
                </tr>
            </thead>
            <tbody>
                {/* 별도로 반복문을 사용할 이유가 X, 바로 details에서 끌어옴 */}
                <tr key={details.id} className="detail-item">
                    <td className="detail-id">{details.id}</td>
                    <td className="detail-content">{details.content}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default BoardDetail;

