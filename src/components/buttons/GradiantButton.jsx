import './SCSS/gradiant_button.scss'
export default function GradiantButton({text="Sign in", onClick=()=>{}, customClass}) {
    return(
        <div onClick={()=>{
            onClick()
        }} className={`gradiant-button ${customClass}`}>
            {text}
        </div>
    )
}