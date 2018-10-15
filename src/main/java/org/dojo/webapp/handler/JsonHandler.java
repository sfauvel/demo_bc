package org.dojo.webapp.handler;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.stream.Collectors;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public abstract class JsonHandler implements HttpHandler {

    public String jsonStringBody(HttpExchange he) {
        String body = new BufferedReader(new InputStreamReader(he.getRequestBody()))
                .lines()
                .collect(Collectors.joining("\n"));
    
        System.out.println(body);
        return body;
    }
    
    public void sendResponse(HttpExchange he, String response) throws IOException {
        he.getResponseHeaders().add("Content-Type", "application/json");
        he.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
        he.sendResponseHeaders(200, response.length());
        OutputStream os = he.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }

}