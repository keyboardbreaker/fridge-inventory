import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import Fridge from "./components/fridge";
import Header from "./components/header";
import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import Login from "./components/login";
import type { User } from "@supabase/supabase-js";
import Signup from "./components/signup";

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // is the user already logged in?
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    // if user logs in/out while app open, update react state
    const { data:listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );
    //when component unmounts, stop listening
    return () => listener.subscription.unsubscribe();
  }, []);

console.log(user?.id);
  return (
    <>
      {user && <Header user={user} />}
      <main>
        <section>
          <Routes>
            {!user ? (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/fridge/:fridgeId" element={<Fridge />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </section>
      </main>
    </>
  )
}
export default App;