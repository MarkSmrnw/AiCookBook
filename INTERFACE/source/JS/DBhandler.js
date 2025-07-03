import "https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js"
import "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth-compat.js"
import "https://www.gstatic.com/firebasejs/11.10.0/firebase-database-compat.js"
import "https://www.gstatic.com/firebasejs/ui/6.0.2/firebase-ui-auth.js"

const firebaseConfig = {
    apiKey: "AIzaSyDdMqDAmpLBSdZNqHjYG0yaF9RA_1VNy8c",
    authDomain: "aicookbook-c4b94.firebaseapp.com",
    projectId: "aicookbook-c4b94",
    storageBucket: "aicookbook-c4b94.firebasestorage.app",
    messagingSenderId: "7201084676",
    appId: "1:7201084676:web:9db97994efee04b7ec6c51",
    measurementId: "G-GMHT6WN8DE"
}

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const db = firebase.database()

auth.onAuthStateChanged((user) => {
    const authContainer = document.getElementById('firebaseui-auth-container')
    
    if (user) {
        console.log('User is signed in:', user)
        if (authContainer) {

            const firebaseContainer = document.getElementById("firebaseui-auth-container")
            
            document.getElementById("changeNameAfterToggle").innerText = "Account"
            firebaseContainer.innerHTML = `
                <span class="navbar-text text-white me-3 text-center d-flex" style>Welcome, ${user.displayName || user.email}</span>
                <button class="btn btn-danger btn-sm" onclick="signOut()">Sign Out</button>
            `
            firebaseContainer.parentElement.style = "padding: 1rem; min-width:20rem; text-align:center;"
        }
    } else {
        console.log('User is signed out')
        initializeFirebaseUI();
    }
});

function initializeFirebaseUI() {
    const authContainer = document.getElementById('firebaseui-auth-container')
    
    if (authContainer && authContainer.innerHTML.trim() === '') {
        var ui = new firebaseui.auth.AuthUI(auth);
        
        ui.start('#firebaseui-auth-container', {
            signInOptions: [
                {
                    provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    scopes: ['email', 'profile']
                },
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    requireDisplayName: true
                }
            ],
            callbacks: {
                signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                    console.log('Sign in successful:', authResult)
                    return false;
                },
                signInFailure: function(error) {
                    console.error('Sign in failed:', error)
                    return Promise.resolve()
                }
            },
            signInFlow: 'popup', 
            credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
        });
    }
}

window.signOut = function() {
    auth.signOut().then(() => {
        console.log('User signed out')
        window.location.reload()
    }).catch((error) => {
        console.error('Sign out error:', error)
    })
}