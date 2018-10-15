package org.dojo.webapp.handler;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.json.JSONArray;
import org.json.JSONObject;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public abstract class JsonHandler implements HttpHandler {

    public JSONObject jsonBody(HttpExchange he) {
        return new JSONObject(jsonStringBody(he));
    }

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

    public List<JSONObject> getJSONObjectList(JSONObject jsonObject, String key) {
        JSONArray jsonArray = jsonObject.getJSONArray(key);
        List<JSONObject> list = new ArrayList<JSONObject>();
        for (int i = 0; i < jsonArray.length(); i++) {
            list.add(jsonArray.getJSONObject(i));
        }
        return list;
    }
    
}