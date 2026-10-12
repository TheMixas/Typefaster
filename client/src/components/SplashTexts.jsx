import './SCSS/splash_texts.scss'
import {useContext, useEffect, useState} from "react";
import {GameContext} from "../contexts/GameContext";
export default function SplashTexts({}) {
    const [title,setTitle] = useState('Waiting for players...')
    const [subtitle,setSubtitle] = useState('hi ;)')
    const {gameState, themeVotingTime,countdownTime, finishedToLobbyTime} = useContext(GameContext)
    const [countdown,setCountdown] = useState(10)
    const [enabled,setEnabled] = useState(true)
    const [interval,setSplashInterval] = useState(null)

    useEffect(() => {
        //premature setEnabled for readability
        setEnabled(true)
        switch (gameState) {
            case 'WaitingState':
                setTitle('Waiting for players...')
                setSubtitle('hi ;)')
                break;
            case 'CountDownState':
                //stop inverval
                clearInterval(interval)
                handleCountdown()
                break;
            case 'ThemeSelectionState':
                clearInterval(interval)
                handleThemeVoteCountdown()
                break;
            case 'FinishedState':
                clearInterval(interval)
                handleTransitionCountdown()
                break;
            default:
                setEnabled(false)
                break;
        }
    }, [gameState]);

    const handleThemeVoteCountdown = () => {
        setTitle('Vote for a theme')
        setCountdown(themeVotingTime-1)
        //every second, decrease the countdown by 1
            setSplashInterval(setInterval(() => {
            //decrease the countdown by 1
            setCountdown(prevCountdown => {
                //if countdown is 0, stop the countdown
                if (prevCountdown === 0) {
                    clearInterval(interval)
                    return prevCountdown;
                }
                setSubtitle(`Voting ends in ${prevCountdown} seconds...`)
                return prevCountdown - 1;
            })
        }, 1000))
    }
    //return nothign if not enabled

    const handleCountdown = () => {
        setCountdown(countdownTime-1)
        setSubtitle('Get ready!')
        //every second, decrease the countdown by 1
        setSplashInterval(setInterval(() => {
            //decrease the countdown by 1
            setCountdown(prevCountdown => {
                //if countdown is 0, stop the countdown
                if (prevCountdown === 0) {
                    clearInterval(interval)
                    return prevCountdown;
                }
                setTitle(`Game starts in ${prevCountdown} seconds...`)
                return prevCountdown - 1;
            })
        }, 1000))
    }
    //transition from finished to lobby
    const handleTransitionCountdown = () => {
        setCountdown(finishedToLobbyTime-1)
        setTitle('Well done!')
        //every second, decrease the countdown by 1
        setSplashInterval(setInterval(() => {
            //decrease the countdown by 1
            setCountdown(prevCountdown => {
                //if countdown is 0, stop the countdown
                if (prevCountdown === 0) {
                    clearInterval(interval)
                    return prevCountdown;
                }
                setSubtitle(`The game restarts in ${prevCountdown} seconds...`)
                return prevCountdown - 1;
            })
        }, 1000))

    }

    return (
        <div className={"splash-texts "} style={enabled ? {}: {display:'none'}}>
            <span className="splash-texts--title white-tall">{title}</span>
            <span className="splash-texts--subtitle white-medium--thin">{subtitle}</span>
        </div>
    )
}