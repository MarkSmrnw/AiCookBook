let chatbox = document.getElementById("chatbox");
let input = document.getElementById("input");
let send = document.getElementById("send");

let botmessage = document.createElement("div");
botmessage.className = "botmessage";


function sendMessage(){
    
    if(input.value.trim() == "") {
        input.value = "";
        return
    };

let usermessage = document.createElement("div");
usermessage.className = "usermessage";

chatbox.appendChild(usermessage);
usermessage.textContent = input.value;
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
