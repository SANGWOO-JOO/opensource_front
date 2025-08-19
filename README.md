# 🎯 오픈소스 네비게이터

초보자도 쉽게 시작할 수 있는 오픈소스 기여 플랫폼

## 🚀 기능

- **맞춤형 이슈 추천**: 기술 스택과 난이도에 따른 이슈 필터링
- **친화도 점수**: 프로젝트의 초보자 친화도를 한눈에 확인
- **검색 및 정렬**: 다양한 조건으로 이슈와 프로젝트 탐색
- **반응형 디자인**: 모든 디바이스에서 최적화된 경험
- **접근성**: 스크린 리더와 키보드 네비게이션 지원

## 🛠 기술 스택

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Routing**: React Router v6
- **State Management**: React Hooks

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프리뷰
npm run preview

# 린트 검사
npm run lint

# 타입 체크
npm run typecheck
```

## 📁 프로젝트 구조

```
src/
├── components/           # 재사용 가능한 컴포넌트
│   ├── ui/              # 기본 UI 컴포넌트
│   ├── IssueCard.tsx    # 이슈 카드 컴포넌트
│   ├── ProjectCard.tsx  # 프로젝트 카드 컴포넌트
│   └── ...
├── hooks/               # 커스텀 훅
├── pages/               # 페이지 컴포넌트
├── types/               # TypeScript 타입 정의
├── utils/               # 유틸리티 함수
└── App.tsx             # 메인 앱 컴포넌트
```

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary**: Blue (#3B82F6)
- **Difficulty Colors**:
  - 입문: Green (#10B981)
  - 초급: Blue (#3B82F6)
  - 중급: Orange (#F59E0B)
  - 고급: Red (#EF4444)

### 타이포그래피
- **Font Family**: Pretendard, system fonts
- **Sizes**: 12px ~ 48px (0.75rem ~ 3rem)

### 컴포넌트
- Button (primary, secondary, outline, ghost)
- Card (with header, content, footer)
- Badge (difficulty, time, default)
- Input (with icons and validation)

## ♿ 접근성

- WCAG 2.1 AA 준수
- 키보드 네비게이션 지원
- 스크린 리더 호환
- 고대비 색상 사용
- 의미론적 HTML 구조

## 📱 반응형 지원

- **Mobile**: 320px ~
- **Tablet**: 768px ~
- **Desktop**: 1024px ~
- **Large Desktop**: 1280px ~

## 🔧 개발 가이드

### 컴포넌트 개발
```tsx
// 예시: 새로운 UI 컴포넌트
import { Button } from '../ui';

const MyComponent = () => {
  return (
    <div className="p-4">
      <Button variant="primary" size="lg">
        Click me
      </Button>
    </div>
  );
};
```

### 스타일링 가이드
- Tailwind CSS 유틸리티 클래스 사용
- 커스텀 CSS는 최소화
- 일관된 스페이싱 시스템 (4px 단위)
