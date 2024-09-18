import { useState } from "react";
import { useQuery } from "react-query";
import { getStandings } from "@/utils/apiFootball";
import Image from "next/image";
import "../styling/miniStandings.css"


export default function MiniStandings({leagueId}) {
    const { data: standingsData, error, isLoading } = useQuery(
        ['miniStandings', leagueId], () => getStandings(leagueId, '2024'), {
        staleTime: 1000 * 60 * 60,
        cacheTime: 1000 * 60 * 60 * 24
    });

    const filterStandings = (standingsData) => {
        if (!standingsData) {
            return [];
        }
        const flattenedData = standingsData.flat(3);        
        return flattenedData
    }

    const miniStandings = filterStandings(standingsData)
    
    return (
        <table>
        <thead>
        <tr className="row-header">
            <th>#</th>
            <th className="team-head"></th>
            <th>PL</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GD</th>
            <th>PTS</th>
        </tr>
        </thead>
        <tbody>
        {miniStandings.map((team, i) => (
            <tr key={i}>
            <td className="team-rank">{team.rank}</td>
            <td className="team-cell"><Image src={team.team.logo} alt="logo for team" height={25} width={25} priority={true} /> {team.team.name}</td>
            <td>{team.all.played}</td>
            <td>{team.all.win}</td>
            <td>{team.all.draw}</td>
            <td>{team.all.lose}</td>
            <td>{team.goalsDiff}</td>
            <td className="team-points">{team.points}</td>
            </tr>
        ))}
        </tbody>
    </table>
    )
}