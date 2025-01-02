// Performs Breadth-First Search (BFS); returns all nodes in the order
// they were visited. Also makes nodes point back to their previous node
// to compute the shortest path by backtracking from the finish node.
export function bfs(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const queue = [startNode]; // Initialize the queue with the start node.
    startNode.isVisited = true;

    while (queue.length > 0) {
        const currentNode = queue.shift(); // Dequeue the front node.
        visitedNodesInOrder.push(currentNode);

        // If we reach the finish node, return the visited nodes.
        if (currentNode === finishNode) return visitedNodesInOrder;

        const neighbors = getUnvisitedNeighbors(currentNode, grid);
        for (const neighbor of neighbors) {
            neighbor.isVisited = true;
            neighbor.previousNode = currentNode; // Track the path.
            queue.push(neighbor); // Enqueue the neighbor.
        }
    }

    // If no path to finishNode exists, return all visited nodes.
    return visitedNodesInOrder;
}

// Helper function to get unvisited neighbors of a node.
function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;

    if (row > 0) neighbors.push(grid[row - 1][col]); // Up.
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // Down.
    if (col > 0) neighbors.push(grid[row][col - 1]); // Left.
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // Right.

    return neighbors.filter((neighbor) => !neighbor.isVisited && !neighbor.isWall);
}

// Backtracks from the finishNode to find the shortest path.
// Only works after the BFS method has run.
export function getNodesInShortestPathOrder_bfs(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;

    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }

    return nodesInShortestPathOrder;
}
