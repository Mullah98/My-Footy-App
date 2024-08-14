'use client';

import { getFixtures } from "@/utils/apiFootball";
import { useQuery } from "react-query";
import "../styling/fixtures.css"

export default function Fixtures({ leagueId }) {
    const {data: fixturesData, isLoading} = useQuery(
    ['fixtures', leagueId], () => getFixtures(leagueId), {
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    const filterFixtures = (fixturesData) => {
        if (!fixturesData) {
            return [];
        }
        const result = fixturesData;
        console.log(result[0]);
        return result;
    }
    const fixtures = filterFixtures(fixturesData);

    return (
        <div className="fixtures-container">
            <h1>Fixtures</h1>
        {fixtures.map((fixture, i) => (
            <h3 key={i}>{fixture.teams.home.name} vs {fixture.teams.away.name}</h3>
        ))}
        </div>
    )
}