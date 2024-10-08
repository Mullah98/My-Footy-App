'use client';

import { useQuery } from "react-query";
import { getLeagues } from "@/utils/apiFootball";
import Image from 'next/image';
import '../styling/leagues.css';
import { BlinkBlur } from "react-loading-indicators";
import { MdErrorOutline } from "react-icons/md";

export default function Leagues({ handleSelectedLeague }) {
    const countries = ['England', 'Spain', 'France', 'Germany', 'Italy']
    const nameOfLeague = ['Premier League', 'La Liga', 'Ligue 1', 'Bundesliga', 'Serie A']

    const { data: leaguesData, error, isLoading } = useQuery('leagues', getLeagues, {
        staleTime: 1000 * 60 * 60,
        cacheTime: 1000 * 60 * 60 * 24,
    });

    const filterLeagues = (leaguesData) => {
        if (!leaguesData) {
            return []
        }
        const filterByCountry = leaguesData.filter(league => countries.includes(league.country.name))        
        const filterByLeague = filterByCountry.filter(league => nameOfLeague.includes(league.league.name))        
        return filterByLeague
    }

    const leagues = filterLeagues(leaguesData);

    if (error) {
        return <div className="loading">
            <h2>Error fetching data 😟</h2>
            <MdErrorOutline size={30} color="red" />
        </div>
    }

    return (
        <>
        <div className="leagues-container">
            <ul>
                {isLoading ? (
                    <div className="loading">
                    <BlinkBlur 
                    color="#32cd32" 
                    size="medium" />
                    </div>
                ) : (
                    
                    Array.isArray(leagues) && leagues.map((item, i) => (
                    <li key={i}>
                    <button onClick={() => handleSelectedLeague(item.league.id)}>
                    <Image src={item.league.logo} 
                    alt="league logo" 
                    height={100} 
                    width={100} 
                    priority={true} />
                    </button>
                    </li>
                )))}
            </ul>
        </div>
        </>
    )
}

