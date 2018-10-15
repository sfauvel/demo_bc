package org.dojo.webapp.blockchain;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.function.Supplier;

import org.junit.Assert;
import org.junit.Test;

import com.google.gson.Gson;

public class BlockChainTest {
    private Gson gson = new Gson();

    public String json(Supplier<String> jsonBuilder) {
        return jsonBuilder.get();
    }

    @Test
    public void empty_blockchain_contains_blocks_and_transactions() throws Exception {
        String json = gson.toJson(new BlockChain(Collections.emptyList(), Collections.emptyList()));

        assertTrue(json, json.contains("\"blocks\":[]"));
        assertTrue(json, json.contains("\"transactions\":[]"));
    }
    
    @Test
    public void empty_blockchain_contains_() throws Exception {
        String json = gson.toJson(new BlockChain(Collections.emptyList()));

        assertTrue(json, json.contains("\"blocks\":[]"));
        assertTrue(json, json.contains("\"transactions\":[]"));
    }
    
    @Test
    public void createJsonFromBeanWithGson() throws Exception {
        String json = json(() -> {
//            List<Transaction> transactions = Arrays.asList(
//                    new Transaction(123, "Bob", 4, 34),
//                    new Transaction(456, "John", 6, 52),
//                    new Transaction(789, "Marc", 9, 78));
            List<Block> blocks = Arrays.asList(
                    new Block(54321, 0, Arrays.asList(
                            new Transaction(123, "Bob", 4, 34),
                            new Transaction(456, "John", 6, 52))),
                    new Block(98765, 54321, Arrays.asList(
                            new Transaction(789, "Marc", 9, 78))));

            return gson.toJson(new BlockChain(blocks));
        });

        final BlockChain blockchain = gson.fromJson(json, BlockChain.class);
        List<Block> blocks = blockchain.getBlocks();

        assertEquals(2, blocks.size());

    }
    
    @Test
    public void blockchain_contains_transactions() throws Exception {
        String json = json(() -> {
            List<Transaction> transactions = Arrays.asList(
                    new Transaction(123, "Bob", 4, 34),
                    new Transaction(456, "John", 6, 52),
                    new Transaction(789, "Marc", 9, 78));

            return gson.toJson(new BlockChain(Collections.emptyList(), transactions));
        });

        final BlockChain blockchain = gson.fromJson(json, BlockChain.class);
        List<Transaction> transactions = blockchain.getTransactions();

        assertEquals(3, transactions.size());

    }
}
