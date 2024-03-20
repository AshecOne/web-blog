'use client';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Blogs from "@/views/Blogs";
import Booking from "@/views/Booking";
import Footer from "@/components/Footer";
import Article from "@/views/Article";

export default function Home() {
  
  
  return (
    <>
      <Navbar />
      <Hero />
      <Blogs />
      <Booking />
      <Article />
      <Footer />
    </>
  );
}
