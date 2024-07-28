"use client";

import { useEffect, useState } from "react";
import { getAllLeagues } from "@/utils/apiFootball";

export default function Leagues() {
    const [leagues, setLeagues] = useState([])
    const countries = ['England', 'Spain', 'France', 'Germany', 'Italy']
    const nameOfLeague = ['Premier League', 'La Liga', 'Ligue 1', 'Bundesliga', 'Serie A']

    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                const leaguesData = await getAllLeagues();
                filterLeagues(leaguesData)
                console.log(leagues);
                // const premierLeague = leaguesData
            } catch (error) {
                console.log('Error fetching leagues', error);
            }
        };
        fetchLeagues();
    }, []);

    const filterLeagues = (leaguesData) => {
        const filterByCountry = leaguesData.filter(league => countries.includes(league.country.name));
        const filterByLeague = filterByCountry.filter(country => nameOfLeague.includes(country.league.name));
        setLeagues(filterByLeague)
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

