# 중소기업창업 지원사업 통합관리지침 AI 챗봇

> 2025년 12월 23일 전부개정 지침 기반 AI 챗봇

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
   - Key: `ANTHROPIC_API_KEY`
   - Value: 본인의 Anthropic API 키 (`sk-ant-...`)
5. **Deploy** 클릭!

약 1~2분 후 `https://your-project.vercel.app` 주소가 생성됩니다.

---

## 💻 로컬 실행 방법

```bash
npm install

# .env.local 파일 생성
echo "ANTHROPIC_API_KEY=sk-ant-여기에API키입력" > .env.local

npm run dev
# → http://localhost:3000 에서 확인
```

---

## 🔑 Anthropic API 키 발급

1. [console.anthropic.com](https://console.anthropic.com) 접속
2. 회원가입/로그인
3. **API Keys** 메뉴 → **Create Key**
4. 생성된 키(`sk-ant-...`)를 복사하여 Vercel 환경변수에 입력

> ⚠️ API 키는 절대 코드에 직접 넣지 마세요. 반드시 환경변수로 관리하세요.

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
