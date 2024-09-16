import { getFixtures } from "@/utils/apiFootball";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import "../styling/fixturesList.css"
import Image from "next/image";

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

        const formatter = new Intl.DateTimeFormat("en-GB", {
            hour: 'numeric',
            minute: 'numeric',
            month: 'short',
            day: 'numeric',
            hour12: true,
        })    

        const result = fixturesList.map(fixtures => {
            const fixturesDate = new Date(fixtures.fixture.date);
            const formattedDate = formatter.format(fixturesDate);
            return {...fixtures, formattedDate}
        });
            return result;
    }

    const isRoundComplete = (fixturesList) => {
        return fixturesList && fixturesList.every(fixture => fixture.fixture.status.short === 'FT')
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
                {fixtureList.map((fixture, i) => (
                    <li key={i} className="fixture">
                    <div className="fixture-fulldate">
                        <h2></h2>
                    </div>
                    <div className="fixture-teams">
                    <div className="fixture-team">
                        <h4>{fixture.teams.home.name}</h4>
                        <Image src={fixture.teams.home.logo}
                        alt="team logo"
                        width={30}
                        height={30}
                        priority={true} />
                    </div>
                    <div className="fixture-time">
                        <h4>vs</h4>
                    </div>
                    <div className="fixture-team">
                        <Image src={fixture.teams.away.logo}
                        alt="team logo"
                        width={30}
                        height={30}
                        priority={true} />
                        <h4>{fixture.teams.away.name}</h4>
                    </div>
                    </div>
                    </li>
                ))}
            </div>
        )}
        </>
    )
}