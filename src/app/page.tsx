"use client";
import React, { useEffect, useState } from "react";
import ModalCon from './modalCon';
import axios from "axios";
import { BiPointer } from 'react-icons/bi';

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [question, setQuestion] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/question")
      .then((response) => {
        const data = response.data;
        console.log(data);
        setQuestion(data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
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
          <div className="flex-col w-[130px] m-auto" style={{padding: '20px 20px 5px 20px'}}>
            <span className="">My name is </span>
            <span className="bg-black text-white text-xl">Uheeking</span>
          </div>
        </div>
        <button
          onClick={() => setModalIsOpen(true)}
          className="flex ml-3 font-bold text-4xl text-brown-900 dark:text-slate-300 tracking-tighter p-1"
        >
          질문하기<BiPointer />
        </button>
        
        <ModalCon modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} question={question} setQuestion={setQuestion}/>
      </div>
      {/* <aside className="m-auto bg-black text-white p-6 mt-5 rounded-lg w-full max-w-lg font-mono">
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
      </aside> */}
      {question.map((question, i : any) => (
      <aside key={i} className="m-auto bg-black text-white p-6 mt-5 rounded-lg w-full max-w-lg font-mono text-xl">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 text-red-500">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <p className="text-sm">bash</p>
        </div>
        <div className="mt-4">
          <p className="text-green-400">$ {question.name}</p>
          <p className="text-white">+ next@10.2.3</p>
          <p className="text-white">
          {question.text}
          </p>
          <p className="text-green-400">삭제하시겠습니까? <button>Yes</button> or No</p>
        </div>
      </aside>
      
        ))}
    </div>
  );
}
