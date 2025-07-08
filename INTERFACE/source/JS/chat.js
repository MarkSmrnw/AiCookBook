let chatbox = document.getElementById("chatbox");
let input = document.getElementById("input");
let send = document.getElementById("send");




function sendMessage(){
    
    if(input.value.trim() == "") {
        input.value = "";
        return
    };

let usermessage = document.createElement("div");
usermessage.className = "usermessage";

chatbox.appendChild(usermessage);
usermessage.textContent = input.value;
requestShowcase();
input.value = ""
}

send.addEventListener("click", () =>{
    sendMessage();
})

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});


async function requestShowcase() {
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
         botmessage.className = "botmessage";
         chatbox.appendChild(botmessage);
         botmessage.textContent = data["response"];
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