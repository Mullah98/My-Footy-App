'use client';

import { useState } from "react";
import "../styling/players.css";
import PlayersSearchForm from "./playersSearchForm";
import { useQuery } from "react-query";
import { searchPlayer } from "@/utils/apiFootball";
import Image from "next/image";

export default function Players() {
    const [query, setQuery] = useState('')
    const [selectedLeague, setSelectedLeague] = useState(39)
    const [selectedPlayer, setSelectedPlayer] = useState(null)


    const { data: playersData, isLoading } = useQuery(['players', selectedLeague, query], () => searchPlayer(selectedLeague, query), {
        cacheTime: Infinity,
        staleTime: Infinity
    });

    const players = playersData || [];
    
    const handleSelectedPlayer = (player) => {
        setSelectedPlayer(player)
    }

    console.log(selectedPlayer);
    
    return (
        <div className="players-container">
            <div className="form">
            <PlayersSearchForm 
            query={query} 
            setQuery={setQuery} 
            league={selectedLeague} 
            setLeague={setSelectedLeague} 
            playersData={players} 
            selectedPlayer={handleSelectedPlayer}
            />
            </div>

            {selectedPlayer && (
            <div className="players-main">
            <div className="players-name">
                <Image src={selectedPlayer.player.photo}
                alt="image for player"
                width={180}
                height={180}
                priority={true} />
                <div className="players-heading">
                <h1>{selectedPlayer.player.name}</h1>
                <h2>
                <Image src={selectedPlayer.statistics[0].team.logo}
                alt="image for player"
                width={30}
                height={30}
                priority={true} />
                {selectedPlayer.statistics[0].team.name}</h2>
                </div>
            </div>
            <div className="players-info">
            <div className="box"><h3>{selectedPlayer.player.nationality}</h3><span>Nationality</span></div>
            <div className="box"><h3>{selectedPlayer.player.height}</h3><span>Height</span></div>
            <div className="box"><h3>{selectedPlayer.player.weight}</h3><span>Weight</span></div>
            <div className="box"><h3>{selectedPlayer.player.age}</h3><span>Age</span></div>
            <div className="box"><h3>{selectedPlayer.player.birth.date}</h3><span>Birth</span></div>
            </div>
            <div className="players-league">
            <Image src={selectedPlayer.statistics[0].league.logo}
                alt="logo for league"
                width={120}
                height={120}
                priority={true} />
            <h1>{selectedPlayer.statistics[0].league.name} <span>{selectedPlayer.statistics[0].league.season}</span></h1>
            </div>
            <div className="players-stats">
            <div className="box"><h3>{selectedPlayer.statistics[0].goals.total}</h3><span>Goals</span></div>
            <div className="box"><h3>{selectedPlayer.statistics[0].goals.assists}</h3><span>Assists</span></div>
            <div className="box"><h3></h3><span>Appereances</span></div>
            <div className="box"><h3></h3><span>Minutes</span></div>
            <div className="box"><h3></h3><span>Rating</span></div>
            <div className="box"><h3></h3><span>Yellow cards</span></div>
            <div className="box"><h3></h3><span>Red cards</span></div>

            </div>
            </div>
            )}
        </div>
    )
}