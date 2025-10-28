import "./style.css";

// HTML内の要素を取得
const app = document.getElementById("app");

// 要素を生成してDOMに追加
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
