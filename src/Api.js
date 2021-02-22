

export const makeRequest = ( paieškos_tekstas) => {

    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=2cb87349e171c9cfd1999d27a7c47f67&language=en-US&query=${paieškos_tekstas}`, {
        method: 'GET',
    }).then((response) => {
        if (!response.ok) { throw response }
        return response.json()
    })
}