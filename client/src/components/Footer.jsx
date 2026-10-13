import './SCSS/footer.scss'
import mascot from './../images/mascot-1024.png'
import { TfiGithub } from "react-icons/tfi";
export default function Footer(){
    return(
        <div className={"footer"}>
            <div className="footer__row-1">
                <div className="footer__row-1__logo-box">
                    <img src={mascot} alt="logo" className="footer__row-1__logo-box--img"/>
                    <span className="footer__row-1__logo-box--text">TYPEFASTER</span>
                </div>
                <div className="footer__row-1__links-box">
                    <a className="footer__row-1__links-box--link" href="https://github.com/TheMixas/Typefaster">Source code</a>
                </div>
            </div>
            <div className="footer--line"></div>
            <div className="footer__row-2">
                <span className="footer__row-2--copyrights">
                    Made by Gustas Rove
                </span>
                <a className="footer__row-2__social-media-box" href="https://github.com/TheMixas" aria-label="GitHub">
                    <TfiGithub className="footer__row-2__social-media-box--icon" />
                </a>
            </div>
        </div>
    )
}