import './SCSS/feature_card.scss'
import mascot from './../images/mascot-1024.png'
export default function FeatureCard({header="Feature", subheader="ipsum rerum natus fugit ex minima voluptas ratione quaerat. Ea!"}){
    return(
        <div className={"feature-card"}>
            <div className="feature-card__header">
                <span className={"feature-card__header--text"}>{header}</span>
                <img src={mascot} alt="" className="feature-card__header--img"/>
            </div>
            <div className="feature-card__subheader">
                <span className="feature-card__subheader--text">{subheader}</span>
            </div>

        </div>
    )
}