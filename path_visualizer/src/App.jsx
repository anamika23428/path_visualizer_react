import React, { useState, useEffect } from "react";
import { Usecard } from "./components/use_card";

const App = () => {
  const [grid, setGrid] = useState([]);
  const [startNode, setStartNode] = useState({ row: null, col: null });
  const [nobitaMode, setNobitaMode] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [endNode, setEndNode] = useState({ row: null, col: null });
  const [doraMode, setDoraMode] = useState(false);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [gianMode, setGianMode] = useState(false);
  useEffect(() => {
    setGrid(getInitialGrid(startNode, endNode));
  }, [startNode, endNode]);

  const handleGridClick = (row, col) => {
    if (nobitaMode) {
      setStartNode({ row, col });
      setNobitaMode(false);
    } else if (doraMode) {
      setEndNode({ row, col });
      setDoraMode(false);
    }
  };

  const handleMouseDown = (row, col) => {
    if(gianMode){
    console.log(`Mouse down at row: ${row}, col: ${col}`);
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);}
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed || !gianMode) return; 
    console.log(`Mouse enter at row: ${row}, col: ${col}`);
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };
  const handleMouseUp = () => {
    setMouseIsPressed(false);
    setGianMode(false);
  };

  return (
    <>
      <div className={showCard ? "app-container blurred" : "app-container"}>
        <header className="bar flex flex-col p-1">
          <div className="bar_up flex flex-row items-center justify-between pt-4 pb-2 pr-4">
            <h1 className="text-center flex-grow text-3xl font-bold">
              Path Visualizer
            </h1>
            <button className="use" onClick={() => setShowCard(true)}>
              How to Use
            </button>
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
                defaultValue={4}
                onChange={(e) => console.log(e.target.value)}
              />
            </div>
            <div className="flex justify-center items-center gap-10">
              <img
                src="/src/images/doraemon.jpg" alt="Doraemon" className="img_btn"
                onClick={() => setDoraMode(true)}
                tabIndex={0}
              />
              <img
                src="/src/images/nobi4.jpg" alt="Nobita's Face" className="img_btn"
                onClick={() => setNobitaMode(true)}
                tabIndex={0}
              />
              <img src="/src/images/gian.jpg" alt="Gian's Face" className="img_btn"
              onClick={() => setGianMode(true)}
                tabIndex={0}
              
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
                  className={`grid-node ${node.isStart ? "start-node" : ""} ${
                    node.isFinish ? "finish-node" : ""
                  } ${node.isWall ? "iswall" : ""}`}
                  onClick={() => handleGridClick(node.row, node.col)}
                  onMouseDown={() => handleMouseDown(node.row, node.col)}
                  onMouseEnter={() => handleMouseEnter(node.row, node.col)}
                  onMouseUp={handleMouseUp}
                ></div>
              ))}
            </div>
          ))}
        </main>
      </div>

      {/* ShowCard Component */}
      {showCard && <Usecard setShowCard={setShowCard} />}
    </>
  );
};

// Helper Functions
const getInitialGrid = (startNode, endNode) => {
  const grid = [];
  for (let row = 0; row < 17; row++) {
    const currentRow = [];
    for (let col = 0; col < 60; col++) {
      currentRow.push(createNode(col, row, startNode, endNode));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row, startNode, endNode) => {
  return {
    col,
    row,
    isStart: row === startNode.row && col === startNode.col,
    isFinish: row === endNode.row && col === endNode.col,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    // ...node copies all the properties (like row, col, etc.) from the original node.
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export default App;
