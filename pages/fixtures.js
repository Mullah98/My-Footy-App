'use client';

import { getFixtures } from "@/utils/apiFootball";
import { useQuery } from "react-query";
import "../styling/fixtures.css"
import Image from "next/image";

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
        // console.log(result);
        return result;
    }

    const fixtures = filterFixtures(fixturesData);
    console.log(fixtures[1]);
    
    
    return (
        <div className="fixtures-container">
          <h1>Fixtures</h1>
            {fixtures.map((fixture, i) => (
          <div className="matches" key={i}>
          <h4>{fixture.formattedDate}</h4>
          <h4>Venue: {fixture.fixture.venue.name}</h4>  
          <h3>
           <Image src={fixture.teams.home.logo} alt="icon for home team" height={150} width={140} priority={true} />
           {fixture.teams.home.name} vs {fixture.teams.away.name}
           <Image src={fixture.teams.away.logo} alt="icon for away team" height={150} width={140} priority={true} />
           </h3>

          </div>
        ))}
        </div>
    )
}