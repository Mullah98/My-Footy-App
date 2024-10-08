import { getLeaguePlayerStats } from "@/utils/apiFootball";
import { useQuery } from "react-query";
import styles from "../styling/playerLeagueStats.module.css"
import Image from "next/image";
import { OrbitProgress } from "react-loading-indicators";
import { MdErrorOutline } from "react-icons/md";

export default function PlayerLeagueStats({leagueId}) {
    const {data: leagueStats, error, isLoading} = useQuery(
        ['leagueStats', leagueId], () => getLeaguePlayerStats(leagueId), {
            staleTime: 1000 * 60 * 60,
            cacheTime: 1000 * 60 * 60 * 24
        }
    );

    if (!leagueStats) {
        return []
    }

    const mostGoals = leagueStats.topScorer.slice(0,3); //Only show the top 3 players
    const mostAssists = leagueStats.topAssist.slice(0, 3);

    if (isLoading) {
        return <div className={styles.loading}>
        <OrbitProgress 
        variant="track-disc" 
        color="#32cd32" 
        size="medium" />
        </div>;
    }

    if (error) {
        return <div className={styles.loading}>
            <h2>Error fetching data 😟</h2>
            <MdErrorOutline size={60} color="red" />
            <p>Please refresh the page or try again later.</p>
        </div>
    }

    return (
        <div className={styles.leagueStatsContainer}>
         <div className={styles.goals}>
            <h2>Most goals</h2>
            {mostGoals.map((player, i) => (
            <li key={i} className={i === 0 ? styles.firstPlayer : styles.player}>
                <Image src={player.player.photo}
                    alt="player photo"
                    width={50}
                    height={50}
                    priority={true} />
                <div className={styles.playerDetails}>
                    <h3>{player.player.name}</h3>
                    <div className={styles.teamInfo}>
                        <Image src={player.statistics[0].team.logo}
                        alt="team logo"
                        width={15}
                        height={15}
                        priority={true} />
                        <h4>{player.statistics[0].team.name}</h4>
                    </div>
                </div>
                <div className={styles.playerStats}>
                    {player.statistics[0].goals.total}
                </div>
            </li>
        ))}
        </div>
        <div className={styles.assists}>
        <h2>Most Assists</h2>
        {mostAssists.map((player, i) => (
            <li key={i} className={i === 0 ? styles.firstPlayer : styles.player}>
                <Image src={player.player.photo}
                    alt="player photo"
                    width={50}
                    height={50}
                    priority={true} />
                <div className={styles.playerDetails}>
                    <h3>{player.player.name}</h3>
                    <div className={styles.teamInfo}>
                        <Image src={player.statistics[0].team.logo}
                        alt="player's team logo"
                        width={15}
                        height={15}
                        priority={true} />
                        <h4>{player.statistics[0].team.name}</h4>
                    </div>
                </div>
                <div className={styles.playerStats}>
                    {player.statistics[0].goals.assists}
                </div>
            </li>
        ))}
        </div>
    </div>
    )
}