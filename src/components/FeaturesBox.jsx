import './SCSS/features_box.scss'
import FeatureCard from "./FeatureCard";
export default function FeaturesBox(){
    return(
        <div className={"features-box"}>
            <div className="features-box__content">
                <div className="features-box__content__text-box">
                    <span className={"features-box__content__text-box--text1"}>We're good.</span>
                    <span className={"features-box__content__text-box--text2"}>Here's why.</span>
                </div>
                <div className="features-box__content__feature-box">
                    <FeatureCard header={"Real-Time Races"} subheader={"Engage in thrilling real-time typing races against players from around the world. Test and enhance your typing skills in an exciting multiplayer competition."}/>
                    <FeatureCard header={"Choosable Themes"} subheader={"Tailor the gaming experience to your preferences! Choose from a variety of customizable game settings, including themes."}/>
                    <FeatureCard header={"Cool Leaderboards"} subheader={"Build your typing legacy with dynamic player profiles! Track your progress and compete for a coveted spot on the leaderboards. Rise to the top and become the ultimate typing champion!"}/>

                </div>

            </div>
        </div>
    )
}