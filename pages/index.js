import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = storedUsers.includes(username);

    if (userExists && password === "Static1234") {
      localStorage.setItem("token", JSON.stringify(username));
      router.push("/dashboard");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login
