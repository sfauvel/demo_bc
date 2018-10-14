package org.dojo.webapp.blockchain;

import static org.junit.Assert.*;

import org.json.JSONObject;
import org.junit.Test;

public class TransactionTest {

    @Test
    public void createJsonFromBean() throws Exception {
        Transaction transaction = new Transaction(123,  "Bob", 4, 7);
        String json = new JSONObject(transaction).toString();
        assertEquals("{\"x\":4,\"y\":7,\"id\":123,\"user\":\"Bob\"}", json);
 
        JSONObject jsonObject = new JSONObject(json);
        assertEquals("Bob", jsonObject.get("user"));
    }
}
