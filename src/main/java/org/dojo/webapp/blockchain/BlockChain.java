package org.dojo.webapp.blockchain;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class BlockChain {
    private final List<Block> blocks;
    private List<Transaction> transactions;
    
    public BlockChain() {
        this(Collections.emptyList(), Collections.emptyList());
    }
    
    public BlockChain(List<Block> blocks) {
        this(blocks, Collections.emptyList());
    }

    public BlockChain(List<Block> blocks, List<Transaction> transactions) {
        this.blocks = new ArrayList(blocks);
        this.transactions = new ArrayList(transactions);
    }

    public List<Block> getBlocks() {
        return Collections.unmodifiableList(blocks);
    }

    public List<Transaction> getTransactions() {
        return Collections.unmodifiableList(transactions);
    }

    public void addTransaction(Transaction transaction) {
        transactions.add(transaction);
    }

    public void addBlock(Block block) {
        blocks.add(block);
        
    }
}