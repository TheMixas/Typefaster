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
                    <div className="footer__row-1__links-box--link">About</div>
                    <div className="footer__row-1__links-box--link">Contact</div>
                    <div className="footer__row-1__links-box--link">Privacy Policy</div>
                    <div className="footer__row-1__links-box--link">Terms of Service</div>
                </div>
            </div>
            <div className="footer--line"></div>
            <div className="footer__row-2">
                <span className="footer__row-2--copyrights">
                    &copy; 2021 TypeFaster
                </span>
                <div className="footer__row-2__social-media-box">
                    <div className="footer__row-2__social-media-box--icon">
                        <TfiGithub className="footer__row-2__social-media-box--icon" />
                    </div>
                    <div className="footer__row-2__social-media-box--icon">
                        <TfiGithub className="footer__row-2__social-media-box--icon" />
                    </div>
                    <div className="footer__row-2__social-media-box--icon">
                        <TfiGithub className="footer__row-2__social-media-box--icon" />
                    </div>
                    <div className="footer__row-2__social-media-box--icon">
                        <TfiGithub className="footer__row-2__social-media-box--icon" />
                    </div>
                </div>
            </div>
        </div>
    )
}