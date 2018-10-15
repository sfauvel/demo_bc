package org.dojo.webapp.adapter;

import java.util.Collections;
import java.util.stream.Collectors;

import org.dojo.webapp.blockchain.Block;
import org.dojo.webapp.blockchain.Transaction;
import org.json.JSONArray;
import org.json.JSONObject;

import com.google.gson.Gson;

public class JsonAdapter {
    private static Gson gson = new Gson();

    
    public static Transaction jsonToTransaction(Long timestamp, String json) {
        Long id = timestamp; 
        Transaction jsonTx = jsonToTransaction(json);
    
        Transaction tx = new Transaction(id, jsonTx.getUser(), jsonTx.getX(), jsonTx.getY());
        System.out.println(tx);
        return tx;
    }

    public static Transaction jsonToTransaction(String json) {
        return gson.fromJson(json, Transaction.class);
    }
    
    public static Block jsonToBlock(Long timestamp, JSONObject jsonObject) {
        long id = timestamp;
        long parentId = jsonObject.getInt("parentId");
        JSONArray jsonTranscations = jsonObject.getJSONArray("transactions");
        
        return new Block(id, parentId, Collections.emptyList());
    }
    
    public static Block jsonToBlock(JSONObject jsonObject) {
        return jsonToBlock(jsonObject.getLong("id"), jsonObject);
    }
    
    public static JSONObject transactionToJson(Transaction transaction) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("id", transaction.getId());
        jsonObject.put("user", transaction.getUser());
        jsonObject.put("x", transaction.getX());
        jsonObject.put("y", transaction.getY());
        return jsonObject;
    }

    public static JSONObject blockToJson(Block block) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("id", block.getId());
        jsonObject.put("parentId", block.getParentId());
        jsonObject.put("transactions",
                block.getTransactions().stream().map(transaction -> transactionToJson(transaction))
                        .collect(Collectors.toList()));
        return jsonObject;
    }

  
}
