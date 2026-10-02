/* =========================================================
   Firebase 설정 — '모두의 기록'을 여러 기기가 함께 보게 한다.

   Firebase 콘솔 > 프로젝트 설정 > 내 앱(웹 앱)에 나오는 firebaseConfig 값을
   아래 null 자리에 그대로 붙여 넣는다. 이 값은 비밀번호가 아니라 공개해도 되는
   주소 정보이며, 누가 무엇을 할 수 있는지는 firestore.rules가 정한다.

   null로 두면 기록은 지금처럼 이 브라우저에만 저장된다.
   ========================================================= */
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyD7oKXvbl4ZzWlFAneIy999Z5RpJ2fJ47c",
    authDomain: "bio-deb.firebaseapp.com",
    projectId: "bio-deb",
    storageBucket: "bio-deb.firebasestorage.app",
    messagingSenderId: "683619465832",
    appId: "1:683619465832:web:2677e40bb033a908ca59dd"
};
