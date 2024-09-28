import { getFixtures } from "@/utils/apiFootball";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styles from "../styling/fixturesList.module.css"
import Image from "next/image";
import { PiArrowSquareLeftFill, PiArrowSquareRightFill } from "react-icons/pi";
import { MdErrorOutline } from "react-icons/md";
import { IoMdRefreshCircle } from "react-icons/io";
import { OrbitProgress } from 'react-loading-indicators';

export default function FixturesList({ leagueId }) {
    const [round, setRound] = useState(1);
    const [manualChangeRound, setManualChangeRound] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const maxRounds = 38;

    const { data: fixturesList, error, isLoading, refetch } = useQuery(
        ['fixturesList', leagueId, round], () => getFixtures(leagueId, round), {
            staleTime: 1000 * 60 * 60,
            cacheTime: 1000 * 60 * 60 * 24,
            onSettled: () => {
                setIsRefreshing(false);
            }
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
        const formattedDate = dateFormatter.format(fixtureDate); //Date will show as Mon 31
        const formattedTime = timeFormatter.format(fixtureDate); //Time will show as 12:00pm
        return { ...fixture, fixtureDate, formattedDate, formattedTime };
    });

        result.sort((dateA, dateB) => dateA.fixtureDate - dateB.fixtureDate);
        return result;
    };

    const isRoundComplete = (fixturesList) => {
        return fixturesList && fixturesList.every(fixture => fixture.fixture.status.short === 'FT');
    };
    
    useEffect(() => {
        if (isRoundComplete(fixturesList) && !manualChangeRound) { //Automatically go to the current round
            setRound(prevRound => prevRound + 1);
        }
    }, [fixturesList, manualChangeRound]);
    
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

    const handleRefresh = () => { // For live games, refresh button will refetch the latest data
        setIsRefreshing(true);
    }
    
    const fixtureList = filterFixtures(fixturesList);
        
    if (isLoading || isRefreshing) {
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
                        <button className={styles.refreshBtn} onClick={refetch}>
                        <IoMdRefreshCircle onClick={handleRefresh}/>
                        </button>
                    </div>
                    {fixtureList.map((fixture, i) => (
                        <li key={i} className={styles.fixture}>
                            <div className={styles.fixtureTeams}>

                            <div className={styles.fixtureStatus}>
                            {fixture.fixture.status.elapsed >= 90 ? (
                                <h3 className={styles.finished}><span>FT</span></h3>
                            ) : fixture.fixture.status.short === 'HT' ? (
                                <h3><span>HT</span></h3>
                            ) : fixture.fixture.status.elapsed !== null ? (
                                <h3 className={styles.live}><span>{fixture.fixture.status.elapsed}</span></h3>
                            ) : null}
                            </div>

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
