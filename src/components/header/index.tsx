import style from './header.module.css';
import { signOut } from '../../../utils/auth';
import type { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import supabase from '../../../utils/supabase';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
    user: User;
};

const Header = ({ user } : HeaderProps) => {
    const [fullName, setFullName] = useState<string>("");
    const navigate = useNavigate();

    const homePage = () => {
        navigate("/");
    }

    useEffect(() => {
        async function getFullName() {
            const { data, error } = await supabase
			.from("profiles")
			.select(`
				first_name,
				last_name
			`)
			.eq("id", user.id)
			.single();
            
            if (error) {
                console.error(error);
                return;
            }
            if (data) {
                setFullName(`${data.first_name} ${data.last_name}`);
            }
        }
        getFullName()
    }, [user.id]);
    
    return (
        <header className={style.header}> 
            <div className={style.headerContent}>
                <h1 onClick={homePage}>Fridge Inventory</h1>

                <div className={style.userDetails}>
                    <span>Welcome: {fullName}</span>
                    <button onClick={signOut}>Logout</button>
                </div>
                <p>Manage your items without forgetting they exist </p>
            </div>

        </header>
    )
}

export default Header;