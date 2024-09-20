'use client';

import { getFixtures } from "@/utils/apiFootball";
import { useQuery } from "react-query";
import styles from "../styling/fixtures.module.css";
import CardSlider from "@/components/cardSlider";
import { Mosaic } from 'react-loading-indicators';
import { useEffect, useState } from "react";

export default function Fixtures({ leagueId }) {
    const [round, setRound] = useState(1);
    const [manualChangeRound, setManualChangeRound] = useState(false);
    const maxRounds = 38;

    const { data: fixturesData, isLoading } = useQuery(
        ['fixtures', leagueId, round], () => getFixtures(leagueId, round), {
            staleTime: Infinity,
            cacheTime: Infinity,
        }
    );

    const filterFixtures = (fixturesData) => {
        if (!fixturesData) {
            return [];
        }

        const formatter = new Intl.DateTimeFormat("en-GB", {
            hour: 'numeric',
            minute: 'numeric',
            month: 'short',
            day: 'numeric',
            hour12: true,
        });

        const result = fixturesData.map(fixtures => {
            const fixturesDate = new Date(fixtures.fixture.date);
            const formattedDate = formatter.format(fixturesDate);
            return { ...fixtures, formattedDate };
        });
        return result;
    }

    const isRoundComplete = (fixturesData) => {
        return fixturesData && fixturesData.every(fixture => fixture.fixture.status.short === 'FT');
    }

    useEffect(() => {
        if (isRoundComplete(fixturesData) && !manualChangeRound) {
            setRound(prevRound => prevRound + 1);
        }
    }, [fixturesData, manualChangeRound]);

    const handlePrevRound = () => {
        setManualChangeRound(true);
        setRound(currentRound => currentRound - 1);
    }

    const handleNextRound = () => {
        setManualChangeRound(true);
        setRound(currentRound => currentRound + 1);
    }

    const fixtures = filterFixtures(fixturesData);

    return (
        <div className={styles.fixturesContainer}>
            <h1 className={styles.h1}>Fixtures</h1>
            {isLoading ? (
                <div className={styles.loading}>
                    <Mosaic color="#32cd32" size="large" text="Loading" textColor="" />
                </div>
            ) : (
                <>
                    <div className={styles.roundBar}>
                        <button className={styles.roundBtn} onClick={handlePrevRound} disabled={round === 1}>Prev</button>
                        <span className={styles.roundText}>Round {round}</span>
                        <button className={styles.roundBtn} onClick={handleNextRound} disabled={round === maxRounds}>Next</button>
                    </div>
                    <CardSlider fixtures={fixtures} />
                </>
            )}
        </div>
    )
}
