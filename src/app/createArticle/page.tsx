"use client";
import * as React from "react";
import { useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import axios from "axios";
import { BASE_URL } from "@/utils/helper";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";

interface ICreateArticleProps {
  title?: string;
  urlimage?: string;
  description?: string;
  createdAt?: string;
}

const CreateArticle: React.FunctionComponent = () => {
  const router = useRouter();
  const categories = useAppSelector((state) => state.categoryReducer);
  const username = useAppSelector((state) => state.userReducer.username);
  const userInfo = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("user-info") || "{}") : {};
  const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const [article, setArticle] = useState({
    author: username,
    title: "",
    urlImage: "",
    description: "",
    createdAt: formatDate(Date.now()),
    category: "",
  });

  React.useEffect(() => {
    setArticle((prevArticle) => ({
      ...prevArticle,
      author: username,
    }));
  }, [username]);

  React.useEffect(() => {
    if (!isLoggedIn && typeof window !== 'undefined') {
      router.replace("/signin");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={150} color={"#123abc"} loading={true} />
      </div>
    );
  }

  const onHandlePublish = async () => {
    try {
      console.log(article);
      if (Object.values(article).includes("")) {
        throw new Error("Please input all your data");
      }
      const { id: authorId } = userInfo;
      const response = await axios.post(BASE_URL + "/articles", {
        ...article,
        categoryId: article.category,
        authorId,
      });
      console.log("Response:", response.data);
      alert("Blog is successfully created");
      if (typeof window !== 'undefined') {
        router.replace("/");
      }
    } catch (error) {
      console.log("Error:", error);
      alert(error);
    }
  };

  return (
    <div className="flex justify-center items-top pt-16 h-screen bg-white">
      <div className="w-full bg-white p-8">
        <h1 className="text-3xl text-black font-bold mb-4">
          Create New Article
        </h1>
        <hr className="mb-6" />
        <div className="flex gap-10">
          <div className="flex-1 space-y-4">
            <label htmlFor="title" className="block text-black">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={article.title}
              onChange={(e) =>
                setArticle({ ...article, title: e.target.value })
              }
              className="text-black border border-gray-400 rounded-md h-10 w-full mb-4 p-2"
            />
            <label htmlFor="category" className="block text-black">
              Category
            </label>
            <select
              id="category"
              value={article.category}
              onChange={(e) =>
                setArticle({ ...article, category: e.target.value })
              }
              className="text-black border border-gray-400 rounded-md h-10 w-full mb-4 p-2"
            >
              <option value="">Select a category</option>
              {categories.map((category, idx) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
            <label htmlFor="urlimage" className="block text-black">
              Image URL
            </label>
            <input
              id="urlimage"
              type="url"
              value={article.urlImage}
              onChange={(e) =>
                setArticle({ ...article, urlImage: e.target.value })
              }
              className="text-black border border-gray-400 rounded-md h-10 w-full mb-4 p-2"
            />

            <label htmlFor="description" className="block text-black">
              Description
            </label>
            <textarea
              id="description"
              value={article.description}
              onChange={(e) => {
                const newValue = e.target.value;
                setArticle({ ...article, description: newValue });
              }}
              maxLength={500}
              className="text-black border border-gray-400 rounded-md w-full p-2"
              style={{ height: "100px" }}
            />
            <p className="text-right text-black">
              {article.description.length}/500
            </p>
          </div>
          <div className="flex-1">
            <p className="text-black">Author: {username}</p>
            <p className="text-black">Created At: {formatDate(Date.now())}</p>
            <button
              className="mt-4 px-5 py-2 border rounded-md bg-green-600 text-white"
              onClick={onHandlePublish}
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;
