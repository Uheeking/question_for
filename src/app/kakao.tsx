import React from "react";
import Image from "next/image";
import Link from 'next/link'
require("dotenv").config();
import KakaoImage from "../../public/kakao_login_medium_narrow.png";

function kakao() {
  return (
    <div>
      <div className="font-bold text-4xl p-[20px]">
        <Link href={process.env.NEXT_PUBLIC_KAKAO_AUTH_URL}>
          <Image src={KakaoImage} alt="kakao" placeholder="blur" />
        </Link>
      </div>
    </div>
  );
}

export default kakao;
