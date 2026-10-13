import './SCSS/home_page.scss'
import HeroMoving from "../../components/HeroMoving";
import FeaturesBox from "../../components/FeaturesBox";
import './../../styles/margins.scss'
import PrimaryInfoContainer from "../../components/InfoContainers/PrimaryInfoContainer";
import {useNavigate} from "react-router-dom";
export default function HomePage(){
    const navigate = useNavigate()
    return(
        <div className={"home-page"}>
            <HeroMoving/>
            <PrimaryInfoContainer
                text={"Real-time typing races in the browser. Join a lobby, vote on what to type and race whoever else is in it."}
                buttonTitle={"Race Now!"}
                customClass={'margin-half-screen-top width-80-rem margin-left-10-rem'}
                _onClick={()=>{
                    navigate('/battlefield/quick')
                }}
            />
            <FeaturesBox/>
        </div>
    )
}