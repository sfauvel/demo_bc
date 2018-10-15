package org.dojo.webapp.blockchain;

public class Transaction {


    final long id;
    private final String user;
    final int x;
    final int y;

    public Transaction(long id, String user, int x, int y) {
        this.id = id;
        this.user = user;
        this.x = x;
        this.y = y;
    }

    public long getId() {
        return id;
    }

    public String getUser() {
        return user;
    }
    
    public int getX() {
        return x;
    }
    
    public int getY() {
        return y;
    }
    
    @Override
    public String toString() {
        return id + ": " + user + " " + x + "/" + y;
    }

}