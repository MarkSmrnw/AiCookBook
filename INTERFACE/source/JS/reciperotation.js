document.addEventListener("DOMContentLoaded", function() {
    function showDishes() {
        const food = [
            "Spaghetti", 
            "Pizza", 
            "Sushi", 
            "Tacos", 
            "Burgers", 
            "Salad", 
            "Curry", 
            "Steak", 
            "Ramen"
        ]
        const images = [
            "source/media/images/spaghetti.webp",
            "source/media/images/pizza.webp",
            "source/media/images/sushi.webp",
            "source/media/images/taco.webp",
            "source/media/images/burger.webp",
            "source/media/images/salad.webp",
            "source/media/images/curry.webp",
            "source/media/images/steak.webp",
            "source/media/images/ramen.webp"
        ]
        const descriptions = [
            "A classic Italian pasta dish made with durum wheat semolina.",
            "A popular dish consisting of a flat round base topped with various ingredients.",
            "A Japanese dish of vinegared rice accompanied by various ingredients, such as seafood and vegetables.",
            "A traditional Mexican dish consisting of a folded or rolled tortilla filled with various ingredients.",
            "A sandwich consisting of a cooked patty of ground meat, usually beef, placed inside a sliced bun.",
            "A dish consisting of mixed raw or cooked vegetables, often served with a dressing.",
            "A South Asian dish made with meat or vegetables cooked in a spiced sauce, typically served with rice.",
            "A cut of meat that is grilled or fried, often served with sides like potatoes or vegetables.",
            "A Japanese noodle soup consisting of Chinese-style wheat noodles served in a meat- or fish-based broth."
        ]

        const rotationContainer = document.getElementById("recipe-rotation-wrapper")

        const randomIndex = Math.floor(Math.random() * food.length)
        const randomFood = food[randomIndex]
        const randomImage = images[randomIndex]
        const randomDescription = descriptions[randomIndex]

        rotationContainer.innerHTML = `
            <div class="card bg-dark text-white recipe-rotation" style="width: 18rem;">
                <img src="${randomImage}" class="card-img-top" alt="${randomFood}">
                <div class="card-body">
                    <h5 class="card-title">${randomFood}</h5>
                    <p class="card-text">${randomDescription}</p>
                    <a href="#" class="btn btn-primary">Try it!</a>
                </div>
            </div>
        `
    }

    showDishes()
    setInterval(() => {
        showDishes()
    }, interval = 5000)

});