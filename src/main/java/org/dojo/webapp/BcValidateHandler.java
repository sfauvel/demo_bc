package org.dojo.webapp;

import java.io.IOException;
import java.util.List;

import org.dojo.webapp.blockchain.Block;
import org.dojo.webapp.blockchain.BlockChain;
import org.dojo.webapp.blockchain.Transaction;
import org.dojo.webapp.handler.JsonHandler;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;

public class BcValidateHandler extends JsonHandler {

    private BlockChain blockchain;

    /**
     * @param simpleWebApp
     */
    BcValidateHandler(BlockChain blockchain) {
        this.blockchain = blockchain;
    }

    @Override
    public void handle(HttpExchange he) throws IOException {
        System.out.println("SimpleWebApp.BcValidateHandler.handle()");
        String requestMethod = he.getRequestMethod();
        if (requestMethod.equalsIgnoreCase("POST")) {

            String json = jsonStringBody(he);
            Block block = new Gson().fromJson(json, Block.class);
            
            blockchain.addBlock(block);
            
//            JSONObject jsonObject = jsonBody(he);
//            List<Transaction> transactionList = getJSONObjectList(jsonObject, "transactions").stream()
//                    .map(json -> jsonToTransaction(json.toString()))
//                    .collect(Collectors.toList());
//            
//            List<JSONObject> jsonObjectList = getJSONObjectList(jsonObject, "blocks");
//            Block block = jsonToBlock(jsonObjectList.get(0));
//            
//            Set<Long> txValidate = transactionList.stream().map(tx -> tx.getId()).collect(Collectors.toSet());
//            SimpleWebApp.waitingTransaction.removeIf(tx -> txValidate.contains(tx.getId()));
//            
//            List<Block> blockList = new ArrayList(blockchain.getBlocks());
//            blockList.add(new Block(SimpleWebApp.timestamp(), block.getId(), transactionList));
//            blockchain = new BlockChain(blockList);
        }

        sendResponse(he, "");
    }
}