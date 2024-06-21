"use client";
import React, { useState, useEffect } from "react";
import "./firebase-messaging-sw.js";
import ModalCon from "./modalCon";
import Terms from "./terms";
import axios from "axios";
import { BiPointer } from "react-icons/bi";
import Kakao from "./kakao";
import toast, { Toaster } from "react-hot-toast";
import ScrollToTop from "./ScrollToTop";
import Link from "next/link";
import Image from "next/image";
require("dotenv").config();
const BACKURL = process.env.NEXT_PUBLIC_BACKURL;

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [question, setQuestion] = useState([]);
  const [nickname, setNickname] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localNickname = localStorage.getItem("id");
      const url = new URL(window.location.href);
      const urlParams = url.searchParams;
      const userId = urlParams.get("id");

      if (userId) {
        setId(userId);
        axios
          .get(`${BACKURL}/oauth/findUser/${userId}`)
          .then((response) => {
            const data = response.data;
            localStorage.setItem("id", data[0].name);
            setNickname(data[0].name); // Update nickname state
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }

      setNickname(localNickname || ""); // Update nickname state with local storage value
    }
  }, []);

  const deleteUser = async (id: any) => {
    console.log(id);

    try {
      const response = await axios.get(`${BACKURL}/oauth/deleteUser/${id}`);
      if (response.data.message) {
        toast.success("로그아웃이 되었습니다. ");
        localStorage.removeItem("id");
        setTimeout(() => {
          window.location.replace("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("로그아웃이 되지 않았습니다. ");
    }
  };

  return (
    <div>
      <Toaster />
      <div className="flex space-x-2 justify-between">
        <div className="font-bold text-4xl text-brown-900 dark:text-slate-300 tracking-tighter pl-[20px] pt-[20px]">
          Uheeking
        </div>
        {nickname ? (
          <div className="flex">
            <div className="font-bold text-2xl pt-[25px] pr-[10px]">
              {nickname}님
            </div>
            <button
              onClick={() => deleteUser(id)}
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
          <Image
          priority
            src="/profile.png"
            className="bg-white m-auto object-cover inset-0 rounded-full h-[130px] w-[130px]"
            width={100}
            height={100}
            alt="profile"
          />
          <div
            className="flex-col w-[130px] m-auto"
            style={{ padding: "20px 20px 5px 20px" }}
          >
            <span className="">My name is </span>
            <span className="bg-black text-white text-xl">Uheeking</span>
          </div>
          <div className="text-center">
            <Link href="/chatgpt/GPTSolution">ask for chat GPT</Link>
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
      <ScrollToTop />
    </div>
  );
}
