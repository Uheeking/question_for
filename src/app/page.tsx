"use client";
import React, { useState } from "react";
import ModalCon from "./modalCon";
import Terms from "./terms";
import { BiPointer } from "react-icons/bi";
import Kakao from './kakao'
require("dotenv").config();

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [question, setQuestion] = useState([]);
  const queryString = location.search;
  const encodedId = queryString ? decodeURIComponent(queryString.split('=')[1]) : null;
  return (
    // Improve below code
    <div>
      <div className="flex space-x-2 justify-between">
        <div className="font-bold text-4xl text-brown-900 dark:text-slate-300 tracking-tighter p-[20px]">
          Uheeking
        </div>
        <div className="p-[10px] black bg-white">{encodedId}</div>
        {encodedId ? encodedId : <Kakao />}
        
      </div>
      <div className="justify-center w-[200px] m-auto">
        <div className="w-full flex-col">
          <img
            src="/profile.png"
            className="bg-white m-auto object-cover inset-0 rounded-full h-[130px] w-[130px]"
          />
          <div
            className="flex-col w-[130px] m-auto"
            style={{ padding: "20px 20px 5px 20px" }}
          >
            <span className="">My name is </span>
            <span className="bg-black text-white text-xl">Uheeking</span>
          </div>
        </div>
        <button
          onClick={() => setModalIsOpen(true)}
          className="flex ml-3 font-bold text-4xl text-brown-900 dark:text-slate-300 tracking-tighter p-1"
        >
          질문하기
          <BiPointer />
        </button>
        <ModalCon
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          question={question}
          setQuestion={setQuestion}
        />
      </div>
      <Terms question={question} setQuestion={setQuestion} />
    </div>
  );
}
