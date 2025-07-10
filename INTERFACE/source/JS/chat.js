// const { ZeroShotImageClassificationPipeline } = require("@huggingface/transformers");

let chatbox = document.getElementById("chatbox");
let input = document.getElementById("input");
let send = document.getElementById("send");
let welcomemessage = document.getElementById("startwelcomemessage")
let chatslist = document.querySelectorAll(".chatAdd, .chatItem")
let collapse = document.getElementsByClassName("collapselist")[0]
let collapseimg = collapse.querySelector("img");
let collapsep = collapse.querySelector("p")
let chatsbox = document.getElementById("chatlist")
let sending;

let botmessage

let offen = true;
collapse.addEventListener("click", () => {
    if (offen) {
        chatsbox.style.zIndex = "-1";
        chatsbox.style.position = "absolute"
        collapse.style.maxWidth = "55px";
        collapseimg.style.width = "40px";
        collapseimg.style.height = "40px";
        collapsep.style.display = "none";

        chatslist.forEach((l) => {
            l.classList.add("chat-collapsed");
            setTimeout(()=>{
                l.style.left = "-600px"
            },250)
        });

        offen = false;
    } else {
        chatsbox.style.zIndex = "10";
        chatsbox.style.position = ""
        collapse.style.maxWidth = "300px";
        collapseimg.style.width = "";
        collapseimg.style.height = "";
        collapsep.style.display = "";
        
        chatslist.forEach((l) => {
            l.classList.remove("chat-collapsed");
            l.style.left = "0"
        });

        offen = true;
    }
});


let placeholders = [
    "Are you hungry?", "Welcome!", "Looking for new recipies?"
]
let rand = Math.floor(Math.random() * placeholders.length)
input.placeholder = placeholders[rand] 

function sendMessage(){
    let usermessage = document.createElement("div")

    
    if(input.value.trim() == "") {
        input.value = "";
        return
    };

usermessage.className = "usermessage";

if (welcomemessage) welcomemessage.remove()

chatbox.appendChild(usermessage);
usermessage.textContent = input.value;
requestShowcase();
tempBotMessage()
input.value = ""

chatbox.scrollTo({
  top: chatbox.scrollHeight,
  behavior: "smooth"
});
}

send.addEventListener("click", () =>{
    if(sending == true) return;
    sendMessage();
})

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        if(sending == true) return;
        sendMessage();
    }
});

function tempBotMessage() {
    botmessage = document.createElement("div");
    botmessage.className = "botmessage";
    chatbox.appendChild(botmessage);

    botmessage.innerHTML = `<div class="loader2"></div>`
}

async function requestShowcase() {

    sending = true;

    let antwort = await fetch("http://127.0.0.1:3007/generate", {
        method : "POST",
        headers : {"Content-Type":"application/json"},
        body : JSON.stringify({"prompt": input.value, "userId":window.getCurrentUserId(), "chatId":"chat1"})
    })

    if (antwort.ok) {

        let data = await antwort.json()

        if (data["response"]) {
            console.log(data["response"])
        } else console.log("no response")

        if (data["cards"]) {
            console.log("WE RECIEVED CARDS!")

            console.log(data["cards"])

            let oneHasBeenRemoved = false

            for (let key in data["cards"]) {

                console.log(key)
                const chatbox = document.getElementById("chatbox")
                let botcard = document.getElementById("botcard")

                if ((botcard && !oneHasBeenRemoved) || !botcard) {
                    if (botcard) botcard.remove()
                    oneHasBeenRemoved = true

                    botcard = document.createElement("div")
                    botcard.id = "botcard"
                    botcard.style= "margin-left: 10%;"
                    chatbox.appendChild(botcard)
                }
                
                const name = data["cards"][key]["name"]
                const desc = data["cards"][key]["description"]
                const leve = data["cards"][key]["level"]
                const time = data["cards"][key]["time"]


                const INNER = `
                    <div class="card bg-dark text-white" style="width: 15rem;">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text" style="font-size: 1rem;">${desc}</p>
                    </div>
                    <ul class="list-group-dark list-group-flush" style="font-size: 1rem;">
                        <li class="list-group-item">${time}</li>
                        <li class="list-group-item">${leve}</li>
                    </ul>
                    <a href="chat.html" class="btn btn-secondary">Cook it!</a>
                    </div>`

                botcard.innerHTML += INNER
                }
        }

         let hr = document.createElement("hr")
         
         chatbox.appendChild(hr);
         botmessage.innerText = data["response"];
         chatbox.scrollTo({
             top: chatbox.scrollHeight,
             behavior: "smooth" 
            });
        sending = false;
    } else console.log("not ok")
}

 input.addEventListener("input", () => {
   if (input.value.trim() === "") {
     send.style.background = "";
   } else {
     send.style.background = "radial-gradient(circle, rgba(38, 255, 0, 0.75) 0%, rgba(94, 255, 0, 0.74) 100%)";
   }
 });
 
fetch("http://127.0.0.1:3007/ping")