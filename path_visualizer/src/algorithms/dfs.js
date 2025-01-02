// Performs Depth-First Search; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function dfs(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const stack = [startNode]; // Stack for DFS
    startNode.isVisited = true;
  
    while (stack.length > 0) {
      const currentNode = stack.pop(); // Get the top node
      visitedNodesInOrder.push(currentNode);
  
      // If we reach the finish node, return the visited nodes
      if (currentNode === finishNode) {
        return visitedNodesInOrder;
      }
  
      const unvisitedNeighbors = getUnvisitedNeighborsDFS(currentNode, grid);
      for (const neighbor of unvisitedNeighbors) {
        neighbor.isVisited = true;
        neighbor.previousNode = currentNode; // Track the path
        stack.push(neighbor);
      }
    }
  
    // Return all visited nodes if no path is found
    return visitedNodesInOrder;
  }
  
  // Get unvisited neighbors for DFS
  function getUnvisitedNeighborsDFS(node, grid) {
    const neighbors = [];
    const { col, row } = node;
  
    // Check boundaries and push neighbors
    if (row > 0) neighbors.push(grid[row - 1][col]); // Up
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // Down
    if (col > 0) neighbors.push(grid[row][col - 1]); // Left
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // Right
  
    // Only return neighbors that are not visited and not walls
    return neighbors.filter((neighbor) => !neighbor.isVisited && !neighbor.isWall);
  }
  
  // Backtracking from the finishNode to find the shortest path
  export function getNodesInShortestPathOrder_dfs(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }
  