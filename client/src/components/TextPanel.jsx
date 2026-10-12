import './SCSS/text_panel.scss'
import TextSummary from "./TextSummary";
import MyEditor from "./MyEditor";
import './../styles/text-editor.scss'
import {useContext, useEffect} from "react";
import {GameContext} from "../contexts/GameContext";
export default function TextPanel({}) {
    const {gameState, gameText} = useContext(GameContext)

    useEffect(() => {
        console.log("TextPanel.jsx: gameText: ",gameText);
    }, [gameText]);

    // If gameState doesnt equals 'InProgressState', do not render this
    if (gameState !== 'InProgressState') {
        return null;
    }
    return (
        <div className="text-panel">
            <TextSummary/>
            <MyEditor/>
        </div>
    )
}