function getGolf(id = "") {
    return fetch(`https://golf-courses-api.herokuapp.com/courses/${id}`)
        .then(response => response.json())
}

firstRender()

class Course {
    constructor(name, id, image) {
        this.name = name;
        this.id = id;
        this.image = image;
    }
    async init() {
        this.data = (await getGolf(this.id)).data
    }
}

const courses = []

async function firstRender() {
    // first get all the courses without the extra data
    const courseInfo = (await getGolf()).courses
    for (const course of courseInfo) {
        let temp = new Course(course.name, course.id, course.image)
        courses.push(temp)
    }
    console.log(courses)
    // render with the minimum data
    for (const course of courses) {
        $('#contentContainer').append(`
            <div class="card" id="${course.id}">
                <img src="${course.image}">
                <h1>${course.name}</h1>
                <div class="buttons">
                    <button onclick="renderValues(${course.id})">Select Course</button>
                </div>
            </div>
        `)
    }
    // at the end, get the extra data for each course
    for (const course of courses) {
        await course.init()
    }
}


const table = $('#theTable')
const topRow = $('#topRow')
const proRow = $('#proRow')
const hanRow = $('#hanRow')
const player1 = $('#player1Row')
const player2 = $('#player2Row')
const player3 = $('#player3Row')
const player4 = $('#player4Row')
const players = [player1, player2, player3, player4]
const parRow = $('#parRow')

function renderTotals() {
    function giveThreeTotals(arr) {
        // console.log(arr)
        let OUT = 0
        let IN = 0
        let TOTAL = 0
        for (let i = 0; i < 9; i++) {
            if (arr[i]) {
                OUT += +arr[i]
            }
        }
        for (let i = 9; i < 18; i++) {
            if (arr[i]) {
                IN += +arr[i]
            }
        }
        TOTAL = OUT + IN
        return {
            "out": OUT,
            "in": IN,
            "total": TOTAL,
            // "out": OUT,
            // "in": IN,
            // "total": TOTAL,
        }
    }
    for (let row of [proRow, parRow]) {
        let temp = []
        for (let val of row.children('.val')) {
            val = $(val)[0]
            try {
                temp.push(+val.innerText)
            } catch (error) {
                console.log("it's empty")
            }
        }
        let temp2 = giveThreeTotals(temp)
        row.children('.out')[0].innerText = temp2.out
        row.children('.in')[0].innerText = temp2.in
        row.children('.tot')[0].innerText = temp2.total
    }
    for (let row of players) {
        let temp = []
        for (let val of row.children('.val')) {
            val = $(val).children('input')[0]
            try {
                temp.push(val.value)
            } catch (error) {
                console.log("it's empty")
            }
        }
        let temp2 = giveThreeTotals(temp)
        row.children('.out')[0].innerText = temp2.out
        row.children('.in')[0].innerText = temp2.in
        row.children('.tot')[0].innerText = temp2.total
    }

    for (let playerRow of players) {
        let values = playerRow.children('.playerName').children('input')[0].value.split(" ")
        playerRow.children('.playerInitials')[0].innerText = ''
        let temp = ''
        for (let value of values) {
            if (value[0]) {
                temp += value[0].toUpperCase()
            }
        }
        playerRow.children('.playerInitials')[0].innerText = temp
    }
}

renderTotals()
function renderValues(id) {
    let courseInfo;
    for (const course of courses) {
        if (course.id == id) {
            courseInfo = course.data
            $('#image').attr('src', course.image);
            $('#image').attr('style', 'opacity: 1');
            document.getElementById('location').innerText = course.name
        }
    }
    console.log(courseInfo)
    const course = courseInfo;
    for (let i = 0; i < 18; i++) {
        proRow.children('.val')[i].innerText = course.holes[i].teeBoxes[0].meters
        hanRow.children('.val')[i].innerText = course.holes[i].teeBoxes[0].hcp
        parRow.children('.val')[i].innerText = course.holes[i].teeBoxes[0].par
    }
    renderTotals()
}