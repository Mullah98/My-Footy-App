const BASE_URL = 'https://api-football-v1.p.rapidapi.com/v3';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const HEADERS = {
    'x-rapidapi-key': API_KEY,
	'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
};

export const getLeagues = async () => {
    const url = `${BASE_URL}/leagues`;
    const options = {
        method: 'GET',
        headers: HEADERS,
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result.response
    } catch(error) {
        console.log('Error fetching leagues', error);
        throw error;
    }
}

export const getStandings = async (leagueId, year) => {
    const url = `${BASE_URL}/standings?league=${leagueId}&season=${year}`;
    const options = {
        method: 'GET',
        headers: HEADERS,
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result.response[0].league.standings
    } catch(error) {
        console.log('Error fetching standings', error);
        throw error;
    }
}

export const getFixtures = async (leagueId, round) => {
    const url = `${BASE_URL}/fixtures?league=${leagueId}&season=2024&round=Regular%20Season%20-%20${round}`;
    const options = {
        method: 'GET',
        headers: HEADERS,
    };

    try {
        const response = await fetch(url, options);
        const result  = await response.json();
        return result.response;
    } catch(error) {
        console.log('Error fetching fixtures', error);
        throw error;
    }
}


export const searchTeam = async (team) => {
    const url = `${BASE_URL}/teams?search=${team}`;
    const options = {
        method: 'GET',
        headers: HEADERS,
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result.response;
        
        
    } catch(error) {
        console.log('Error fetch teams', error);
        throw error;
    }
}

export const getClubFixtures = async (teamId) => {
    const url1 = `${BASE_URL}/fixtures?season=2024&team=${teamId}&last=5`
    const url2 = `${BASE_URL}/fixtures?season=2024&team=${teamId}&next=5`

    const options = {
        method: 'GET',
        headers: HEADERS,
    };

    try {
        const [lastResp, nextResp] = await Promise.all([
            fetch(url1, options), 
            fetch(url2, options)
        ]);

        if (!lastResp.ok || !nextResp.ok) {
            throw new Error('Failed to fetch data')
        }

        const last5Games = await lastResp.json();
        const nextGame = await nextResp.json();
        return {
            last5Games: last5Games.response.reverse(), 
            nextGame: nextGame.response
        }
    } catch (error) {
        console.log('Error fetching fixtures', error);
        throw error;
    }
}
