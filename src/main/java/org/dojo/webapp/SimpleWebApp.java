package org.dojo.webapp;

import static org.dojo.webapp.adapter.JsonAdapter.jsonToTransaction;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.dojo.webapp.blockchain.Block;
import org.dojo.webapp.blockchain.BlockChain;
import org.dojo.webapp.blockchain.Transaction;
import org.dojo.webapp.handler.FileHandler;
import org.dojo.webapp.handler.JsonHandler;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

/**
 * Simple webapp to test Selenium
 */
public class SimpleWebApp {

    private static long startTime = System.currentTimeMillis();
    
    public static Long timestamp() {
        long timestamp = System.currentTimeMillis() - startTime;
        System.out.println(timestamp);
        return timestamp;
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
        server.createContext("/tx/add", new TxAddHandler(blockchain));
        server.createContext("/bc/validate", new BcValidateHandler(blockchain));
        server.createContext("/bc/view", new BcViewHandler());
        server.createContext("/", new FileHandler(Paths.get("src/main/resources/blockchain")));
        server.setExecutor(null);
        server.start();
    }

    public void stop() {
        server.stop(0);
    }

    static List<Transaction> waitingTransaction = new ArrayList<Transaction>();


    public class BcViewHandler extends JsonHandler {

        @Override
        public void handle(HttpExchange he) throws IOException {
            System.out.println("SimpleWebApp.BcViewHandler.handle()");
            String requestMethod = he.getRequestMethod();
            if (requestMethod.equalsIgnoreCase("POST")) {
                
                waitingTransaction.add(jsonToTransaction(timestamp(), jsonStringBody(he)));
             //   waitingTransaction.add(jsonToTransaction(timestamp(), jsonBody(he)));
            }

            sendResponse(he, new Gson().toJson(blockchain));
            
        }
    }
}
