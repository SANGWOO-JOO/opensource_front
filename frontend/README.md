# 🚀 오픈소스 네비게이터 - Frontend

오픈소스 입문자를 위한 Good First Issue 큐레이션 플랫폼의 React 프론트엔드입니다.

## ✨ 주요 기능

- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 환경에서 최적화
- 🔍 **스마트 필터링**: 난이도, 언어, 예상 시간별 이슈 검색
- 💫 **실시간 데이터**: GitHub API를 통한 최신 이슈 정보
- ⚡ **빠른 성능**: 최적화된 로딩과 무한 스크롤

## 🛠 기술 스택

- **React 18** - 사용자 인터페이스
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 스타일링
- **Axios** - HTTP 클라이언트

## 🚀 빠른 시작

### 1. 설치

```bash
# 의존성 설치
npm install

# 또는 yarn 사용
yarn install
```

### 2. 환경 설정

```bash
# 환경 변수 파일 생성
cp .env.example .env

# .env 파일 수정
REACT_APP_API_URL=http://localhost:8080/api
```

### 3. 개발 서버 실행

```bash
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📝 사용 가능한 스크립트

```bash
# 개발 서버 시작
npm start

# 프로덕션 빌드
npm run build

# 테스트 실행
npm test

# 코드 린팅
npm run lint

# 타입 체크
npm run type-check
```

## 📂 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── Header.tsx      # 헤더 네비게이션
│   ├── FilterBar.tsx   # 필터 인터페이스
│   ├── IssueCard.tsx   # 이슈 카드
│   └── IssueList.tsx   # 이슈 목록
├── services/           # API 서비스
│   └── api.ts         # API 클라이언트
├── types/             # TypeScript 타입 정의
│   └── issue.ts       # 이슈 관련 타입
├── styles/            # 스타일 파일
│   └── App.css        # 전역 스타일
├── App.tsx            # 메인 앱 컴포넌트
└── index.tsx          # 앱 엔트리 포인트
```

## 🔧 커스터마이징

### 색상 변경

`tailwind.config.js`에서 색상을 수정할 수 있습니다:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#3b82f6',  // 메인 브랜드 색상
        600: '#2563eb',  // 호버 색상
      }
    }
  }
}
```

### API 엔드포인트 변경

`.env` 파일에서 API URL을 변경:

```bash
REACT_APP_API_URL=https://your-api-domain.com/api
```

## 📱 컴포넌트 가이드

### IssueCard

개별 이슈를 표시하는 카드 컴포넌트:

```tsx
<IssueCard 
  issue={issue} 
  onClick={(issue) => console.log(issue)} 
/>
```

### FilterBar

이슈 필터링을 위한 컴포넌트:

```tsx
<FilterBar 
  onFilterChange={(filters) => setFilters(filters)}
  isLoading={false}
/>
```

## 🌐 배포

### Vercel 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel --prod
```

### Netlify 배포

```bash
# 빌드
npm run build

# build 폴더를 Netlify에 업로드
```

## 🔍 성능 최적화

- **Code Splitting**: React.lazy를 사용한 지연 로딩
- **Memoization**: React.memo를 사용한 불필요한 리렌더링 방지
- **Image Optimization**: WebP 포맷 지원
- **Bundle Analysis**: `npm run analyze`로 번들 크기 분석

## 🧪 테스트

```bash
# 단위 테스트 실행
npm test

# 커버리지 확인
npm test -- --coverage

# E2E 테스트 (Cypress)
npm run cypress:open
```

## 📈 모니터링

- **Google Analytics**: 사용자 행동 분석
- **Sentry**: 에러 모니터링 (추후 추가)
- **Lighthouse**: 성능 측정

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🆘 도움말

### 자주 묻는 질문

**Q: API 연결이 안 돼요**
A: `.env` 파일의 `REACT_APP_API_URL`이 올바른지 확인하고, 백엔드 서버가 실행 중인지 확인하세요.

**Q: 스타일이 적용되지 않아요**
A: Tailwind CSS가 제대로 설치되었는지 확인하고, `npm run build`를 다시 실행해보세요.

### 문제 신고

문제가 발생하면 [GitHub Issues](https://github.com/your-username/opensource-navigator/issues)에 신고해주세요.

---

Made with ❤️ for Open Source Contributors