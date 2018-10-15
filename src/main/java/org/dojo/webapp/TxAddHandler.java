package org.dojo.webapp;

import static org.dojo.webapp.adapter.JsonAdapter.jsonToTransaction;

import java.io.IOException;

import org.dojo.webapp.blockchain.BlockChain;
import org.dojo.webapp.handler.JsonHandler;

import com.sun.net.httpserver.HttpExchange;

public class TxAddHandler extends JsonHandler {

    private BlockChain blockChain;

    public TxAddHandler(BlockChain blockChain) {
        this.blockChain = blockChain;
    }

    @Override
    public void handle(HttpExchange he) throws IOException {

        
        System.out.println("SimpleWebApp.TxAddHandler.handle()");
        String requestMethod = he.getRequestMethod();
        if (requestMethod.equalsIgnoreCase("POST")) {
            String json = jsonStringBody(he);
            blockChain.addTransaction(jsonToTransaction(SimpleWebApp.timestamp(), json));
        }

        sendResponse(he, "");
    }

}