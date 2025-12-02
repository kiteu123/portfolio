import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // ⭐️ 핵심: 정적 자산을 상대 경로로 참조하도록 강제합니다.
  base: "./",

  build: {
    // Vite 빌드 결과물 폴더 이름 (이전에 확인 완료)
    outDir: "dist",
  },
});
