import React, { useState } from 'react';

export const Usecard = ({ setShowCard }) => {
  const [page, setPage] = useState(1);  
  const points = {
    1: [
      "1. Set Start and End Nodes:",
      "   - Click on the Nobita (Start) icon to activate 'Start Node Placement Mode.'",
      "   - Click on the grid to place the start node.",
      "   - Click on the Doraemon (End) icon to activate 'End Node Placement Mode.'",
      "   - Click on the grid to place the end node."
    ],
    2: [
      "2. Create Walls:",
      "   - Click on the Gian (Wall) icon to activate 'Wall Creation Mode.'",
      "   - Click and drag on the grid to add walls (obstacles).",
      "   - Release the mouse to finalize wall placement."
    ],
    3: [
      "3. Choose Algorithm:",
      "   - Use the dropdown menu to select one of the following algorithms:",
      "     - Dijkstra's Algorithm (Default)",
      "     - Depth-First Search (DFS)",
      "     - Breadth-First Search (BFS)"
    ],
    4: [
      "4. Adjust Speed:",
      "   - Use the speed slider to adjust the visualization speed (1 = slowest, 5 = fastest)."
    ],
    5: [
      "5. Visualize Path:",
      "   - Click the 'Visualize' button to run the selected algorithm.",
      "   - The algorithm will:",
      "     - Highlight visited nodes in the order they are processed.",
      "     - Show the shortest path from the start node to the end node."
    ],
    6: [
      "6. Clear Path:",
      "   - Click the 'Clear Path' button to reset the grid while keeping  start, and end nodes intact."
    ],
    7: [
      "7. Reset Grid:",
      "   - Click the 'Reset' button to clear everything, including walls, start, and end nodes."
    ],
   
    8: [
      "  Notes:",
      "  - Ensure you set both the Start and End nodes before visualizing the path.",
      "  - Walls act as obstacles and cannot be traversed by the algorithm.",
    ]
  };

  
  const handleNext = () => {
    if (page < 8) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const handleprev = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <div className="overlay">
        <div className="card">
          <div className="flex flex-row items-center justify-between pt-3 pb-2 pr-4">
            <h1 className="text-center flex-grow text-lg font-bold">How to Use</h1>
            <button className="use_btn" onClick={() => setShowCard(false)}>
              Back
            </button>
          </div>
          <div className="flex flex-col h-full justify-between">
          <div className=" mx-4 text-left">
                  {points[page]?.map((point, index) => (
                  <div key={index} ><span style={{ fontWeight: index === 0 ? 'bold' : 'normal' }}>{point}</span>
          </div>
          ))}
          </div>

         
            <div className=" mx-4  flex justify-center gap-8  mb-16 ">
            <button
             className={page === 1 ? 'next_end' : 'use_btn'}
              onClick={handleprev}
              disabled={page === 1}>
              Previous
            </button>
            <button
             className={page === 8 ? 'next_end' : 'use_btn'}
              onClick={handleNext}
              disabled={page === 8}>
              Next
            </button>
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
};
