import React, { useEffect, useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function NewsEditor(props) {
  const [editorState, setEditorState] = useState('')
  const { content } = props;
  useEffect(() => {
    console.log(content)
    if(content === undefined) {return }
    const blocksFromHtml = htmlToDraft(content); //html转成draft
    if (blocksFromHtml) {
      const { contentBlocks} = blocksFromHtml;//, entityMap 
      const contentState = ContentState.createFromBlockArray(contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState)
    }
  }, [content])
  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={(editorState) => { setEditorState(editorState) }}
      onBlur={() => {
        let value = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        props.getContent(value)
      }}
    />)
}
