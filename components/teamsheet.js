import { getTeamsheet } from "@/utils/apiFootball";
import Image from "next/image";
import { useQuery } from "react-query";
import "../styling/teamsheet.css"
import { Commet } from "react-loading-indicators";
import { MdErrorOutline } from "react-icons/md";

export default function Teamsheet({teamId}) {
    const {data: teamSheet, error, isLoading} = useQuery(
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

    if (isLoading) {
        return <div>
        <Commet 
        color="#32cd32" 
        size="medium" />
        </div>
    }

    if (error) {
        return <div className="loading">
            <h2>Error fetching data 😟</h2>
            <MdErrorOutline size={60} color="red" />
            <p>Please refresh the page or try again later.</p>
        </div>
    }
         
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
                <Image src={player.photo} alt="photo of player" height={75} width={75} priority={true} />
                <p className="player-name">{player.name}</p>
                <p className="player-number">{player.number}</p>
                </div>
            ))}
            </div>
            <div className="midfielders">
            <h2>Midfielders</h2>
            {midfielders?.map((player, i) => (
                <div className="players" key={i}>
                <Image src={player.photo} alt="photo of player" height={75} width={75} priority={true} />
                <p className="player-name">{player.name}</p>
                <p className="player-number">{player.number}</p>
                </div>
            ))}
            </div>
            <div className="attackers">
            <h2>Attackers</h2>
            {attackers?.map((player, i) => (
                <div className="players" key={i}>
                <Image src={player.photo} alt="photo of player" height={75} width={75} priority={true} />
                <p className="player-name">{player.name}</p>
                <p className="player-number">{player.number}</p>
                </div>
            ))}
            </div>
        </div>
    )
    
}