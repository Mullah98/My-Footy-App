import { useState } from "react"
import "../styling/playersSearchForm.css"
import Image from "next/image"

export default function PlayersSearchForm({ query, setQuery, league, setLeague, playersData }) {
    const [selectPlayer, setSelectPlayer] = useState(null)
    const [isClicked, setIsClicked] = useState(false)

    const handleSearchQuery = (e) => {
        setQuery(e.target.value)
    }

    const handleDropdown = (e) => {
        setLeague(e.target.value)
    }

    const filterNames = (playersData) => {
        if (!playersData) {
            return []
        }
        return playersData
    }

    const handleClick = (player) => {
        setSelectPlayer(player)
        setIsClicked(true)
        setQuery('')
    }

    const playersList = filterNames(playersData);
    
    console.log(selectPlayer);
    
    

    return (
        <div className="form-container">
            <div className="players-form">
                <select value={league} onChange={handleDropdown}>
                <option value={39}>Premier League</option>
                <option value={61}>Ligue 1</option>
                <option value={78}>Bundesliga</option>
                <option value={135}>Seria A</option>
                <option value={140}>La Liga</option>
                </select>

                <input 
                type="text" 
                value={query} 
                onChange={handleSearchQuery} 
                placeholder="search for player...">
                </input>
                {playersList && Array.isArray(playersList) && (
                    <ul className="form-ul">
                        {playersList.map((player, i) => (
                            <li key={player.id || i} className="form-li" onClick={() => handleClick(player)}>
                            <Image src={player.statistics[0].team.logo} 
                            alt="logo for club" 
                            height={50} 
                            width={50} 
                            priority={true} />
                            <span className="player-name">
                            {player.player.name}
                            </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}