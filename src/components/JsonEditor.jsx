import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { EditorView } from "@codemirror/view";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags } from "@lezer/highlight";

// Light editor theme
const lightTheme = EditorView.theme(
  {
    "&": {
      backgroundColor: "#ffffff",
      color: "#1f2937",
      height: "100%",
      fontSize: "14px",
    },
    ".cm-content": {
      caretColor: "#111827",
    },
    ".cm-gutters": {
      backgroundColor: "#f9fafb",
      color: "#9ca3af",
      border: "none",
    },
    ".cm-activeLine": {
      backgroundColor: "#f3f4f6",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "#f3f4f6",
    },
    "&.cm-focused": {
      outline: "none",
    },
  },
  { dark: false },
);

// Dark editor theme
const darkTheme = EditorView.theme(
  {
    "&": {
      backgroundColor: "#18181b",
      color: "#e4e4e7",
      height: "100%",
      fontSize: "14px",
    },
    ".cm-scroller": {
      backgroundColor: "#000000",
      overflow: "auto",
    },
    ".cm-content": {
      caretColor: "#f4f4f5",
    },
    ".cm-gutters": {
      backgroundColor: "#27272a",
      color: "#a1a1aa",
      border: "none",
    },
    ".cm-activeLine": {
      backgroundColor: "#27272a",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "#3f3f46",
    },
    ".cm-cursor": {
      borderLeftColor: "#f4f4f5",
    },
    ".cm-selectionBackground": {
      backgroundColor: "#3f3f46",
    },
    "&.cm-focused": {
      outline: "none",
    },
  },
  { dark: true },
);

// Light JSON syntax colors
const lightHighlightStyle = HighlightStyle.define([
  { tag: tags.propertyName, color: "#0550ae" },
  { tag: tags.string, color: "#0a7a35" },
  { tag: tags.number, color: "#953800" },
  { tag: tags.bool, color: "#8250df" },
  { tag: tags.null, color: "#cf222e" },
  { tag: tags.punctuation, color: "#57606a" },
]);

// Dark JSON syntax colors
const darkHighlightStyle = HighlightStyle.define([
  { tag: tags.propertyName, color: "#79c0ff" },
  { tag: tags.string, color: "#7ee787" },
  { tag: tags.number, color: "#ffa657" },
  { tag: tags.bool, color: "#d2a8ff" },
  { tag: tags.null, color: "#ff7b72" },
  { tag: tags.punctuation, color: "#a1a1aa" },
]);

function JsonEditor({ value, onChange, isDark }) {
  return (
    <div
      className={`min-h-0 flex-1 overflow-hidden rounded-lg border ${
        isDark ? "border-gray-700 bg-zinc-900" : "border-gray-200 bg-white"
      }`}
    >
      <CodeMirror
        value={value}
        height="100%"
        extensions={[
          json(),
          isDark ? darkTheme : lightTheme,
          syntaxHighlighting(isDark ? darkHighlightStyle : lightHighlightStyle),
        ]}
        onChange={onChange}
        basicSetup={{
          lineNumbers: true,
          bracketMatching: true,
          closeBrackets: true,
          indentOnInput: true,
        }}
        className="h-full"
      />
    </div>
  );
}

export default JsonEditor;
