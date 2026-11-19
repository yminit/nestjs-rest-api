# REST API Server

NestJS, TypeScript, Prisma, Supabase PostgreSQL을 활용한 REST API 개발 프로젝트입니다.

REST API 설계부터 데이터베이스 연동, 데이터 검증, 예외 처리, 단위 테스트 및 배포까지 백엔드 개발 과정을 직접 구현합니다.

## 기술 스택

| 구분 | 기술 |
|---|---|
| Backend | NestJS, TypeScript |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma |
| Testing | Vitest |
| API Documentation | Swagger |
| Deployment | Vercel (배포 예정) |

## 주요 기능

**Health Check**
- 서버 상태 확인 API

**Posts API**
- 게시글 등록, 조회, 수정, 삭제 (CRUD)
- UUID 기반 게시글 식별
- DTO 기반 요청 데이터 검증
- 존재하지 않는 게시글 예외 처리
- Prisma를 이용한 데이터베이스 연동

**테스트 및 문서화**
- Vitest 기반 Controller 및 Service 단위 테스트 (13개 통과)
- Mock을 활용한 데이터베이스 의존성 분리
- Swagger를 통한 API 문서 제공

## API 엔드포인트

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | 서버 상태 확인 |
| GET | `/api/posts` | 게시글 목록 조회 |
| GET | `/api/posts/:id` | 게시글 상세 조회 |
| POST | `/api/posts` | 게시글 등록 |
| PATCH | `/api/posts/:id` | 게시글 수정 |
| DELETE | `/api/posts/:id` | 게시글 삭제 |

## 로컬 실행

Node.js와 PostgreSQL 연결 환경이 필요합니다.

```bash
npm install
npx prisma generate
npm run start:dev
```

환경 변수는 `.env` 파일에 설정합니다.

```dotenv
DATABASE_URL="..."
DIRECT_URL="..."
```

실제 데이터베이스 접속 정보는 GitHub에 공개하지 않습니다.

## 빌드 및 테스트

```bash
npm run build
npx vitest run
```

## 개발 목적

단순한 CRUD 구현을 넘어 API 요청 처리, 데이터 검증, 데이터베이스 접근, 예외 처리 및 테스트 구조를 이해하고 유지보수 가능한 백엔드 애플리케이션을 개발하는 것을 목표로 합니다.