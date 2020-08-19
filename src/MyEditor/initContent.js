import { EditorState, convertFromHTML, ContentState } from 'draft-js';

export default function initContent(html) {
  if (!html || typeof html !== 'string') {
    return EditorState.createEmpty();
  }

  try {
    const blocksFromHTML = convertFromHTML(html);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    return EditorState.createWithContent(state);
  } catch (error) {
    console.log('initContent error:', error);
    return EditorState.createEmpty();
  }
}
