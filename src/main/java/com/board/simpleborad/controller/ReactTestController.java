package com.board.simpleborad.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

// React 연동 확인용
@RestController
public class ReactTestController {

    @PostMapping(value="/testData")
    public Map<Integer, String> testData(@RequestBody List<String> params){
        Map<Integer, String> data = new HashMap<>();
        data.put(1,"test01");
        data.put(2,"test02");
        data.put(3,"test03");

        int i = 4;

        for(String param : params){
            data.put(i, param);
            i++;
        }

        return data;
    }
}
