"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setSuccessLogin } from "@/lib/features/userSlice";
import ClipLoader from "react-spinners/ClipLoader";

const Profil: React.FunctionComponent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userReducer);
  const isLoggedIn = user.isLoggedIn;

  const [editMode, setEditMode] = React.useState(false);
  const [editedUser, setEditedUser] = React.useState({
    username: user.username,
  });
  const [profilePicture, setProfilePicture] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/signin");
    }
  }, [isLoggedIn, router]); 

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`https://blog-website-ashecone-25ef50f82ac6.herokuapp.com/users/${user.id}`, {
        ...editedUser,
        profilePicture,
      });
      dispatch(setSuccessLogin(response.data));
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedUser({
      username: user.username,
    });
    setProfilePicture(null);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={150} color={"#123abc"} loading={true} />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-top pt-16 h-screen bg-white">
      <div className="w-full bg-white p-8">
        <h1 className="text-3xl text-black font-bold mb-4">Profil</h1>
        <hr className="mb-6" />
        <div className="flex gap-10">
          <div className="flex-1 space-y-4">
            {editMode ? (
              <>
                <input
                  type="text"
                  value={editedUser.username}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, username: e.target.value })
                  }
                  className="text-black border border-gray-400 rounded-md h-10 w-full mb-4 p-2"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="text-black border border-gray-400 rounded-md h-10 w-full mb-4 p-2"
                />
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 bg-gray-200 text-black rounded-md mr-2"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-black">{user.username}</p>
                {profilePicture && (
                  <img
                    src={profilePicture}
                    alt="Profile Picture"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                )}
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
