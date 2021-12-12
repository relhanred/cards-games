package com.jee.backend.utils;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.util.List;

@Getter
@Setter
public class ApiResult<E> {

    private String message = "";

    private HttpStatus httpStatus;

    protected E result;

    private boolean status = true;

    public List<E> items;


}
