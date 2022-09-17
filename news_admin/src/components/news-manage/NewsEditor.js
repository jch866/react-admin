import React ,{useState} from 'react'
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function NewsEditor(props) {
    const [editorState,setEditorState] = useState('')
  return (
    <Editor
  editorState={editorState}
  toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassName"
  onEditorStateChange={(editorState)=>{setEditorState(editorState)}}
  onBlur = {()=>{
    let value = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    // console.log(value);
    props.getContent(value)
  }}
/>)
}
