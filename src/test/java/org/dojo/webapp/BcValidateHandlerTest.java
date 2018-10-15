package org.dojo.webapp;

import static org.junit.Assert.assertEquals;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.Arrays;

import org.dojo.webapp.blockchain.Block;
import org.dojo.webapp.blockchain.BlockChain;
import org.dojo.webapp.blockchain.Transaction;
import org.junit.Test;
import org.mockito.Mockito;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;

public class BcValidateHandlerTest {

    
    Gson gson = new Gson();
    
    @Test
    public void shoud_add_transaction_to_blockchain() throws Exception {
        BlockChain blockChain = new BlockChain();
        BcValidateHandler handler = new BcValidateHandler(blockChain) {
            public void sendResponse(HttpExchange he, String response) throws java.io.IOException {};
        };
                
        HttpExchange http = createHttpExchange("POST", 
                gson.toJson(new Block(123,  0, Arrays.asList(new Transaction(123, "Bob", 4, 34)))));
        
        handler.handle(http);
        
        assertEquals(1, blockChain.getBlocks().size());
    }

    public HttpExchange createHttpExchange(String requestMethod, String requestBody) {
        HttpExchange http = Mockito.mock(HttpExchange.class);
        Mockito.when(http.getRequestMethod()).thenReturn(requestMethod);
        InputStream is = new ByteArrayInputStream(requestBody.getBytes());
        Mockito.when(http.getRequestBody()).thenReturn(is);
        return http;
    }
}
