import { getTrophies } from "@/utils/apiFootball";
import { useQuery } from "react-query";
import "../styling/trophies.css"

export default function Trophies({playerId}) {

    const { data: trophiesData, isLoading } = useQuery(['trophies', playerId], () => getTrophies(playerId), {
        staleTime: 1000 * 60 * 60,
        cacheTime: 1000 * 60 * 60 * 24
    })
    const filterTrophies = (trophyData) => {
        if (!trophyData) {
            return []
        }
        const winningTrophies = trophyData.filter(trophy => trophy.place === 'Winner') // Only show the 1st place trophies

        return winningTrophies.reduce((acc, trophy) => {
            const existingTrophy = acc.find(t => t.league === trophy.league)
            if (existingTrophy) {  // If the player has won the same trophy more than once, push the season to existing trophy's array
                existingTrophy.season.push(trophy.season)
            } else { // Else, create a new trophy array with the league name, country and the season
                acc.push({
                    league: trophy.league,
                    country: trophy.country,
                    season: [trophy.season]
                })
            }
            return acc
        }, [])
    }

    const allTrophies = filterTrophies(trophiesData)

    return (
        <div className="trophies-container">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                allTrophies && Array.isArray(allTrophies) && (
                allTrophies.map((trophy, i) => (
                    <div className="box" key={i}>
                    <div className="trophy-info">
                    <h3 className="trophy-count">{trophy.season.length}</h3>
                    <h3 className="trophy-name">{trophy.league}</h3>
                    </div>
                    <ul>
                    {trophy.season.map((season, i) => (
                        <li key={i}><span>({season})</span></li>
                    ))}
                    </ul>
                    </div>
                ))
            ))}
        </div>
    )   
}