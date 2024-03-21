import { useState } from "react";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

export default function Auth() {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="  mt-[100px] flex items-center justify-center ">
      <div className="p-6 w-[400px]  border-[1px] rounded-xl border-gray-700 ">
        <div className="flex">
          <div
            className={`flex-1 items-center  flex  border-b-[1px]  justify-center py-3 cursor-pointer ${
              activeTab === "login"
                ? "text-white "
                : "text-gray-500  border-gray-500"
            }`}
            onClick={() => handleTabChange("login")}
          >
            Login
          </div>
          <div
            className={`flex-1 items-center flex border-b-[1px] justify-center py-3 cursor-pointer ${
              activeTab === "signup"
                ? "text-white "
                : "text-gray-500  border-gray-500"
            }`}
            onClick={() => handleTabChange("signup")}
          >
            Signup
          </div>
        </div>
        <div
          className="bg-white transition-all duration-300"
          style={{
            width: "50%",
            height: "1px",
            transform:
              activeTab === "login" ? "translateX(0)" : "translateX(100%)",
          }}
        ></div>
        {activeTab === "login" && <Login />}
        {activeTab === "signup" && <Signup />}
      </div>
      
    </div>
  );
}
