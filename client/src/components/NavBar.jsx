import './SCSS/navbar.scss'
import {NavLink} from "react-router-dom";
import mascot from './../images/mascot-1024.png'
import GradiantButton from "./buttons/GradiantButton";
import TextButton from "./buttons/TextButton";
import {AuthModalContext} from "../contexts/AuthModalContext";
import {useContext, useState} from "react";
import {IsLoggedIn} from "../utils/validation-utils";
import './../styles/typography.scss'
import {GetUsername} from "../utils/auth-utils";
import {sendLogoutRequest} from "../utils/http/authentication.http";
export default function NavBar() {
    const {toggleAuthPopup} = useContext(AuthModalContext)
    const [isLogged, setIsLogged] = useState(IsLoggedIn())
    const openAuthModal = ()=>{
        toggleAuthPopup()
    }
    return(
        <div className="navbar">
            <div className="navbar__logo-box">
                <img src={mascot} alt="" className="navbar__logo-box--img"/>
            </div>
            <div className="navbar__links">
                <NavLink className="navbar__links--navlink" to={"/"}>Home</NavLink>
                <NavLink className="navbar__links--navlink" to={"/playarea"}>Play area</NavLink>
                <NavLink className="navbar__links--navlink" to={"/profile"}>Profile</NavLink>
            </div>
            <div className="navbar__auth-box">
                {
                    isLogged ?
                        <>
                            {/*Username from local storage*/}
                            <span className="white-tall">{GetUsername()?? 2}</span>
                            <GradiantButton customClass={'red-variant'} text={"Log Out"} onClick={()=>{
                                console.log("Logging out")
                                sendLogoutRequest()
                                localStorage.removeItem("tf_user")
                                setIsLogged(false)

                            }
                            }
                            />
                        </>:
                        <>

                            <TextButton classes={"secondary-bold"} text={"Log in"} onClick={()=>{openAuthModal()}}/>
                            <GradiantButton text={"Sign Up"} onClick={()=>{
                                openAuthModal()
                            }}/>
                        </>
                }

            </div>
        </div>

    )
}