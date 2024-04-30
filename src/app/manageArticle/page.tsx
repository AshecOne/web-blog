"use client";
import * as React from "react";
import axios from "axios";
import { useAppSelector } from "@/lib/hooks";
import { BASE_URL } from "@/utils/helper";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";

interface IManageArticleProps {}

interface IArticle {
  id: string;
  author: string;
  title: string;
  urlImage: string;
  description: string;
  createdAt: string;
  category: string;
  categoryId: string;
}

const ManageArticle: React.FunctionComponent<IManageArticleProps> = (props) => {
  const [articles, setArticles] = React.useState<IArticle[]>([]);
  const [editId, setEditId] = React.useState<string | null>(null);
  const [editData, setEditData] = React.useState<IArticle | null>(null);
  const category = useAppSelector((state) => state.categoryReducer);
  const userId = useAppSelector((state) => state.userReducer.id);
  const router = useRouter();
  const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn);

  React.useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/articles/${userId}`);
        setArticles(response.data.data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };
    getArticles();
  }, [userId]);

  if (typeof window !== 'undefined' && !isLoggedIn) {
    router.replace("/signin");
    return null;
  }

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={150} color={"#123abc"} loading={true} />
      </div>
    );
  }

  const handleEdit = (article: IArticle) => {
    setEditId(article.id);
    setEditData({ ...article });
  };

  const handleSave = async () => {
    if (editData) {
      try {
        const response = await axios.put(
          BASE_URL + `/articles/${editData.id}`,
          editData
        );
        setArticles(
          articles.map((article) =>
            article.id === editData.id ? response.data.data : article
          )
        );
        setEditId(null);
        setEditData(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async (articleId: string) => {
    try {
      await axios.delete(BASE_URL + `/articles/${articleId}`);
      setArticles(articles.filter((article) => article.id !== articleId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setEditData(null);
  };

  return (
    <div className="flex justify-center items-top pt-16 h-screen bg-white">
      <div className="w-full bg-white p-8">
        <h1 className="text-3xl text-black font-bold mb-4">Manage Article</h1>
        <hr className="mb-6" />
        <div className="flex justify-between mb-4">
          <span className="text-black font-bold">Title</span>
          <span className="text-black font-bold mr-7 pr-7">Action</span>
        </div>
        <hr className="mb-6" />
        <div className="space-y-4">
          {articles.map((article) => (
            <div key={article.id} className="flex justify-between items-center">
              <span className="text-black">{article.title}</span>
              <div>
                <button
                  className="text-white px-4 py-2 bg-blue-700 hover:bg-blue-400 hover:text-black mr-4"
                  onClick={() => handleEdit(article)}
                >
                  Edit
                </button>
                <button
                  className="text-white px-4 py-2 bg-red-700 hover:bg-red-400 hover:text-black"
                  onClick={() => handleDelete(article.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {editId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 w-1/2 rounded-lg relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={handleCancel}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className="text-2xl font-bold mb-4">Edit Article</h2>
              <div className="flex gap-10">
                <div className="flex-1 space-y-4">
                  <label htmlFor="title" className="block text-black">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={editData?.title || ""}
                    onChange={(e) =>
                      setEditData({ ...editData!, title: e.target.value })
                    }
                    className="text-black border border-gray-400 rounded-md h-10 w-full mb-4 p-2"
                  />
                  <label htmlFor="category" className="block text-black">
                    Category
                  </label>
                  <select
                    id="category"
                    value={editData?.categoryId || ""}
                    onChange={(e) =>
                      setEditData({ ...editData!, categoryId: e.target.value })
                    }
                    className="text-black border border-gray-400 rounded-md h-10 w-full mb-4 p-2"
                  >
                    <option value="">Select a category</option>
                    {category.map((val) => (
                      <option key={val.id} value={val.id}>
                        {val.title}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="urlimage" className="block text-black">
                    Image URL
                  </label>
                  <input
                    id="urlimage"
                    type="url"
                    value={editData?.urlImage || ""}
                    onChange={(e) =>
                      setEditData({ ...editData!, urlImage: e.target.value })
                    }
                    className="text-black border border-gray-400 rounded-md h-10 w-full mb-4 p-2"
                  />
                  <label htmlFor="description" className="block text-black">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={editData?.description || ""}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setEditData({ ...editData!, description: newValue });
                    }}
                    maxLength={500}
                    className="text-black border border-gray-400 rounded-md w-full p-2"
                    style={{ height: "100px" }}
                  />
                  <p className="text-right text-black">
                    {editData?.description.length || 0}/500
                  </p>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="px-5 py-2 border rounded-md bg-gray-300 hover:bg-gray-500 hover:text-white text-black mr-4"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="px-5 py-2 border rounded-md bg-green-600 hover:bg-green-800 text-white"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageArticle;
