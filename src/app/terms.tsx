"use client";
import React, { useEffect } from "react";
import axios from "axios";
require("dotenv").config();
const URL = process.env.NEXT_PUBLIC_BACKURL;

export default function Terms(props: any) {
  const proque = props.question;
  useEffect(() => {
    axios
      .get(`${URL}`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        props.setQuestion(data);
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
        console.log('error', error);
    }
  }

  const deleteQuestion = async (id: any) => {
    try {
      const confirmed = window.confirm("정말로 삭제하시겠습니까?");
      if (confirmed) {
        await axios.delete(`${URL}/${id}`);
        props.setQuestion((prevquestion) =>
          prevquestion.filter((proque) => proque._id !== id)
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
    <>
      {proque.map((question: any, i: any) => (
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
    </>
  );
}
