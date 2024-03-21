import { IoIosCloseCircleOutline } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
import userAtom from "@/atom/userAtom";
import { useRecoilState, useSetRecoilState } from "recoil";
import usePreviewImage from "@/hooks/usePreviewImage";
import { toast } from "sonner";

const Profile = ({ closeProfileModal, isProfilePic }) => {
  const [userEdit, setUserEdit] = useRecoilState(userAtom);
  const modalRef = useRef(null);
  const fileRef = useRef(null);
  const [inputs, setInputs] = useState({
    name: userEdit.name,
    username: userEdit.username,
    email: userEdit.email,
    bio: userEdit.bio,
  });
  const setUser = useSetRecoilState(userAtom);

  const { handleImageChange, imgURL } = usePreviewImage();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeProfileModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeProfileModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/users/update/${userEdit._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputs, profilePic: imgURL }),
      });

      const data = await res.json();

      if (data.error) {
        toast.error(data.error, {
          duration: 2000,
        });
        return;
      }

      toast.success("Profile Updated Successfully", {
        duration: 2000,
      });
      setUser(data);
      localStorage.setItem("user-chipper", JSON.stringify(data));
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
      });
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div ref={modalRef} className="flex items-center justify-center flex-col">
        <div className="w-full mb-4 flex items-center justify-between">
          <div></div>
          <h1 className="text-md font-bold">Your Profile Pic</h1>
          <IoIosCloseCircleOutline
            size={22}
            onClick={closeProfileModal}
            className="cursor-pointer"
          />
        </div>
        {/* outside this */}
        <div className="w-[500px]  border-[1px] max-h-[800px] overflow-scroll border-[#383b41] p-8 bg-[#1f1f21] rounded-xl">
          <p className="text-gray-500 text-sm mb-4 items-center flex justify-center">
            Click on the image to upload a new profile picture
          </p>
          <div className="flex size-full mb-4 items-center justify-center">
            <img
              className="size-[400px] cursor-pointer object-cover rounded-full"
              src={imgURL || isProfilePic}
              alt=""
              onClick={() => fileRef.current.click()}
            />
            <input
              type="file"
              hidden
              ref={fileRef}
              onChange={handleImageChange}
            />
          </div>
          <div className="w-full flex justify-center">
            <div
              className="cursor-pointer  text-black font-bold rounded-full bg-[#fff] px-4 py-1"
              onClick={handleSubmit}
            >
              Save Changes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
