import { getLeaguePlayerStats } from "@/utils/apiFootball";
import { useQuery } from "react-query";
import "../styling/playerLeagueStats.css"
import Image from "next/image";

export default function PlayerLeagueStats({leagueId}) {
    const {data: leagueStats, isLoading} = useQuery(
        ['leagueStats', leagueId], () => getLeaguePlayerStats(leagueId), {
            staleTime: Infinity,
            cacheTime: Infinity
        }
    );

    if (!leagueStats) {
        return []
    }

    const mostGoals = leagueStats.topScorer.slice(0,3);
    const mostAssists = leagueStats.topAssist.slice(0, 3);
    

    return (
        <div className="leagueStats-container">
            {leagueStats && (   
                <>
                    <div className="goals">
                    <h2>Most goals</h2>
                    {mostGoals.map((player, i) => (
                        <li key={i} className={i === 0 ? 'first-player' : 'player'}>
                        <Image src={player.player.photo}
                            alt="player photo"
                            width={50}
                            height={50}
                            priority={true} />
                            <div className="player-details">
                                <h3>{player.player.name}</h3>
                                <div className="team-info">
                                    <Image src={player.statistics[0].team.logo}
                                    alt="team logo"
                                    width={15}
                                    height={15}
                                    priority={true} />
                                    <h4>{player.statistics[0].team.name}</h4>
                                </div>
                            </div>
                            <div className="player-stats">
                                {player.statistics[0].goals.total}
                            </div>
                        </li>
                    ))}
                    </div>
                    <div className="assists">
                    <h2>Most Assists</h2>
                    {mostAssists.map((player, i) => (
                        <li key={i} className={i === 0 ? 'first-player' : 'player'}>
                            <Image src={player.player.photo}
                            alt="player photo"
                            width={50}
                            height={50}
                            priority={true} />
                            <div className="player-details">
                                <h3>{player.player.name}</h3>
                                <div className="team-info">
                                    <Image src={player.statistics[0].team.logo}
                                    alt="team logo"
                                    width={15}
                                    height={15}
                                    priority={true} />
                                    <h4>{player.statistics[0].team.name}</h4>
                                </div>
                            </div>
                            <div className="player-stats">
                                {player.statistics[0].goals.assists}
                            </div>
                        </li>
                    ))}
                    </div>
                </>
            )}
        </div>
    )
}