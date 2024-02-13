import './SCSS/join_friend_redirect.scss'
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect} from "react";
import {GameContext} from "../../contexts/GameContext";
export default function JoinFriendRedirect({}){
    //use params
    const {roomCode} = useParams()
    const {gameID, setGameID} = useContext(GameContext)
    const navigate = useNavigate()
    useEffect(() => {
        console.log("JoinFriendRedirect.jsx: Room code: ", roomCode)
        //set game id
        setGameID(roomCode)
        //go to game arena
        navigate('/battlefield/custom')
    }, []);
}