import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Topbar from "./Components/Topbar";
import Home from "./Home";
import Auth from "./Auth";
import Search from "./Search";
import Activity from "./Activity";
import Profile from "./Profile";
import PostPage from "./PostPage";
import { useRecoilValue } from "recoil";
import userAtom from "@/atom/userAtom";

const AllRoutes = () => {
  const location = useLocation();
  const user = useRecoilValue(userAtom);

  return (
    <>
      {location.pathname !== "/auth" && <Topbar />}
      <div className="container bg-black">
        <div className="flex items-center h-full mt-[80px] justify-center">
          <div className="w-[550px] h-full pb-10 text-white ">
            <Routes>
              <Route
                path="/"
                element={user ? <Home /> : <Navigate to={"/auth"} />}
              />
              <Route
                path="/auth"
                element={!user ? <Auth /> : <Navigate to={"/"} />}
              />
              <Route
                path="/search"
                element={user ? <Search /> : <Navigate to={"/auth"} />}
              />
              <Route
                path="/activity"
                element={user ? <Activity /> : <Navigate to={"/auth"} />}
              />
              <Route
                path="/:profile"
                element={user ? <Profile /> : <Navigate to={"/auth"} />}
              />
              <Route
                path="/:profile/post/:pid"
                element={user ? <PostPage /> : <Navigate to={"/auth"} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllRoutes;
