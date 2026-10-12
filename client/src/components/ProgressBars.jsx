import './SCSS/progress_bars.scss'
import PlayerProgressBar from "./PlayerProgressBar";
import {GameContext} from "../contexts/GameContext";
import {createRef, useContext, useEffect, useRef} from "react";
export default function ProgressBars({}) {
    //structure of lobbyPlayers:
    //lobbyPlayers = {
    //  socketid: Player,
    //  socketid: Player,
    //}
    const {lobbyPlayers, player, gameText} = useContext(GameContext)

    useEffect(() => {
        console.log("player progress changed: ", player?.progress)
    }, [player?.progress]);
    return(
        <div
            className="progress-bars">
            <PlayerProgressBar  player={player} maxProgress={gameText?.length}/>
            {

                lobbyPlayers &&
                Object.keys(lobbyPlayers).map((socketid) => {
                    console.log("iterating key, lobyy player: socketid", socketid)
                    return(
                        <div className="progress-container"
                        >
                            <PlayerProgressBar
                                key={socketid}
                                player={lobbyPlayers[socketid]}
                                maxProgress={gameText?.length}
                            />

                        </div>
                    )
                })
            }



        </div>
    )
}