function createCard(
    cardTitle = "",
    cardBody = "",
    cardFooter = "",
    cardImage = "",
    cardList = [],  // bei [] zb "Entry 1", "Entry 2", usw... 
    cardStyle = "" ,                                            
    darkmode = true,
    id = ""
) {
    let card 
    let changes = 0

    if (darkmode) {
        card = `<div class="card bg-dark text-white" id="${id}" style="${cardStyle}">`
    } else {
        card = `<div class="card" id="${id}" style="${cardStyle}2>`
    }

    let hasBody = false

    if (cardImage != "") { changes++
        card += `
        <img src="${cardImage}" class="card-img-top" alt="image">`
    }

    if (cardTitle != "") { changes++
        card += `
        <div class="card-body"> <h5 class="card-title"> ${cardTitle} </h5>`
        hasBody = true
    }
    if (cardBody != "") { changes++
        if (hasBody) { card += `<p> ${cardBody} </p>`}
        else {
            card += `
            <div class="card-body"> <p> ${cardBody} </p>`
            hasBody = true
        }
    }

    if (hasBody == true) {card += `</div>`}

    if (cardList.length > 0) { changes++

        card += `
        <ul class="list-group list-group-flush">`

        for (let i in cardList) {
            if (darkmode) {
                card += `
                <li class="list-group-item bg-dark text-white border-dark">${cardList[i]}</li>`
            } else {
                card += `
                <li class="list-group-item">${cardList[i]}</li>`
            }
        }

        card += `</ul>`
    }

    if (cardFooter != "") {
        card += `
        <div class="card-footer"> ${cardFooter} </div>`
    }

    card += `</div>`

    if (changes > 0) {return card}
    else {return null}
}

document.addEventListener("DOMContentLoaded", () => {

    const foods = [
            {name: "Spaghetti", image:"source/media/images/spaghetti.webp", beschreibung: "A classic Italian pasta dish made with durum wheat semolina." , typ: ["Vegan", "Vegetarian", "Lactose-free"]},
            {name: "Salami Pizza", image:"source/media/images/pizza.webp", beschreibung: "A popular dish consisting of a flat round base topped with various ingredients.", typ: ["Egg-free", "Nut-free", "Soy-free"]},
            {name: "Sushi", image:"source/media/images/sushi.webp", beschreibung: "A Japanese dish of vinegared rice accompanied by various ingredients, such as seafood and vegetables.", typ: ["Nut-free", "Yeast-free", "Lactose-free"]},
            {name: "Tacos",  image:"source/media/images/taco.webp", beschreibung: "A traditional Mexican dish consisting of a folded or rolled tortilla filled with various ingredients.", typ: ["Egg-free", "Nut-free", "Yeast-free"]},
            {name: "Burgers", image:"source/media/images/burger.webp", beschreibung: "A sandwich consisting of a cooked patty of ground meat, usually beef, placed inside a sliced bun.", typ: ["Nut-free", "Fish-free", "Egg-free"]},
            {name: "Salad", image:"source/media/images/salad.webp", beschreibung: "A dish consisting of mixed raw or cooked vegetables, often served with a dressing.", typ:["Vegetarian", "Raw food", "Nut-free"]},
            {name: "Curry",  image:"source/media/images/curry.webp", beschreibung: "A South Asian dish made with meat or vegetables cooked in a spiced sauce, typically served with rice.", typ:["Egg-free", "Gluten-free", "Nut-free"]},
            {name: "Steak", image:"source/media/images/steak.webp", beschreibung: "A cut of meat that is grilled or fried, often served with sides like potatoes or vegetables.", typ:["Soy-free", "Gluten-free", "Lactose-free"]},
            {name: "Ramen", image:"source/media/images/ramen.webp", beschreibung: "A Japanese noodle soup consisting of Chinese-style wheat noodles served in a meat- or fish-based broth.", typ:["Nut-free", "Lactose-free", "Yeast-free"]},
            {name: "Chicken Nuggets", image:"source/media/images/Chicken-Nuggets.webp", beschreibung: "Breaded and fried chicken pieces.", typ: ["Nut-free", "Egg-free", "Yeast-free"]},
            {name: "Tomato Soup", image:"source/media/images/Tomato-Soup.webp", beschreibung: "Warm soup made from pureed tomatoes, herbs, and spices.", typ: ["Vegetarian", "Gluten-free", "Nut-free"]},
            {name: "Pancakes", image:"source/media/images/Pancakes.webp", beschreibung: "Fluffy flat cakes served with syrup or fruit.", typ: ["Vegetarian", "Nut-free", "Yeast-free"]},
            {name: "Mac and Cheese", image:"source/media/images/Mac-and-Cheese.webp", beschreibung: "Pasta in a creamy cheese sauce.", typ: ["Nut-free", "Yeast-free", "Egg-free"]},
            {name: "Fish and Chips", image:"source/media/images/Fish-and-Chips.webp", beschreibung: "A British classic of battered and deep-fried white fish served with crispy fries and tartar sauce.", typ: ["Egg-free", "Nut-free", "Yeast-free"]},
            {name: "Lasagna", image:"source/media/images/Lasagna.webp", beschreibung: "Oven-baked pasta layered with meat sauce, béchamel, and melted cheese, often topped with herbs.", typ: ["Nut-free", "Yeast-free", "Soy-free"]},
            {name: "Chili con Carne", image:"source/media/images/Chili-con-Carne.webp", beschreibung: "A spicy stew made with minced meat, kidney beans, tomatoes, and chili peppers.", typ: ["Nut-free", "Yeast-free", "Soy-free"]},
            {name: "Scrambled Eggs", image:"source/media/images/Scrambled-Eggs.webp", beschreibung: "Whisked eggs cooked until fluffy, often seasoned and served for breakfast.", typ: ["Vegetarian", "Lactose-free", "Gluten-free"]},
            {name: "Mashed Potatoes", image:"source/media/images/Mashed-Potatoes.webp", beschreibung: "Boiled potatoes mashed with butter, milk, and seasoning, served as a side dish.", typ: ["Soy-free", "Vegetarian", "Gluten-free"]},
            {name: "Hot Dog", image:"source/media/images/Hot-Dog.webp", beschreibung: "A cooked sausage in a soft bun, often topped with mustard, ketchup, or onions.", typ: ["Nut-free", "Yeast-free", "Soy-free"]},
            {name: "Fried Rice", image:"source/media/images/Fried-Rice.webp", beschreibung: "Stir-fried rice with vegetables, eggs, and optionally chicken or shrimp, seasoned with soy sauce.", typ: ["Nut-free", "Yeast-free", "Gluten-free"]},
            {name: "Omelette", image:"source/media/images/Omelette.webp", beschreibung: "Eggs beaten and fried in a pan, filled with cheese, vegetables, or ham.", typ: ["Vegetarian", "Soy-free", "Nut-free"]},
            {name: "Baked Potato", image:"source/media/images/Baked-Potato.webp", beschreibung: "A whole potato baked until soft, often topped with butter, sour cream, or cheese.", typ: ["Vegan", "Vegetarian", "Lactose-free"]},
            {name: "Goulash", image:"source/media/images/Gulasch.webp", beschreibung: "A hearty stew of beef, onions, and paprika, slow-cooked to develop rich flavors, popular in Central Europe.", typ: ["Lactose-free", "Egg-free", "Nut-free"]},
            {name: "Currywurst", image:"source/media/images/Currywurst.webp", beschreibung: "Sliced sausage topped with a spiced ketchup-based curry sauce, often served with fries.", typ: ["Yeast-free", "Nut-free", "Soy-free"]},
            {name: "Cutlet", image:"source/media/images/Schnitzel.webp", beschreibung: "Breaded and fried meat cutlet, typically pork or chicken, served with potatoes or salad.", typ: ["Soy-free", "Nut-free", "Yeast-free"]},
            {name: "Roast Chicken", image:"source/media/images/Roast-Chicken.webp", beschreibung: "Whole chicken seasoned and roasted until crispy on the outside and juicy inside.", typ: ["Soy-free", "Nut-free", "Yeast-free"]},
            {name: "Egg Salad Sandwich", image:"source/media/images/Egg-Salad-Sandwich.webp", beschreibung: "Chopped boiled eggs mixed with mayonnaise, often served cold on bread or toast.", typ: ["Vegetarian", "Nut-free", "Lactose-free"]},
            {name: "Pelmeni", image:"source/media/images/Pelmeni.webp", beschreibung: "Russian-style dumplings made with thin dough and filled with minced meat (usually pork, beef, or lamb), boiled and served with sour cream or butter.", typ: ["Lactose-free", "Nut-free", "Yeast-free"]},
            {name: "Ravioli", image:"source/media/images/Ravioli.webp", beschreibung: "Italian pasta pockets filled with cheese, vegetables, or meat, typically served with tomato or cream sauce.", typ: ["Soy-free", "Nut-free", "Yeast-free"]},
            {name: "Ham Pasta Casserole", image:"source/media/images/Ham-Pasta-Casserole.webp", beschreibung: "A baked German pasta casserole with ham, cheese, cream or milk, and sometimes vegetables. Golden and crispy on top.", typ: ["Soy-free", "Nut-free", "Yeast-free"]},
            {name: "Falafel", image:"source/media/images/Falafel.webp", beschreibung: "Deep-fried chickpea balls served in pita bread with salad and tahini.", typ: ["Vegan", "Vegetarian", "Lactose-free"]},
            {name: "Kimchi", image:"source/media/images/Kimchi.webp", beschreibung: "Spicy fermented cabbage and vegetables, served as a side dish.", typ: ["Gluten-free", "Egg-free", "Nut-free"]},
            {name: "Pad Thai", image:"source/media/images/Pad-Thai.webp", beschreibung: "Stir-fried rice noodles with tofu, shrimp, peanuts, and tamarind sauce.", typ: ["Yeast-free", "Lactose-free", "Pescatarian"]},
            {name: "Ceviche", image:"source/media/images/Ceviche.webp", beschreibung: "Raw fish marinated in citrus juice with onions, chili, and cilantro.", typ: ["Lactose-free", "Soy-free", "Egg-free"]},
            {name: "Shepherd’s Pie", image:"source/media/images/Shepherds-Pie.webp", beschreibung: "Mashed potatoes layered over ground meat and vegetables, baked until golden.", typ: ["Egg-free", "Soy-free", "Nut-free"]},
            {name: "Empanadas", image:"source/media/images/Empanadas.webp", beschreibung: "Dough pockets filled with meat, cheese, or vegetables, baked or fried.", typ: ["Soy-free", "Yeast-free", "Nut-free"]},
            {name: "Onigiri", image:"source/media/images/Onigiri.webp", beschreibung: "Rice balls filled with tuna, pickled plum, or salmon, wrapped in seaweed.", typ: ["Lactose-free", "Gluten-free", "Egg-free"]},
            {name: "Mochi", image:"source/media/images/Mochi.webp", beschreibung: "Sticky rice cakes with sweet fillings like red bean paste, matcha, or fruit.", typ: ["Vegetarian", "Yeast-free", "Egg-free"]}
    ]

    const rotationWrapper = document.getElementById("recipe-rotation-wrapper")
    
    let mouseCaptured = false
    let mouseEnterEvent
    let mouseLeaveEvent
    let mouseMoveEvent

    let allowedToLeave = false
    let requiresNewCard = true
    let mostRecentPicks = []

    let exitChecks = 0


    function updateMostRecent(newi = "NONE") { // Updated die mostRecentPicks liste. Neu vorne, alt hinten.
        if (newi != "NONE") {
            let temp = []; temp[0] = newi
            for (let i = 0; i < mostRecentPicks.length; i++) {
                if (i+1 < 5) {temp[i+1] = mostRecentPicks[i]} // IF kontrolliert wie lange der check sein soll
            }
            mostRecentPicks = temp
            console.log("MOST RECENT: " + mostRecentPicks)
        } else {
            throw Error("needs number")
        }
    }

    function main() {
        if (requiresNewCard && document.hasFocus()) { requiresNewCard = false
            let randomIndex

            while (true) {
                randomIndex = Math.floor(Math.random() * foods.length)
                if (!mostRecentPicks.includes(randomIndex)) {
                    updateMostRecent(randomIndex)
                    break
                }
            }

            newCard = createCard(
                foods[randomIndex].name,
                foods[randomIndex].beschreibung,
                `<a href="#" class="btn btn-secondary">Try it!</a>`,
                 foods[randomIndex].image,
                [], "width: 18rem;", true, "latestCard" // OPACITY HINZUFÜGEN
            )
            rotationWrapper.innerHTML = newCard

            const card = document.getElementById("latestCard")

            card.classList.add("recipe-rotation")

            setTimeout(function() {
                card.classList.remove("recipe-rotation")

                function mouseEnterLogic() {
                    mouseCaptured = true 
                }
                function mouseExitLogic() {
                    mouseCaptured = false
                }
                
                card.addEventListener("mouseenter", mouseEnterLogic)
                card.addEventListener("mouseleave", mouseExitLogic)

                mouseEnterEvent = mouseEnterLogic
                mouseLeaveEvent = mouseExitLogic

                setTimeout(() => {
                    allowedToLeave = true
                }, 1000)  
            }, 2000)

        }

        if (allowedToLeave && mouseCaptured != true && document.hasFocus()) { 
            if (exitChecks >= 10) {
                allowedToLeave = false
                const card = document.getElementById("latestCard")

                card.removeEventListener("mouseenter", mouseEnterEvent)
                card.removeEventListener("mouseleave", mouseLeaveEvent)
                document.removeEventListener('mousemove', mouseMoveEvent)  

                card.classList.add("recipe-rotation-outro")
                card.style = "width: 18rem; opacity:0;"

            setTimeout(() => {
                requiresNewCard = true
            }, 3000)
            } else exitChecks++
        } else {exitChecks = 0}
    }

    setInterval(main, 100)
})