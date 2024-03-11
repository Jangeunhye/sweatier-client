"use client";

import floating from "@/../public/assets/main_page/floating.svg";
import Image from "next/image";
import Link from "next/link";

function FloatingButton() {
  return (
    <Link
      href="/match/create"
      className="fixed bottom-5 z-30  right-0 sm:right-44  hover:scale-110 transition-all"
    >
      <Image
        src={floating}
        width={78}
        height={78}
        alt="carousel-image"
        priority
      />
    </Link>
  );
}

export default FloatingButton;
