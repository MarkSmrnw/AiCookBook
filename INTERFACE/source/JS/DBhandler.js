// Import Firebase compat version for Firebase UI compatibility
import "https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js";
import "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth-compat.js";
import "https://www.gstatic.com/firebasejs/11.10.0/firebase-database-compat.js";
import "https://www.gstatic.com/firebasejs/ui/6.0.2/firebase-ui-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDdMqDAmpLBSdZNqHjYG0yaF9RA_1VNy8c",
    authDomain: "aicookbook-c4b94.firebaseapp.com",
    projectId: "aicookbook-c4b94",
    storageBucket: "aicookbook-c4b94.firebasestorage.app",
    messagingSenderId: "7201084676",
    appId: "1:7201084676:web:9db97994efee04b7ec6c51",
    measurementId: "G-GMHT6WN8DE"
};

// Initialize Firebase with compat version for Firebase UI
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// Check auth state on page load
auth.onAuthStateChanged((user) => {
    const authContainer = document.getElementById('firebaseui-auth-container');
    
    if (user) {
        // User is signed in
        console.log('User is signed in:', user);
        if (authContainer) {
            authContainer.innerHTML = `
                <span class="navbar-text text-white me-3">Welcome, ${user.displayName || user.email}</span>
                <button class="btn btn-outline-light btn-sm" onclick="signOut()">Sign Out</button>
            `;
        }
    } else {
        // User is signed out, show Firebase UI
        console.log('User is signed out');
        initializeFirebaseUI();
    }
});

function initializeFirebaseUI() {
    const authContainer = document.getElementById('firebaseui-auth-container');
    
    // Only initialize if the container exists and is empty
    if (authContainer && authContainer.innerHTML.trim() === '') {
        var ui = new firebaseui.auth.AuthUI(auth);
        
        ui.start('#firebaseui-auth-container', {
            signInOptions: [
                {
                    provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    // Optional: Add scopes if needed
                    scopes: ['email', 'profile']
                },
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    requireDisplayName: true
                }
            ],
            callbacks: {
                signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                    console.log('Sign in successful:', authResult);
                    // Return false to avoid redirect and let onAuthStateChanged handle UI updates
                    return false;
                },
                signInFailure: function(error) {
                    console.error('Sign in failed:', error);
                    return Promise.resolve();
                }
            },
            // Configure UI settings
            signInFlow: 'popup', // Use popup instead of redirect for better UX
            credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
        });
    }
}

// Make signOut function global
window.signOut = function() {
    auth.signOut().then(() => {
        console.log('User signed out');
        // The onAuthStateChanged listener will handle UI updates
    }).catch((error) => {
        console.error('Sign out error:', error);
    });
};

window.addEventListener('load', () => {
    // Auth state listener is already set up above
});