import React, { useState, useRef } from 'react';
import { Editor, RichUtils, getDefaultKeyBinding } from 'draft-js';
import initContent from './initContent';
import BlockStyleControls, { getBlockStyle } from './BlockStyleControls';
import InlineStyleControls, { styleMap } from './InlineStyleControls';
import './MyEditor.css';

const sample = '<div>default <span>test</span></div>';
function MyEditor() {
  const [editorState, setEditorState] = useState(initContent());

  function onChange(editorState) {
    // console.log(editorState.getBlockTree());
    setEditorState(editorState);
  }

  // core key commands such as Cmd+B (bold), Cmd+I (italic)
  function handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true; // TODO: 'handled' -> https://draftjs.org/docs/advanced-topics-key-bindings/
    }
    return false;
  }

  // TODO: https://draftjs.org/docs/advanced-topics-key-bindings/
  function mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  // handle click focus
  const editorRef = useRef(null);
  function focus() {
    editorRef.current.focus();
  }

  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
  let className = 'RichEditor-editor';
  var contentState = editorState.getCurrentContent();
  if (
    !contentState.hasText() &&
    contentState.getBlockMap().first().getType() !== 'unstyled'
  ) {
    className += ' RichEditor-hidePlaceholder';
  }

  return (
    <div className="RichEditor-root">
      <BlockStyleControls editorState={editorState} onChange={onChange} />
      <InlineStyleControls editorState={editorState} onChange={onChange} />
      <div className={className} onClick={focus}>
        <Editor
          ref={editorRef}
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={onChange}
          placeholder="Tell a story..."
        />
      </div>
    </div>
  );
}

export default MyEditor;
