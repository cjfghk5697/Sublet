## Installation

```bash
$ npm install
```

## 경로

### GET /

- 설명: "Hello World!" 문자열을 반환합니다.
- 위치: `src/app.controller.ts`

### GET /user

- 설명: 모든 user 정보를 반환합니다.
- Request
  - 로그인되어 있어야 합니다.
- 위치: `src/modules/user/user.controller.ts`

### GET /user/:key

- 설명
  - user key를 통해 user 객체를 반환합니다.
- Param
  - `key`: number
- 위치: `src/modules/user/user.controller.ts`

### POST /auth/login

- 설명: id, password를 통해 로그인을 시도합니다. 성공하면 세션을 연결합니다.
- Request
  - id: string
  - password: string
- Response
  - 200 {ok: true}
    - 로그인 성공했을 시
  - 401 {message: "Unauthorized", statusCode: 401}
    - 로그인 실패했을 시
- 위치: `src/modules/auth/auth.controller.ts`

## License

Nest is [MIT licensed](LICENSE).
