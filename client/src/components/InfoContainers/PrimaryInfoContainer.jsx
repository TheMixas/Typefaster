import './SCSS/primary_info_container.scss'
import EncryptButton from "../buttons/EncryptButton";
export default function PrimaryInfoContainer({customClass= "", title="TYPEFASTER", text="", buttonTitle='ACT!', _onClick=()=>{}}){
    //Custom class will be used to add stuff like margin, according to the parent component
    return (
        <div className={`primary-info-container ${customClass}`}>
            <span className="primary-info-container--heading">{title}</span>
            <p className="primary-info-container--paragraph">{text}</p>
            <EncryptButton buttonText={buttonTitle} _onClick={_onClick}/>
        </div>
    )
}