import './SCSS/secondary_input_container.scss'
import './../../styles/grids.scss'
import './../../styles/widths.scss'

import EncryptButton from "../buttons/EncryptButton";

export default function SecondaryInputContainer({customClass= "", title="TYPEFASTER", buttonTitle='ACT!',
                                                    inputPlaceholder="Type here", _onChange=()=>{},_onClick=()=>{}}){
    //Custom class will be used to add stuff like margin, according to the parent component
    return (
        <div className={`secondary-input-container ${customClass}`}>
            <span className="secondary-input-container--heading">{title}</span>
            <p className="secondary-input-container--paragraph">Race Against Time: Unleash Your Typing Fury in this
                Futuristic Typeracer Clone! Test Your Speed, Conquer Challenges, and Triumph Digitally!</p>
            <input
                onChange={_onChange}
                placeholder={inputPlaceholder}
                style={{marginBottom:"1rem"}}
                type="text"
                className="secondary-input-container--input"
            />
            <EncryptButton
                customClass={'width-100-procent secondary-color-light-bg'}
                buttonText={buttonTitle}
                _onClick={_onClick}
            />
        </div>
    )
}