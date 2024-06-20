import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging"; 



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
        vapidKey: 
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
