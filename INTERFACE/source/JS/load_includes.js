document.addEventListener("DOMContentLoaded", () => {

    async function load() {
        const NAVCONTAINER = document.getElementById("navbar-container")

        console.log("!")
        
        if (NAVCONTAINER) {
            console.log("!!")
            const response = await fetch('source/includes/nav.html')
            console.log(response)
            const navHTML = await response.text()

            NAVCONTAINER.innerHTML = navHTML
        }

    }

    load()
})