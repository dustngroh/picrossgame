"use client";

import React, { useEffect, useState } from "react";

interface Puzzle {
    id: number;
    solution: number[][]; // 1 = filled, 0 = empty
    rowClues: number[][];
    colClues: number[][];
}

export default function PuzzleDisplay() {
    const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
    const [grid, setGrid] = useState<number[][]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/puzzle/example10x10")
            .then((res) => res.json())
            .then((data) => {
                setPuzzle(data);
                setGrid(
                    Array(data.solution.length)
                        .fill(0)
                        .map(() => Array(data.solution[0].length).fill(0))
                );
            })
            .catch((err) => console.error("Failed to fetch puzzle:", err));
    }, []);

    const toggleCell = (row: number, col: number) => {
        setGrid((prev) => {
            const newGrid = prev.map((rowArr) => [...rowArr]);
            newGrid[row][col] = (newGrid[row][col] + 1) % 3; // 0 → 1 → 2 → 0
            return newGrid;
        });
    };

    if (!puzzle) return <p>Loading...</p>;

    const gridSize = puzzle.solution.length;

    return (
        <div className="flex flex-col items-center p-4 h-screen">
            <h1 className="text-xl font-bold mb-4">Picross Puzzle #{puzzle.id}</h1>

            <div
                className="grid"
                style={{
                    display: "grid",
                    gridTemplateColumns: `auto repeat(${gridSize}, 1fr)`,
                    gridTemplateRows: `auto repeat(${gridSize}, 1fr)`,
                    width: "90vmin", // Ensure the grid fits within the viewport
                    height: "90vmin",
                    //gap: "2px", // Small gaps between cells
                }}
            >
                {/* Top-left empty space */}
                <div></div>

                {/* Column Clues */}
                {puzzle.colClues.map((colClue, colIndex) => (
                    <div
                        key={`col-${colIndex}`}
                        className="flex flex-col justify-end items-center text-xs"
                    >
                        {colClue.map((num, index) => (
                            <div key={`col-${colIndex}-${index}`}>{num}</div>
                        ))}
                    </div>
                ))}

                {/* Row Clues and Grid */}
                {puzzle.rowClues.map((rowClue, rowIndex) => (
                    <React.Fragment key={`row-${rowIndex}`}>
                        {/* Row Clues */}
                        <div className="flex justify-end items-center text-xs pr-2">
                            {rowClue.map((num, index) => (
                                <div key={`row-${rowIndex}-${index}`}>{num}</div>
                            ))}
                        </div>

                        {/* Grid Cells */}
                        {grid[rowIndex].map((cell, colIndex) => (
                            <div
                                key={`cell-${rowIndex}-${colIndex}`}
                                onClick={() => toggleCell(rowIndex, colIndex)}
                                style={{
                                    backgroundColor:
                                        cell === 1 ? "black" : cell === 2 ? "lightgray" : "white",
                                    border: "1px solid gray",
                                    aspectRatio: "1 / 1", // Ensures square cells
                                    width: "100%", // Stretches cells evenly
                                }}
                                className="cursor-pointer"
                            ></div>
                        ))}
                    </React.Fragment>
                ))}
            </div>

            <p className="mt-4 text-sm">Click cells to toggle: Empty → Filled → Marked</p>
        </div>
    );
}


// "use client";
//
// import React, { useEffect, useState } from "react";
//
// interface Puzzle {
//     id: number;
//     solution: number[][]; // 1 = filled, 0 = empty
//     rowClues: number[][];
//     colClues: number[][];
// }
//
// export default function PuzzleDisplay() {
//     const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
//     const [grid, setGrid] = useState<number[][]>([]);
//
//     useEffect(() => {
//         fetch("http://localhost:8080/api/puzzle/example10x10")
//             .then((res) => res.json())
//             .then((data) => {
//                 setPuzzle(data);
//                 setGrid(
//                     Array(data.solution.length)
//                         .fill(0)
//                         .map(() => Array(data.solution[0].length).fill(0))
//                 );
//             })
//             .catch((err) => console.error("Failed to fetch puzzle:", err));
//     }, []);
//
//     const toggleCell = (row: number, col: number) => {
//         setGrid((prev) => {
//             const newGrid = prev.map((rowArr) => [...rowArr]); // Deep copy
//             newGrid[row][col] = (newGrid[row][col] + 1) % 3; // Toggle state (0 → 1 → 2 → 0)
//             return newGrid;
//         });
//     };
//
//     if (!puzzle) return <p>Loading...</p>;
//
//     const gridSize = puzzle.solution.length;
//
//     return (
//         <div className="flex flex-col items-center p-4">
//             <h1 className="text-xl font-bold mb-4">Picross Puzzle #{puzzle.id}</h1>
//
//             {/* Wrapper Grid: Combines Row Clues, Column Clues, and the Game Grid */}
//             <div
//                 className="grid"
//                 style={{
//                     gridTemplateColumns: `auto repeat(${gridSize}, 1fr)`,
//                     gridTemplateRows: `auto repeat(${gridSize}, 1fr)`,
//                     maxWidth: "min(90vw, 90vh)", // Fits to screen size
//                     maxHeight: "min(90vw, 90vh)",
//                 }}
//             >
//                 {/* Top-left empty cell for alignment */}
//                 <div></div>
//
//                 {/* Column Clues */}
//                 {puzzle.colClues.map((colClue, colIndex) => (
//                     <div
//                         key={`col-clue-${colIndex}`}
//                         className="flex flex-col justify-end items-center text-xs"
//                         style={{ height: "100%" }}
//                     >
//                         {colClue.map((num, index) => (
//                             <div key={`col-${colIndex}-${index}`}>{num}</div>
//                         ))}
//                     </div>
//                 ))}
//
//                 {/* Row Clues and Grid */}
//                 {puzzle.rowClues.map((rowClue, rowIndex) => (
//                     <React.Fragment key={`row-${rowIndex}`}>
//                         {/* Row Clues */}
//                         <div
//                             className="flex justify-end items-center text-xs"
//                             key={`row-clue-${rowIndex}`}
//                             style={{ paddingRight: "4px" }}
//                         >
//                             {rowClue.map((num, index) => (
//                                 <div key={`row-${rowIndex}-${index}`} className="mr-1">
//                                     {num}
//                                 </div>
//                             ))}
//                         </div>
//                         {/* Grid Row */}
//                         {grid[rowIndex].map((cell, colIndex) => (
//                             <div
//                                 key={`cell-${rowIndex}-${colIndex}`}
//                                 onClick={() => toggleCell(rowIndex, colIndex)}
//                                 className={`flex items-center justify-center cursor-pointer border border-gray-400`}
//                                 style={{
//                                     backgroundColor:
//                                         cell === 1 ? "black" : cell === 2 ? "lightgray" : "white",
//                                     aspectRatio: "1 / 1", // Makes cells square
//                                     width: "100%", // Dynamic width based on grid size
//                                 }}
//                             ></div>
//                         ))}
//                     </React.Fragment>
//                 ))}
//             </div>
//             <p className="mt-4 text-sm">Click cells to toggle: Empty → Filled → Marked</p>
//         </div>
//     );
// }

// "use client";
//
// import { useEffect, useState } from "react";
//
// interface Puzzle {
//     id: number;
//     solution: number[][]; // 1 = filled, 0 = empty
//     rowClues: number[][];
//     colClues: number[][];
// }
//
// export default function PuzzleDisplay() {
//     const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
//     const [grid, setGrid] = useState<number[][]>([]);
//
//     useEffect(() => {
//         fetch("http://localhost:8080/api/puzzle/example")
//             .then((res) => res.json())
//             .then((data) => {
//                 setPuzzle(data);
//                 setGrid(
//                     Array(data.solution.length)
//                         .fill(0)
//                         .map(() => Array(data.solution[0].length).fill(0))
//                 );
//             })
//             .catch((err) => console.error("Failed to fetch puzzle:", err));
//     }, []);
//
//     const toggleCell = (row: number, col: number) => {
//         setGrid((prev) => {
//             const newGrid = prev.map((rowArr) => [...rowArr]);
//             newGrid[row][col] = (newGrid[row][col] + 1) % 3; // Toggle state
//             return newGrid;
//         });
//     };
//
//     if (!puzzle) return <p>Loading...</p>;
//
//     const gridSize = puzzle.solution.length;
//
//     return (
//         <div className="flex flex-col items-center p-4">
//             <h1 className="text-xl font-bold mb-4">Picross Puzzle #{puzzle.id}</h1>
//             <div
//                 className="grid"
//                 style={{
//                     gridTemplateColumns: `repeat(${gridSize}, 1fr)`, // Equal columns
//                     width: "min(90vw, 90vh)", // Dynamically size the grid
//                     height: "min(90vw, 90vh)",
//                 }}
//             >
//                 {grid.map((row, rowIndex) =>
//                     row.map((cell, colIndex) => (
//                         <div
//                             key={`${rowIndex}-${colIndex}`}
//                             onClick={() => toggleCell(rowIndex, colIndex)}
//                             className={`border border-gray-400 flex items-center justify-center cursor-pointer`}
//                             style={{
//                                 backgroundColor:
//                                     cell === 1 ? "black" : cell === 2 ? "lightgray" : "white",
//                             }}
//                         ></div>
//                     ))
//                 )}
//             </div>
//             <p className="mt-4">Click cells to toggle: Empty → Filled → Marked</p>
//         </div>
//     );
// }

// "use client";
//
// import React from "react";
// import { useEffect, useState } from "react";
//
// interface Puzzle {
//     id: number;
//     solution: number[][]; // 1 = filled, 0 = empty
//     rowClues: number[][];
//     colClues: number[][];
// }
//
// export default function PuzzleDisplay() {
//     const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
//     const [grid, setGrid] = useState<number[][]>([]);
//
//     useEffect(() => {
//         fetch("http://localhost:8080/api/puzzle/example10x10")
//             .then((res) => res.json())
//             .then((data) => {
//                 setPuzzle(data);
//                 setGrid(
//                     Array(data.solution.length)
//                         .fill(0)
//                         .map(() => Array(data.solution[0].length).fill(0))
//                 );
//             })
//             .catch((err) => console.error("Failed to fetch puzzle:", err));
//     }, []);
//
//     const toggleCell = (row: number, col: number) => {
//         setGrid((prev) => {
//             const newGrid = prev.map((rowArr) => [...rowArr]); // Deep copy
//             newGrid[row][col] = (newGrid[row][col] + 1) % 3; // 0 → 1 → 2 → 0
//             return newGrid;
//         });
//     };
//
//     if (!puzzle) return <p>Loading...</p>;
//
//     return (
//         <div className="flex flex-col items-center gap-4 p-4">
//             <h1 className="text-xl font-bold">Picross Puzzle #{puzzle.id}</h1>
//             <div className="grid gap-1" style={{ gridTemplateColumns: `50px repeat(${puzzle.colClues.length}, 40px)` }}>
//                 {/* Top-left empty cell */}
//                 <div></div>
//                 {/* Column Clues */}
//                 {puzzle.colClues.map((colClue, colIndex) => (
//                     <div key={colIndex} className="flex flex-col items-center text-sm">
//                         {colClue.map((num, index) => (
//                             <div key={`col-${colIndex}-${index}`}>{num}</div>
//                             ))}
//                     </div>
//                 ))}
//
//
//                 {/* Row Clues and Grid */}
//                 {puzzle.rowClues.map((rowClue, rowIndex) => (
//                     <React.Fragment key={`row-${rowIndex}`}>
//                         {/* Row Clues */}
//                         <div key={`rowClue-${rowIndex}`} className="flex flex-row justify-end items-center text-sm">
//                             {rowClue.map((num, index) => (
//                                 <div key={`row-${rowIndex}-${index}`}>{num}</div>
//                                 ))}
//                         </div>
//                         {/* Grid Row */}
//                         {grid[rowIndex].map((cell, colIndex) => (
//                             <div
//                                 key={`cell-${rowIndex}-${colIndex}`}
//                                 onClick={() => toggleCell(rowIndex, colIndex)}
//                                 className={`w-10 h-10 border border-gray-400 flex items-center justify-center cursor-pointer ${
//                                     cell === 1 ? "bg-black" : cell === 2 ? "bg-gray-300" : "bg-white"
//                                 }`}
//                             ></div>
//                         ))}
//                     </React.Fragment>
//                 ))}
//             </div>
//             <p></p>
//         </div>
//     );
// }
