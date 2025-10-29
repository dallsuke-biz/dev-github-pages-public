import "./style.css";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

class Page {
	static _app;
	static _title;
	static _desc;
	static _signInBtn;
	static _signOutBtn;
	static init() {
		this._app = document.getElementById('app');
		this._title = document.createElement('h1');
		this._desc = document.createElement('p');
		this._signInBtn = document.createElement('button');
		this._signOutBtn = document.createElement('button');
		this._app.appendChild(this._title);
		this._app.appendChild(this._desc);
		this._app.appendChild(this._signInBtn);
		this._app.appendChild(this._signOutBtn);
		this._signInBtn.addEventListener('click', this._callSignIn);
		this._signOutBtn.addEventListener('click', this._callSignOut);
		this._reset();
	}
	static _reset() {
		this._title.textContent = 'こんにちは';
		this._desc.textContent = '';
		this._signInBtn.textContent = 'SignIn';
		this._signOutBtn.textContent = 'SignOut';
	}
	static _callSignIn() {
		Firebase.signIn();
	}
	static _callSignOut() {
		Firebase.signOut();
	}
	static signedIn(user) {
		this._title.textContent = `ようこそ ${user.displayName}`;
		this._desc.textContent = user.email;
	}
	static signedOut() {
		this._reset();
	}
}

class Firebase {
	static _config = {
		// 「Firebaseコンソール」「プロジェクト」「ウェブアプリ」「設定」「SDK の設定と構成」「npm」に記載の情報
		apiKey: process.env.firebaseConfig_apiKey,
		authDomain: process.env.firebaseConfig_authDomain,
		projectId: process.env.firebaseConfig_projectId,
		storageBucket: process.env.firebaseConfig_storageBucket,
		messagingSenderId: process.env.firebaseConfig_messagingSenderId,
		appId: process.env.firebaseConfig_appId,
		measurementId: process.env.firebaseConfig_measurementId,
	};
	static _app;
	static _auth;
	static _analytics;
	static init() {
		this._app = initializeApp(this._config);
		this._auth = getAuth();
		this._analytics = getAnalytics(this._app);
		onAuthStateChanged(this._auth, user => {
			if (user) this._signedIn(user);
			else this._signedOut();
		});
	}
	static _signedIn(user) {
		console.log('サインイン中です。');
		// Firebaseが発行する認証用のトークン（１時間）
		user.getIdToken().then(firebaseIdToken => {
			console.log('firebaseIdToken: ', firebaseIdToken);
		}).catch(error => {
			console.error("トークン取得処理でエラー:", error);
		});
		Page.signedIn(user);
		console.log(user);
	}
	static _signedOut() {
		console.log('サインアウト中です。');
		Page.signedOut();
	}
	static signIn() {
		const provider = new GoogleAuthProvider();
		signInWithPopup(this._auth, provider)
			.then((result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				// GoogleOAuthが発行するGoogleAPIに利用できるトークン（１時間）
				const googleAccessToken = credential.accessToken;
				console.log('googleAccessToken: ', googleAccessToken);
				const user = result.user;
				console.log('サインインを処理しました。');
			}).catch((error) => {
				console.error("サインイン処理でエラー:", error);
				// ユーザーが Googleでサインイン しようとしたが、
				// そのメールアドレスがメール＋パスワード認証ですでに登録されていた際の、
				// アカウントを統合するためなどに使用する
				// const credential = GoogleAuthProvider.credentialFromError(error);
			});
	}
	static signOut() {
		signOut(this._auth)
			.then(() => {
				console.log('サインアウトを処理しました。');
			})
			.catch(error => {
				console.error("サインアウト処理でエラー:", error);
			});
	}
}

Page.init();
Firebase.init();
