import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { PanelLeft } from "lucide-react";
import GraphNode from "./GraphNode";

const nodeTypes = {
  graphNode: GraphNode,
};

function GraphCanvas({
  nodes,
  edges,
  isDark,
  onNodeClick,
  isEditorHidden,
  onShowEditor,
}) {
  return (
    <div
      className={`relative min-h-0 min-w-0 flex-1 p-1 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      {isEditorHidden && (
        <button
          type="button"
          onClick={onShowEditor}
          aria-label="Show JSON editor"
          title="Show JSON editor"
          className={`absolute left-3 top-3 z-10 rounded-full p-2 transition-colors ${
            isDark ? " hover:bg-gray-700" : " hover:bg-gray-300"
          }`}
        >
          <PanelLeft size={20} />
        </button>
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        className="h-full"
      >
        <Background color={isDark ? "#4D8DBA" : "#030164"} size={1.5} />
        <Controls className={isDark ? "json-graph-controls-dark" : ""} />
      </ReactFlow>
    </div>
  );
}

export default GraphCanvas;
