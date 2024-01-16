"use client";
import React, { useState } from "react";
import ModalCon from "./modalCon";
import Terms from "./terms";
import axios from "axios";
import { BiPointer } from "react-icons/bi";
import Kakao from "./kakao";
import toast from "react-hot-toast";
require("dotenv").config();

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [question, setQuestion] = useState([]);
  const Id = localStorage.getItem("id");
  const deleteUser = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/deleteUser");
      if (response.data.message) {
        toast.success("로그아웃이 되었습니다. ");
        localStorage.removeItem("id");
        setTimeout(() => {
          window.location.replace("/");
        }, 1000);
      }
    } catch (error: any) {
      console.error("Error adding a To-Do item:", error);
      toast.error("로그아웃이 되지 않았습니다. ");
    }
  };
  return (
    <div>
      <div className="flex space-x-2 justify-between">
        <div className="font-bold text-4xl text-brown-900 dark:text-slate-300 tracking-tighter pl-[20px] pt-[20px]">
          Uheeking
        </div>
        {Id ? (
          <div className="flex">
            <div className="font-bold text-2xl pt-[25px] pr-[10px]">{Id}님</div>
            <button
              onClick={deleteUser}
              className="mt-[20px] mr-[20px] bg-green-400 text-white rounded-md p-[10px]"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <Kakao />
        )}
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
