import React, { useState } from "react";

const App = () => {
  const [speed, setSpeed] = useState(4);

  return (
    <>
      <header className="bar flex flex-col p-1">
        <div className="bar_up flex flex-row items-center justify-between pt-4 pb-2 pr-4">
          <h1 className="text-center flex-grow text-3xl font-bold">Path Visualizer</h1>
          <button className="use">How to Use</button>
        </div>
        <div className="option_bar flex flex-row justify-center gap-14 p-2 px-16">
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
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
            />
          </div>
          <img
            src="\src\images\doraemon.jpg"
            alt="Doraemon"
            className="w-20 h-20 border-2 border-black object-cover rounded-full"
          />
          <img
            src="\src\images\nobi4.jpg"
            alt="Nobita's Face"
            className="border-2 border-black w-20 h-20 object-cover rounded-full"
          />
          <img
            src="\src\images\gian.jpg"
            alt="Gian's Face"
            className="border-2 border-black w-20 h-20 object-cover rounded-full"
          />
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
    </>
  );
};

export default App;
