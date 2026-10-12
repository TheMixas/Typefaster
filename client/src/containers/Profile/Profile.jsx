import './SCSS/profile.scss'
import HeroMoving from "../../components/HeroMoving";
import {Chart} from "react-google-charts";
import GameHistory from "./GameHistory";
import './../../styles/typography.scss'
import {useEffect, useState} from "react";
import {IsLoggedIn} from "../../utils/validation-utils";
import {GetProfile} from "../../utils/http/profile.http";
import {useParams} from "react-router-dom";
import {GetUsername} from "../../utils/auth-utils";

export default function Profile({}) {
    let graphOptions={
        is3D: true,
            legend: 'none',
            backgroundColor: 'transparent',
    }

    //get username from params
    let {username} = useParams();
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        const fetchProfileData = async () => {
            console.log("Profile Page, isauthenticated:", IsLoggedIn());
            //fetch profile data
            if(!username){
                if(GetUsername()){
                    username = GetUsername();
                }
                else{
                    window.location.href = "/";
                }
            }
            const profileDataResponse = await GetProfile(username).catch((err) => {
                console.log("Error fetching profile data:", err);
                window.location.href = "/";
            });
            if(profileDataResponse.status !== 200){
                window.location.href = "/";
            }
            console.log("Profile Data:", profileDataResponse.data);
            setProfileData(profileDataResponse.data);
        };

        fetchProfileData();
    }, []);
  return (
    <div className="profile">
      <HeroMoving
        topText={"PROFILE"}
        middleText={"YOUR USERNAME"}
        bottomText={"STAY FLASHY"}
          middleTextCustomClass={"special-text--1"}/>
        <div className="profile__body">
            <div className="profile__body__overview">
                <span className="profile__body__overview--title white-tall">{`WPM: `}<span
                    className={"secondary-bold"}>{`${profileData.wpm}`}</span></span>
                <span className="profile__body__overview--title white-tall">{`WinRate: `}<span
                    className={"secondary-bold"}>{`${Math.round(Number(profileData.winRate))}%`}</span></span>

                <span className="profile__body__overview--title white-tall">Fav. Genre: <span
                    className={"secondary-bold"}>{`${profileData.favGenre}`}</span></span>

            </div>
            <div className="profile__body__main">
                <div className="profile__body__main__winrate-box profile__body__main__winrate-box--public">
                    <span className="white-tall profile__body__main__winrate-box--title">Public Winrate</span>
                    <div className="profile__body__main__winrate-box--graph">
                        <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Winrate', 'Percentage'],
                                ['Wins', profileData.wins ?? 0],
                                ['Losses', profileData.totalGames- profileData.wins ?? 0],
                            ]}
                            options={{...graphOptions, colors: ['#40a611', '#becbf8']}}

                            rootProps={{'data-testid': '1'}}/>
                    </div>
                </div>
                <div className="profile__body__main__winrate-box profile__body__main__winrate-box--private">
                    <span className="white-tall profile__body__main__winrate-box--title">Private Winrate</span>
                    <div className="profile__body__main__winrate-box--graph">
                        <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Genre', 'Times played'],
                                ...profileData.genreDistribution ?? []
                            ]}
                            options={graphOptions}

                            rootProps={{'data-testid': '1'}}/>
                    </div>

                </div>
                <GameHistory games={profileData.playerGames ?? []}/>
            </div>
        </div>


    </div>
  )
}