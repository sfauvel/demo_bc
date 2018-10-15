package org.dojo.webapp.adapter;

import org.dojo.webapp.blockchain.Transaction;

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
   

  
}
