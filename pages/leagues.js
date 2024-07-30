'use client';

import { useQuery } from "react-query";
import { getAllLeagues } from "@/utils/apiFootball";

export default function Leagues() {
    const countries = ['England', 'Spain', 'France', 'Germany', 'Italy']
    const nameOfLeague = ['Premier League', 'La Liga', 'Ligue 1', 'Bundesliga', 'Serie A']

    const { data: leaguesData, error, isLoading } = useQuery('leagues', getAllLeagues, {
        staleTime: 1000 * 60 * 60,
        cacheTime: 1000 * 60 * 24,
    })

    const filterLeagues = (leaguesData) => {
        if (!leaguesData) {
            return []
        }
        const filterByCountry = leaguesData.filter(league => countries.includes(league.country.name))
        const filterByLeague = filterByCountry.filter(league => nameOfLeague.includes(league.league.name))
        console.log(filterByLeague);
        return filterByLeague
    }

    const leagues = filterLeagues(leaguesData)

    if (isLoading) {
        return (
            <h1>Loading contents...</h1>
        )
    }

    if (error) {
        return (
            <h1>Error occured...</h1>
        )
    }

    return (
        <>
            <h2>Leagues</h2>
            <ul>
                {Array.isArray(leagues) && leagues.map((item, i) => (
                    <li key={i}>{item.league.name}</li>
                ))}
            </ul>
        </>
    )
}

