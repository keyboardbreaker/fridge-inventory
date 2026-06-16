import { useState } from "react";
import supabase from "../../../utils/supabase";

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            console.error(error);
            return;
        }

        if (data.user) {
            await supabase
                .from("profiles")
                .insert({
                id: data.user.id,
                first_name: firstName,
                last_name: lastName,
                });
            }

            await supabase.from("fridge_users").insert({
                fridge_id: "11111111-1111-1111-1111-111111111111",
                user_id: data.user!.id,
                role_type: "user",
            });
        }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Account</h2>

            <input
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />

            <input
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">
                Sign Up
            </button>
        </form>
    );
}

export default Signup;