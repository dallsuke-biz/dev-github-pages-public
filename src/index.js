import "./style.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
const analytics = getAnalytics(firebaseApp);
console.log(firebaseApp);


const app = document.getElementById("app");

const title = document.createElement("h1");
title.textContent = "サーバーレスホームページへようこそ！";

const desc = document.createElement("p");
desc.textContent = "このページは Node.js + webpack で構築されています。";

const button = document.createElement("button");
button.textContent = "クリックしてメッセージを表示";
button.addEventListener("click", () => {
  alert("サーバーレスで動作中です ！");
});

app.appendChild(title);
app.appendChild(desc);
app.appendChild(button);
