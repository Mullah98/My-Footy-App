import { getFixtures } from "@/utils/apiFootball";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styles from "../styling/fixturesList.module.css"
import Image from "next/image";
import { PiArrowSquareLeftFill, PiArrowSquareRightFill } from "react-icons/pi";
import { OrbitProgress } from 'react-loading-indicators';

export default function FixturesList({ leagueId }) {
    const [round, setRound] = useState(1);
    const [manualChangeRound, setManualChangeRound] = useState(false);
    const [loading, setLoading] = useState(true);
    const maxRounds = 38;

    const { data: fixturesList, isLoading } = useQuery(
        ['fixturesList', leagueId, round], () => getFixtures(leagueId, round), {
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    const filterFixtures = (fixturesList) => {
        if (!fixturesList) {
            return [];
        }

        const dateFormatter = new Intl.DateTimeFormat("en-GB", {
            weekday: 'short',
            day: '2-digit'
        });

        const timeFormatter = new Intl.DateTimeFormat("en-GB", {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });

        const result = fixturesList.map(fixture => {
            const fixtureDate = new Date(fixture.fixture.date);
            const formattedDate = dateFormatter.format(fixtureDate);
            const formattedTime = timeFormatter.format(fixtureDate);
            return { ...fixture, fixtureDate, formattedDate, formattedTime };
        });

        result.sort((dateA, dateB) => dateA.fixtureDate - dateB.fixtureDate);
        return result;
    };

    const isRoundComplete = (fixturesList) => {
        return fixturesList && fixturesList.every(fixture => fixture.fixture.status.short === 'FT');
    };

    useEffect(() => {
        if (isRoundComplete(fixturesList) && !manualChangeRound) {
            setRound(prevRound => prevRound + 1);
        }
    }, [fixturesList, manualChangeRound]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    
    const handlePrevRound = () => {
        if (round > 1) {
            setManualChangeRound(true);
            setRound(currentRound => currentRound - 1);
        }
    };
    
    const handleNextRound = () => {
        if (round < maxRounds) {
            setManualChangeRound(true);
            setRound(currentRound => currentRound + 1);
        }
    };
    
    const fixtureList = filterFixtures(fixturesList);
    
    if (loading) {
        return <div className={styles.loading}><OrbitProgress variant="track-disc" color="#32cd32" size="medium" /></div>;
    }

    return (
        <>
            {fixtureList && (
                <div className={styles.fixturesList}>
                    <div className={styles.fixturesRound}>
                        <PiArrowSquareLeftFill
                            onClick={handlePrevRound}
                            className={styles.arrowLeft}
                        />
                        <h2 className={styles.roundCounter}>Round {round}</h2>
                        <PiArrowSquareRightFill
                            onClick={handleNextRound}
                            className={styles.arrowRight}
                        />
                    </div>
                    {fixtureList.map((fixture, i) => (
                        <li key={i} className={styles.fixture}>
                            <div className={styles.fixtureTeams}>
                                <h4 className={styles.teamName}>{fixture.teams.home.name}</h4>
                                <div className={styles.centerContent}>
                                    <Image
                                        src={fixture.teams.home.logo}
                                        alt="home team logo"
                                        width={30}
                                        height={30}
                                        priority={true}
                                    />
                                    {fixture.fixture.status.elapsed === null ? (
                                        <div className={styles.fixtureDate}>
                                            <h4 className={styles.date}>{fixture.formattedDate}</h4>
                                            <h4>{fixture.formattedTime}</h4>
                                        </div>
                                    ) : (
                                        <h4>{fixture.goals.home} - {fixture.goals.away}</h4>
                                    )}
                                    <Image
                                        src={fixture.teams.away.logo}
                                        alt="away team logo"
                                        width={30}
                                        height={30}
                                        priority={true}
                                    />
                                </div>
                                <h4 className={styles.teamName}>{fixture.teams.away.name}</h4>
                            </div>
                        </li>
                    ))}
                </div>
            )}
        </>
    );
}
