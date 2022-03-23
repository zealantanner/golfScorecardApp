function getGolfCoursesPromise() {
    return fetch('https://golf-courses-api.herokuapp.com/courses/')
    .then(response => response.json())
    .then(data => activities.push(data));
}

let activities = []
async function getMultipleActivities(times) {
    activities = []
    for(let i=0;i<times;i++) {
        const activity = getOneActivityPromise()
        activities.push(await activity)
    }
    return activities
}

async function render(input) {
    activities = getMultipleActivities(input)
    console.log(activities)
    let activitiesHtml = 'hi'
    for(let i = 0; i < activities.length; i++) {
        activitiesHtml += `<div id="${activities[i].activity}">${activities[i].activity}</div>`;
    }

    document.querySelector('#activities').innerHTML = activitiesHtml;
}



function displayActivities(list) {
    let listHtml = 'hi'
    for(let i = 0; i < list.length; i++) {
        listHtml += `<div id="${list[i].name}">${list[i].name}</div>`;
    }

    document.querySelector('#activities').innerHTML = listHtml;
}