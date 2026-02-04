import React, { useState } from "react";
import { Plus, CircleQuestionMark, MoveDown } from "lucide-react";

const PREDEFINED_QUESTIONS = [
  "What percentage does the plan cover for co-insurance on diagnostic lab services?",
  "What is the annual deductible for this plan?", 
  "Is prior authorization required for specialist visits?",
];

function QuestionNode({ text }) {
  return (
    <div className="relative flex flex-col items-center">
      <div className="w-3 h-3 rounded-full border-2 border-purple-600 absolute -top-1" />

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm w-80 p-4">
        <div className="flex items-center gap-2 pb-3 text-sm font-semibold text-gray-800 mb-2 border-b-1 border-gray-200">
          <CircleQuestionMark size={16} />
          Question
        </div>
        <p className="text-sm text-gray-700 leading-snug">{text}</p>
      </div>
      <div className="w-3 h-3 rounded-full border-2 border-purple-600" />
    </div>
  );
}

function Connector() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-px h-24 bg-purple-600" />
      <MoveDown size={16} className="text-purple-600 -mt-1" />
    </div>
  )
}

export default function App() {
  const [nodes, setNodes] = useState([
    { id: 0, text: PREDEFINED_QUESTIONS[0] }
  ]);

  const addNode = () => {
    const nextIndex = nodes.length % PREDEFINED_QUESTIONS.length;
    setNodes([
      ...nodes,
      { id: nodes.length, text: PREDEFINED_QUESTIONS[nextIndex] },
    ]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
        <h1 className="text-sm font-semibold text-gray-900">Workflow Builder</h1>
        <button
          onClick={addNode}
          className="inline-flex items-center gap-2 rounded-lg bg-purple-600 text-white px-4 py-2 text-sm font-medium hover:bg-purple-700 transition"
        >
          <Plus size={14} />
          Add Node
        </button>
      </header>

      {/* Canvas */}
      <main
        className="flex-1 flex justify-center items-start pt-20 bg-gray-300"
      >
        <div className="flex flex-col items-center">
          {nodes.map((node, index) => (
            <React.Fragment key={node.id}>
              <QuestionNode text={node.text} />
              {index < nodes.length - 1 && <Connector />}
            </React.Fragment>
          ))}
        </div>
      </main>
    </div>
  );
}
