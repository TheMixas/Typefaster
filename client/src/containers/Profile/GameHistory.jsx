import './SCSS/game_history.scss'
import icon from './../../images/mascot-1024.png'
const ordinal = (n) => {
    const s = ['th', 'st', 'nd', 'rd'], v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export default function GameHistory({games=[{
    theme: "Default",
    position: 1,
    wpm: 100,

},{
    theme: "Default",
    position: 1,
    wpm: 100,

},{
    theme: "Default",
    position: 1,
    wpm: 100,

},{
    theme: "Default",
    position: 1,
    wpm: 100,

},{
    theme: "Default",
    position: 1,
    wpm: 100,

},{
    theme: "Default",
    position: 1,
    wpm: 100,

},{
    theme: "Default",
    position: 1,
    wpm: 100,

},{
    theme: "Default",
    position: 1,
    wpm: 100,

},{
    theme: "Default",
    position: 1,
    wpm: 100,

},{
    theme: "Default",
    position: 1,
    wpm: 100,

},{
    theme: "Default",
    position: 1,
    wpm: 100,

},]}) {
    return(
        <div className="game-history">
            <div className="game-history__title">
                <span className="white-tall">Game History</span>
            </div>
            <div className="game-history__games">
                {
                    games.map((game, index) => {
                        return(
                            <div key={index} className="game-history__games__game">
                                <img src={`${icon}`} alt="" className="game-history__games__game--icon"/>
                                <span className="white-tall game-history__games__game--theme">{game.theme}</span>
                                <span className="white-tall game-history__games__game--position">{ordinal(game.position)}</span>
                                <span className="white-tall game-history__games__game--wpm">{Math.round(game.wpm)} WPM</span>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}