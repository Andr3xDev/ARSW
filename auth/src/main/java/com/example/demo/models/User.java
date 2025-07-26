package com.example.demo.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "users2")
public class User {

    @Id
    private String username;
    private String password;
    private boolean enabled;

}