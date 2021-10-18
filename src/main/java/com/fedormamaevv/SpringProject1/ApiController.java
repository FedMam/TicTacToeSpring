package com.fedormamaevv.SpringProject1;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.boot.jackson.JsonObjectDeserializer;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class ApiController {
    // ----
    // Задание на оценку 3
    // ----

    private List<String> messages = new ArrayList<>();

    // curl -X GET http://localhost:8080/messages
    @GetMapping("messages")
    public List<String> getMessages() {
        return messages;
    }

    // curl -X POST -H 'Content-Type: text/plain' -d 'Apple' http://localhost:8080/messages
    @PostMapping("messages")
    public void addMessage(@RequestBody String text) {
        messages.add(text);
    }

    // curl -X GET http://localhost:8080/messages/0
    @GetMapping("messages/{index}")
    public String getMessage(@PathVariable("index") Integer index) {
        return messages.get(index);
    }

    // curl -X DELETE http://localhost:8080/messages/3
    @DeleteMapping("messages/{index}")
    public void deleteText(@PathVariable("index") Integer index) {
        messages.remove((int) index);
    }

    // curl -X PUT -H 'Content-Type: text/plain' -d 'Mango' http://localhost:8080/messages/2
    @PutMapping("messages/{index}")
    public void updateMessage(@PathVariable("index") Integer i, @RequestBody String message) {
        messages.remove((int) i);
        messages.add(i, message);
    }

    // ----
    // Задание на оценку 4
    // ----

    // curl -X GET http://localhost:8080/messages/search/qwer
    @GetMapping("messages/search/{text}")
    public int searchForText(@PathVariable("text") String text) {
        for (int index = 0; index < messages.size(); index++) {
            if (messages.get(index).contains(text))
                return index;
        }
        return -1;
    }

    // curl -X GET http://localhost:8080/messages/count
    @GetMapping("messages/count")
    public int getCount() {
        return messages.size();
    }

    // curl -X POST -H 'Content-Type: text/plain' -d 'Banana' http://localhost:8080/messages/3/create
    @PostMapping("messages/{index}/create")
    public void insertMessage(@PathVariable("index") Integer index, @RequestBody String text) {
        messages.add(index, text);
    }

    // curl -X DELETE http://localhost:8080/messages/search/abc
    @DeleteMapping("messages/search/{text}")
    public void deleteByText(@PathVariable("text") String text) {
        int index = 0;
        while (index < messages.size()) {
            if (messages.get(index).contains(text))
                messages.remove(index);
            else
                index++;
        }
    }

    // ----
    // Задание на оценку 5
    // ----

    private List<User> users = new ArrayList<>();

    // curl -X POST -H 'Content-Type: application/json' -d '{ "name": "Michel", "age": "30" }' http://localhost:8080/users
    @PostMapping("users")
    public void addUser(@RequestBody User user)
    {
        users.add(user);
    }

    // curl -X GET http://localhost:8080/users/0
    @GetMapping("users/{index}")
    public User getUser(@PathVariable("index") Integer index)
    {
        return users.get(index);
    }

    // curl -X GET http://localhost:8080/users
    @GetMapping("users")
    public List<User> getUsers()
    {
        return users;
    }

    // curl -X DELETE http://localhost:8080/users/0
    @DeleteMapping("users/{index}")
    public void deleteUser(@PathVariable("index") Integer index)
    {
        users.remove((int) index);
    }

    // curl -X PUT http://localhost:8080/users/0/set-age/16
    @PutMapping("users/{index}/set-age/{age}")
    public void updateAge(@PathVariable("index") Integer index, @PathVariable("age") Integer age)
    {
        User user = users.get(index);
        user.setAge(age);
        users.set(index, user);
    }

    // ----
}