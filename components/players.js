'use client';

import { useState } from "react";
import "../styling/players.css";
import PlayersSearchForm from "./playersSearchForm";
import { useQuery } from "react-query";
import { searchPlayer } from "@/utils/apiFootball";
import Image from "next/image";
import Trophies from "./trophies";
import { FaTrophy } from "react-icons/fa6";
import { TbRectangleVerticalFilled } from "react-icons/tb";
import { MdErrorOutline } from "react-icons/md";
import {motion} from 'framer-motion';

export default function Players() {
    const [query, setQuery] = useState('');
    const [selectedLeague, setSelectedLeague] = useState(39);
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const { data: playersData, error, isLoading } = useQuery(['players', selectedLeague, query], () => searchPlayer(selectedLeague, query), {
        staleTime: 1000 * 60 * 60,
        cacheTime: 1000 * 60 * 60 * 24
    });

    const players = playersData || [];
    
    const handleSelectedPlayer = (player) => {
        const updatedStatistics = updateCardCounts(player.statistics);
        setSelectedPlayer({
            ...player,
            statistics: [updatedStatistics]
        });
    };

    // If player has a red card from 2 yellows, it will not read as a red card which is incorrect. This function will fix this.
    const updateCardCounts = (statistics) => {
        const stats = statistics[0];
        if (stats.cards.yellowred > stats.cards.red) {                // If yellowred is more than red card
            stats.cards.yellow = Math.max(stats.cards.yellow - 1, 0); // Take 1 yellow card away
            stats.cards.red = stats.cards.red + 1;                    // Add 1 red card
        }
        return stats;
    };

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };


    if (error) {
        return <div className="error">
            <MdErrorOutline size={60} color="red" />
            <p>Please refresh the page or try again later.</p>
        </div>
    }
        
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
            loading={isLoading}
            />
            </div>

            
            {selectedPlayer && (
            <motion.div 
            key={selectedPlayer.player.id} 
            initial='hidden' 
            animate='visible' 
            variants={variants}>
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
                alt="player's team logo"
                width={30}
                height={30}
                priority={true} />
                {selectedPlayer.statistics[0].team.name}</h2>
                </div>
            </div>

            <div className="players-info">
                <div className="box"><h3>{selectedPlayer.player.nationality}</h3><span>Nationality</span></div>
                <div className="box"><h3>{selectedPlayer.statistics[0].games.position}</h3><span>Position</span></div>
                <div className="box"><h3>{selectedPlayer.player.age}</h3><span>Age</span></div>
                <div className="box"><h3>{selectedPlayer.player.weight}</h3><span>Weight</span></div>
                <div className="box"><h3>{selectedPlayer.player.height}</h3><span>Height</span></div>
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
                <div className="box"><h3>{selectedPlayer.statistics[0].goals.total || 0}</h3><span>Goals</span></div>
                <div className="box"><h3>{selectedPlayer.statistics[0].goals.assists || 0}</h3><span>Assists</span></div>
                <div className="box"><h3>{selectedPlayer.statistics[0].games.appearences || 0}</h3><span>Appereances</span></div>
                <div className="box"><h3>{selectedPlayer.statistics[0].games.lineups || 0}</h3><span>Started</span></div>
                <div className="box"><h3>{selectedPlayer.statistics[0].games.minutes || 0}</h3><span>Minutes</span></div>
                <div className="box">
                <h3 className={selectedPlayer.statistics[0].games.rating >= 7 ? 'rating-good' : //Assing color to player ratings depending on number
                selectedPlayer.statistics[0].games.rating >= 4 ? 'rating-average' : 'rating-bad'}>
                {parseFloat(selectedPlayer.statistics[0].games.rating).toFixed(2)}</h3>
                <span>Rating</span>
                </div>
                <div className="box">
                <h3>{selectedPlayer.statistics[0].cards.yellow}</h3>
                <span><TbRectangleVerticalFilled className="yellow-card"/>Yellow cards</span>
                </div>
                <div className="box">
                <h3>{selectedPlayer.statistics[0].cards.red}</h3>
                <span><TbRectangleVerticalFilled className="red-card"/>Red cards</span>
                </div>
            </div>

            {selectedPlayer.statistics[0].games.position === 'Goalkeeper' && (
            <div className="players-more-stats">
                <div className="box"><span>Saves</span><h3>{selectedPlayer.statistics[0].goals.saves || 0}</h3></div>
                <div className="box"><span>Conceded</span><h3>{selectedPlayer.statistics[0].goals.conceded || 0}</h3></div>
                <div className="box"><span>Total passes</span><h3>{selectedPlayer.statistics[0].passes.total || 0}</h3></div>
                <div className="box"><span>Key passes</span><h3>{selectedPlayer.statistics[0].key || 0}</h3></div>
                <div className="box"><span>Passing accuracy</span><h3>{selectedPlayer.statistics[0].passes.accuracy || 0}%</h3></div>
                <div className="box"><span>Penalties saved</span><h3>{selectedPlayer.statistics[0].penalty.saved || 0}</h3></div>
            </div>
            )}
            

            {selectedPlayer.statistics[0].games.position === 'Defender' && (
            <div className="players-more-stats">
                <div className="box"><span>Total duels</span><h3>{selectedPlayer.statistics[0].duels.total || 0}</h3></div>
                <div className="box"><span>Successful duels</span><h3>{selectedPlayer.statistics[0].duels.won || 0}</h3></div>
                <div className="box"><span>Fouls won</span><h3>{selectedPlayer.statistics[0].fouls.drawn || 0}</h3></div>
                <div className="box"><span>Fouls committed</span><h3>{selectedPlayer.statistics[0].fouls.committed || 0}</h3></div>
                <div className="box"><span>Total Passes</span><h3>{selectedPlayer.statistics[0].passes.total || 0}</h3></div>
                <div className="box"><span>Key Passes</span><h3>{selectedPlayer.statistics[0].key || 0}</h3></div>
                <div className="box"><span>Passing Accuracy</span><h3>{selectedPlayer.statistics[0].passes.accuracy || 0}%</h3></div>
                <div className="box"><span>Penalties scored</span><h3>{selectedPlayer.statistics[0].penalty.scored || 0}</h3></div>
                <div className="box"><span>Penalties missed</span><h3>{selectedPlayer.statistics[0].penalty.missed || 0}</h3></div>
                <div className="box"><span>Tackles</span><h3>{selectedPlayer.statistics[0].tackles.total || 0}</h3></div>
                <div className="box"><span>Blocks</span><h3>{selectedPlayer.statistics[0].tackles.blocks || 0}</h3></div>
                <div className="box"><span>Interceptions</span><h3>{selectedPlayer.statistics[0].tackles.interceptions || 0}</h3></div>
            </div>
            )}

            {(selectedPlayer.statistics[0].games.position === 'Midfielder' || selectedPlayer.statistics[0].games.position === 'Attacker') && (
            <div className="players-more-stats">
                <div className="box"><span>Penalties scored</span><h3>{selectedPlayer.statistics[0].penalty.scored || 0}</h3></div>
                <div className="box"><span>Shots</span><h3>{selectedPlayer.statistics[0].shots.total || 0}</h3></div>
                <div className="box"><span>Shots on target</span><h3>{selectedPlayer.statistics[0].shots.on || 0}</h3></div>
                <div className="box"><span>Total passes</span><h3>{selectedPlayer.statistics[0].passes.total || 0}</h3></div>
                <div className="box"><span>Key passes</span><h3>{selectedPlayer.statistics[0].passes.key || 0}</h3></div>
                <div className="box"><span>Pass accuracy</span><h3>{selectedPlayer.statistics[0].passes.accuracy || 0}%</h3></div>
                <div className="box"><span>Dribbles</span><h3>{selectedPlayer.statistics[0].dribbles.attempts || 0}</h3></div>
                <div className="box"><span>Successful dribbles</span><h3>{selectedPlayer.statistics[0].dribbles.success || 0}</h3></div>
                <div className="box"><span>Total Duels</span><h3>{selectedPlayer.statistics[0].duels.total || 0}</h3></div>
                <div className="box"><span>Successful Duels</span><h3>{selectedPlayer.statistics[0].duels.won || 0}</h3></div>
                <div className="box"><span>Fouls committed</span><h3>{selectedPlayer.statistics[0].fouls.committed || 0}</h3></div>
                <div className="box"><span>Fouls won</span><h3>{selectedPlayer.statistics[0].fouls.drawn || 0}</h3></div>
                <div className="box"><span>Tackles</span><h3>{selectedPlayer.statistics[0].tackles.total || 0}</h3></div>
                <div className="box"><span>Interceptions</span><h3>{selectedPlayer.statistics[0].tackles.interceptions || 0}</h3></div>
            </div>
            )}
            
            <div className="players-trophies">
                <h1><FaTrophy className="trophy-icon" /> Trophies</h1>
                <Trophies playerId={selectedPlayer.player.id} />
            </div>

            </div>
            </motion.div>
            )}
        </div>
    )
}