import "./style.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
	apiKey: process.env.firebaseConfig_apiKey,
	authDomain: process.env.firebaseConfig_authDomain,
	projectId: process.env.firebaseConfig_projectId,
	storageBucket: process.env.firebaseConfig_storageBucket,
	messagingSenderId: process.env.firebaseConfig_messagingSenderId,
	appId: process.env.firebaseConfig_appId,
	measurementId: process.env.firebaseConfig_measurementId,
};
const firebaseApp = initializeApp(firebaseConfig);
// console.log(firebaseApp);
const analytics = getAnalytics(firebaseApp);
const provider = new GoogleAuthProvider();
const auth = getAuth();


const app = document.getElementById("app");

const title = document.createElement("h1");
title.textContent = "サーバーレスホームページへようこそ！";

const desc = document.createElement("p");
desc.textContent = "このページは Node.js + webpack で構築されています。";

const button = document.createElement("button");
button.textContent = "クリックしてメッセージを表示";
button.addEventListener("click", () => {
	// alert("サーバーレスで動作中です ！");
	signInWithPopup(auth, provider)
	.then((result) => {
	  // This gives you a Google Access Token. You can use it to access the Google API.
	  const credential = GoogleAuthProvider.credentialFromResult(result);
	  const token = credential.accessToken;
	  // The signed-in user info.
	  const user = result.user;
	  console.log(user);
	  // IdP data available using getAdditionalUserInfo(result)
	  // ...
	}).catch((error) => {
	  // Handle Errors here.
	  const errorCode = error.code;
	  const errorMessage = error.message;
	  console.log(errorCode, errorMessage);
	  // The email of the user's account used.
	  const email = error.customData.email;
	  // The AuthCredential type that was used.
	  const credential = GoogleAuthProvider.credentialFromError(error);
	  // ...
	});
});

app.appendChild(title);
app.appendChild(desc);
app.appendChild(button);
