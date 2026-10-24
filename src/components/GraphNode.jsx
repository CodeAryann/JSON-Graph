import { memo } from "react";
import { Handle, Position } from "@xyflow/react";

function GraphNode({ data }) {
  const { label, hasChildren, isCollapsed, onToggle, isDark } = data;

  return (
    <div
      className={`relative min-w-20 rounded-lg border px-4 py-3 text-sm shadow-sm transition-colors ${
        isDark
          ? "border-blue-900 bg-[#0b132b] text-indigo-100"
          : "border-indigo-400 bg-indigo-100 text-slate-800"
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: isDark ? "#bc8a5f" : "#582f0e",
          width: 8,
          height: 8,
          border: `2px solid ${isDark ? "#0f172a" : "#ffffff"}`,
        }}
      />

      <div className="flex items-center justify-between gap-3">
        <span className="break-all font-medium">{label}</span>

        {hasChildren && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onToggle();
            }}
            aria-label={isCollapsed ? "Expand node" : "Collapse node"}
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs font-bold transition-colors ${
              isDark
                ? "border-blue-900 text-[#ffbe0b] hover:border-indigo-400 hover:bg-slate-800"
                : "border-indigo-400 text-[#f35b04] hover:border-indigo-300 hover:bg-indigo-50"
            }`}
          >
            {isCollapsed ? "+" : "-"}
          </button>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: isDark ? "#bc8a5f" : "#582f0e",
          width: 8,
          height: 8,
          border: `2px solid ${isDark ? "#0f172a" : "#ffffff"}`,
        }}
      />
    </div>
  );
}

export default memo(GraphNode);
