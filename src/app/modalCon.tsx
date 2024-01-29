import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Button, Form, Input } from "antd";
const BACKURL = process.env.NEXT_PUBLIC_BACKURL;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const customModalStyles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    width: "400px",
    height: "360px",
    zIndex: "150",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "white",
    justifyContent: "center",
    overflow: "auto",
  },
};

const ModalCon = (props: any) => {
  const [form] = Form.useForm();
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const onReset = () => {
    form.resetFields();
  };
  const onFill = () => {
    form.setFieldsValue({ name: "익명", text: "잘 보고 있어요!!" });
    setName("익명");
    setText("잘 보고 있어요!!");
  };
  const handleAddQuestion = async (name: any, text: any, password: any) => {
    const { setQuestion, setModalIsOpen } = props;

    if (name) {
      try {
        const response = await axios.post(`${BACKURL}/question`, {
          name,
          text,
          password,
        });

        if (response.status === 201) {
          setQuestion([...props.question, response.data]);
          setName("");
          setText("");
          setPassword("");
          setModalIsOpen(false);
          window.location.replace("/");
        }
      } catch (error: any) {
        console.error("Error adding a question:", error);
        alert("추가 실패: " + error.message);
      }
    }
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={props.modalIsOpen}
      style={customModalStyles}
      onRequestClose={() => props.setModalIsOpen(false)}
    >
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="text"
          className="border-solid"
          label="Text"
          rules={[{ required: true }]}
        >
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            style={{
              border: "1px lightgray solid",
              width: "240px",
              borderRadius: "5px",
              height: "120px",
              padding: "10px",
            }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true }]}
        >
          <Input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button
            htmlType="submit"
            onClick={() => handleAddQuestion(name, text, password)}
            className="bg-blue-300 text-white"
          >
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
          <Button type="link" htmlType="button" onClick={onFill}>
            Fill form
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalCon;
