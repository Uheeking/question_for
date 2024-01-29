import React, { useEffect, useState } from "react";
import clsx from "clsx";
import axios from "axios";
require("dotenv").config();
const BACKURL = process.env.NEXT_PUBLIC_BACKURL;

function like(props: any) {
  const FILLED_HEART =
    "M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z";
  const EMPTY_HEART =
    "M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z";
  let like = props.isLiked;
  const [isLiked, setIsLiked] = useState(like);
  const [optimisticIsLiked, setOptimisticIsLiked] = useState(like);
  const [runningFetchCount, setRunningFetchCount] = useState(0);
  const toggleLike = async (id: any) => {
    try {
      console.log("토글 돌아가는 중");
      console.log(isLiked, runningFetchCount);
      setOptimisticIsLiked((optimisticIsLiked: any) => !optimisticIsLiked);
      setRunningFetchCount((runningFetchCount) => runningFetchCount + 1);
      const response = await axios.post(`${BACKURL}/like/${id}`, {
        isLiked: !isLiked,
      });
      if (response.data) {
        console.log(response.data);
      }
      setIsLiked(!isLiked);
      setRunningFetchCount((runningFetchCount) => runningFetchCount - 1);
    } catch (error: any) {
      console.error("Error creating data:", error);
    }
  };

  useEffect(() => {
    if (runningFetchCount === 0) {
      setOptimisticIsLiked(isLiked);
    }
  }, [runningFetchCount, isLiked]);

  return (
    <div>
      <button
        type="button"
        className={clsx(
          "w-6 h-6 rounded-full group hover:bg-red-500/15 transition-colors pt-1"
        )}
        onClick={() => toggleLike(props.id)}
      >
        <svg className="w-6 h-6 pointer-events-none" viewBox="0 0 24 24">
          <g>
            <path
              d={optimisticIsLiked ? FILLED_HEART : EMPTY_HEART}
              className={clsx(
                optimisticIsLiked
                  ? "fill-red-500"
                  : "fill-slate-400 group-hover:fill-red-500/60 transition-colors",
                optimisticIsLiked && "animate-appear"
              )}
            />
          </g>
        </svg>
      </button>
    </div>
  );
}

export default like;
