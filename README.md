## 🌞 프로젝트 기획 이유

인스타그램을 보다가 무엇이든 물어보세요를 보고 이걸 프로젝트로 해서 개발관련해서 답변 달아주면 주니어분들에게 도움이 되겠다는 생각에 기획하게 되었습니다. 

익명이라는 틀에서 가감없이 물어볼 수 있고, 나라는 사람을 돌아볼 수 있도록 기획하게 되었습니다. 

## 🤩 프로젝트 개발 목표 및 내용

- ***무물***
    - 무엇이든 물어봄으로써 주니어분들에게 도움이 되도록 하였습니다.

## 😘 **구현 화면**
<p align="center">
<img width="597" alt="스크린샷 2023-11-15 161901" src="https://github.com/Uheeking/websocket_calendar/assets/90121929/4e367cf9-31cd-4150-a1de-fa8a7a6894e6">
</p>


화면은 따로 페이지 이동없이 구현하였다. 기능은 간단한 기능 세개로 구현하였다. 

### 1) 질문하기

<p align="center">
  <img width="399" alt="스크린샷 2023-11-15 162157" src="https://github.com/Uheeking/websocket_calendar/assets/90121929/05d82b5d-fcbf-4023-bd20-3886e98ec326">
</p>

기본 팝업창을 만들어 누구든지 질문할 수 있게 팝업창을 만들었다. 이름, 질문하고자 하는 내용, 비밀번호 등으로 하여 가볍게 질문할 수 있게끔 하였다. 하지만 다른 사람이 터치할 수 없도록 비밀번호를 설정하게 하였다. 

이것도 귀찮다면 **fill form 기능을 설정**하여 이를 클릭시 이름과 질문내용을 임의로 할 수 있게 하였다. 사용자가 비밀번호만 입력하면 내용이 작성되게 하였다. 

### 2) 답변달기

<p align="center">
<img width="332" alt="스크린샷 2023-11-15 162409" src="https://github.com/Uheeking/websocket_calendar/assets/90121929/10555207-1d54-4003-be78-8eef5bab530c">
</p>


사실상 이것때문에 회원가입하고 로그인 하는 것이 귀찮다는 피드백을 받아, 따로 회원가입과 로그인 기능은 구현하지 않았다. 그래서 나만을 위한 무물이기에 나인지 확인할 수 있는 prompt를 띄웠고 이가 맞다면 답변을 달 수 있는 구조로 설정하였다. 

### 2-1) 사용자가 아닐 경우

<p align="center">
  <img width="332" alt="스크린샷 2023-11-15 162548" src="https://github.com/Uheeking/websocket_calendar/assets/90121929/344f8a0b-e7bf-473c-aa80-44d89e6322bc">
</p>


### 2-2) 사용자가 맞을 경우

<p align="center">
  <img width="335" alt="스크린샷 2023-11-15 162607" src="https://github.com/Uheeking/websocket_calendar/assets/90121929/708d4749-f15d-4891-af23-b65bb71670eb">
</p>


### 3) 삭제하기

<p align="center">
  <img width="334" alt="스크린샷 2023-11-15 162906" src="https://github.com/Uheeking/websocket_calendar/assets/90121929/226d9a09-56d0-4a96-8ddc-1e54318b2a9b">
</p>


만약 악플이나 위의 취지에 맞지 않은 말을 한다면 삭제가 가능하도록 하였고 마스터키처럼 모두가 삭제가 가능하도록 설정하였다.
