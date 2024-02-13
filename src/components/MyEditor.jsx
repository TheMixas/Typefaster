import React, {useEffect, useRef, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {ChopSentence} from "../utils/text-utils";
import {GameContext} from "../contexts/GameContext"; // import styles
import './SCSS/editor.scss'

function MyEditor() {
    let backgroundColor = '#353a4b';
    const quillRef = useRef(); // Create a ref to store the Quill instance
    // const correctText = 'The correct text goes here';
    const {setGlobalCurrentWordIndex, setCanType,canType,gameText,setMistakes,mistakes} = React.useContext(GameContext);

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
    useEffect(() => {

        const quill = quillRef.current.getEditor(); // Get the Quill instance\
        quill.focus();
        quill.on('text-change', function(delta, oldDelta, source) {
            if (source !== 'user') return; // If the change was triggered by Quill's API, ignore it
            const text = quill.getText();
            let foundMistake = false;
            for (let i = 0; i < text.length-1; i++) {
                console.log("MyEditor.jsx: current word to type: ",splitCorrectText[currentWordIndex])
                //Check if the current character is a mistake

                console.log("MyEditor.jsx: Current character being checked (i): ", i, " | Current character in text:|", text[i], "| Corresponding character in correct word:|", splitCorrectText[currentWordIndex][i],"| Current wordIndex: ",currentWordIndex,"| Current word to type: ",splitCorrectText[currentWordIndex],"|");

                if (text[i] !== splitCorrectText[currentWordIndex][i]) {
                    console.log("MyEditor.jsx: mistake found")
                    // quill.formatText(i, text.length - i, 'background', '#a61111');
                    //change input box to red
                    foundMistake = true;
                    setEditorBackground('red'); // Add this line
                }
                //Check if last character contains a mistake
                // console.log("MyEditor.jsx: checking if last character contains a mistrake")
                // console.log("MyEditor.jsx: checking last character, i: ",i," text.length-1: ",text.length-1," text[i]: ",text[i]," splitCorrectText[currentWordIndex][i]: ",splitCorrectText[currentWordIndex][i])
                // if(i === text.length-2 && text[i] !== splitCorrectText[currentWordIndex][i]){
                //     handleMistake(text[i]);
                // }
            }
            if(!foundMistake){
                setEditorBackground(backgroundColor); // Add this line
            }

            //check if currentText = splitCorrectText[index]

            if(splitCorrectText[currentWordIndex] === undefined){
                return;
            }

            //Slices off the last character of the text because getText() adds a newline character at the end
            // console.log("MyEditor.jsx: Current text in the editor sliced by 1:", text.slice(0, -1), "|Current word to be typed:", splitCorrectText[currentWordIndex],"|");

            // console.log("MyEditor.jsx: Current text equals current word to be typed:", text.slice(0, -1) === splitCorrectText[currentWordIndex]);

            if(text.slice(0, -1) === splitCorrectText[currentWordIndex]){
                // console.log("MyEditor.jsx: Correct word typed");
                //set local current word index to be used in this component
                setCurrentWordIndex(()=>{
                    //set global current word index to be used in other components
                    setGlobalCurrentWordIndex(currentWordIndex + 1 );
                    return currentWordIndex + 1});


                // delete .length-1 to keep focus on the editor
                quill.deleteText(0, text.length-1);
            }
            if(currentWordIndex === splitCorrectText.length){
                setCanType(false);
            }

        });
    }, [splitCorrectText, currentWordIndex]);

    return (
        <ReactQuill
                    ref={quillRef}
                    className={"editor"}
                    modules={{ toolbar: false }}
                    style={{backgroundColor: editorBackground}}

        />
    );
}

export default MyEditor;