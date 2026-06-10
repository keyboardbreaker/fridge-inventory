import style from './header.module.css';
import { signOut } from '../../../utils/auth';
import type { User } from '@supabase/supabase-js';

type HeaderProps = {
  user: User;
};

const Header = ({ user } : HeaderProps) => {
    return (
        <header className={style.header}> 
            <div className={style.headerContent}>
                <h1>Fridge Inventory</h1>
                <p>Manage your items without forgetting they exist </p>
            </div>
            <div>
                <span>{user.email}</span>

                <button onClick={signOut}>
                Logout
                </button>
            </div>
        </header>
    )
}

export default Header;