package com.picross.picrossgame.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.picross.picrossgame.model.Puzzle;

@RestController
@RequestMapping("/api/puzzle")
public class PuzzleController {
    
    @GetMapping("/example")
    public Puzzle getExamplePuzzle() {
        int[][] solution = {
            {1, 0, 1},
            {1, 1, 0},
            {0, 1, 1}
        };
        int[][] rowClues = {
            {1, 1}, {2}, {2}
        };
        int[][] colClues = {
            {2}, {2}, {1, 1}
        };

        return new Puzzle(1, solution, rowClues, colClues);
    }

    @GetMapping("/example10x10")
    public Puzzle getExample10x10Puzzle() {
        int[][] solution = {
                {1, 1, 0, 0, 1, 1, 0, 0, 0, 1},
                {1, 0, 1, 0, 1, 0, 1, 0, 0, 1},
                {1, 0, 1, 0, 1, 0, 1, 0, 0, 1},
                {1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
                {0, 0, 1, 1, 1, 1, 1, 1, 1, 0},
                {0, 0, 1, 0, 0, 0, 0, 0, 1, 0},
                {0, 0, 1, 0, 1, 1, 1, 0, 1, 0},
                {0, 0, 1, 0, 0, 0, 0, 0, 1, 0},
                {0, 0, 1, 1, 1, 1, 1, 1, 1, 0},
                {0, 0, 0, 0, 0, 0, 0, 0, 0, 0}
        };

        int[][] rowClues = {
                {2, 2, 1},     // Row 1
                {1, 1, 1, 1, 1}, // Row 2
                {1, 1, 1, 1, 1}, // Row 3
                {10},          // Row 4
                {7},           // Row 5
                {1, 1},        // Row 6
                {1, 3, 1},     // Row 7
                {1, 1},        // Row 8
                {7},           // Row 9
                {}             // Row 10
        };

        int[][] colClues = {
                {4},           // Column 1
                {1},           // Column 2
                {7},           // Column 3
                {1},           // Column 4
                {2, 1, 1},     // Column 5
                {2, 1, 1},     // Column 6
                {7},           // Column 7
                {1},           // Column 8
                {4},           // Column 9
                {3}            // Column 10
        };

        return new Puzzle(2, solution, rowClues, colClues);
    }
    
}
