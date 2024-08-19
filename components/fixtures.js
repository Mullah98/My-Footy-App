'use client';

import { getFixtures } from "@/utils/apiFootball";
import { useQuery } from "react-query";
import "../styling/fixtures.css"
import CardSlider from "@/components/cardSlider";
import {Mosaic} from 'react-loading-indicators';

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

        const formatter = new Intl.DateTimeFormat("en-GB", {
            dateStyle: "medium",
            timeStyle: "short",
            hour12: true,
        })    

        const result = fixturesData.map(fixtures => {
            const fixturesDate = new Date(fixtures.fixture.date);
            const formattedDate = formatter.format(fixturesDate);
            return {...fixtures, formattedDate}
        });
            return result;
    }

    const fixtures = filterFixtures(fixturesData);
    
    return (
        <div className="fixtures-container">
          <h1>Fixtures</h1>
          {isLoading ? (
            <div className="loading">
            <Mosaic color="#32cd32" size="large" text="Loading" textColor="" />
            </div>
          ) : (
            <CardSlider fixtures={fixtures} />
          )}
        </div>
    )
}