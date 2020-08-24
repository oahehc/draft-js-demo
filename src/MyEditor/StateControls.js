import React from 'react';
import { EditorState } from 'draft-js';
import StyleButton from './StyleButton';

const StateControls = ({ editorState, onChange }) => {
  function handleUndo() {
    onChange(EditorState.undo(editorState));
  }
  function handleRedo() {
    onChange(EditorState.redo(editorState));
  }

  return (
    <div className="RichEditor-controls">
      <StyleButton label="undo" onToggle={handleUndo} />
      <StyleButton label="redo" onToggle={handleRedo} />
    </div>
  );
};

export default StateControls;
