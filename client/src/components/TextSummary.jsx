

import 'react-quill/dist/quill.snow.css';
import React, { useEffect, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import {GameContext} from "../contexts/GameContext";
import {ChopSentence} from "../utils/text-utils"; // import styles
import './SCSS/text_summary.scss';
// import './../styles/text-editor.scss';

function TextSummary() {
    const quillRef = useRef(); // Create a ref to store the Quill instance
    const {globalCurrentWordIndex, gameText} = React.useContext(GameContext);
    const [text, setText] = React.useState(gameText ?? "");
    let splitText = ChopSentence(gameText);
    useEffect(() => {
        setText(gameText)
        splitText = ChopSentence(gameText);
        quillRef.current.getEditor().setText(gameText ?? "");
    }, [gameText]);

    useEffect(() => {
        console.log("TextSummary.jsx: globalCurrentWordIndex: ",globalCurrentWordIndex);
    }, [globalCurrentWordIndex]);


    useEffect(() => {
        const quill = quillRef.current.getEditor(); // Get the Quill instance
        //color the text green if it is correct based on split text and globalCurrentWordIndex
        const combinedLength = splitText.slice(0, globalCurrentWordIndex).reduce((totalLength, word) => totalLength + word.length, 0);
        quill.formatText(0, combinedLength, 'color', '#5ee04a');

    }, [globalCurrentWordIndex]);

    return (
        <ReactQuill className="text-summary" theme="snow" defaultValue={text ?? ""} ref={quillRef} modules={{toolbar: false}} readOnly={true}/>
    );
}

export default TextSummary;