"use client";
import React, { useEffect, useState } from "react";
import ModalCon from "./modalCon";
import axios from "axios";
import { BiPointer } from "react-icons/bi";
require("dotenv").config();
const URL = process.env.NEXT_PUBLIC_BACKURL;

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [question, setQuestion] = useState([]);
  useEffect(() => {
    axios
      .get(`${URL}`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        setQuestion(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const addAnswer = async (id: any) => {
    try{
      const confirmed = window.prompt("유희왕이십니까?");
      if(confirmed ===process.env.NEXT_PUBLIC_PASSWORD){
        const answer = window.prompt("답변을 적어주세요.");
        await axios.post(`${URL}/${id}`, { answer })
        .then(response => {
          window.location.replace("/")
  })
      }else{
        window.alert("유희왕님이 아니시네요.")
      }
    }catch(error:any){

    }
  }

  const deleteQuestion = async (id: any) => {
    try {
      const confirmed = window.confirm("정말로 삭제하시겠습니까?");
      if (confirmed) {
        await axios.delete(`${URL}/${id}`);
        setQuestion((prevquestion) =>
          prevquestion.filter((question) => question._id !== id)
        );
        window.alert("삭제되었습니다.");
      } else {
        window.alert("삭제되지 않았습니다.");
      }
    } catch (error: any) {
      console.error("Error deleting data:", error);
    }
  };
  return (
    <div>
      <div className="font-bold text-4xl text-brown-900 dark:text-slate-300 tracking-tighter p-[20px]">
        Uheeking
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
      {question.map((question: any, i: any) => (
        <aside
          key={i}
          className="m-auto bg-black text-white p-6 mt-5 rounded-lg w-full max-w-lg font-mono text-xl"
        >
          <div className="flex justify-between items-center">
            <div className="flex space-x-2 text-red-500">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <button onClick={()=>addAnswer(question._id)}><div className="w-3 h-3 rounded-full bg-green-500" /></button>
            </div>
            <p className="text-sm">bash</p>
          </div>
          <div className="mt-4">
            <p className="text-green-400">$ {question.name}</p>
            <p className="text-white">{question.text}</p>
            <p className="text-white">{question.answer ? <p>-> {question.answer}</p> : ""}</p>
            <p className="text-green-400">
              $ 삭제하시겠습니까?{" "}
              <button onClick={() => deleteQuestion(question._id)}>Yes</button> or No
            </p>
          </div>
        </aside>
      ))}
    </div>
  );
}
