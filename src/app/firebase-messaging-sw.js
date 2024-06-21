import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging"; 
require("dotenv").config();

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APP_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_APP_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_APP_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_APP_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_APP_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Ensure the code runs only in the browser environment
if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
  const messaging = getMessaging(app);

  async function requestPermission() {
    console.log("Requesting permission...");

    // Request notification permission
    const permission = await Notification.requestPermission();
    if (permission === "denied") {
      console.log("Notification permission denied");
      return;
    }

    console.log("Notification permission granted");

    // Get the FCM token
    try {
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_APP_VAPID_KEY,
      });

      if (token) {
        console.log("Token: ", token);
      } else {
        console.log("Cannot get token");
      }

      // Listen for incoming messages
      onMessage(messaging, (payload) => {
        console.log("Message received. ", payload);
        // Handle the message
      });
    } catch (error) {
      console.error("Error getting token: ", error);
    }
  }

  // Request notification permission
  requestPermission();
}
