"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import { Button, Form, Input, Select } from 'antd';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const customModalStyles: ReactModal.Styles = {
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

export default function Home() {
  const [form] = Form.useForm();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const onReset = () => {
    form.resetFields();
  };
  const onFill = () => {
    form.setFieldsValue({ note: 'Hello world!' });
  };
  return (
    <div>
      <div className="font-bold text-4xl text-brown-900 dark:text-slate-300 tracking-tighter p-[20px]">
        Uheeking
      </div>
      <div className="justify-center w-[150px] m-auto">
        <div className="w-full flex-col">
          <img
            src="/profile.png"
            className="bg-white object-cover inset-0 rounded-full h-[130px] w-[130px]"
          />
          <div className="flex-col  w-[150px] m-auto p-[20px]">
            <span className="">My name is </span>
            <span className="bg-black text-white text-xl">Uheeking</span>
          </div>
        </div>
        <button
          onClick={() => setModalIsOpen(true)}
          className="font-bold text-4xl text-brown-900 dark:text-slate-300 tracking-tighter p-1"
        >
          질문하기
        </button>
        <Modal
          isOpen={modalIsOpen}
          style={customModalStyles}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <Form
      {...layout}
      form={form}
      name="control-hooks"
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="note" label="Note" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
      >
        {({ getFieldValue }) =>
          getFieldValue('gender') === 'other' ? (
            <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
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
      </div>
      <aside className="m-auto bg-black text-white p-6 mt-5 rounded-lg w-full max-w-lg font-mono">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 text-red-500">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <p className="text-sm">bash</p>
        </div>
        <div className="mt-4">
          <p className="text-green-400">$ npm install next</p>
          <p className="text-white">+ next@10.2.3</p>
          <p className="text-white">
            added 1 package, and audited 2 packages in 3s
          </p>
          <p className="text-green-400">$</p>
        </div>
      </aside>
    </div>
  );
}
