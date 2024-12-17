package com.picross.picrossgame.model;

public class Puzzle {

    private int id;
    private int[][] solution; // 1 = filled, 0 = empty
    private int[][] rowClues;
    private int[][] colClues;

    public Puzzle(int id, int[][] solution, int[][] rowClues, int[][] colClues) {
        this.id = id;
        this.solution = solution;
        this.rowClues = rowClues;
        this.colClues = colClues;
    }

    public int getId() {
        return id;
    }

    public int[][] getSolution() {
        return solution;
    }
    
    public int[][] getRowClues() {
        return rowClues;
    }

    public int[][] getColClues() {
        return colClues;
    }
    
}
