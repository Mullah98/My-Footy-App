'use client'

import { getAllStandings } from "@/utils/apiFootball";
import { useQuery } from "react-query";
import { useState } from "react";
import Image from 'next/image';
import '../styling/standings.css';
import Dropdown from "../components/dropdown";
import {Mosaic} from 'react-loading-indicators';


export default function Standings({ leagueId }) {
    const [selectSeason, setSelectSeason] = useState('2024')

    const { data: standingsData, error, isLoading, dataUpdatedAt} = useQuery(
        ['standings', leagueId, selectSeason], () => getAllStandings(leagueId, selectSeason), {
        staleTime: Infinity,//1000 * 60 * 60
        cacheTime: Infinity,//1000 * 60 * 60 * 24
        // onSuccess: (data) => {
        //     console.log('Data from api', data);
        // },
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

    const filterStandings = (standingsData) => {
        if (!standingsData) {
            return [];
        }
        const flattenedData = standingsData.flat(3);        
        return flattenedData
    }

    const standings = filterStandings(standingsData)

    const handleSeasonChange = (value) => {
        setSelectSeason(value)
    }


    return (
        <div className="standings-container">
            <Dropdown changeSeason={handleSeasonChange} />
            <h1>League table</h1>
            {isLoading ? (
                <div className="loading">
                    <Mosaic color="#32cd32" size="large" text="Loading" textColor="" />
                </div>
            ) : (
            <table>
                <thead>
                <tr className="row-header">
                    <th>Position</th>
                    <th>Team</th>
                    <th>Games played</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>+/-</th>
                    <th>GD</th>
                    <th>Points</th>
                </tr>
                </thead>
                <tbody>
                {standings.map((team, i) => (
                    <tr key={i}>
                    <td>{team.rank}</td>
                    <td><Image src={team.team.logo} alt="logo for team" height={45} width={45} /> {team.team.name}</td>
                    <td>{team.all.played}</td>
                    <td>{team.all.win}</td>
                    <td>{team.all.draw}</td>
                    <td>{team.all.lose}</td>
                    <td>{team.all.goals.for}-{team.all.goals.against}</td>
                    <td>{team.goalsDiff}</td>
                    <td>{team.points}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        )}
        </div>
    )
  
}