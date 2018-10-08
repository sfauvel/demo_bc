package org.dojo.webapp;

import static org.dojo.webapp.adapter.JsonAdapter.blockToJson;
import static org.dojo.webapp.adapter.JsonAdapter.jsonToTransaction;
import static org.dojo.webapp.adapter.JsonAdapter.jsonToBlock;
import static org.dojo.webapp.adapter.JsonAdapter.transactionToJson;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.dojo.webapp.blockchain.Block;
import org.dojo.webapp.blockchain.BlockChain;
import org.dojo.webapp.blockchain.Transaction;
import org.dojo.webapp.handler.FileHandler;
import org.dojo.webapp.handler.JsonHandler;
import org.json.JSONObject;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

/**
 * Simple webapp to test Selenium
 */
public class SimpleWebApp {

    public static Long timestamp() {
        return System.currentTimeMillis();
    }
    
    public static void main(String[] args) throws IOException {
        BlockChain blockChain = buildBlockChain();
        SimpleWebApp webapp = new SimpleWebApp(8080, blockChain);

        webapp.start();
    }

    private static BlockChain buildBlockChain() {
//        Block b1 = new Block(5, 0, Arrays.asList(
//                new Transaction(1, "Bob", 2, 45),
//                new Transaction(2, "Bob", 34, 67)));
//        Block b2 = new Block(7, 5, Arrays.asList(
//                new Transaction(3, "John", 52, 32),
//                new Transaction(4, "Bob", 43, 87)));
//        Block b3 = new Block(8, 5, Arrays.asList(
//                new Transaction(3, "John", 52, 33)));
//        Block b4 = new Block(9, 8, Arrays.asList(
//                new Transaction(3, "John", 52, 34)));
//        
//        BlockChain blockChain = new BlockChain(Arrays.asList(b1, b2, b3, b4));
//        return blockChain;
        
        return new BlockChain(Arrays.asList(new Block(timestamp(), 0, Arrays.asList())));
    }

    private int port;
    private HttpServer server;
    public BlockChain blockchain;

    public SimpleWebApp(int port, BlockChain blockChain) {
        this.port = port;
        this.blockchain = blockChain;
    }

    public void start() throws IOException {
        server = HttpServer.create(new InetSocketAddress(port), 0);
        System.out.println("server started at " + port);
        // server.createContext("/html", new HtmlHandler());
        server.createContext("/tx/add", new TxAddHandler());
        server.createContext("/tx/view", new TxViewHandler());
        server.createContext("/bc/validate", new BcValidateHandler());
        server.createContext("/bc/view", new BcViewHandler());
        server.createContext("/blockchain", new FileHandler(Paths.get("src/main/resources")));
        server.setExecutor(null);
        server.start();
    }

    public void stop() {
        server.stop(0);
    }

    private static List<Transaction> waitingTransaction = new ArrayList<Transaction>();

    public class TxAddHandler extends JsonHandler {

        @Override
        public void handle(HttpExchange he) throws IOException {
            System.out.println("SimpleWebApp.TxAddHandler.handle()");
            String requestMethod = he.getRequestMethod();
            if (requestMethod.equalsIgnoreCase("POST")) {
                waitingTransaction.add(jsonToTransaction(timestamp(), jsonBody(he)));
            }

            sendResponse(he, "");
        }

    }

    public class BcValidateHandler extends JsonHandler {

        @Override
        public void handle(HttpExchange he) throws IOException {
            System.out.println("SimpleWebApp.BcValidateHandler.handle()");
            String requestMethod = he.getRequestMethod();
            if (requestMethod.equalsIgnoreCase("POST")) {
                JSONObject jsonObject = jsonBody(he);
                List<Transaction> transactionList = getJSONObjectList(jsonObject, "transactions").stream()
                        .map(json -> jsonToTransaction((JSONObject) json))
                        .collect(Collectors.toList());
                
                List<JSONObject> jsonObjectList = getJSONObjectList(jsonObject, "blocks");
                Block block = jsonToBlock(jsonObjectList.get(0));
                
                Set<Long> txValidate = transactionList.stream().map(tx -> tx.getId()).collect(Collectors.toSet());
                waitingTransaction.removeIf(tx -> txValidate.contains(tx.getId()));
                
                List<Block> blockList = new ArrayList(blockchain.getBlocks());
                blockList.add(new Block(timestamp(), block.getId(), transactionList));
                blockchain = new BlockChain(blockList);
            }

            sendResponse(he, "");
        }
    }

    public class TxViewHandler extends JsonHandler {

        @Override
        public void handle(HttpExchange he) throws IOException {
            System.out.println("SimpleWebApp.TxViewHandler.handle()");

            List<JSONObject> waitingTx = waitingTransaction.stream()
                    .map(tx -> transactionToJson(tx)).collect(Collectors.toList());

            JSONObject jsonRoot = new JSONObject();
            jsonRoot.put("waitingTx", waitingTx);
            String response = jsonRoot.toString();
            sendResponse(he, response);
        }
    }

    public class BcViewHandler extends JsonHandler {

        @Override
        public void handle(HttpExchange he) throws IOException {
            System.out.println("SimpleWebApp.BcViewHandler.handle()");
            String requestMethod = he.getRequestMethod();
            if (requestMethod.equalsIgnoreCase("POST")) {
                waitingTransaction.add(jsonToTransaction(timestamp(), jsonBody(he)));
            }
            
            JSONObject bcjson = new JSONObject();
            bcjson.put("blocks",
                    blockchain.getBlocks().stream().map(block -> blockToJson(block)).collect(Collectors.toList()));
            bcjson.put("lastTransactions",
                    waitingTransaction.stream().map(tx -> transactionToJson(tx)).collect(Collectors.toList()));

            String response = bcjson.toString();
            sendResponse(he, bcjson.toString());
        }
    }
}
