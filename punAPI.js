export async function getPun() {
    let pun;

    await fetch ('https://v2.jokeapi.dev/joke/Programming?type=single', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    })
    .then(async (response) => {
        // throws an error if the response did not succeed
        if(!response.ok){
            throw new Error(`HTTP error: ${response.status}`);
        }
        // otherwise, fetch response
        const data = await response.json();
        return data;
    })
    .then((data) => {
        pun = JSON.stringify(data.joke);
    })
    
    .catch((error) => {
        console.error(`Could not fetch verse: ${error}`)
    })
    return pun;
}

// export function getPun() {
// fetch('https://v2.jokeapi.dev/joke/Programming?type=single' , {
//     method: 'GET',
//     headers: {
//         'Accept': 'application/json',
//     },
// })
//    .then(response => response.json())
//    .then(response => console.log(JSON.stringify(response)))
// }