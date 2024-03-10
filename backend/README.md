# Installation

`.env_template`을 `.env`로 바꾸고 알맞은 값을 넣습니다.

만약 `docker compose up -d mongo`와 같이 명령어를 실행해 mongo 서버를 시작했다면, 다음 값을 입력합니다.

`ID`, `PASSWD`는 알맞은 값으로 고칩니다.

```
DATABASE_URL="mongodb://ID:PASSWD@localhost:27017/Sublet?retryWrites=true&w=majority&authSource=admin&directConnection=true"

BACKEND_PORT="4000"
```

`docker compose up -d`를 이용해 백엔드를 도커로 킨다면, 다음 값을 입력합니다. (`localhost`가 아닌 `mongo`를 적습니다.)

```
DATABASE_URL="mongodb://ID:PASSWD@mongo:27017/Sublet?retryWrites=true&w=majority&authSource=admin&directConnection=true"

BACKEND_PORT="4000"
```

```bash
$ npm install
$ npx prisma generate
```

db와의 연동이 필요하다면 다음 명령어 중 하나를 필요에 맞게 실행합니다.

```bash
$ npx prisma db pull # db에서 가져올 때
$ npx prisma db push # db를 업데이트할 때
```

다음 명령어를 실행해 백엔드 서버를 시작합니다. 기본 포트는 4000입니다.

```bash
$ npm run start:dev # watch mode
$ npm run start
```

## License

Nest is [MIT licensed](LICENSE).
