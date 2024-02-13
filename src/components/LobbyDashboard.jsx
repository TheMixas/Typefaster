import './SCSS/lobby_dashboard.scss'
import React, {useContext, useState} from 'react'
import {GameContext} from "../contexts/GameContext";
export default function LobbyDashboard({items = [<h4>Hello</h4>]}){
    const {gameState} = useContext(GameContext)
    // If gameState doesnt equals 'WaitingState', do not render LobbyDashboard

    if (gameState !== 'ThemeSelectionState') {
        return null;
    }
    return(
        <div className="lobby-dashboard">
            {
                items.map((item,index) => {
                    return(
                        <div key={index} className="lobby-dashboard__item">
                            {item}
                        </div>
                    )
                })
            }
        </div>
    )
}