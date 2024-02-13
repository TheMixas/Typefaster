import './SCSS/theme_vote_button.scss'
import {useContext, useEffect, useState} from "react";
import {GameContext} from "../contexts/GameContext";
import check_circle from './../images/svgs/check_circle_green.svg'
import empty_circle from './../images/svgs/empty_circle.svg'
import {handleReceiveUpdatedVotes, handleVote} from "../sockets/voting.socket";

export default function ThemeVoteButton({themeName="Default", socket=null}){
    const {isPrivateLobby,playerChosenTheme,setPlayerChosenTheme,themeVotes} =useContext(GameContext)
    const [voted, setVoted] = useState(false)
    useEffect(() => {
        if(playerChosenTheme === themeName){
            setVoted(true)
        }else setVoted(false)
    }, [playerChosenTheme]);
    return(
        <div
            className="theme-vote-button"
            onClick={() => {
                handleVote(socket,themeName,setPlayerChosenTheme)
            }}
        >
            <span className="theme-vote-button--vote-count white-medium--thin">{themeVotes[themeName] ?? ""}</span>
            <span className="theme-vote-button--theme-name white-medium--thin">{themeName}</span>
            <img src={voted ? check_circle : empty_circle} className="theme-vote-button--vote-status"/>
        </div>
    )
}