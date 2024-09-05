'use client'

import { getStandings } from "@/utils/apiFootball";
import { useQuery } from "react-query";
import { useState } from "react";
import Image from 'next/image';
import '../styling/standings.css';
import Dropdown from "./dropdown";
import {Mosaic} from 'react-loading-indicators';

export default function Standings({ leagueId }) {
    const [selectSeason, setSelectSeason] = useState('2024');

    const { data: standingsData, error, isLoading } = useQuery(
        ['standings', leagueId, selectSeason], () => getStandings(leagueId, selectSeason), {
        staleTime: Infinity,//1000 * 60 * 60
        cacheTime: Infinity,//1000 * 60 * 60 * 24
        // onSuccess: (data) => {
        //     console.log('Data from api', data);
        // },
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

    const renderTeamForm = (form) => {
        return form.split('').reverse().map((result, index) => (
            <span key={index} className={`form-result ${result}`}>
                {result}
            </span>
        ));
    }
    
    return (
        <div className="standings-container">
            <Dropdown changeSeason={handleSeasonChange} />
            <h1>League table</h1>
            {isLoading ? (
                <div className="loading">
                    <Mosaic 
                    color="#32cd32" 
                    size="large" 
                    text="Loading" 
                    textColor="" />
                </div>
            ) : (
            <table>
                <thead>
                <tr className="row-header">
                    <th>Position</th>
                    <th className="team-head">Team</th>
                    <th>Games played</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>+/-</th>
                    <th>GD</th>
                    <th>Points</th>
                    <th className="form-head">Form</th>
                </tr>
                </thead>
                <tbody>
                {standings.map((team, i) => (
                    <tr key={i}>
                    <td>{team.rank}</td>
                    <td className="team-cell"><Image src={team.team.logo} alt="logo for team" height={45} width={45} priority={true} /> {team.team.name}</td>
                    <td>{team.all.played}</td>
                    <td>{team.all.win}</td>
                    <td>{team.all.draw}</td>
                    <td>{team.all.lose}</td>
                    <td>{team.all.goals.for}-{team.all.goals.against}</td>
                    <td>{team.goalsDiff}</td>
                    <td>{team.points}</td>
                    <td className="team-form">{renderTeamForm(team.form)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        )}
        </div>
    )
  
}