import './SCSS/copy_game_code.scss'
export default function CopyGameLink({gameID}) {
    const handleCopyGameLink = () => {
        //copy game code to clipboard
        navigator.clipboard.writeText(`${process.env.REACT_APP_SERVER_URL}/join-friend/${gameID}`).then(r =>
            //note: turn into a toast
            alert("Game link copied to clipboard")
        )
    }
    return (
        <div className="copy-game-code">
            <h1
                onClick={handleCopyGameLink}
                className="copy-game-code--code">{`Game Joining Code: ${gameID}`}</h1>
            <button onClick={handleCopyGameLink} className="copy-game-code__button">Copy Game Code</button>
        </div>
    )
}