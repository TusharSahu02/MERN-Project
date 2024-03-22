import userAtom from "@/atom/userAtom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { toast } from "sonner";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const setUser = useSetRecoilState(userAtom);
  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error, {
          duration: 2000,
          richColors: true,
        });
        return;
      }

      localStorage.setItem("user-chipper", JSON.stringify(data));
      setUser(data);
      // window.location.reload();
      toast.success(data.message, {
        duration: 2000,
        richColors: true,
      });
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
        richColors: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="py-6">
        <div className="space-y-1">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            className="w-full bg-transparent"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          />
        </div>
        <div className="mt-4 space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            className="w-full bg-transparent"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
        </div>
      </div>
      <div onClick={handleLogin}>
        <Button
          disabled={loading}
          className="w-full bg-white border-white border text-black hover:bg-transparent hover:text-white hover:border-white transition-colors duration-300"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </div>
  );
};

export default Login;
