//let lastCorrectCharIndex = -1;
//             //This for loop colors the text red if it is incorrect
//             for (let i = 0; i < text.length; i++) {
//                 if (text[i] !== splitCorrectText[currentWordIndex][i]) {
//                     // quill.formatText(i, text.length - i, 'background', '#a61111');
//                     //change input box to red
//                     setEditorBackground('red'); // Add this line
//                     break;
//                 } else {
//                     lastCorrectCharIndex = i;
//                     // quill.removeFormat(i, 1, 'background');
//                 }
//             }
//             if (lastCorrectCharIndex + 1 < text.length) {
//                 quill.formatText(lastCorrectCharIndex + 1, text.length - lastCorrectCharIndex - 1, 'background', 'red');
//             }