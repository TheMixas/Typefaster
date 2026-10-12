import './SCSS/player_progress.scss'
import mascot from './../images/mascot-1024.png';
import {createRef, useContext, useEffect, useRef, useState} from "react";
import RainbowText from 'react-rainbow-text';
import {GameContext} from "../contexts/GameContext";
//Progress param expects a whole number index of the current word
//For the progress bar , the value will be divided by the total number of words
export default function PlayerProgressBar({player={name:"player1", progress:0, wpm:67}}) {
    //ref of container
    let containerRef = createRef()
    let playerNameSpanRef = createRef()
    let [mascotMarginLeft, setMascotMarginLeft] = useState(0);
    const {gameState, victoriousPlayerID} = useContext(GameContext)

    useEffect(() => {
        if (containerRef.current) {
            console.log(containerRef.current.offsetWidth);
            let marginLeft = containerRef.current.offsetWidth / 100 * ( player.progress / 100 * 90);

            //take away name width
            marginLeft += playerNameSpanRef.current.offsetWidth

            //cap marginLeft at 90% of container width
            if (marginLeft > containerRef.current.offsetWidth * 0.9) {
                marginLeft = containerRef.current.offsetWidth * 0.9
            }
            //center mascot
            marginLeft -= playerNameSpanRef.current.offsetWidth
            setMascotMarginLeft(marginLeft)

        }
    }, [containerRef.current,player])
    return(
        <div  ref={containerRef} className="player-progress">
            <div
                style={{marginLeft:mascotMarginLeft}} className="player-progress__player">
                <span  ref={playerNameSpanRef} className="player-progress__player--name">{player?.name}</span>
                <img className="player-progress__player--mascot"
                     src={mascot} alt={"mascot icon"}
                />
                {/*Only display victory text if gameState == Finishied and playerWon*/}
                {
                    (gameState === 'FinishedState' && victoriousPlayerID === player.socketID) &&
                    <span className="special-text--1">VICTORY</span>
                }
            </div>

            <div className="player-progress__bar-container">
                <progress className="player-progress__bar-container--bar" value={player.progress} max={100}/>;
                <span className="player-progress__bar-container--wpm">{`${Math.round(player.wpm)} WPM`}</span>
            </div>

        </div>
    )
}