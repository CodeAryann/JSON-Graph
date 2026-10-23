function createNode(nodeId, key, position) {
  return {
    id: nodeId,
    position: position,
    data: {
      label: key,
    },
  };
}

function generateGraph(data) {
  const nodes = [];
  const edges = [];

  function processObject(object, parentId, depth, startY = 0) {
    const x = depth * 250;
    const entries = Object.entries(object);

    entries.forEach(([key, value], index) => {
      const y = startY + index * 150;

      const position = {
        x: x,
        y: y,
      };

      const nodeId = parentId === null ? key : `${parentId}-${key}`;

      // Create key node
      const node = createNode(nodeId, key, position);

      nodes.push(node);

      // Connect parent to current node
      if (parentId !== null) {
        const edge = {
          id: `${parentId}-to-${nodeId}`,
          source: parentId,
          target: nodeId,
        };

        edges.push(edge);
      }

      // 1. Normal object
      if (
        typeof value === "object" &&
        !Array.isArray(value) &&
        value !== null
      ) {
        processObject(value, nodeId, depth + 1);
      }

      // 2. Array
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          // Array item is an object
          if (
            typeof item === "object" &&
            item !== null &&
            !Array.isArray(item)
          ) {
            const itemId = `${nodeId}-item-${index}`;

            const itemNode = createNode(itemId, `item-${index}`, {
              x: x + 250,
              y: y + index * 150,
            });

            nodes.push(itemNode);

            // Connect array to item
            const itemEdge = {
              id: `${nodeId}-to-${itemId}`,
              source: nodeId,
              target: itemId,
            };

            edges.push(itemEdge);

            processObject(item, itemId, depth + 1, index * 300);
          }

          // Array item is a primitive
          else {
            const itemId = `${nodeId}-item-${index}`;

            const itemNode = createNode(itemId, item, {
              x: x + 250,
              y: y + index * 150,
            });

            nodes.push(itemNode);

            const itemEdge = {
              id: `${nodeId}-to-${itemId}`,
              source: nodeId,
              target: itemId,
            };

            edges.push(itemEdge);
          }
        });
      }

      // 3. Primitive value
      if (typeof value !== "object" || value === null) {
        const valueNode = {
          id: `${nodeId}-value`,
          position: {
            x: x + 250,
            y: y,
          },
          data: {
            label: String(value),
          },
        };

        nodes.push(valueNode);

        const valueEdge = {
          id: `${nodeId}-to-${nodeId}-value`,
          source: nodeId,
          target: `${nodeId}-value`,
        };

        edges.push(valueEdge);
      }
    });
  }

  processObject(data, null, 0);

  return {
    nodes,
    edges,
  };
}

export { generateGraph };
