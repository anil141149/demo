import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Register = () => {
    const [username, setUsername] = useState("");
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();

        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = storedUsers.some((user) => user === username);

        if (userExists) {
            alert("Username already registered.");
        } else {
            const { data: apiUsers } = await axios.get("https://jsonplaceholder.typicode.com/users");
            const apiUserExists = apiUsers.some((user) => user.username === username);

            if (apiUserExists) {
                alert("Username already exists in API.");
                return;
            }
            const updatedUsers = [...storedUsers, username];
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            router.push("/");
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h1>Register</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <button type="submit">Register</button>
        </form>
    );
}

export default Register
