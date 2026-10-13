import './SCSS/play_area.scss'
import './../../styles/widths.scss'
import './../../styles/grids.scss'
import HeroMoving from "../../components/HeroMoving";
import PrimaryInfoContainer from "../../components/InfoContainers/PrimaryInfoContainer";
import SecondaryInputContainer from "../../components/InfoContainers/SecondaryInputContainer";
import {GameContext} from "../../contexts/GameContext";
import React, {useContext, useEffect} from 'react';
import {redirect, useNavigate} from "react-router-dom";
export default function PlayAreaPage({}){
    const {setGameID, gameID} = useContext(GameContext)
    const navigate = useNavigate()
    //usefect to check game id changes
    useEffect(() => {
        console.log("Game ID changed to: ", gameID)
    }, [gameID]);
    //Joining existing game
    const handleGameIDInputChanged = (e) => {
        setGameID(e.target.value)
    }
    useEffect(() => {
        console.log("Game ID changed to: ", gameID)
    }, [gameID]);
    //join custom game
    const handleJoinCustomGame = () => {
        //redirect to game page
        console.log("Joining game with ID: ", gameID)
        //go to /'battlefield' in browser
        navigate('/battlefield/custom')
    }
    //join quick game
    const handleJoinQuickGame = () => {
        //redirect to game page
        console.log("Joining quick game")
        //go to /'battlefield' in browser
        navigate('/battlefield/quick')
    }

    const handleCreateCustomGame = () => {
        //redirect to game page
        console.log("Creating custom game")
        //go to /'battlefield' in browser
        navigate('/battlefield/createCustom')
    }

    //------
    return(
        <div className="play-area-page">
            <HeroMoving/>
            <div className="play-area-page__game_modes">
                <PrimaryInfoContainer title={"Quick"} text={"Jump into a public lobby with whoever is online."} buttonTitle={'Race!'} _onClick={handleJoinQuickGame}/>
                <PrimaryInfoContainer title={"Friends"} text={"Make a private lobby and send the code to your friends."} buttonTitle={'Race!'} _onClick={handleCreateCustomGame}/>
                <SecondaryInputContainer
                    customClass={'grid-column-1-to-2'}
                    title={"Join A Game"}
                    text={"Got a code from a friend? Paste it here."}
                    buttonTitle={'Race!'}
                    inputPlaceholder={"Enter Code"}
                    inputType={"text"}
                    _onChange={handleGameIDInputChanged}
                    _onClick={handleJoinCustomGame}
                />
            </div>
        </div>
    )
}