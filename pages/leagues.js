'use client';

import { useQuery } from "react-query";
import { getAllLeagues } from "@/utils/apiFootball";
import Image from 'next/image'
import '../pages/styling/leagues.css'

export default function Leagues({ handleSelectedLeague }) {
    const countries = ['England', 'Spain', 'France', 'Germany', 'Italy']
    const nameOfLeague = ['Premier League', 'La Liga', 'Ligue 1', 'Bundesliga', 'Serie A']

    const { data: leaguesData, error, isLoading, dataUpdatedAt } = useQuery('leagues', getAllLeagues, {
        staleTime: 1000 * 60 * 60,
        cacheTime: 1000 * 60 * 60 * 24,
        onSettled: (data, error) => {
            const now = Date.now()
            const oneMin = 1000 * 60
            if (now - dataUpdatedAt < oneMin) {
                console.log("Fetching data from API");
            } else {
                console.log("Using cached data");
            }
        }
    });

    const filterLeagues = (leaguesData) => {
        if (!leaguesData) {
            return []
        }
        const filterByCountry = leaguesData.filter(league => countries.includes(league.country.name))        
        const filterByLeague = filterByCountry.filter(league => nameOfLeague.includes(league.league.name))
              
        return filterByLeague
    }

    const leagues = filterLeagues(leaguesData)


    if (error) {
        return (
            <h1>Error occured...</h1>
        )
    }

    return (
        <>
        <div className="leagues-container">
            <ul>
                {Array.isArray(leagues) && leagues.map((item, i) => (
                    <li key={i} className={handleSelectedLeague ? '' : 'selectedButton'}>
                    <button onClick={() => handleSelectedLeague(item.league.id)}>
                    <Image src={item.league.logo} alt="icons for leagues" height={100} width={100} />
                    </button>
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
}

