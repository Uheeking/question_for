import React from "react";
import Image from "next/image";
import KakaoImage from "../../public/kakao_login_medium_narrow.png";

function kakao() {
  return (
    <div>
      <div className="font-bold text-4xl p-[20px]">
        <a href={process.env.KAKAO_AUTH_URL}>
          <Image src={KakaoImage} alt="kakao" placeholder="blur" />
        </a>
      </div>
    </div>
  );
}

export default kakao;
