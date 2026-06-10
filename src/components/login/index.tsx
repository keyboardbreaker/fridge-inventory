import { useState } from "react";
import { signIn, signUp } from "../../../utils/auth";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = async () => {
        const { error } = await signIn(email, password);
        if (error) console.error(error);
    }

    const handleSignup = async () => {
        const { error } = await signUp(email, password);
        if (error) console.error(error);
    }

    return (
        <div>
            <h2>Login</h2>

            <input
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>Login</button>
            <button onClick={handleSignup}>Sign up</button>
        </div>
    )

    
}

export default Login;