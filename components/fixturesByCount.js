import { getClubFixtures } from "@/utils/apiFootball";
import { useQuery } from "react-query";
import "../styling/fixturesByCount.css"
import Image from "next/image";
import { Commet } from "react-loading-indicators";
import { MdErrorOutline } from "react-icons/md";

export default function FixturesByCount({teamId}) {

    const {data: fixtures, error, isLoading} = useQuery(
        ['fixtures', teamId], () => getClubFixtures(teamId), {
            staleTime: 1000 * 60 * 60,
            cacheTime: 1000 * 60 * 60 * 24
        }
    );
    
    const dateFormatter = new Intl.DateTimeFormat("en-GB", {
        month: 'short',
        day: 'numeric',
    });
    
    const timeFormatter = new Intl.DateTimeFormat("en-GB", {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true, 
    });

    const lastFive = fixtures?.last5Games    
    const nextGame = fixtures?.nextGame[0]; 

    const fixtureDate = nextGame?.fixture?.date ? dateFormatter.format(new Date(nextGame.fixture.date)) : 'Date not available';
    const fixtureTime = nextGame?.fixture.date ? timeFormatter.format(new Date(nextGame.fixture.date)) : 'Time not available';
    

    const findWinner = (fixture) => {
        const isHome = fixture.teams.home.id === teamId;
        const isAway = fixture.teams.away.id === teamId;
        const homeWin = fixture.teams.home.winner;
        const awayWin = fixture.teams.away.winner;

        if (homeWin === null && awayWin === null) {
            return 'fixture-draw'
        } else if (isHome && homeWin) {
            return 'fixture-win'
        } else if (isAway && awayWin) {
            return 'fixture-win'
        } else if (isHome && !homeWin) {
            return 'fixture-loss'
        } else if (isAway && !awayWin) {
            return 'fixture-loss'
        }
    }

    if (isLoading) {
        return <div className="loading">
            <Commet 
            color="#32cd32" 
            size="medium" />
        </div>
    }

    if (error) {
        return <div className="loading">
            <h2>Error fetching data 😟</h2>
            <MdErrorOutline size={60} color="red" />
            <p>Please refresh the page or try again later.</p>
        </div>
    }

    return (
        <div className="fixtures-container">
            <div className="previous-fixture">
            <h3>Previous fixtures</h3>
            {lastFive && Array.isArray(lastFive) && (
            <>
            {lastFive.map((fixture, i) => (
                <div className={findWinner(fixture)} key={i}>
                    <Image src={fixture.teams.home.logo} alt="home team logo" height={50} width={50} priority={true} />
                    <span className="fixture-goals">{fixture.goals.home}</span>
                    <p>-</p>
                    <span className="fixture-goals">{fixture.goals.away}</span>
                    <Image src={fixture.teams.away.logo} alt="away team logo" height={50} width={50} priority={true} />
                </div>
            ))}
            </>
            )}
            </div>

            <div className="upcoming-fixture">
            <h3>Upcoming fixtures</h3>
            {nextGame ? (
            <>
                <div className="next-fixture">
                <div className="team-home">
                    <Image src={nextGame.teams.home.logo} alt="home team logo" height={160} width={160} priority={true} />
                    <span className="team-name">{nextGame.teams.home.name}</span>
                </div>
                <div className="fixture-date-time">
                <p className="fixture-time">{fixtureTime}</p>
                <p className="fixture-date">{fixtureDate}</p>
                </div>
                <div className="team-away">
                    <Image src={nextGame.teams.away.logo} alt="away team logo" height={160} width={160} priority={true} />
                    <span className="team-name">{nextGame.teams.away.name}</span>
                </div>
                </div>
                </>
            ) : (
                <div>No upcoming fixtures</div>
            )}
            </div>
        </div>
    )
}
