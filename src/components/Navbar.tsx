"use client";
import * as React from "react";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Container from "./Container";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setSuccessLogin, resetUserState } from "@/lib/features/userSlice";
import {
  getCategory,
  setSelectedCategoryAction,
  ICategory,
} from "@/lib/features/categorySlice";
import axios from "axios";
import { FaBars } from "react-icons/fa";

interface INavbarProps {}

interface IArticle {
  id: string;
  author: {
    username: string;
  };
  title: string;
  urlImage: string;
  description: string;
  createdAt: string;
  category: {
    title: string;
  };
}

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn);
  const username = useAppSelector((state) => state.userReducer.username);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { categories } = useAppSelector((state) => state.categoryReducer);
  const selectedCategory = useAppSelector(
    (state) => state.categoryReducer.selectedCategory
  );
  const [showSearch, setShowSearch] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<IArticle[]>([]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("user-token");
      if (token) {
        keepLogin();
      } else {
        setIsLoading(false);
      }
    }
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const handleCategoryClick = (category: string) => {
    dispatch(setSelectedCategoryAction(category));
    const section = document.getElementById("blogs");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
    // setSearchQuery("");
    // setSearchResults([]);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Debounce search requests
    const debounceTimer = setTimeout(() => {
      searchArticles(query);
    }, 300);

    return () => {
      clearTimeout(debounceTimer);
    };
  };

  const searchArticles = async (query: string) => {
    try {
      const response = await axios.get<{ data: IArticle[] }>(
        `https://blog-website-ashecone-25ef50f82ac6.herokuapp.com/articles/search?query=${query}`
      );
      setSearchResults(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleArticleClick = (articleId: string) => {
    router.push(`/articles/${articleId}`);
  };

  const handleSignOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user-token");
    }
    dispatch(resetUserState());
    router.push("/");
  };

  const keepLogin = React.useCallback(async () => {
    try {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("user-token");
        if (token) {
          const response = await axios.get(
            `https://blog-website-ashecone-25ef50f82ac6.herokuapp.com/auth/keeplogin`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (response.data.success) {
            const { id, username, email } = response.data.data;
            dispatch(setSuccessLogin({ id, username, email }));
          } else {
            localStorage.removeItem("user-token");
            dispatch(resetUserState());
          }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDropdownOpen &&
        !(event.target as HTMLElement)?.closest(".relative") &&
        !(event.target as HTMLElement)?.closest(".fixed")
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  React.useEffect(() => {
    keepLogin();
    const intervalId = setInterval(keepLogin, 10 * 60 * 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [keepLogin]);

  return (
    <section
      id="navbar"
      className="absolute top-0 left-0 bg-black bg-opacity-35 w-full z-50"
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-16">
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
      ) : (
        <Container>
          <nav className="flex justify-between mx-6 md:-mx-4 lg:mx-0 items-center h-[4rem]">
            <div className="flex items-center">
              <img
                src="https://ashecone.github.io/web-blog/logo.png"
                alt="Logo"
                className="cursor-pointer"
                style={{ maxWidth: "250px", height: "auto" }}
                onClick={() => router.push("/")}
              />
            </div>
            <ul
              className={`hidden md:text-sm md:pl-5 lg:flex gap-4 ${
                showSearch ? "hidden" : ""
              }`}
            >
              {categories.map((category: ICategory) => (
                <li
                  key={category.id}
                  className={`text-white hover:text-gray-300 space-x-4 text-xl cursor-pointer ${
                    selectedCategory === category.title ? "font-bold" : ""
                  }`}
                  onClick={() =>
                    category.title && handleCategoryClick(category.title)
                  }
                >
                  {category.title}
                </li>
              ))}
            </ul>
            <div className="m:flex m:ml-14 md:-ml-16 lg:pl-16 lg:flex items-center">
              {showSearch ? (
                <div className="relative">
                  <IoCloseOutline
                    size="1.5em"
                    className="text-white cursor-pointer"
                    onClick={handleSearchClick}
                  />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="bg-white text-black py-1 px-3"
                  />
                </div>
              ) : (
                <>
                  <IoSearchOutline
                    size="1.5em"
                    className="text-white cursor-pointer"
                    onClick={handleSearchClick}
                  />
                  <button
                    className="bg-black text-white py-1 px-3 hover:bg-gray-100 hover:text-black transition duration-300"
                    onClick={() => alert("GET YOUR 120$ CHRISTMAS GIFT")}
                  >
                    GET YOUR 120$ CHRISTMAS GIFT
                  </button>
                </>
              )}
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
              <>
                <div className="hidden lg:block relative">
                  <div
                    className="font-bold text-white cursor-pointer inline-block"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {username}
                  </div>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                      <a
                        href="/web-blog/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                      >
                        Profile
                      </a>
                      <a
                        href="/web-blog/createArticle"
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
                  )}
                </div>

                <div className="lg:hidden relative group">
                  <button
                    className="text-white font-bold underline py-2 px-4 rounded"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    {username}
                  </button>
                  {isMobileMenuOpen && (
                    <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                      <a
                        href="/web-blog/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                      >
                        Profile
                      </a>
                      <a
                        href="/web-blog/createArticle"
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
                  )}
                </div>
              </>
            ) : (
              <>
                <button
                  className="hidden lg:block bg-black text-white py-2 px-4 hover:bg-gray-100 hover:text-black transition duration-300"
                  onClick={() => router.push("/signin")}
                >
                  Log In
                </button>
                <button
                  className="lg:hidden text-white"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <FaBars />
                </button>
              </>
            )}
          </nav>
          {isMobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-50">
              <div
                className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              ></div>
              <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
                    style={{ width: "80%" }}
                  >
                    <div
                      className={`pointer-events-auto w-screen max-w-md transform transition ease-in-out duration-500 ${
                        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                      }`}
                    >
                      <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div className="px-4 py-6">
                          <div className="flex items-center justify-between">
                            <h2 className="text-lg font-medium text-gray-900">
                              Menu
                            </h2>
                            <div className="-mr-2">
                              <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <span className="sr-only">Close menu</span>
                                <svg
                                  className="h-6 w-6"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 px-4">
                          <nav className="grid gap-y-8">
                            {categories.map((category: ICategory) => (
                              <a
                                key={category.id}
                                href="#blogs"
                                className={`text-white hover:text-gray-300 cursor-pointer ${
                                  selectedCategory === category.title
                                    ? "font-bold"
                                    : ""
                                }`}
                                onClick={() =>
                                  category.title &&
                                  handleCategoryClick(category.title)
                                }
                              >
                                <span className="ml-3 text-base font-medium text-gray-900">
                                  {category.title}
                                </span>
                              </a>
                            ))}
                          </nav>
                        </div>
                        {!isLoggedIn && (
                          <div className="mt-6 px-4">
                            <button
                              className="block w-full px-5 py-3 text-center font-medium text-white bg-black hover:bg-gray-300 hover:text-black transition duration-300"
                              onClick={() => router.push("/signin")}
                            >
                              Log In
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      )}
    </section>
  );
};

export default Navbar;
