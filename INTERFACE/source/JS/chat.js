// const { ZeroShotImageClassificationPipeline } = require("@huggingface/transformers");

let chatbox = document.getElementById("chatbox");
let input = document.getElementById("input");
let send = document.getElementById("send");
let welcomemessage = document.getElementById("startwelcomemessage")
let usermessage = document.createElement("div")
let chatslist = document.querySelectorAll(".chatAdd, .chatItem")
let collapse = document.getElementsByClassName("collapselist")[0]
let collapseimg = collapse.querySelector("img");
let collapsep = collapse.querySelector("p")
let chatsbox = document.getElementById("chatlist")
let sending;

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
    
    if(input.value.trim() == "") {
        input.value = "";
        return
    };

usermessage.className = "usermessage";

if (welcomemessage) welcomemessage.remove()

chatbox.appendChild(usermessage);
usermessage.textContent = input.value;
requestShowcase();
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


async function requestShowcase() {

    sending = true;

    let antwort = await fetch("https://geminiapireq.smrnw.de/test", {
        method : "POST",
        headers : {"Content-Type":"application/json"},
        body : JSON.stringify({"prompt": input.value, "userId":123})
    })

    if (antwort.ok) {

        let data = await antwort.json()

        if (data["response"]) {
            console.log(data["response"])
        } else console.log("no response")

         let botmessage = document.createElement("div");
         let hr = document.createElement("hr")
         botmessage.className = "botmessage";
         chatbox.appendChild(botmessage);
         chatbox.appendChild(hr);
         botmessage.textContent = data["response"];
         chatbox.scrollTo({
             top: chatbox.scrollHeight,
             behavior: "smooth" 
            });
        sending = false;
    } else console.log("not ok")
}

 input.addEventListener("input", () => {
   if (input.value.trim() === "") {
     send.style.backgroundColor = "rgb(108, 108, 108)";
   } else {
     send.style.backgroundColor = "#4CAF50";
   }
 });
 
fetch("https://geminiapireq.smrnw.de/ping")