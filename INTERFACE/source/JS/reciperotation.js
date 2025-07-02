document.addEventListener("DOMContentLoaded", function() {

    let showDishInterval;
    let timeout;

        const rezept = [
            {name: "Standard Spaghetti", image:"source/media/images/spaghetti.webp", beschreibung: "A classic Italian pasta dish made with durum wheat semolina." , typ: ["Vegan", "Vegetarian", "Lactose-free"]},
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
            {name: "Gulasch", image:"source/media/images/Gulasch.webp", beschreibung: "A hearty stew of beef, onions, and paprika, slow-cooked to develop rich flavors, popular in Central Europe.", typ: ["Lactose-free", "Egg-free", "Nut-free"]},
            {name: "Currywurst", image:"source/media/images/Currywurst.webp", beschreibung: "Sliced sausage topped with a spiced ketchup-based curry sauce, often served with fries.", typ: ["Yeast-free", "Nut-free", "Soy-free"]},
            {name: "Schnitzel", image:"source/media/images/Schnitzel.webp", beschreibung: "Breaded and fried meat cutlet, typically pork or chicken, served with potatoes or salad.", typ: ["Soy-free", "Nut-free", "Yeast-free"]},
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

    let lastitem;
    let divone
    function showDishes() {

        const rotationContainer = document.getElementById("recipe-rotation-wrapper")

        const randomIndex = Math.floor(Math.random() * rezept.length)

        if(randomIndex == lastitem) 
            {
                showDishes()
                return
            }
            
            const randomFood = rezept[randomIndex].name
            const randomImage = rezept[randomIndex].image
            const randomDescription = rezept[randomIndex].beschreibung
            const foodTypes = rezept[randomIndex].typ

            let foodText = ""

            for (let i in foodTypes) {
                if (i == 0) {foodText = foodTypes[i]} 
                else if (i == foodTypes.length-1) {foodText = `${foodText} and ${foodTypes[i]}`} 
                else if (!foodTypes.length > 1) {foodText = `${foodText}, ${foodTypes[i]}`}
            }

            //recipe-rotation

            divone = document.createElement("div");
            divone.classList.add("card", "bg-dark", "text-white", "d-flex", "recipe-rotation");
            divone.id = "Card"
            divone.style.width = "18rem";

            let img = document.createElement("img");
            img.src = randomImage;
            img.alt = randomFood;
            img.classList.add("card-img-top");

            let divtwo = document.createElement("div");
            divtwo.classList.add("card-body");

            let h5 = document.createElement("h5");
            h5.classList.add("card-title");
            h5.textContent = randomFood;

            let pone = document.createElement("p");
            pone.classList.add("card-text");
            pone.textContent = randomDescription;

            let ptwo = document.createElement("p");
            ptwo.classList.add("card-text");
            ptwo.textContent = foodText;

            let a = document.createElement("a");
            a.href = "#";
            a.classList.add("btn", "btn-primary");
            a.textContent = "Try it!";

            rotationContainer.classList.add("rotationContain");

            rotationContainer.appendChild(divone)
            divone.appendChild(img)
            divone.appendChild(divtwo)
            divtwo.appendChild(h5)
            divtwo.appendChild(pone)
            divtwo.appendChild(ptwo)
            divtwo.appendChild(a)

            lastitem = randomIndex

                divone.addEventListener("mouseenter", () =>{
                    console.log("in")
                    clearInterval(showDishInterval);
                    clearTimeout(timeout)
                    divone.classList.remove('scale-normal');
                    divone.classList.add('scale-big');
                })
             
                divone.addEventListener("mouseleave", () =>{
                    console.log("out")
                    divone.classList.remove("scale-big")
                    divone.classList.add("scale-normal")
                    outroanimation();
                    showDishInterval = setInterval(() => {
                    divone.remove();
                    showDishes()
                    outroanimation();
                }, 5000)
            })
        }

        showDishes()
        outroanimation();

    showDishInterval = setInterval(() => {
        divone.remove();
        showDishes()
        outroanimation();
    }, 5000)

function outroanimation(){
            timeout = setTimeout(() =>{
            divone.classList.remove("recipe-rotation")
            divone.classList.add("recipe-rotation-outro")
            setTimeout(()=>{
                divone.remove();
            }, 2000)
        }, 2000)
}

});