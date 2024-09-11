import { getTrophies } from "@/utils/apiFootball";
import { useState } from "react";
import { useQuery } from "react-query";
import "../styling/trophies.css"


export default function Trophies({playerId}) {

    const { data: trophiesData, isLoading } = useQuery(['trophies', playerId], () => getTrophies(playerId), {
        cacheTime: Infinity,
        staleTime: Infinity
    })

    const filterTrophies = (trophyData) => {
        if (!trophyData) {
            return []
        }

        const winningTrophies = trophyData.filter(trophy => trophy.place === 'Winner')
        return winningTrophies.reduce((acc, trophy) => {
            const existingTrophy = acc.find(t => t.league === trophy.league)

            if (existingTrophy) {
                existingTrophy.season.push(trophy.season)
            } else {
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
            {allTrophies && Array.isArray(allTrophies) && (
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
            )}
        </div>
    )   
}