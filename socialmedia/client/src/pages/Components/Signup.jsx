import userAtom from "@/atom/userAtom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { toast } from "sonner";

const Signup = () => {
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const setUser = useSetRecoilState(userAtom);
  const handleSignup = async () => {
    try {
      const res = await fetch("/api/users/signup", {
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
        });

        return;
      }
      localStorage.setItem("user-chipper", JSON.stringify(data));
      setUser(data);
      toast.success(data.message, {
        duration: 2000,
      });
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
      });
    }
  };

  return (
    <div>
      <div className="py-6">
        <div className="space-y-1">
          <Label htmlFor="fullname">Full Name</Label>
          <Input
            id="fullname"
            className="w-full bg-transparent "
            value={inputs.name}
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
          />
        </div>
        <div className="mt-4 space-y-1">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            className="w-full bg-transparent"
            value={inputs.username}
            onChange={(e) =>
              setInputs({ ...inputs, username: e.target.valuetoLowerCase() })
            }
            onKeyPress={(e) => {
              if (e.key === e.key.toUpperCase() && e.key.length === 1) {
                e.preventDefault();
              }
            }}
          />
        </div>
        <div className="mt-4 space-y-1">
          <Label htmlFor="email">Email</Label>

          <Input
            type="email"
            id="email"
            className="w-full bg-transparent"
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />
        </div>
        <div className="mt-4 space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            className="w-full bg-transparent"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
        </div>
      </div>
      <div>
        <Button className="w-full bg-white text-black" onClick={handleSignup}>
          Signup
        </Button>
      </div>
    </div>
  );
};

export default Signup;

