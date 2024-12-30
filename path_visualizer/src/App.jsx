import React, { useState, useEffect } from "react";
// Ensure you have CSS for styling the grid and other components.

const App = () => {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    // Initialize the grid when the component mounts
    setGrid(getInitialGrid());
  }, []);

  return (
    <>
      <header className="bar flex flex-col p-1">
        <div className="bar_up flex flex-row items-center justify-between pt-4 pb-2 pr-4">
          <h1 className="text-center flex-grow text-3xl font-bold">Path Visualizer</h1>
          <button className="use">How to Use</button>
        </div>
        <div className="option_bar flex flex-row justify-center gap-14 pt-1 px-16">
          <div className="algos flex flex-col p-3">
            <select id="path-options" className="drop_down">
              <option value="Dijkstra">Dijkstra</option>
              <option value="Bellman-Ford">Bellman-Ford</option>
              <option value="DFS">DFS</option>
            </select>
            <p className="pt-2">Speed of algorithm:</p>
            <input
              id="a_speed"
              className="speed"
              type="range"
              min="1"
              max="5"
              step="1"
              value={4} // Replace with a state variable if needed
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center gap-10">
          <img
            src="/src/images/doraemon.jpg"
            alt="Doraemon"
            className="w-20 h-20 border-2 border-black object-cover rounded-full"
          />
          <img
            src="/src/images/nobi4.jpg"
            alt="Nobita's Face"
            className="border-2 border-black w-20 h-20 object-cover rounded-full"
          />
          <img
            src="/src/images/gian.jpg"
            alt="Gian's Face"
            className="border-2 border-black w-20 h-20 object-cover rounded-full"
          />
          </div>
          <div className="flex justify-center items-center">
            <button id="start" className="start" aria-label="Start Visualization">
              Visualize
            </button>
          </div>
          <div className="actions flex flex-col justify-center space-y-2 align-center">
            <button className="new">Clear Path</button>
            <button className="new">Reset</button>
          </div>
        </div>
      </header>

      {/* Grid Component */}
      <main className="grid-container">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="grid-row">
            {row.map((node, nodeIdx) => (
              <div
                key={nodeIdx}
                className={`grid-node ${
                  node.isStart ? "start-node" : ""
                } ${node.isFinish ? "finish-node" : ""}`}
              ></div>
            ))}
          </div>
        ))}
      </main>
    </>
  );
};

// Constants
const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35; //baad ka kaam hai ye 

// Helper Functions
const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 17; row++) {
    const currentRow = [];
    for (let col = 0; col < 60; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

export default App;
