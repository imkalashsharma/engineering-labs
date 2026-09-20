package com.englabs.URLShortner.bloom;

import java.nio.charset.StandardCharsets;
import java.util.BitSet;

public class BloomFilter {
    private final BitSet bitSet;
    private final int numBits;
    private final int numHashFunctions;

    public BloomFilter(long expectedInsertions, double falsePositiveProbability) {
        if (expectedInsertions <= 0) {
            throw new IllegalArgumentException(
                    "Expected insertions must be greater than 0."
            );
        }

        if (falsePositiveProbability <= 0
                || falsePositiveProbability >= 1) {

            throw new IllegalArgumentException(
                    "False positive probability must be between 0 and 1."
            );
        }

        long calculatedNumBits = optimalNumBits(
                expectedInsertions,
                falsePositiveProbability
        );

        if (calculatedNumBits > Integer.MAX_VALUE) {
            throw new IllegalArgumentException(
                    "Bloom filter is too large for java.util.BitSet."
            );
        }

        this.numBits = (int) calculatedNumBits;
        this.bitSet = new BitSet(numBits);
        this.numHashFunctions = optimalNumHashFunctions(
                expectedInsertions,
                numBits
        );
    }

    public void add(String value) {
        long[] hashes = hash(value);

        for (int i = 0; i < numHashFunctions; i++) {

            int index = getIndex(hashes, i);

            bitSet.set(index);
        }
    }

    public boolean mightContain(String value) {
        long[] hashes = hash(value);

        for (int i = 0; i < numHashFunctions; i++) {
            int index = getIndex(hashes, i);

            if (!bitSet.get(index)) {
                return false;
            }
        }

        return true;
    }

    private int getIndex(long[] hashes, int iteration) {
        long hash = hashes[0] + (long) iteration * hashes[1];
        return Math.floorMod(hash, numBits);
    }

    private long[] hash(String value) {
        byte[] bytes = value.getBytes(StandardCharsets.UTF_8);

        long hash1 = 0xcbf29ce484222325L;
        long hash2 = 0x9e3779b97f4a7c15L;

        for (byte b : bytes) {
            hash1 ^= b;
            hash1 *= 0x100000001b3L;

            hash2 ^= b;
            hash2 *= 0x100000001b3L;
        }

        return new long[]{hash1, hash2};
    }

    private long optimalNumBits(long n, double p) {
        return (long) Math.ceil(-n * Math.log(p) / Math.pow(Math.log(2), 2));
    }

    private int optimalNumHashFunctions(long n, long m) {
        return Math.max(1, (int) Math.round(((double) m / n) * Math.log(2)));
    }
}