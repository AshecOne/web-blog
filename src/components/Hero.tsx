"use client";
import * as React from "react";
import Container from "./Container";
import { useRouter } from "next/navigation";

interface IHeroProps {}

const Hero: React.FunctionComponent<IHeroProps> = (props) => {
  const router = useRouter();
  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center text-center"
      style={{
        backgroundImage: 'url("https://ashecone.github.io/web-blog/hero.jpg!d")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <Container>
        <div className="relative z-10 text-white">
          <h1 className="text-4xl font-bold mb-2">
            Inspiration for Travel by Real People
          </h1>
          <p className="text-xl mb-4">Book smart, travel simple</p>
          <button
            onClick={() => router.push("/signin")}
            className="bg-white text-black hover:bg-gray-500 hover:text-white transition duration-300 font-semibold py-2 px-4 rounded"
          >
            Start planning your trip
          </button>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
