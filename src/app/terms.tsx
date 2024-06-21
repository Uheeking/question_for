"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import Like from "./like";
import toast from "react-hot-toast";
import { VariableSizeList as List } from "react-window";
require("dotenv").config();
const BACKURL = process.env.NEXT_PUBLIC_BACKURL;

export default function Terms(props: any) {
  const proque = props.question;
  const [like, setLike] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKURL}/question`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        props.setQuestion(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get(`${BACKURL}/like`)
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
        const response = await axios.patch(`${BACKURL}/question/${id}`, {
          answer,
        });
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
      console.log(confirmed);

      if (confirmed) {
        await axios.delete(`${BACKURL}/question/${id}`);
        props.setQuestion((prevquestion: any) =>
          prevquestion.filter((proque: any) => proque._id !== id)
        );
        toast.success("삭제되었습니다. ");
      } else {
        toast.error("삭제되지 않았습니다. ");
      }
    } catch (error: any) {
      console.error("Error deleting data:", error);
    }
  };

  const getItemSize = (index: any) => {
    const hasAnswer = proque[index].answer;
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        return hasAnswer ? 250 : 200; // Mobile size
      } else {
        return hasAnswer ? 250 : 200; // Desktop size
      }
    }
    return 250;
  };

  return (
    <div className="w-full md:w-1/2 h-auto md:h-190vh m-auto flex responsive-container">
      <List
       height={typeof window !== "undefined" && window.innerWidth < 768 ? 1000 : 1500}
        itemCount={proque.length}
        itemSize={(index) => getItemSize(index)}
        width={typeof window !== "undefined" && window.innerWidth < 768 ? "100vw" : "80vw"} // Use 100vw for full width on mobile
      >
        {({ index, style }) => {
          const currentQuestion = proque[index];
  
          return (
            <div style={{ ...style }}>
              <aside className="m-auto bg-black text-white p-4 md:p-6 mt-2 md:mt-5 rounded-lg w-full max-w-lg font-mono text-lg md:text-xl responsive-aside">
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
                  <p className="text-xs md:text-sm responsive-text">bash</p>
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
