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

  - 작업 전 issue를 작성합니다 <br>
  - `develop` 브랜치에서 `issue-이슈넘버`의 이름으로 브랜치를 생성하여 작업합니다 (ex: `issue-10`)<br>
  - 계획한 모든 기능 구현 & 테스트 통과 시 `develop` 브랜치로 Pull Request를 작성합니다<br>
    (Pull Request는 PULL_REQUEST_TEMPLATE에 맞춰서 작성합니다)<br>
  - 팀원들에게 코드리뷰를 요청합니다 (리뷰 요청자 assign하기)<br>
  - 리뷰를 완료하면 `Merge Confirm`을 하고, conflict가 발생하면 해결 후 `develop`으로 merge합니다<br>
  - 작업 완료된 브랜치는 삭제합니다 <br>
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
┃ ┣ category.js
┃ ┣ compare.js
┃ ┣ db.js
┃ ┣ find.js
┃ ┣ index.js
┃ ┣ lecture.js
┃ ┣ rank.js
┃ ┣ reason.js
┃ ┣ report.js
┃ ┣ request.js
┃ ┣ skill.js
┃ ┣ tag.js
┣ 📂lib
┃ ┣ util.js
┃ ┣ convertSnakeToCamel.js
┣ 📂others
┃ ┣ slackAPI.js
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
    "pg-format": "^1.0.4",
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

[API 명세서 보러가기](https://lud2ns.notion.site/API-28c259657c6246eaa06ff041b2279e23)

<br>

## 📐 ERD

<img src="https://user-images.githubusercontent.com/86958131/150390315-153acc19-4856-47f5-90e3-f1007782ecc8.png" width="640" height="620"/>

<br>

## ✨ 주요 기능 설명

### Main

![Main_마케팅-Hover](https://user-images.githubusercontent.com/49135797/150569837-105e73c1-490b-43e5-9341-366319ec5512.png)

<details>
  <summary>기능 설명</summary>
  
- IT 강의 비교 플랫폼 "그로투"를 소개하며, 사용자는 바로 강의 비교를 시작할 수 있음

- 강의 분야 버튼을 통해서 해당 분야의 스킬 또한 선택할 수 있는 페이지로 이동

  - 강의 분야는 현재 6가지로 개발, 기획, 데이터, 디자인, 마케팅, 기타로 이루어짐

- 맞춤 강의 찾기 횟수는 사용자가 이후의 페이지에서 맞춤 강의를 요청할때마다 DB에 결과값이 저장됨
  - 해당 `find` 테이블의 행 개수를 통해 총 횟수를 조회할 수 있음
  </details>

<br>

### 강의 목록

![Choice_마케팅 선택O_세부 분야 선택O, 필터 선택](https://user-images.githubusercontent.com/49135797/150570000-151c3303-05b4-4d06-ac6e-973ac4cc4630.png)

<details>
  <summary>기능 설명</summary>

- 사용자가 선택한 분야와 스킬을 만족하는 강의 목록을 반환

- 소요시간, 가격, 개설일, 반복시청기간, 질문 응답시간에 따라 강의 순서를 sorting 할 수 있음
  - 해당 API의 `request query`를 통해 소팅 기준을 받아서 처리

</details>

<br>

### 맞춤강의 선택 과정

![Process - 태그 - 선택완료](https://user-images.githubusercontent.com/49135797/150567225-ed14b480-0b3b-4493-80dc-85eb10ed11b3.png)

<details>
  <summary>기능 설명</summary>

- 사용자가 강의 특성(태그), 희망 완강 시간과 가격대를 순차적으로 선택하여 맞춤 강의 요청

- 완료하기로 3가지 조건을 제출하면, 해당 조건을 만족하는 TOP3 강의를 선별하여 반환

</details>

<br>

### 맞춤강의 TOP3

![Result - 결과3개](https://user-images.githubusercontent.com/49135797/150568252-f4225f7d-9fed-4a75-ab2a-aa9281bf3d74.png)

<details>
  <summary>기능 설명</summary>

- 조건을 만족하는 강의 TOP3를 특정 기준에 따라 선별하여 반환

- `공유하기`를 통해 링크를 공유할 수 있으며, 해당 URL의 파라미터 값에는 사용자가
  입력한 조건들에 대한 정보가 저장되어 있음

</details>

<br>

### 강의 비교 요청

![강의 비교 요청 - 입력 이전 (디폴트)](https://user-images.githubusercontent.com/49135797/150568980-471ca0fd-63f5-46f2-a372-d1b63f2b00fb.png)

<details>
  <summary>기능 설명</summary>

- 사용자가 원하는 강의에 대한 정보가 존재하지 않는 경우, 이에 대한 요청을 받아서
  요구사항에 대해 파악하여 반영할 수 있음

- 강의 분야, 종류, 안내 받을 이메일을 입력받음

- 비교 요청 주간 인기순위는 매주 갱신되는 목록으로, `rank` 테이블에 저장된 비교 요청을
  내림차순 정렬하여 반환

- 현재 비교중인 강의는 100명 이상의 사용자가 요청한 강의 정보를 반환 (`compare` 테이블)

</details>

<br>

## 📢 담당 기능 및 API

| 기능                         | 담당자 | 완료 |
| ---------------------------- | ------ | ---- |
| 분야 항목 조회               | 김진욱 | ✅   |
| 스킬 항목 조회               | 김진욱 | ✅   |
| 특정 분야, 스킬의 강의 조회  | 김진욱 | ✅   |
| 맞춤 강의 검색               | 김진욱 | ✅   |
| 검색 조건 만족하는 강의 조회 | 김진욱 | ✅   |
| 총 강의 개수 조회            | 조윤서 | ✅   |
| 총 강의 찾기 횟수 조회       | 조윤서 | ✅   |
| 총 비교 요청 횟수 조회       | 조윤서 | ✅   |
| 신고 사유 항목 조회          | 조윤서 | ✅   |
| 맞지 않는 강의 정보 신고     | 조윤서 | ✅   |
| 특정 스킬의 태그 정보 조회   | 조재호 | ✅   |
| 강의 비교 요청               | 조재호 | ✅   |
| 강의 비교 요청 인기순위 조회 | 조재호 | ✅   |
| 현재 비교중인 강의 조회      | 조재호 | ✅   |

<br>

## 😎 Server Developers

그로투의 멋쟁이 개발자들을 소개합니다

| 이름   | 깃허브                                     |
| ------ | ------------------------------------------ |
| 김진욱 | [@NownS](https://github.com/NownS)         |
| 조윤서 | [@healing99](https://github.com/healing99) |
| 조재호 | [@HOJAE98](https://github.com/HOJAE98)     |
