import { getClubStats } from "@/utils/apiFootball";
import { useQuery } from "react-query";
import styles from "../styling/clubStatistics.module.css";
import { GiSoccerBall } from "react-icons/gi";
import { TbScoreboard } from "react-icons/tb";
import { GiGoalKeeper } from "react-icons/gi";
import { MdStadium } from "react-icons/md";
import { PiAirplaneTakeoffFill } from "react-icons/pi";
import { Commet } from "react-loading-indicators";
import { MdErrorOutline } from "react-icons/md";

export default function ClubStatistics({leagueId, teamId}) {
    const { data: clubCurrentStats, error, isLoading} = useQuery(
        ['clubCurrentStats', leagueId, teamId], () => getClubStats(leagueId, teamId), {
            staleTime: 1000 * 60 * 60,
            cacheTime: 1000 * 60 * 60 * 24
        });

    if (!clubCurrentStats) {
        return []
    }

    const clubStats = clubCurrentStats;


    if (error) {
        return <div className={styles.loading}>
            <h2>Error fetching data 😟</h2>
            <MdErrorOutline size={60} color="red" />
            <p>Please refresh the page or try again later.</p>
        </div>
    }

        return (
            <>
            {isLoading ? (
                <div>
                <Commet 
                color="#32cd32" 
                size="medium" />
                </div>
            ) : (
                clubStats && (
                <div className={styles.statsContainer}>

                    <h1>League Stats</h1>
                    <div className={styles.box}>
                        <h2>Goals scored <GiSoccerBall /></h2>
                        <div className={styles.left}>
                            <h3>Total</h3><br />
                            <span>{clubStats.goals.for.total.total}</span>
                        </div>
                        <div className={styles.middle}>
                            <h3>Home <MdStadium /></h3>
                            <span>{clubStats.goals.for.total.home}</span>
                        </div>
                        <div className={styles.right}>
                            <h3>Away <PiAirplaneTakeoffFill /></h3>
                            <span>{clubStats.goals.for.total.away}</span>
                        </div>
                    </div>

                    <div className={styles.box}>
                        <h2>Goals conceded <GiSoccerBall color="red" /></h2>
                        <div className={styles.left}>
                            <h3>Total</h3><br />
                            <span>{clubStats.goals.against.total.total}</span>
                        </div>
                        <div className={styles.middle}>
                            <h3>Home <MdStadium /></h3>
                            <span>{clubStats.goals.against.total.home}</span>
                        </div>
                        <div className={styles.right}>
                            <h3>Away <PiAirplaneTakeoffFill /></h3>
                            <span>{clubStats.goals.against.total.away}</span>
                        </div>
                    </div>

                    <div className={styles.box}>
                        <h2>Biggest wins <TbScoreboard /></h2>
                        <div className={styles.left}>
                            <h3>Home <MdStadium /></h3>
                            <span>{clubStats.biggest.wins.home}</span>
                        </div>
                        <div className={styles.right}>
                            <h3>Away <PiAirplaneTakeoffFill /></h3>
                            <span>{clubStats.biggest.wins.away}</span>
                        </div>
                    </div>

                    <div className={styles.box}>
                        <h2>Cleansheets <GiGoalKeeper /></h2>
                        <div className={styles.left}>
                            <h3>Total</h3><br />
                            <span>{clubStats.clean_sheet.total}</span>
                        </div>
                        <div className={styles.middle}>
                            <h3>Home <MdStadium /></h3>
                            <span>{clubStats.clean_sheet.home}</span>
                        </div>
                        <div className={styles.right}>
                            <h3>Away <PiAirplaneTakeoffFill /></h3>
                            <span>{clubStats.clean_sheet.home}</span>
                        </div>
                    </div>
                </div>
                )
            )}
            </>
        )
}