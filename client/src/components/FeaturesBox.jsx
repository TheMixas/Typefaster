import './SCSS/features_box.scss'
import FeatureCard from "./FeatureCard";
export default function FeaturesBox(){
    return(
        <div className={"features-box"}>
            <div className="features-box__content">
                <div className="features-box__content__text-box">
                    <span className={"features-box__content__text-box--text1"}>Pick a lobby.</span>
                    <span className={"features-box__content__text-box--text2"}>Start typing.</span>
                </div>
                <div className="features-box__content__feature-box">
                    <FeatureCard header={"Live races"} subheader={"Everyone's progress updates as they type, so you can see who's ahead the whole time."}/>
                    <FeatureCard header={"Pick the text"} subheader={"Before each race the lobby votes on a category: classic lines, psychology, programming quotes or space."}/>
                    <FeatureCard header={"Profiles"} subheader={"Log in and your past races and WPM are saved to your profile."}/>

                </div>

            </div>
        </div>
    )
}