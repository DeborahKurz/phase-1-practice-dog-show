document.addEventListener('DOMContentLoaded', () => {
    fetchDogs();
})

function fetchDogs(){
    fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(dogsArr =>{
        renderDogs(dogsArr)
    })
};

function renderDogs(dogsArr){
    const dogTable = document.getElementById('table-body');
    dogsArr.forEach(dogObj =>{
        const renderRow = document.createElement('tr');
        renderRow.className = "dogCard";
        dogTable.appendChild(renderRow);

        let tdName = document.createElement('td');
        tdName.textContent = dogObj.name;
        let tdBreed = document.createElement('td');
        tdBreed.textContent = dogObj.breed;
        let tdDogSex = document.createElement('td');
        tdDogSex.textContent = dogObj.sex;
        let tdBtnCell = document.createElement('td');
        renderRow.append(tdName, tdBreed, tdDogSex, tdBtnCell);

        let tdDogBtn = document.createElement('button');
        tdDogBtn.textContent = " Edit Dog ";
        tdBtnCell.appendChild(tdDogBtn);

        tdDogBtn.addEventListener("click", ()=>{
            let name = tdName.textContent;
            let breed = tdBreed.textContent;
            let sex = tdDogSex.textContent;
            populateForm(name, breed, sex, dogObj);  
        })
    })
} 

const form = document.getElementById('dog-form');

function populateForm(name, breed, sex, dogObj){
    let inputName = form.name;
    inputName.value = name;
    let inputBreed = form.breed;
    inputBreed.value = breed;
    let inputSex = form.sex;
    inputSex.value = sex;
    form.addEventListener("submit", (e)=>{
            e.preventDefault()
            dogObj.name = inputName.value;
            dogObj.breed = inputBreed.value;
            dogObj.sex = inputSex.value;
            makePatch(dogObj);
    })
};

function makePatch(dogObj){
    fetch(`http://localhost:3000/dogs/${dogObj.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(dogObj)
    })
    .then(resp => resp.json())
    .then(dogObj =>{
        clearRendered();
        fetchDogs();
    })
};

function clearRendered(){
    const getAllDogRows = document.querySelectorAll(".dogCard");
    for(let dogRow of getAllDogRows){
        dogRow.remove();
    }
}

//remove what someone has typed int he input box after they hit submit
// function clearForm(){

// }