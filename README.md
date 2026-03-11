# 중소기업창업 지원사업 통합관리지침 AI 챗봇

> 2025년 12월 23일 전부개정 지침 기반 AI 챗봇 (Google Gemini 2.0 Flash)

---

## 🚀 Vercel 배포 방법 (5분 완성)

### 1단계 — GitHub에 올리기

```bash
# 이 폴더를 GitHub에 업로드
git init
git add .
git commit -m "초기 커밋"
git remote add origin https://github.com/YOUR_USERNAME/startup-chatbot.git
git push -u origin main
```

### 2단계 — Vercel에 배포

1. [vercel.com](https://vercel.com) 접속 → GitHub 계정으로 로그인
2. **"Add New Project"** 클릭
3. 방금 만든 GitHub 레포지토리 선택
4. **Environment Variables** 섹션에서 추가:
   - Key: `GEMINI_API_KEY`
   - Value: 본인의 Google AI API 키 (`AIza...`)
5. **Deploy** 클릭!

약 1~2분 후 `https://your-project.vercel.app` 주소가 생성됩니다.

---

## 💻 로컬 실행 방법

```bash
npm install

# .env.local 파일 생성
echo "GEMINI_API_KEY=AIza여기에키입력" > .env.local

npm run dev
# → http://localhost:3000 에서 확인
```

---

## 🔑 Google Gemini API 키 발급

1. [aistudio.google.com](https://aistudio.google.com) 접속
2. Google 계정으로 로그인
3. 좌측 메뉴 **"Get API key"** 클릭
4. **"Create API key"** → 생성된 키(`AIza...`) 복사
5. Vercel 환경변수 `GEMINI_API_KEY`에 입력

> ✅ Google AI Studio에서 Gemini API는 무료 티어(분당 15회, 하루 1500회)로 시작 가능합니다.

---

## 📁 프로젝트 구조

```
startup-chatbot/
├── pages/
│   ├── index.js       # 메인 채팅 UI
│   └── api/
│       └── chat.js    # 서버사이드 Anthropic API 호출
├── package.json
├── next.config.js
└── README.md
```

---

## ✅ 보안 포인트

- API 키는 **서버(pages/api/chat.js)에서만** 사용됨
- 사용자 브라우저에 API 키가 노출되지 않음
- Vercel 환경변수로 안전하게 관리
