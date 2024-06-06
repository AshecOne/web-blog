"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Blogs from "@/views/Blogs";
import Booking from "@/views/Booking";
import Footer from "@/components/Footer";
import Article from "@/views/Article";
import ClipLoader from "react-spinners/ClipLoader";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulasikan proses loading selama 2 detik
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={150} color={"#123abc"} loading={true} />
        </div>
      ) : (
        <>
          <Hero />
          <Blogs />
          <Booking />
          <Article />
          <Footer />
        </>
      )}
    </>
  );
}
