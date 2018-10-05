package org.dojo.webapp.blockchain;

import java.util.Collections;
import java.util.List;

public class Block {

    final List<Transaction> transactions;
    final long id;

    public Block(long id, List<Transaction> transactions) {
        this.id = id;
        this.transactions = Collections.unmodifiableList(transactions);
    }


    public List<Transaction> getTransactions() {
        return transactions;
    }
    
    public long getId() {
        return id;
    }
}