import { Input, Button } from "antd";
import { useState } from "react";
import { Title } from "./CommonStyles";
import styled from "styled-components";
import { FileImageOutlined } from "@ant-design/icons";
import html2canvas from "html2canvas";

const { TextArea } = Input;

const DiaryInput = ({ isLoading, onSubmit, messageApi }: any) => {
  const [userInput, setUserInput] = useState(null);
  const actualValue = userInput ?? "";
  const handleUserInput = (e: any) => {
    setUserInput(e.target.value);
  };
  const handleClick = () => {
    if (!userInput) {
      messageApi.open({
        type: "error",
        content: "일과를 적어주세요.",
      });
      return;
    }
    messageApi.open({
      type: "success",
      content: "생성 요청 완료",
    });

    onSubmit(userInput);
    setUserInput(null);
  };

  const captureAndDownload = async () => {
    const nodeToCapture = document.getElementById("capture");
    if (nodeToCapture instanceof HTMLElement) {
      try {
        const canvas = await html2canvas(nodeToCapture, {
          allowTaint: true,
          useCORS: true,
        });

        // Proceed with canvas manipulation or download
        console.log("Canvas captured:", canvas);
      } catch (error) {
        console.error("Error capturing canvas:", error);
      }
    } else {
      console.warn("Element with id 'capture' not found or not an HTMLElement");
    }
  };

  return (
    <div>
      <Title>내 고민</Title>
      <TextArea
        value={actualValue}
        onChange={handleUserInput}
        placeholder="오늘 일어난 일들을 간단히 적어주세요."
        style={{ height: "200px" }}
      />
      <ButtonContainer>
        <Button loading={isLoading} onClick={handleClick}>
          GPT 솔루션을 제시해줘!
        </Button>
        <Button
          icon={<FileImageOutlined />}
          loading={isLoading}
          onClick={captureAndDownload}
        >
          저장
        </Button>
      </ButtonContainer>
      <canvas id="canvas" style={{ display: "none" }}></canvas>
    </div>
  );
};

export default DiaryInput;

const ButtonContainer = styled.div`
  margin: 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  gap: 5px;
`;
