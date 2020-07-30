export function fetchPlayer(name){     
    // const arrayTeam = team.split(' ')
    // const stringTeam = arrayTeam.join('%20')    

    const arrayName = name.split(' ')    

    const lastName = arrayName[1]
    const firstName = arrayName[0]    

    const firstLetterLastName = lastName[0].toUpperCase()
    const firstLetterFirstName = firstName[0].toUpperCase()

    const finalLast = firstLetterLastName + lastName.slice(1)
    const finalFirst = firstLetterFirstName + firstName.slice(1)

   return fetch(`https://api-nba-v1.p.rapidapi.com/players/lastName/${finalLast}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
            "x-rapidapi-key": "B7tAHxbA6fmshrVBhLe2OUNB7T7vp1TzDPWjsnuz5E9v27Bf4o"
        }
    })
    .then(response => {
        return response.json()        
    })
    .then(data => {                
        return data.api.players.filter((player) => player.firstName === finalFirst)[0]
    })
    .catch(err => {
        console.log(err);
    });
}

export function fetchImage(name){
    const arrayName = name.split(' ')
    const lastName = arrayName[1]
    const firstName = arrayName[0]

    
    return fetch(`https://nba-players.herokuapp.com/players/${lastName}/${firstName}`)
    .then(response => {        
        return response.blob()
    })
    .then(blob => {                       
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
    })
    .then((data) => {
        return data
    })
    .catch(err => {
        console.log(err);
    });
}

export function fetchPlayerStats(name){
    const arrayName = name.split(' ')
    const lastName = arrayName[1]
    const firstName = arrayName[0]

    return fetch(`https://nba-players.herokuapp.com/players-stats/${lastName}/${firstName}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            return data
        })
        .catch(err => {
            console.log(err)
        }) 
}