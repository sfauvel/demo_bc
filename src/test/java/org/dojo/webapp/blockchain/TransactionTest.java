package org.dojo.webapp.blockchain;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

import com.google.gson.Gson;

public class TransactionTest {
    private Gson gson = new Gson();
    
    @Test
    public void createJsonFromBeanWithGson() throws Exception {
        String json = gson.toJson(new Transaction(123, "Bob", 4, 7));  
        
        final Transaction transaction = gson.fromJson(json, Transaction.class);
        assertEquals("Bob", transaction.getUser());
        assertEquals(4, transaction.getX());
        assertEquals(7, transaction.getY());
        assertEquals(123, transaction.getId());
        
    }
}
