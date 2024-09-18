import { useQuery } from "react-query";
import { getStandings } from "@/utils/apiFootball";
import Image from "next/image";
import "../styling/clubLeagueStats.css"

export default function ClubLeagueStats({leagueId}) {
    const { data: clubStats, error, isLoading } = useQuery(
        ['clubStats', leagueId], () => getStandings(leagueId, '2024'), {
        staleTime: 1000 * 60 * 60,
        cacheTime: 1000 * 60 * 60 * 24
    });

    const filterStandings = (standings) => {
        if (!standings) {
            return [];
        }
        const flattenedData = standings.flat(3);        
        return flattenedData
    }

    const findClubWithMostGoals = (standings) => {
        const clubs = standings.sort((a, b) => b.all.goals.for - a.all.goals.for).slice(0, 3)
        return clubs
    }

    const findClubWithMostConceded = (standings) => {
        const clubs = standings.sort((a, b) => b.all.goals.against - a.all.goals.against).slice(0, 3)
        return clubs
    }

    const findClubWithMostWins = (standings) => {
        const clubs = standings.sort((a, b) => b.all.win - a.all.win).slice(0, 3)
        return clubs
    }

    const findClubWithMostLosses = (standings) => {
        const clubs = standings.sort((a, b) => b.all.lose - a.all.lose).slice(0, 3)
        return clubs
    }

    const standings = (filterStandings(clubStats));
    const mostGoals = findClubWithMostGoals(standings);
    const mostConceded = findClubWithMostConceded(standings);
    const mostWins = findClubWithMostWins(standings);
    const mostLosses = findClubWithMostLosses(standings);
    
    return (
        <div className="clubLeagueStats-container">
            {clubStats && (
                <>
                    <div className="most-goals">
                        <h2>Most goals</h2>
                        {mostGoals.map((club, i) => (
                            <li key={i} className={i === 0 ? 'first-club' : 'club'}>
                                <Image src={club.team.logo}
                                alt="club logo"
                                width={50}
                                height={50}
                                priority={true} />
                                <h3>{club.team.name}</h3>
                                <div className="club-stat">
                                    {club.all.goals.for}
                                </div>
                            </li>
                        ))}
                    </div>

                    <div className="most-conceded">
                        <h2>Most conceded</h2>
                        {mostConceded.map((club, i) => (
                            <li key={i} className={i === 0 ? 'first-club' : 'club'}>
                                <Image src={club.team.logo}
                                alt="club logo"
                                width={50}
                                height={50}
                                priority={true} />
                                <h3>{club.team.name}</h3>
                                <div className="club-stat">
                                    {club.all.goals.against}
                                </div>
                            </li>
                        ))}
                    </div>

                    <div className="most-wins">
                        <h2>Most wins</h2>
                        {mostWins.map((club, i) => (
                            <li key={i} className={i === 0 ? 'first-club' : 'club'}>
                                <Image src={club.team.logo}
                                alt="club logo"
                                width={50}
                                height={50}
                                priority={true} />
                                <h3>{club.team.name}</h3>
                                <div className="club-stat">
                                    {club.all.win}
                                </div>
                            </li>
                        ))}
                    </div>

                    <div className="most-losses">
                        <h2>Most losses</h2>
                        {mostLosses.map((club, i) => (
                            <li key={i} className={i === 0 ? 'first-club' : 'club'}>
                                <Image src={club.team.logo}
                                alt="club logo"
                                width={50}
                                height={50}
                                priority={true} />
                                <h3>{club.team.name}</h3>
                                <div className="club-stat">
                                    {club.all.lose}
                                </div>
                            </li>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}