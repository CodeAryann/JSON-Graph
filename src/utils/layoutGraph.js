
import dagre from "@dagrejs/dagre";

function layoutGraph(nodes, edges) {
  const graph = new dagre.graphlib.Graph();

  graph.setDefaultEdgeLabel(() => ({}));

  graph.setGraph({
    rankdir: "LR",
    nodesep: 60,
    ranksep: 80,
  });

  const nodeWidth = 150;
  const nodeHeight = 40;
  const verticalGap = 25;
  const rootGap = 40;

  // Give Dagre the dimensions of each node.
  nodes.forEach((node) => {
    graph.setNode(node.id, {
      width: nodeWidth,
      height: nodeHeight,
    });
  });

  // Add the connections between nodes.
  edges.forEach((edge) => {
    graph.setEdge(edge.source, edge.target);
  });

  // Let Dagre calculate the horizontal layout.
  dagre.layout(graph);

  // Build a map of each node's children.
  const childrenMap = {};

  nodes.forEach((node) => {
    childrenMap[node.id] = [];
  });

  edges.forEach((edge) => {
    if (childrenMap[edge.source]) {
      childrenMap[edge.source].push(edge.target);
    }
  });

  // Find nodes that have no parent.
  const childIds = new Set(edges.map((edge) => edge.target));

  const rootNodes = nodes.filter((node) => !childIds.has(node.id));

  // Store the calculated vertical positions.
  const verticalPositions = new Map();

  let currentY = 0;

  // Position each subtree while preserving child order.
  function positionSubtree(nodeId) {
    const children = childrenMap[nodeId] || [];

    let centerY;

    if (children.length === 0) {
      // Place leaf nodes in order from top to bottom.
      centerY = currentY;
      currentY += nodeHeight + verticalGap;
    } else {
      // Position children in their original edge order.
      const childCenters = children.map((childId) =>
        positionSubtree(childId),
      );

      // Center the parent over its children.
      centerY =
        (childCenters[0] + childCenters[childCenters.length - 1]) / 2;
    }

    verticalPositions.set(nodeId, centerY);

    return centerY;
  }

  // Arrange separate root branches in their original order.
  rootNodes.forEach((rootNode) => {
    positionSubtree(rootNode.id);
    currentY += rootGap;
  });

  // Combine Dagre's horizontal positions with ordered vertical positions.
  const layoutedNodes = nodes.map((node) => {
    const dagreNode = graph.node(node.id);
    const centerY = verticalPositions.get(node.id);

    return {
      ...node,
      position: {
        x: dagreNode.x - nodeWidth / 2,
        y: centerY - nodeHeight / 2,
      },
    };
  });

  return {
    nodes: layoutedNodes,
    edges,
  };
}

export { layoutGraph };
