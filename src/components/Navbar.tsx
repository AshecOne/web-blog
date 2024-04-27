"use client";
import * as React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Container from "./Container";
import { useAppSelector } from "@/lib/hooks";
import { useUser } from "@/contexts/UserContext";
import { useAppDispatch } from "@/lib/hooks";
import { setSuccessLogin } from "@/lib/features/userSlice";
import { resetUserState } from "@/lib/features/userSlice";
import { getCategory } from "@/lib/features/categorySlice";
import axios from "axios";
import { BASE_URL } from "@/utils/helper";

interface INavbarProps {}

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn);
  const username = useAppSelector((state) => state.userReducer.username);

  React.useEffect(() => {
    const token = localStorage.getItem("user-token");
    if (token) {
      keepLogin();
    } else {
      setIsLoading(false);
    }
  }, [dispatch]);
  

  React.useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const handleSignOut = () => {
    localStorage.removeItem("user-token");
    dispatch(resetUserState());
    router.push("/");
  };

  const keepLogin = async () => {
    try {
      const token = localStorage.getItem("user-token");
      if (token) {
        const response = await axios.get(BASE_URL + "/auth/keeplogin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          const { id, username, email } = response.data.data;
          dispatch(setSuccessLogin({ id, username, email }));
        } else {
          localStorage.removeItem("user-token");
          dispatch(resetUserState());
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    keepLogin();
    const intervalId = setInterval(keepLogin, 10 * 60 * 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section
      id="navbar"
      className="absolute top-0 left-0 bg-black bg-opacity-35 w-full z-10"
    >
      <Container>
        <nav className="flex justify-between items-center h-[4rem]">
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="cursor-pointer"
              style={{ maxWidth: "300px", height: "auto" }}
              onClick={() => router.push("/")}
            />
          </div>
          <ul className="hidden md:flex gap-4">
            <li className="text-white hover:text-gray-300 cursor-pointer">
              DESTINATIONS
            </li>
            <li className="text-white hover:text-gray-300 cursor-pointer">
              FOOD
            </li>
            <li className="text-white hover:text-gray-300 cursor-pointer">
              WELL BEING
            </li>
            <li className="text-white hover:text-gray-300 cursor-pointer">
              SPORT
            </li>
            <li className="text-white hover:text-gray-300 cursor-pointer">
              FAMILY
            </li>
            <li className="text-white hover:text-gray-300 cursor-pointer">
              LIFESTYLE
            </li>
          </ul>
          <div className="flex items-center gap-4">
            <IoSearchOutline
              size="1.5em"
              className="text-white cursor-pointer"
            />
            <button className="hidden md:block bg-black text-white py-1 px-3 hover:bg-gray-100 hover:text-black transition duration-300">
              GET YOUR 120$ CHRISTMAS GIFT
            </button>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          ) : isLoggedIn ? (
            <div className="relative group mt-11 mb-11 border px-4 py-2 bg-white bg-opacity-20 hover:bg-gray-200  mr-6 inline-block">
              <p className="font-bold text-black cursor-pointer">{username}</p>
              <div className="absolute left-1/2 transform -translate-x-1/2 py-2 w-48 bg-white rounded-md shadow-xl z-20 hidden group-hover:block">
                <a
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                >
                  Profile
                </a>
                <a
                  href="/createArticle"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                >
                  Create Article
                </a>
                <div className="h-[1px] bg-black my-2 mx-auto w-[80%]"></div>
                <button
                  onClick={handleSignOut}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 w-full text-left"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <button
              className="bg-black text-white py-2 px-4 hover:bg-gray-100 hover:text-black transition duration-300"
              onClick={() => router.push("/signin")}
            >
              Log In
            </button>
          )}
        </nav>
      </Container>
    </section>
  );
};

export default Navbar;
