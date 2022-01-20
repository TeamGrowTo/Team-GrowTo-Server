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

[API 명세서 보러가기](https://lud2ns.notion.site/API-0270ece679f14f92b72bceeeb78c1c28)

<br>

## 📐 ERD

<img src="https://user-images.githubusercontent.com/86958131/150390315-153acc19-4856-47f5-90e3-f1007782ecc8.png" width="640" height="620"/>



<br>

## ✨ 주요 기능 설명 
#### Main 페이지

<img src="https://user-images.githubusercontent.com/86958131/150387826-18be61c3-aace-4dd4-b02a-1b491fafc988.PNG"/>

기획의도: 초기 페이지로 IT교육강의 서비스 임을 인지시키고, 이들이 비교를 시작할 수있게 만들어주는 것

1. 전체강의(버튼): 클릭시 전체 강의 분야 (개발, 기획, 데이터, 디자인, 마케팅, 기타) 를 선택할수있는 페이지로 이동
    - 해당 페이지에선 메인분야(ex 기획) 와 세부분야(ex 서비스기획) 를 선택후 사용자가 선택한 분야에 해당하는 강의를 소팅
    
2. 비교요청(버튼): 클릭시 강의비교요청을 할수있는 페이지로 이동 
   - 해당 페이지에선 메인분야,세부분야를 선택하고 이메일 입력시 비교요청한 강의 횟수를 Count해서 비교요청 횟수를 저장  

3. About(버튼): 클릭시 ABOUT_Growto Stroy 페이지 이동 

4. 강의분야(버튼): 메인분야 클릭시 해당분야의 세부분야 목록을 선택할수있는 페이지로 이동

5.  총비교강의: DB lecture테이블에 담긴 강의 수 를 조회

6. 맞춤 강의 찾기 : 맞춤강의찾기 버튼을 클릭한 총 횟수를 조회

7. 비교요청 : 비교요청 버튼을 클릭한 총 횟수를 조회

#### Process 1, 2, 3

<img src="https://user-images.githubusercontent.com/86958131/150388053-7a92825c-6f2b-49dc-a69e-92cd7384cafd.PNG"/>

기획의도: 유저가 최대한 자신에게 맞는 강의를 찾을 수있도록 유도 하는 것 

Process 1 => Main 페이지에서 사용자가 선택한 메인분야와 세부분야 조건에 맞는 강의 특성들을 조회

Process 2 => 사용자가 원하는 강의 총 완강시간 데이터 수집 

Process 3 => 사용자가 원하는 강의 가격대 데이터 수집

Process1,2,3 을 거치는 과정은 사용자가 원하는 강의를 조회하기위한 조건으로 반영됨

#### 강의 TOP 3 페이지 
 
<img src="https://user-images.githubusercontent.com/86958131/150388157-0563d167-b143-4557-80b3-3567fd242afc.png" width="410" height="620"/>

기획의도: 자신에게 맞는 강의페이지로 이동하기위해 도와주는 것

TOP3: 유저가 Process에서 선택한 사항을 바탕으로 가장 근접한 강의를 좌측에서부터 1순위, 2순위, 3순위 로 조회 

 이후 아래의 강의는 몇개의 사용자가원하는 강의가 있는지 조회하고 강의 정보(강의 이름, 완강시간, 가격, 질문응답시간, 반복시청기간, 개설일, 강의특성)등을
  담아 조회

앞서 조회한 강의들을 총소요시간(짧은순,긴순) / 가격(높은순 낮은순)  / 개설일(최근순) / 반복시청시간(가능여부) / 질문응답시간(빠름,느림) 의 소팅 조건을충족할수있도록 구현

#### 강의비교 요청 페이지

<img src="https://user-images.githubusercontent.com/86958131/150388229-d5d72683-ddec-430a-97c9-45e78d0c9f78.PNG" width="410" height="620"/>

기획의도: 강의를 수동으로 크롤링하는 과정에서 현재 존재하는 모든강의를 가져오지못하기때문에 
          사용자가 원하는 강의들을 추가 해주는 것

해당페이지에서 사용자가 원하는 강의분야, 강의종류를 입력받아 강의비교 요청시 DB rank_table 에 추가하고, 다른 사용자로부터 같은 강의비교요청을 입력받을시에는해당강의 요청수를 Count. 

비교요청 주간 인기순위는 rank_table에 강의Count 수가 100미만인 강의를 내림차순으로 조회

현재 비교중인 강의는 comparing_table에 담긴 요청수가 100이상인 강의를 id순으로 조회
## 담당 기능 및 API

| 기능                         | 담당자 | 완료 |
| ---------------------------- | ------ | ---- |
| 분야 항목 조회               | 김진욱 |   ✅  |
| 스킬 항목 조회               | 김진욱 |   ✅   |
| 특정 분야, 스킬의 강의 조회  | 김진욱 |   ✅   |
| 맞춤 강의 검색               | 김진욱 |   ✅   |
| 검색 조건 만족하는 강의 조회 | 김진욱 |   ✅   |
| 총 강의 개수 조회            | 조윤서 |  ✅    |
| 총 강의 찾기 횟수 조회       | 조윤서 |   ✅   |
| 총 비교 요청 횟수 조회       | 조윤서 |   ✅   |
| 신고 사유 항목 조회          | 조윤서 |   ✅   |
| 맞지 않는 강의 정보 신고     | 조윤서 |   ✅   |
| 특정 스킬의 태그 정보 조회   | 조재호 |   ✅   |
| 강의 비교 요청               | 조재호 |   ✅   |
| 강의 비교 요청 인기순위 조회 | 조재호 |   ✅   |
| 현재 비교중인 강의 조회      | 조재호 | ✅     |

<br>

## 😎 Server Developers

그로투의 멋쟁이 개발자들을 소개합니다

| 이름   | 깃허브                                     |
| ------ | ------------------------------------------ |
| 김진욱 | [@NownS](https://github.com/NownS)         |
| 조윤서 | [@healing99](https://github.com/healing99) |
| 조재호 | [@HOJAE98](https://github.com/HOJAE98)     |
