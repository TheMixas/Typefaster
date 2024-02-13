import './SCSS/hero_moving_bg.scss'
import '../styles/typography.scss'
import mascot from './../images/mascot-1024.png'
import {createRef, useEffect} from "react";
import EncryptButton from "./buttons/EncryptButton";
import PrimaryInfoContainer from "./InfoContainers/PrimaryInfoContainer";
export default function HeroMoving({topText="TYPE FASTER", middleText="ACCELERATE", bottomText="IMPROVE", middleTextCustomClass=""}){
    //A hero moving bg has a background of text that is moving in a certain direction
    //The text is moving in a certain direction
    let text1Ref = createRef();
    let text2Ref = createRef();
    let pos =0;

    useEffect(() => {
        const interval = setInterval(() => {
            console.log('This will run every 1/10 s!');
            let max_pos = 100;

            let text1 = text1Ref.current;
            let text2 = text2Ref.current;
            if(text1 && text2){
            }
            pos++;
            if(pos > max_pos){
                pos = 0;
            }

        }, 10);
        return () => clearInterval(interval);
    }, []);
    return(
        <div className={"hero-moving"}>
            <div className="hero-moving__bg-text">
                <div className={"hero-moving__bg-text__line hero-moving__bg-text__line--1"}>
                    <span className={"hero-moving__bg-text__line__text"}>{`${topText} ${topText} ${topText}`}</span>
                    <span ref={text2Ref} className={"hero-moving__bg-text__line__text"}>TYPE FASTER</span>
                </div>
                <div className={"hero-moving__bg-text__line hero-moving__bg-text__line--2"}>
                    <img className={"hero-moving__bg-text__line__img"} src={mascot} alt=""/>
                    <span className={`hero-moving__bg-text__line__text ${middleTextCustomClass}`}>{middleText}</span>
                    <img className={"hero-moving__bg-text__line__img"} src={mascot} alt=""/>
                </div>
                <div className={"hero-moving__bg-text__line hero-moving__bg-text__line--3"}>
                    <span className={"hero-moving__bg-text__line__text"}>{`${bottomText} ${bottomText} ${bottomText}`}</span>
                    <span className={"hero-moving__bg-text__line__text"}>{`${bottomText}`}</span>
                </div>
            </div>
        </div>
    )
}