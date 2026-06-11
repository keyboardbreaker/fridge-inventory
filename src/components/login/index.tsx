import { useState } from "react";
import { signIn, signUp } from "../../../utils/auth";
import Container from "../container";
import { redirect } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = async () => {
        const { error } = await signIn(email, password);
        if (error) console.error(error)
        else redirect("/home");
    }

    const handleSignup = async () => {
        const { error } = await signUp(email, password);
        if (error) console.error(error) 
        else redirect("/home");
    }

    return (
        <Container>
            <h1>Login</h1>

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
        </Container>
    )

    
}

export default Login;