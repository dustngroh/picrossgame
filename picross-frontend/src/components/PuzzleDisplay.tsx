"use client";

import React from "react";
import { useEffect, useState } from "react";

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
            const newGrid = prev.map((rowArr) => [...rowArr]); // Deep copy
            newGrid[row][col] = (newGrid[row][col] + 1) % 3; // 0 → 1 → 2 → 0
            return newGrid;
        });
    };

    if (!puzzle) return <p>Loading...</p>;

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <h1 className="text-xl font-bold">Picross Puzzle #{puzzle.id}</h1>
            <div className="grid gap-1" style={{ gridTemplateColumns: `50px repeat(${puzzle.colClues.length}, 40px)` }}>
                {/* Top-left empty cell */}
                <div></div>
                {/* Column Clues */}
                {puzzle.colClues.map((colClue, colIndex) => (
                    <div key={colIndex} className="flex flex-col items-center text-sm">
                        {colClue.map((num, index) => (
                            <div key={`col-${colIndex}-${index}`}>{num}</div>
                            ))}
                    </div>
                ))}


                {/* Row Clues and Grid */}
                {puzzle.rowClues.map((rowClue, rowIndex) => (
                    <React.Fragment key={`row-${rowIndex}`}>
                        {/* Row Clues */}
                        <div key={`rowClue-${rowIndex}`} className="flex flex-row justify-end items-center text-sm">
                            {rowClue.map((num, index) => (
                                <div key={`row-${rowIndex}-${index}`}>{num}</div>
                                ))}
                        </div>
                        {/* Grid Row */}
                        {grid[rowIndex].map((cell, colIndex) => (
                            <div
                                key={`cell-${rowIndex}-${colIndex}`}
                                onClick={() => toggleCell(rowIndex, colIndex)}
                                className={`w-10 h-10 border border-gray-400 flex items-center justify-center cursor-pointer ${
                                    cell === 1 ? "bg-black" : cell === 2 ? "bg-gray-300" : "bg-white"
                                }`}
                            ></div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
            <p></p>
        </div>
    );
}

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
//                 // Initialize the grid with empty states (0)
//                 setGrid(Array(data.solution.length).fill(0).map(() => Array(data.solution[0].length).fill(0)));
//             })
//             .catch((err) => console.error("Failed to fetch puzzle:", err));
//     }, []);
//
//     const toggleCell = (row: number, col: number) => {
//         setGrid((prev) => {
//             const newGrid = prev.map((rowArr) => [...rowArr]); // Deep copy
//             // Toggle between 0 (empty) -> 1 (filled) -> 2 (marked)
//             newGrid[row][col] = (newGrid[row][col] + 1) % 3;
//             return newGrid;
//         });
//     };
//
//     if (!puzzle) return <p>Loading...</p>;
//
//     return (
//         <div className="flex flex-col items-center gap-4 p-4">
//             <h1 className="text-xl font-bold">Picross Puzzle #{puzzle.id}</h1>
//             <div className="flex">
//                 {/* Column Clues */}
//                 <div className="grid grid-cols-[repeat(auto-fit,_40px)] gap-1">
//                     <div></div>
//                     {puzzle.colClues.map((colClue, colIndex) => (
//                         <div key={colIndex} className="text-center text-sm">
//                             {colClue.join(" ")}
//                         </div>
//                     ))}
//                 </div>
//                 {/* Grid */}
//                 <div className="grid grid-cols-[repeat(auto-fit,_40px)] gap-1">
//                     {/* Row Clues and Grid Cells */}
//                     {puzzle.rowClues.map((rowClue, rowIndex) => (
//                         <div key={rowIndex} className="flex">
//                             {/* Row Clues */}
//                             <div className="text-right text-sm w-16">
//                                 {rowClue.join(" ")}
//                             </div>
//                             {/* Grid Row */}
//                             {grid[rowIndex].map((cell, colIndex) => (
//                                 <div
//                                     key={colIndex}
//                                     onClick={() => toggleCell(rowIndex, colIndex)}
//                                     className={`w-10 h-10 border border-gray-400 flex items-center justify-center cursor-pointer ${
//                                         cell === 1 ? "bg-black" : cell === 2 ? "bg-gray-300" : "bg-white"
//                                     }`}
//                                 ></div>
//                             ))}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <p>Click cells to toggle: Empty → Filled → Marked</p>
//         </div>
//     );
// }

// "use client";
//
// import { useEffect, useState } from "react";
//
// interface Puzzle {
//     id: number;
//     solution: number[][];
//     rowClues: number[][];
//     colClues: number[][];
// }
//
// export default function PuzzleDisplay() {
//     const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
//     const [isClient, setIsClient] = useState(false);
//
//     // Ensure this runs only on the client
//     useEffect(() => {
//         setIsClient(true);
//
//         fetch("http://localhost:8080/api/puzzle/example")
//             .then((res) => res.json())
//             .then((data) => setPuzzle(data))
//             .catch((err) => console.error("Failed to fetch puzzle:", err));
//     }, []);
//
//     // Prevent SSR by only rendering after client-side hydration
//     if (!isClient) return null;
//
//     return (
//         <div>
//             <h1>Picross Puzzle!</h1>
//             {puzzle ? (
//                 <div>
//                     <h2>Puzzle ID: {puzzle.id}</h2>
//                     <h3>Row Clues:</h3>
//                     <pre>{JSON.stringify(puzzle.rowClues, null, 2)}</pre>
//                     <h3>Column Clues:</h3>
//                     <pre>{JSON.stringify(puzzle.colClues, null, 2)}</pre>
//                 </div>
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// }
