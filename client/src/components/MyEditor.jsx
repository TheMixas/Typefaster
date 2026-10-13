import React, {useEffect, useRef, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {ChopSentence} from "../utils/text-utils";
import {GameContext} from "../contexts/GameContext"; // import styles
import './SCSS/editor.scss'

// Quill turns "- " or "1. " at the start of a line into a list, which made words
// starting with "-" impossible to type.
const editorModules = {
    toolbar: false,
    keyboard: {bindings: {'list autofill': null}},
};

function MyEditor() {
    let backgroundColor = '#353a4b';
    const quillRef = useRef(); // Create a ref to store the Quill instance
    // const correctText = 'The correct text goes here';
    const {setGlobalCurrentWordIndex, globalCurrentWordIndex, setCanType,canType,gameText,setMistakes,mistakes} = React.useContext(GameContext);

    //Array to store the correct text split into words
    const [splitCorrectText, setSplitCorrectText] = useState(()=>{
        console.log("MyEditor.jsx: setting split text on rerender: gameText:",gameText);
        return ChopSentence(gameText) ?? []
    });
    //int index holdss the index of the current word that the player is typing

    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [editorBackground, setEditorBackground] = useState(backgroundColor); // Add this line

    // const handleMistake = (mistake) => {
    //     console.log("MyEditor.jsx: handleMistake: ",mistake);
    //     setMistakes(prevMistakes => {
    //         console.log("MyEditor.jsx: handleMistake: mistakes: ",prevMistakes);
    //
    //         console.log("MyEditor.jsx: handleMistake: splitCorrectText[currentWordIndex]: ",splitCorrectText[currentWordIndex]);
    //
    //         // Create a new object based on the previous mistakes
    //         let newMistakes = {...prevMistakes};
    //
    //         if(newMistakes[splitCorrectText[currentWordIndex]] === undefined){
    //             newMistakes[splitCorrectText[currentWordIndex]] = [];
    //         }
    //         newMistakes[splitCorrectText[currentWordIndex]].push(mistake);
    //         return newMistakes;
    //     });
    // }
    useEffect(() => {
        console.log("MyEditor.jsx: gameText: ",gameText);
        setSplitCorrectText(ChopSentence(gameText));
    }, [gameText]);
    useEffect(() => {
        const quill = quillRef.current.getEditor(); // Get the Quill instance
        if(!canType){
            quill.disable();
            quill.setText("");
            setEditorBackground(backgroundColor)
        }else{
            quill.enable();
            quill.focus();
        }
    }, [canType]);
    // A new game resets the global index to 0, so reset the local one too
    // (the text can be the same as last round, so gameText alone isn't enough).
    useEffect(() => {
        if (globalCurrentWordIndex === 0) setCurrentWordIndex(0);
    }, [globalCurrentWordIndex]);

    useEffect(() => {
        if (splitCorrectText.length > 0 && currentWordIndex >= splitCorrectText.length) {
            setCanType(false);
        }
    }, [currentWordIndex, splitCorrectText]);

    useEffect(() => {
        const quill = quillRef.current.getEditor(); // Get the Quill instance
        quill.focus();

        const handleTextChange = (delta, oldDelta, source) => {
            if (source !== 'user') return; // If the change was triggered by Quill's API, ignore it
            const word = splitCorrectText[currentWordIndex];
            if (word === undefined) return;

            // getText() always ends with a newline, so drop it
            const typed = quill.getText().slice(0, -1);

            // Red background while what's typed isn't a prefix of the current word
            setEditorBackground(word.startsWith(typed) ? backgroundColor : 'red');

            if (typed === word) {
                const next = currentWordIndex + 1;
                setCurrentWordIndex(next);
                setGlobalCurrentWordIndex(next);
                quill.deleteText(0, typed.length);
            }
        };

        quill.on('text-change', handleTextChange);
        // Remove this handler before the next one is added. Without this, old handlers
        // with an old word index kept running and a repeated word (e.g. "his") sent
        // progress backwards.
        return () => quill.off('text-change', handleTextChange);
    }, [splitCorrectText, currentWordIndex]);

    return (
        <ReactQuill
                    ref={quillRef}
                    className={"editor"}
                    modules={editorModules}
                    style={{backgroundColor: editorBackground}}

        />
    );
}

export default MyEditor;