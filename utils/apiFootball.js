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

export const getFixtures = async (leagueId) => {
    const url = `${BASE_URL}/fixtures?league=${leagueId}&next=10`;
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