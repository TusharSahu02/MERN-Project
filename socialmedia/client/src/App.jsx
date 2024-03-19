import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Topbar from "./pages/Components/Topbar";
import Search from "./pages/Search";
import Activity from "./pages/Activity";
import Profile from "./pages/Profile";
import PostPage from "./pages/PostPage";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <>
      <Router>
        <Topbar />
        <div className="container bg-black">
          <div className="flex items-center h-full mt-[80px] justify-center">
            <div className="w-[550px] h-full pb-10 text-white">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/:profile" element={<Profile />} />
                <Route path="/:profile/post/:pid" element={<PostPage />} />
              </Routes>
            </div>
          </div>
        </div>
        <Toaster />
      </Router>
    </>
  );
}
