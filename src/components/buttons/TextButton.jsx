import './SCSS/text_button.scss'
export default function TextButton({text="Sign in", onClick, classes}) {
    return(
        <span onClick={()=>{
            onClick()
        }} className={`text-button ${classes}`}>
            {text}
        </span>
    )
}