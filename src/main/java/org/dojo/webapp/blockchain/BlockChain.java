package org.dojo.webapp.blockchain;

import java.util.Collections;
import java.util.List;

public class BlockChain {
    private final List<Block> blocks;

    public BlockChain(List<Block> blocks) {
        this.blocks = Collections.unmodifiableList(blocks);
    }

    public List<Block> getBlocks() {
        return blocks;
    }
}