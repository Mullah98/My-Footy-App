import { getFixtures } from "@/utils/apiFootball";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import "../styling/fixturesList.css"
import Image from "next/image";
import { PiArrowSquareLeftFill } from "react-icons/pi";
import { PiArrowSquareRightFill } from "react-icons/pi";



export default function FixturesList({leagueId}) {
    const [round, setRound] = useState(1);
    const [manualChangeRound, setManualChangeRound] = useState(false);
    const maxRounds = 38;

    const {data: fixturesList, isLoading} = useQuery(
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

        const result = fixturesList.map(fixtures => {
            const fixturesDate = new Date(fixtures.fixture.date);
            const formattedDate = dateFormatter.format(fixturesDate);
            const formattedTime = timeFormatter.format(fixturesDate)
            return {...fixtures, fixturesDate, formattedDate, formattedTime}
        });
            result.sort((dateA, dateB) => dateA.fixturesDate - dateB.fixturesDate)
            return result;
    }

    const isRoundComplete = (fixturesList) => {
        return fixturesList && fixturesList.every(fixture => fixture.fixture.status.short === 'FT')
    }

    const handlePrevRound = (e) => {
        if (round > 1) {
        setManualChangeRound(true);
        setRound(currentRound => currentRound - 1, 1);
        }
    }
    
    const handleNextRound = (e) => {
        if (round < 38 ) {
        setManualChangeRound(true);
        setRound(currentRound => currentRound + 1, maxRounds);
        }
    }

    
    useEffect(() => {
        if (isRoundComplete(fixturesList) && !manualChangeRound) {
            setRound(prevRound => prevRound + 1)
        }
    }, [fixturesList, manualChangeRound])

    const fixtureList = filterFixtures(fixturesList)    

    return (
        <>
            {fixtureList && (
                <div className="fixtures-list">
                <div className="fixtures-round">
                 <PiArrowSquareLeftFill 
                 onClick={handlePrevRound} 
                 className="arrow-left"
                 />
                 <h2 className="round-counter">Round {round}</h2>
                 <PiArrowSquareRightFill
                 onClick={handleNextRound} 
                 className="arrow-right" />
                </div>
                    {fixtureList.map((fixture, i) => (
                        <li key={i} className="fixture">
                            <div className="fixture-teams">
                                <h4 className="team-name">{fixture.teams.home.name}</h4>
                                <div className="center-content">
                                    <Image 
                                        src={fixture.teams.home.logo} 
                                        alt="home team logo" 
                                        width={30} 
                                        height={30} 
                                        priority={true} 
                                    />
                                    {fixture.fixture.status.elapsed === null ? (
                                    <div className="fixture-date">
                                        <h4 className="date">{fixture.formattedDate}</h4>
                                        <h4>{fixture.formattedTime}</h4>
                                    </div>
                                    ) : 
                                    <h4>{fixture.goals.home} - {fixture.goals.away}</h4>}
                                    <Image 
                                        src={fixture.teams.away.logo} 
                                        alt="away team logo" 
                                        width={30} 
                                        height={30} 
                                        priority={true} 
                                    />
                                </div>
                                <h4 className="team-name">{fixture.teams.away.name}</h4>
                            </div>
                        </li>
                    ))}
                </div>
            )}
        </>
    )
}