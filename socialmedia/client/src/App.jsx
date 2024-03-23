import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import AllRoutes from "./pages/AllRoutes";
import { RecoilRoot } from "recoil";

export default function App() {
  return (
    <>
      <Router>
        <RecoilRoot>
          <AllRoutes />
        </RecoilRoot>
      </Router>
      <Toaster richColors />
    </>
  );
}


