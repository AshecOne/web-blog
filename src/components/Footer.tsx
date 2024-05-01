import * as React from "react";
import Container from "./Container";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
  FaArrowUp,
} from "react-icons/fa";

interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer id="footer" className="bg-black text-white pt-3">
      <Container>
        <div className="flex mx-4 justify-between items-center pb-5">
          <p>Designed & Developed by AshecOne</p>
          <div className="m:flex items-center">
            <div className="m:flex m:flex-col hidden items-center mr-4">
              <FaFacebookF className="cursor-pointer mr-2" /> <span>29</span>
            </div>
            <div className="m:flex m:flex-col hidden items-center mr-4">
              <FaTwitter className="cursor-pointer mr-2" /> <span>70K</span>
            </div>
            <div className="m:flex m:flex-col hidden items-center mr-4">
              <FaInstagram className="cursor-pointer mr-2" /> <span>40</span>
            </div>
            <div className="m:flex m:flex-col hidden items-center mr-4">
              <FaPinterestP className="cursor-pointer mr-2" /> <span>13K</span>
            </div>
            <div className="m:flex m:flex-col hidden items-center">
              <FaYoutube className="cursor-pointer mr-2" /> <span>168K</span>
            </div>
            <button
              onClick={scrollToTop}
              className="ml-5 m:mt-20 bg-gray-600 p-2 rounded"
            >
              <FaArrowUp />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
