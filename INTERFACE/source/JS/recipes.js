// Get reference to the row element where recipe cards will be displayed
let reciperow1 = document.getElementById("row1");
let reciperow2 = document.getElementById("row2");
let reciperow3 = document.getElementById("row3");

// Function to create recipe cards dynamically
function createCards(){
    // Array to track already selected recipe indices to avoid duplicates
    let lastitem = [];

    // Generate 10 random recipe cards
    for(let i = 0; i < 10; i++){
        // Generate random index from foods array
        let randomnum = Math.floor(Math.random() * foods.length)
        console.log(foods[randomnum])
        
        // Check if this recipe was already selected
        if(lastitem.includes(randomnum)){
            i--; // Decrement counter to retry with different recipe
            continue;
        }
    
    // Add current recipe index to prevent duplicates
    lastitem.push(randomnum);

    // Create main card container
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "bg-dark", "text-white");
    cardDiv.style.width = "18rem";

    // Create and configure recipe image
    let img = document.createElement("img");
    img.src = foods[randomnum].image;
    img.classList.add("card-img-top");

    // Create card body container
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    // Create recipe title element
    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = foods[randomnum].name;

    // Create recipe description element
    let cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = foods[randomnum].beschreibung;

    // Append elements to DOM in hierarchical order
    reciperow1.appendChild(cardDiv)
    cardDiv.appendChild(img)
    cardDiv.appendChild(cardBody)
    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardText)
    }
}

// Debug output and initialize card creation
console.log(foods)
createCards();