import React, { useState } from 'react';
import styled from 'styled-components';
import { Typewriter } from 'react-simple-typewriter';
import { message } from 'antd';
import DiaryInput from './components/DiaryInput';
import DiaryDisplay from './components/DiaryDisplay';
import  CallGPT  from './api/gpt'; // Adjust the path based on your file structure

const dummyData = {
  title: '개발 고민과 해결',
  thumbnail: 'https://source.unsplash.com/1600x900/?coding',
  summary: '코딩 강의를 듣고 프로젝트에 버그가 발생했지만 해결하지 못하여 GPT를 통해 문제를 해결했음',
  emotional_content: '오늘 코딩 강의를 들었는데, 프로젝트에 버그가 많이 나왔어. ...',
  emotional_result: '이번 상황을 통해 내가 프로그래밍에 대해 더 배울 필요가 있음을 느꼈다. ...',
  analysis: '이번 상황은 개발자로서 성장하는 과정에서 마주치는 문제였다. ...',
  action_list: '더 깊은 개념적 이해를 위해 관련 서적을 읽어보기', 
};

const keyword =
  '안녕하세요. gpt가 들어주는 고민상담소입니다. 무물로도 풀리지 않는 궁금증이 존재한다구요? ...';

const App = () => {
  const [data, setData] = useState(dummyData);
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleClickAPICall = async (userInput : any) => {
    try {
      setIsLoading(true);
      const message = await CallGPT({ promptApiEndpoint: userInput });
      setData(JSON.parse(message));
    } catch (error) {
      console.error('Error calling GPT:', error);
      messageApi.open({
        type: 'error',
        content: 'An error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (userInput : any) => {
    handleClickAPICall(userInput);
  };

  return (
    <AppContainer>
      {contextHolder}
      <AppTitle>GPT, 고민을 들어줘</AppTitle>
      <div className="m-[10px]">
        <Typewriter
          words={[keyword]}
          loop={5}
          cursor
          cursorStyle="|"
          typeSpeed={120}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </div>
      <DiaryInput
        messageApi={messageApi}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
      <div id="capture">
        <DiaryDisplay isLoading={isLoading} data={data} />
      </div>
    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
`;

const AppTitle = styled.div`
  width: 100%;
  font-weight: 400;
  font-size: 35px;
  text-align: center;
  font-family: 'Noto Serif KR';
`;
