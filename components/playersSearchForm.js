import { useState } from "react"

export default function PlayersSearchForm() {
    const [query, setQuery] = useState('')
    const [league, setLeague] = useState('')

    const handleSearchQuery = (e) => {
        setQuery(e.target.value)
    }

    const handleDropdown = (e) => {
        setLeague(e.target.value)
    }

    console.log('Set league as...', league);
    console.log('Player--->', query)
    

    return (
        <div className="form-container">
            <form>
                <select value={league} onChange={handleDropdown}>
                <option value={39}>Premier League</option>
                <option value={61}>Ligue 1</option>
                <option value={78}>Bundesliga</option>
                <option value={135}>Seria A</option>
                <option value={140}>La Liga</option>
                </select>

                <input type="text" 
                value={query} 
                onChange={handleSearchQuery} 
                placeholder="search for player...">
                </input>
            </form>
        </div>
    )
}