import { getTeamsheet } from "@/utils/apiFootball";
import Image from "next/image";
import { useQuery } from "react-query";
import "../styling/teamsheet.css"
import { useState } from "react";

export default function Teamsheet({teamId}) {
    const {data: teamSheet, isLoading} = useQuery(
        ['teamSheet', teamId], () => getTeamsheet(teamId), {
            staleTime: Infinity,
            cacheTime: Infinity,
        }
    );

    const fullSquad = teamSheet?.players
    const goalkeepers = fullSquad?.filter(player => player.position === 'Goalkeeper')
    const defenders = fullSquad?.filter(player => player.position === 'Defender')
    const midfielders = fullSquad?.filter(player => player.position === 'Midfielder')
    const attackers = fullSquad?.filter(player => player.position === 'Attacker')
         
    return (
        <div className="teamsheet-container">
            <div className="goalkeeper">
            <h2>Goalkeepers</h2>
            {goalkeepers?.map((player, i) => (
                <div className="players" key={i}>
                <Image src={player.photo} alt="Image for players" height={75} width={75} priority={true} />
                <p className="player-name">{player.name}</p>
                <p className="player-number">{player.number}</p>
                </div>
            ))}
            </div>
            <div className="defenders">
            <h2>Defenders</h2>
            {defenders?.map((player, i) => (
                <div className="players" key={i}>
                <Image src={player.photo} alt="Image for players" height={75} width={75} priority={true} />
                <p className="player-name">{player.name}</p>
                <p className="player-number">{player.number}</p>
                </div>
            ))}
            </div>
            <div className="midfielders">
            <h2>Midfielders</h2>
            {midfielders?.map((player, i) => (
                <div className="players" key={i}>
                <Image src={player.photo} alt="Image for players" height={75} width={75} priority={true} />
                <p className="player-name">{player.name}</p>
                <p className="player-number">{player.number}</p>
                </div>
            ))}
            </div>
            <div className="attackers">
            <h2>Attackers</h2>
            {attackers?.map((player, i) => (
                <div className="players" key={i}>
                <Image src={player.photo} alt="Image for players" height={75} width={75} priority={true} />
                <p className="player-name">{player.name}</p>
                <p className="player-number">{player.number}</p>
                </div>
            ))}
            </div>
        </div>
    )
    
}