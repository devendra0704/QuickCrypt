import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDcjTtAZ9HVCihFLEyE0u-eloBwwOfXkQI",
    authDomain: "quickcrypt-dfe4e.firebaseapp.com",
    projectId: "quickcrypt-dfe4e",
    storageBucket: "quickcrypt-dfe4e.firebasestorage.app",
    messagingSenderId: "908740258632",
    appId: "1:908740258632:web:cb63c1bb6ded65a2c9217d",
    measurementId: "G-D6VP51Z9R1"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider};