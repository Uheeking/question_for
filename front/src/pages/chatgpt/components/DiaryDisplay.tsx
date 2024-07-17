
import {
  LoadingOutlined,
  CheckCircleTwoTone,
  HeartTwoTone,
  SmileTwoTone,
  MessageTwoTone,
  SoundTwoTone,
} from "@ant-design/icons";
import { Image } from "antd";
import styled from "styled-components";
const DiaryDisplay = ({ data, isLoading }: any) => {
  const CardContainer = styled.div`
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 20px;
  border-radius: 2px;
  margin: 10px 0px;
`;
  const CardTitle = styled.div`
  margin: 6px;
  color: #6b6b6b;
  font-size: 22px;
  margin-bottom: 20px;
`;
  const DiaryContainer = styled.div`
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

  const ActionListItem = styled.li`
  margin-bottom: 5px;
`;

  const ThumbnailImage = styled(Image)`
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 15px;
`;

  const Divider = styled.div`
  margin-top: 20px;
`;

  const ResultTitle = styled.div`
  font-size: 35px;
  margin: 10px;
`;


  return (
    <DiaryContainer>
      {isLoading && (
        <>
          불러오는중...
          <LoadingOutlined />
        </>
      )}
      <ResultTitle>{data?.title}</ResultTitle>

      <Divider />
      <CardContainer>
        <CardTitle>
          <CheckCircleTwoTone
            twoToneColor="#FF9AA2"
            style={{ marginRight: "6px" }}
          />
          요약
        </CardTitle>
        <div>{data?.summary}</div>
      </CardContainer>

      {/* <ThumbnailImage src={data?.thumbnail} alt="Thumbnail" /> */}

      <Divider />
      <CardContainer>
        <CardTitle>
          <HeartTwoTone twoToneColor="#FFB7B2" style={{ marginRight: "6px" }} />
          감정일기장
        </CardTitle>
        <div>{data?.emotional_content}</div>
      </CardContainer>

      <Divider />
      <CardContainer>
        <CardTitle>
          <SmileTwoTone twoToneColor="#FFDAC1" style={{ marginRight: "6px" }} />
          내가 느낀 감정
        </CardTitle>
        <div>{data?.emotional_result}</div>
      </CardContainer>

      <Divider />
      <CardContainer>
        <CardTitle>
          <MessageTwoTone
            twoToneColor={"#B5EAD7"}
            style={{ marginRight: "6px" }}
          />
          심리 분석
        </CardTitle>
        <div>{data?.analysis}</div>
      </CardContainer>

      <Divider />
      <CardContainer>
        <CardTitle>
          <SoundTwoTone twoToneColor="#C7CEEA" style={{ marginRight: "6px" }} />
          GPT 조언
        </CardTitle>
        <div>
            <ActionListItem>{data?.action_list}</ActionListItem>
        </div>
      </CardContainer>
    </DiaryContainer>
  );
};

export default DiaryDisplay;
