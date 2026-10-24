import { useState } from "react";
import GraphCanvas from "../components/GraphCanvas";
import { PanelLeft } from "lucide-react";

import { generateGraph } from "../utils/jsonToGraph";
import { layoutGraph } from "../utils/layoutGraph";

import JsonEditor from "../components/JsonEditor";

function Editor({ isDark }) {
  const [jsonInput, setJsonInput] = useState(`{
  "project": {
    "name": "JSON Graph",
    "tagline": "JSON visualization made simple",
    "version": "1.0.0",
    "features": [
      {
        "id": 1,
        "name": "Interactive Graph",
        "enabled": true
      },
      {
        "id": 2,
        "name": "Auto Layout",
        "enabled": true
      },
      {
        "id": 3,
        "name": "JSON Editor",
        "enabled": true
      }
    ],
    "techStack": {
      "frontend": [
        "HTML",
        "JavaScript",
        "React"
      ],
      "styling": [
        "Tailwind CSS"
      ],
      "visualization": {
        "library": "React Flow",
        "layoutEngine": "Dagre",
        "editor": "CodeMirror"
      },
      "icons": "Lucide React"
    }
  }
}`);

  const [error, setError] = useState("");
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [collapsedNodes, setCollapsedNodes] = useState([]);
  const [isEditorHidden, setIsEditorHidden] = useState(false);

  function getDescendantIds(nodeId, graphEdges) {
    const descendants = [];

    function findChildren(parentId) {
      graphEdges.forEach((edge) => {
        if (edge.source === parentId) {
          descendants.push(edge.target);
          findChildren(edge.target);
        }
      });
    }

    findChildren(nodeId);

    return descendants;
  }

  function toggleNode(nodeId) {
    setCollapsedNodes((previous) =>
      previous.includes(nodeId)
        ? previous.filter((id) => id !== nodeId)
        : [...previous, nodeId],
    );
  }

  function handleNodeClick(event, node) {
    const hasChildren = edges.some((edge) => edge.source === node.id);

    if (!hasChildren) return;

    toggleNode(node.id);
  }

  const hiddenNodeIds = new Set();

  collapsedNodes.forEach((nodeId) => {
    getDescendantIds(nodeId, edges).forEach((descendantId) => {
      hiddenNodeIds.add(descendantId);
    });
  });

  const visibleNodes = nodes.filter((node) => !hiddenNodeIds.has(node.id));

  const visibleEdges = edges.filter(
    (edge) =>
      !hiddenNodeIds.has(edge.source) && !hiddenNodeIds.has(edge.target),
  );

  const customNodes = visibleNodes.map((node) => {
    const hasChildren = edges.some((edge) => edge.source === node.id);

    return {
      ...node,
      type: "graphNode",
      data: {
        ...node.data,
        isDark,
        hasChildren,
        isCollapsed: collapsedNodes.includes(node.id),
        onToggle: () => toggleNode(node.id),
      },
    };
  });

  const themedEdges = visibleEdges.map((edge) => ({
    ...edge,
    style: {
      ...edge.style,
      stroke: isDark ? "#a1a1aa" : "#6b7280",
    },
  }));

  function handleVisualize() {
    try {
      const data = JSON.parse(jsonInput);
      const graph = generateGraph(data);
      const layoutedGraph = layoutGraph(graph.nodes, graph.edges);

      setNodes(layoutedGraph.nodes);
      setEdges(layoutedGraph.edges);
      setCollapsedNodes([]);
      setError("");
    } catch (error) {
      console.error(error);

      if (error instanceof SyntaxError) {
        setError(`Invalid JSON: ${error.message}`);
      } else {
        setError("Unable to generate the graph. Please check your JSON.");
      }
    }
  }

  return (
    <div
      className={`flex h-[calc(100vh-47px)] overflow-hidden transition-colors duration-200 ${
        isDark ? "bg-gray-950 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      {/* JSON input panel */}
      {!isEditorHidden && (
        <div
          className={`flex min-h-0 w-[30%] min-w-70 shrink-0 flex-col gap-1 border-r p-1 transition-colors duration-200 ${
            isDark
              ? "border-gray-700 bg-gray-900"
              : "border-gray-400 bg-gray-200"
          }`}
        >
          {/* Visualize and hide-editor buttons */}
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={handleVisualize}
              className="flex w-fit items-center justify-center gap-2 rounded-lg bg-[#D5F365] px-4 py-2 text-sm font-medium text-[#063B00] transition-all duration-300 active:scale-[0.97]"
            >
              Visualize Graph
            </button>

            <button
              type="button"
              onClick={() => setIsEditorHidden(true)}
              aria-label="Hide JSON editor"
              title="Expand graph"
              className={`rounded-full p-2 transition-colors ${
                isDark ? "  hover:bg-gray-700" : " hover:bg-gray-300"
              }`}
            >
              <PanelLeft size={20} />
            </button>
          </div>

          {/* JSON parsing errors */}
          {error && (
            <p
              className={`rounded-lg border p-3 text-sm ${
                isDark
                  ? "border-red-900 bg-red-950 text-red-300"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {error}
            </p>
          )}

          <JsonEditor
            value={jsonInput}
            isDark={isDark}
            onChange={(value) => {
              setJsonInput(value);
              if (error) setError("");
            }}
          />
        </div>
      )}

      {/* Graph visualization panel */}
      <GraphCanvas
        nodes={customNodes}
        edges={themedEdges}
        isDark={isDark}
        onNodeClick={handleNodeClick}
        isEditorHidden={isEditorHidden}
        onShowEditor={() => setIsEditorHidden(false)}
      />
    </div>
  );
}

export default Editor;
