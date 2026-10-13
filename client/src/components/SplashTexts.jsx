import './SCSS/splash_texts.scss'
import {useContext, useEffect, useState} from "react";
import {GameContext} from "../contexts/GameContext";
const WAITING_SUBTITLE = ''
const seconds = (n) => `${n} second${n === 1 ? '' : 's'}`

export default function SplashTexts({}) {
    const [title,setTitle] = useState('Waiting for players...')
    const [subtitle,setSubtitle] = useState(WAITING_SUBTITLE)
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
                setSubtitle(WAITING_SUBTITLE)
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
        setSubtitle(`Voting ends in ${seconds(themeVotingTime)}...`)
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
                setSubtitle(`Voting ends in ${seconds(prevCountdown)}...`)
                return prevCountdown - 1;
            })
        }, 1000))
    }
    //return nothign if not enabled

    const handleCountdown = () => {
        setCountdown(countdownTime-1)
        setTitle(`Game starts in ${seconds(countdownTime)}...`)
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
                setTitle(`Game starts in ${seconds(prevCountdown)}...`)
                return prevCountdown - 1;
            })
        }, 1000))
    }
    //transition from finished to lobby
    const handleTransitionCountdown = () => {
        setCountdown(finishedToLobbyTime-1)
        setTitle('Well done!')
        setSubtitle(`Next race in ${seconds(finishedToLobbyTime)}...`)
        //every second, decrease the countdown by 1
        setSplashInterval(setInterval(() => {
            //decrease the countdown by 1
            setCountdown(prevCountdown => {
                //if countdown is 0, stop the countdown
                if (prevCountdown === 0) {
                    clearInterval(interval)
                    return prevCountdown;
                }
                setSubtitle(`Next race in ${seconds(prevCountdown)}...`)
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