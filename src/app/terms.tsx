"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Like from "./like";
import { FixedSizeList as List } from "react-window";
require("dotenv").config();
const URL = process.env.NEXT_PUBLIC_BACKURL;

export default function Terms(props: any) {
  const proque = props.question;
  const [like, setLike] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/question`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        props.setQuestion(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get(`${URL}/like`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        setLike(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const addAnswer = async (id: any) => {
    try {
      const confirmed = window.prompt("유희왕이십니까?");
      if (confirmed === process.env.NEXT_PUBLIC_PASSWORD) {
        const answer = window.prompt("답변을 적어주세요.");
        const response = await axios.post(`${URL}/question/${id}`, { answer });
        console.log(response.data);
        window.location.replace("/");
      } else {
        window.alert("유희왕님이 아니시네요.");
      }
    } catch (error: any) {
      console.log("Error adding answer:", error);
    }
  };

  const deleteQuestion = async (id: any) => {
    try {
      const confirmed = window.confirm("정말로 삭제하시겠습니까?");
      if (confirmed) {
        await axios.delete(`${URL}/deleteUser`);
        props.setQuestion((prevquestion: any) =>
          prevquestion.filter((proque: any) => proque._id !== id)
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
    <div className="w-3/5 h-190vh m-auto">
      <List height={1500} itemCount={proque.length} itemSize={250} width="100%">
        {({ index, style }) => {
          const currentQuestion = proque[index];

          return (
            <div style={style}>
              <aside className="m-auto bg-black text-white p-6 mt-5 rounded-lg w-full max-w-lg font-mono text-xl">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2 text-red-500">
                    <button>
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                    </button>
                    <button>
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    </button>
                    <button onClick={() => addAnswer(currentQuestion._id)}>
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </button>
                    <Like
                      isLiked={like.some(
                        (likes: any) => likes._id === currentQuestion._id
                      )}
                      id={currentQuestion._id}
                    />
                  </div>
                  <p className="text-sm">bash</p>
                </div>
                <div className="mt-2">
                  <div className="flex">
                    <p className="text-green-400">$ {currentQuestion.name} </p>
                  </div>
                  <p className="text-white">{currentQuestion.text}</p>
                  {currentQuestion.answer && (
                    <p>
                      -{">"} {currentQuestion.answer}
                    </p>
                  )}
                  <p className="text-green-400">
                    $ 삭제하시겠습니까?{" "}
                    <button onClick={() => deleteQuestion(currentQuestion._id)}>
                      Yes
                    </button>{" "}
                    or No
                  </p>
                </div>
              </aside>
            </div>
          );
        }}
      </List>
    </div>
  );
}
