// Get reference to the row element where recipe cards will be displayed
let reciperow0 = document.getElementById("row0");
let row0title = document.getElementById("searchtitle")
let reciperow1 = document.getElementById("row1");
let reciperow2 = document.getElementById("row2");
let reciperow3 = document.getElementById("row3");
let input = document.getElementById("searchinput")
let search = document.getElementById("searchbutton")
let searchrow = document.getElementById("searchrow")

search.addEventListener("click", (e)=>{
    e.preventDefault();

    let suche = input.value
    if(suche.trim() === ""){
        return
    }
    
    suche = suche.toLowerCase().trim().replace(/\s+/g, "");
    
    const gefundeneFoods = foods
    .map((food, index) => {
        let name = food.name.toLowerCase().trim().replace(/\s+/g, "");
        let beschreibung = food.beschreibung.toLowerCase().trim().replace(/\s+/g, "");
        if (name.includes(suche) || beschreibung.includes(suche)) {
            return { index }; 
        }
        return null;
    })
    .filter(item => item !== null);
    reciperow0.innerHTML = ""
    if(gefundeneFoods.length == 0){
        console.log("lolooll")
        row0title.style.display = "block"
        row0.style.display = "flex"
    }

    gefundeneFoods.forEach(e => {
        cardcreate(e.index,reciperow0)
    });
    row0title.style.display = "block"
    row0.style.display = "flex"
    
})

function createCards(reihe){

    let lastitem = [];


    for(let i = 0; i < 10; i++){

        let randomnum = Math.floor(Math.random() * foods.length)
        console.log(foods[randomnum])
        
        if(lastitem.includes(randomnum)){
            continue;
        }
    
    lastitem.push(randomnum);
    cardcreate(randomnum,reihe);

    }
}

function cardcreate(num,row){
    let cardDiv = document.createElement("div");
    cardDiv.dataset.num = num;

    if(!window.darkmode){
         cardDiv.classList.add("card", "text-black");
    }
    else{
        cardDiv.classList.add("card", "bg-dark", "text-white");
    } 
    
    cardDiv.style.width = "18rem";

    let img = document.createElement("img");
    img.src = foods[num].image;
    img.classList.add("card-img-top");

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = foods[num].name;

    let cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = foods[num].beschreibung;

    row.appendChild(cardDiv)
    cardDiv.appendChild(img)
    cardDiv.appendChild(cardBody)
    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardText)
}

document.addEventListener("click", (e) => {
    const clickedCard = e.target.closest(".card");
    if (clickedCard) {
        let number = clickedCard.dataset.num
        let name = foods[number].name
        let description = foods[number].beschreibung;
        let params = new URLSearchParams({
            recipeId:number,
            recipeName: name,
            recipeDescription: description
        })
        window.location.href = `/INTERFACE/chat.html?${params.toString()}`
    }else return;
});

console.log(foods)
createCards(reciperow1);
createCards(reciperow2);
createCards(reciperow3);