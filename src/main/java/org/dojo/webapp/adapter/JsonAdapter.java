package org.dojo.webapp.adapter;

import java.util.stream.Collectors;

import org.dojo.webapp.blockchain.Block;
import org.dojo.webapp.blockchain.Transaction;
import org.json.JSONObject;

public class JsonAdapter {
    public static Transaction jsonToTransaction(Long timestamp, JSONObject jsonObject) {
        Long id = timestamp; 
        String user = jsonObject.getString("user");
        int x = jsonObject.getInt("x");
        int y = jsonObject.getInt("y");
        Transaction tx = new Transaction(id, user, x, y);
        System.out.println(id + ": " + user + " " + x + "/" + y);
        return tx;
    }

    public static Transaction jsonToTransaction(JSONObject jsonObject) {
        return jsonToTransaction(jsonObject.getLong("id"), jsonObject);
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
        jsonObject.put("transactions",
                block.getTransactions().stream().map(transaction -> transactionToJson(transaction))
                        .collect(Collectors.toList()));
        return jsonObject;
    }

  
}
