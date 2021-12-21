document.addEventListener('DOMContentLoaded', () => {

    const monsterContainer = document.getElementById('monster-container')

    
    let pageNumber =1

    



    let addMonsterToPage = (obj) => {
        let li = document.createElement('li')
        monsterContainer.append(li)
        let h1 = document.createElement('h1')
        li.append(h1)
        h1.innerText =obj.name
        let h2 = document.createElement('h2')
        li.append(h2)
        h2.innerText = `Age: ${obj.age}`
        let h3 = document.createElement('h3')
        li.append(h3)
        h3.innerText = obj.description
        
        

    }





    let nextPagebtn = document.querySelector("#forward")
    nextPagebtn.addEventListener('click', () => {
        monsterContainer.innerHTML = ""
        
        pageNumber++
        console.log(pageNumber)
        getMonsters()
    })

    let previousPageBtn = document.querySelector("#back")
    previousPageBtn.addEventListener('click', () => {
        monsterContainer.innerHTML = ""
        pageNumber--
        getMonsters()
        console.log(pageNumber)
    })

    let monsterForm = document.getElementById('monster-form')
    monsterForm.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log('click')
        debugger
        postMonster(e.target.monsterName.value, e.target.age.value, e.target.description.value)
    })

    const getMonsters = () => {
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
        .then(resp => resp.json())
        .then(data => {
            data.forEach(monster => {
                addMonsterToPage(monster)
            });
        })
    }


    const postMonster = (name, age, description) => {
        fetch("http://localhost:3000/monsters", {
            method: 'POST',
            headers:
            {"Content-Type": "application/json",
            Accept: "application/json"},
            body: JSON.stringify({
                "name": name,
                "age": age,
                "description": description
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            addMonsterToPage(data)
        })
    }



    getMonsters()
})
