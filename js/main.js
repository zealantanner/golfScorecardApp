function getGolf(id="") {
    return fetch(`https://golf-courses-api.herokuapp.com/courses/${id}`)
    .then(response => response.json())
}

let courseInfo;


window.addEventListener('load', function () {
    firstRender()
})

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

    courseInfo = (await getGolf()).courses
    console.log(courseInfo)
    for(let i=0;i<courseInfo.length;i++) {
        let temp = new Course(courseInfo[i].name,courseInfo[i].id,courseInfo[i].image)
        await temp.init()
        courses.push(temp)
    }
    console.log(courses)




    for(let i=0;i<courses.length;i++) {
        $('#contentContainer').append(`
            <div class="card" id="${courseInfo[i].id}">
                <img src="${courseInfo[i].image}">
                <h1>${courseInfo[i].name}</h1>
                <div class="buttons">
                    <button onclick="selectCourse(this)">Select Course</button>
                </div>
            </div>
        `)
    }

    for(let i=0;i<courses.length;i++) {

    }

}


async function selectCourse(that) {
    // $(that).parent().remove()
    let thing = (await getGolf(18300))
    console.log(thing)
}


