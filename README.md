# GrowTo (그로투) Server

성장하고 싶은 사람들이 자신에게 맞는 강의 및 솔루션들을 손쉽게 찾을 수 있는 <br>
**IT 교육 강의비교 플랫폼 서비스**, 그로투입니다 ❣

![Group 205@3x 1](https://user-images.githubusercontent.com/60960130/148967729-538fbb0d-045f-4cc3-a175-e8bb5f5e547f.png)

<br>

## 💻 Development Environment

<img src="https://img.shields.io/badge/Node.js-v16-green"/> <img src="https://img.shields.io/badge/Express-v4.17.2-green"/> <img src="https://img.shields.io/badge/PostgreSQL-v12.5-blue"/> <img src="https://img.shields.io/badge/Javascript-es6-yellow"/> <img src="https://img.shields.io/badge/Firebase-blue"/>

<br>

## 🔱 Branch Strategy

- `main` 브랜치 <br>
  - `main`에 직접적인 commit, push는 가급적 금지합니다
- `develop` 브랜치<br>

  - `develop` 브랜치에서 본인이름의 브랜치를 생성하여 작업합니다<br>
  - 계획한 모든 기능 구현 & 테스트 통과 시 `develop` 브랜치로 Pull Request를 작성합니다<br>
    (Pull Request는 PULL_REQUEST_TEMPLATE에 맞춰서 작성합니다)<br>
  - 팀원들에게 코드리뷰를 요청합니다 (리뷰 요청자 assign하기)<br>
  - 리뷰를 완료하면 `Merge Confirm`을 하고, conflict가 발생하면 해결 후 `develop`으로 merge합니다<br>
  - 새로운 작업을 할 때 `develop` 브랜치의 내용을 작업 브랜치로 pull 받아서 작업을 이어갑니다<br>
    `git pull origin develop`

- 커밋 메시지는 아래의 Commit Convention에 따라 진행합니다

- 배포 전에 `develop` 브랜치의 내용을 `main` 브랜치로 merge합니다

<br>

## ⚙ Convention

<details>
  <summary>Code Convention</summary>
  
1. 변수명, 함수명은 lowerCamelCase를 사용합니다
  
2. 함수는 "동사+명사" 형태로 사용합니다 (ex) getInformation 
  
3. 약어는 되도록 사용하지 않습니다
  
4. 주석의 경우 한 줄은 //로 작성하고, 그 외에는 /** */ 을 사용합니다
  
5. Bracket 규칙 
  
  - 괄호 사용시 한칸 띄우고 사용

    ```jsx
    // 괄호 사용 한칸 띄우고 사용
    if (left == true) {
      return;
    }
    ```

- 한줄 if 문도 bracket 사용하여 작성
  ```jsx
  // 한줄 if 문 - 여러 줄로 작성
  if (trigger) {
    return;
  }
  ```
- 양쪽 띄어쓰기
  ```jsx
  // 띄어쓰기
  if (a == 5) {
    // 양쪽 사이로 띄어쓰기
    return;
  }
  ```

6.  비동기 함수는 async와 await 함수 사용을 지향합니다

</details>

<details>
  <summary>Commit Convention</summary>
<br>
  
- 반영사항을 바로 확인할 수 있도록 작은 기능 하나라도 구현되면 커밋을 권장합니다 <br>
- "[TYPE] 설명" 형식으로 커밋 메시지를 작성합니다 <br>
- 설명은 한글로 작성합니다

```
[FEAT] : 새로운 기능 추가
[UPDATE] : 기존 파일 수정 및 보완
[FIX] : 버그 수정
[DOCS] : 문서 추가, 수정 및 변경
[STYLE] : 코드 포맷팅, 로직의 변화는 없이 띄어쓰기나 탭 문자 등의 사소한 변화
[REFACTOR] : 리팩토링
[TEST] : 테스트 코드 수정 및 변경 (로직 변화 없음)
[CHORE] : 그 외의 변경사항 (주석 추가, 삭제 등)
```

ex)
`[FEAT] "main.js" 게시글 POST 구현 완료`

</details>

<br>

## 🗂 Folder Structure

```
📦functions
┣ 📂api
┃ ┣ 📂routes
┃ ┃ ┣ 📂info
┃ ┃ ┣ 📂count
┃ ┃ ┣ 📂lectures
┣ 📂config
┃ ┣ dbConfig.js
┣ 📂constants
┃ ┣ responseMessage.js
┃ ┣ statusCode.js
┣ 📂db
┃ ┣ db.js
┃ ┣ info.js
┃ ┣ count.js
┃ ┣ lectures.js
┃ ┣ index.js
┣ 📂lib
┃ ┣ util.js
┃ ┣ convertSnakeToCamel.js
┣ .eslintrc.js
┣ .prettierrc.js
┣ index.js
```

<br>

## 🏹 Dependencies

```
{
  "name": "functions",
  "description": "Cloud Functions for Firebase",
  "scripts": {
    "lint": "eslint .",
    "serve": "cross-env NODE_ENV=development firebase emulators:start --only functions",
    "shell": "firebase functions:shell",
    "start": "npm run shell",
    "deploy": "cross-env NODE_ENV=production firebase deploy --only functions",
    "logs": "firebase functions:log"
  },
  "engines": {
    "node": "16"
  },
  "main": "index.js",
  "dependencies": {
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "cross-env": "^7.0.3",
    "dayjs": "^1.10.7",
    "dotenv": "^10.0.0",
    "eslint-config-prettier": "^8.3.0",
    "express": "^4.17.2",
    "firebase": "^9.6.2",
    "firebase-admin": "^9.8.0",
    "firebase-functions": "^3.14.1",
    "helmet": "^5.0.1",
    "hpp": "^0.2.3",
    "lodash": "^4.17.21",
    "nodemon": "^2.0.15",
    "pg": "^8.7.1",
    "tools": "0.0.0"
  },
  "devDependencies": {
    "eslint": "^7.6.0",
    "eslint-config-google": "^0.14.0",
    "firebase-functions-test": "^0.2.0"
  },
  "private": true
}
```

<br>

## 🔥 API 명세서

[API 명세서 보러가기](https://lud2ns.notion.site/API-0270ece679f14f92b72bceeeb78c1c28)

<br>

## 📐 ERD

<img src="https://user-images.githubusercontent.com/49135797/149073419-9ed07cb6-c1de-4618-9494-0bfe1a9c525f.png" width="640" height="620"/>

<br>

## 담당 기능 및 API

| 기능                         | 담당자 | 완료 |
| ---------------------------- | ------ | ---- |
| 분야 항목 조회               | 김진욱 |      |
| 스킬 항목 조회               | 김진욱 |      |
| 특정 분야, 스킬의 강의 조회  | 김진욱 |      |
| 맞춤 강의 검색               | 김진욱 |      |
| 검색 조건 만족하는 강의 조회 | 김진욱 |      |
| 총 강의 개수 조회            | 조윤서 |      |
| 총 강의 찾기 횟수 조회       | 조윤서 |      |
| 총 비교 요청 횟수 조회       | 조윤서 |      |
| 신고 사유 항목 조회          | 조윤서 |      |
| 맞지 않는 강의 정보 신고     | 조윤서 |      |
| 특정 스킬의 태그 정보 조회   | 조재호 |      |
| 강의 비교 요청               | 조재호 |      |
| 강의 비교 요청 인기순위 조회 | 조재호 |      |
| 현재 비교중인 강의 조회      | 조재호 |      |

<br>

## 😎 Server Developers

그로투의 멋쟁이 개발자들을 소개합니다

| 이름   | 깃허브                                     |
| ------ | ------------------------------------------ |
| 김진욱 | [@NownS](https://github.com/NownS)         |
| 조윤서 | [@healing99](https://github.com/healing99) |
| 조재호 | [@HOJAE98](https://github.com/HOJAE98)     |
