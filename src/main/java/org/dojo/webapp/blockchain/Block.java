package org.dojo.webapp.blockchain;

import java.util.Collections;
import java.util.List;

public class Block {

    final List<Transaction> transactions;
    final long id;
    private final long parentId;

    public Block(long id, long parentId, List<Transaction> transactions) {
        this.id = id;
        this.parentId = parentId;
        this.transactions = Collections.unmodifiableList(transactions);
    }


    public List<Transaction> getTransactions() {
        return transactions;
    }
    
    public long getId() {
        return id;
    }


    public long getParentId() {
        return parentId;
    }
}