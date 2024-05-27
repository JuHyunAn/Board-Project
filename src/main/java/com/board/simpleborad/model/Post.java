package com.board.simpleborad.model;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
public class Post {    // DB 객체 생성

    /* Create Table */
    @Id // PK 설정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 아이덴티티 컬럼 지정(자동 넘버링)
    private Long id;    // 번호

    private String title;   // 제목
    private String author;  // 작성자
    private String content; // 내용

    @CreationTimestamp
    private LocalDateTime regDate;   // 작성일자

    @UpdateTimestamp
    private LocalDateTime updateDate;   // 수정일자


    // lombok(@Data)에 의해 자동으로 getter, setter 생성
    // setTitle(), setAuthor(), setContent()
    // getTitle(), getAuthor(), getContent()

}
