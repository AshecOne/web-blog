"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setSuccessLogin } from "@/lib/features/userSlice";
import ClipLoader from "react-spinners/ClipLoader";
import Auth from "@/components/Auth";
import { FaUser } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profil: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userReducer);
  const [editMode, setEditMode] = React.useState(false);
  const [editedUser, setEditedUser] = React.useState({
    username: user.username,
    email: user.email,
  });
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

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `https://blog-website-ashecone-25ef50f82ac6.herokuapp.com/users`,
        editedUser,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        }
      );
      dispatch(setSuccessLogin(response.data.data));
      setEditMode(false);
      toast.success("Profil berhasil diperbarui!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan saat memperbarui profil.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedUser({
      username: user.username,
      email: user.email,
    });
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={150} color={"#123abc"} loading={true} />
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center justify-center mb-6">
              <FaUser className="text-4xl text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <hr className="mb-6" />
            {editMode ? (
              <div>
                <div className="mb-4">
                  <label htmlFor="username" className="block mb-2 font-bold">
                    Username:
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={editedUser.username}
                    onChange={(e) =>
                      setEditedUser({
                        ...editedUser,
                        username: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2 font-bold">
                    Email Address:
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={editedUser.email}
                    onChange={(e) =>
                      setEditedUser({
                        ...editedUser,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <p className="font-bold">Username:</p>
                  <p>{user.username}</p>
                </div>
                <div className="mb-4">
                  <p className="font-bold">Email Address:</p>
                  <p>{user.email}</p>
                </div>
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default Auth(Profil);
