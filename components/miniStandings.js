import { useQuery } from "react-query";
import { getStandings } from "@/utils/apiFootball";
import Image from "next/image";
import styles from "../styling/miniStandings.module.css";
import { Mosaic } from 'react-loading-indicators';


export default function MiniStandings({ leagueId }) {
    const { data: standingsData, error, isLoading } = useQuery(
        ['miniStandings', leagueId], () => getStandings(leagueId, '2024'), {
            staleTime: 1000 * 60 * 60,
            cacheTime: 1000 * 60 * 60 * 24
        }
    );

    const filterStandings = (standingsData) => {
        if (!standingsData) {
            return [];
        }
        const flattenedData = standingsData.flat(3);
        return flattenedData;
    };

    const miniStandings = filterStandings(standingsData);

    if (isLoading) {
        return <div className={styles.loading}><Mosaic color="#32cd32" size="large" textColor="" /></div>;
    }

    return (
        <table className={styles.table}>
            <thead>
                <tr className={styles.rowHeader}>
                    <th className={styles.th}>#</th>
                    <th className={styles.th}></th>
                    <th className={styles.th}>PL</th>
                    <th className={styles.th}>W</th>
                    <th className={styles.th}>D</th>
                    <th className={styles.th}>L</th>
                    <th className={styles.th}>GD</th>
                    <th className={`${styles.th} ${styles.teamPoints}`}>PTS</th>
                </tr>
            </thead>
            <tbody>
                {miniStandings.map((team, i) => (
                    <tr key={i} className={styles.tr}>
                        <td className={`${styles.td} ${styles.teamRank}`}>{team.rank}</td>
                        <td className={`${styles.td} ${styles.teamCell}`}>
                            <Image src={team.team.logo} alt="logo for team" height={25} width={25} priority={true} /> {team.team.name}
                        </td>
                        <td className={styles.td}>{team.all.played}</td>
                        <td className={styles.td}>{team.all.win}</td>
                        <td className={styles.td}>{team.all.draw}</td>
                        <td className={styles.td}>{team.all.lose}</td>
                        <td className={styles.td}>{team.goalsDiff}</td>
                        <td className={`${styles.td} ${styles.teamPoints}`}>{team.points}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
