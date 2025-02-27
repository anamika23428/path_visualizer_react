import React, { useState, useEffect } from "react";
import { Usecard } from "./components/use_card";
import { dijkstra, getNodesInShortestPathOrder_dijkstra } from "./algorithms/dijkstra";
import { dfs, getNodesInShortestPathOrder_dfs } from "./algorithms/dfs";
import { bfs, getNodesInShortestPathOrder_bfs } from "./algorithms/bfs";
const algorithms = {
  "Dijkstra": dijkstra, 
  "DFS": dfs, 
  "BFS": bfs, 
};
const shortestpath={
  "Dijkstra":getNodesInShortestPathOrder_dijkstra,
  "DFS":getNodesInShortestPathOrder_dfs,
  "BFS":getNodesInShortestPathOrder_bfs,
}
const App = () => {
  const [speed , setSpeed] = useState(3);
  const [algo ,setAlgo] =useState("Dijkstra")
  const [grid, setGrid] = useState([]);
  const [startNode, setStartNode] = useState({ row: null, col: null });
  const [nobitaMode, setNobitaMode] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [endNode, setEndNode] = useState({ row: null, col: null });
  const [doraMode, setDoraMode] = useState(false);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [gianMode, setGianMode] = useState(false);
  const [visitedNodeIndices, setVisitedNodeIndices] = useState([]); // New state for visited nodes
  console.log(algo)
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
    if (gianMode) {
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      setGrid(newGrid);
      setMouseIsPressed(true);
    }
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed || !gianMode) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
    setGianMode(false);
  };

  // Updated animateDijkstra function with staggered node updates
  const animatealgo = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    const delay=25/speed;
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        setVisitedNodeIndices((prev) => [...prev, node]); // Add node to visited indices

        if (i === visitedNodesInOrder.length - 1) {
          setTimeout(() => {
            animateShortestPath(nodesInShortestPathOrder);
          }, 100);
        }
      }, delay * i); // Delay of 50ms for staggered animation
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    const delay=100/speed;
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        setGrid((prevGrid) => {
          const newGrid = prevGrid.map((row) =>
            row.map((n) => (n.row === node.row && n.col === node.col ? { ...n, isShortestPath: true } : n))
          );
          return newGrid;
        });
      }, delay * i);
    }
  };

  const visualizealgo = (algo) => {
    // Validate start and end nodes
    if (!startNode || !endNode || startNode.row === undefined || endNode.row === undefined) {
      alert("Please set both start and end nodes!");
      return;
    }
  
    // Get start and finish nodes from the grid
    const start = grid[startNode.row][startNode.col];
    const finish = grid[endNode.row][endNode.col];
  
    // Validate algorithm
    if (!algorithms[algo] || typeof algorithms[algo] !== "function") {
      console.error(`Algorithm "${algo}" is not valid or not callable.`);
      return;
    }
  
    // Execute algorithm and visualize
    try {
      const visitedNodesInOrder = algorithms[algo](grid, start, finish);
      const nodesInShortestPathOrder = shortestpath[algo](finish);
      animatealgo(visitedNodesInOrder, nodesInShortestPathOrder);
    } catch (error) {
      console.error("Error executing algorithm:", error);
    }
  };
  

  return (
    <>
      <div className={showCard ? "app-container blurred" : "app-container"}>
        <header className="bar flex flex-col p-1">
          <div className="bar_up flex flex-row items-center justify-between pt-3 pb-1 pr-4">
            <h1 className="text-center flex-grow text-3xl font-bold">Path Visualizer</h1>
            <button className="use" onClick={() => setShowCard(true)}>
              How to Use
            </button>
          </div>
          <h2 class="text-center mb-1">Help Nobita reach Doraemon by dodging Gian's punch along the way!</h2>
          <div className="option_bar flex flex-row justify-center gap-14 px-14 pb-0">
            <div className="algos flex flex-col p-3">
            <select id="path-options" className="drop_down" 
            value={algo} onChange={(e) =>setAlgo(e.target.value)} >
                 <option value="Dijkstra">Dijkstra</option>
                 <option value="DFS">DFS</option>
                 <option value="BFS">BFS</option>
            </select>
              <p className="pt-2">Speed of visualization:</p>
              <input
                className="speed" type="range" min="1" max="5" step="1" defaultValue={4}
                onChange={(e) =>setSpeed(e.target.value)} />
            </div>
            <div className="flex-container md:flex justify-center items-center gap-10">
              <img
                src="/images/doraemon.jpg"
                alt="Doraemon"
                className="img_btn"
                onClick={() => setDoraMode(true)}
                tabIndex={0}
              />
              <img
                src="/images/nobi4.jpg"
                alt="Nobita's Face"
                className="img_btn"
                onClick={() => setNobitaMode(true)}
                tabIndex={0}
              />
              <img
                src="/images/gian.jpg"
                alt="Gian's Face"
                className="img_btn"
                onClick={() => setGianMode(true)}
                tabIndex={0}
              />
            </div>
            <div className="flex justify-center items-center">
              <button
                id="start"
                className="start"
                aria-label="Start Visualization"
                onClick={() => visualizealgo(algo)}
              >
                Visualize
              </button>
            </div>
            <div className="actions flex flex-col justify-center space-y-2 align-center">
              <button
                className="new"
                onClick={() => {
                  setGrid(getInitialGrid(startNode, endNode));
                  setVisitedNodeIndices([]);
                }}
              >
                Clear Path
              </button>
              <button className="new" onClick={() => window.location.reload()}>
                Reset
              </button>
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
                  className={`grid-node ${node.isStart ? "start-node" : ""}
                   ${node.isFinish ? "finish-node" : ""}
                   ${node.isWall ? "iswall" : ""} 
                   ${node.isShortestPath ? "node-shortest-path" : ""} 
                   ${visitedNodeIndices.some(visitedNode => visitedNode.row === node.row && visitedNode.col === node.col) && !node.isShortestPath ? "node-visited" : ""}`}
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
  if (!node.isStart && !node.isFinish) {
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
  }
  return newGrid;
};

export default App;
