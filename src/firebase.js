// Firebase 설정 파일
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase 설정 정보
// 실제 프로젝트에 맞게 수정해야 합니다
const firebaseConfig = {
  apiKey: "AIzaSyBeQLZw3NETzYUW6sH-GaBU2IT-5QV7YfI",
  authDomain: "yeonwoo-portfolio.firebaseapp.com",
  projectId: "yeonwoo-portfolio",
  storageBucket: "yeonwoo-portfolio.firebasestorage.app",
  messagingSenderId: "862806940603",
  appId: "1:862806940603:web:dc49b7ab6ffa850110429e",
  measurementId: "G-CT2CKXGXCE",
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firestore 데이터베이스 초기화
export const db = getFirestore(app);
export default app;
