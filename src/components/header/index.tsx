import style from './header.module.css';

const Header = () => {
    return (
        <header className={style.header}> 
            <div className={style.headerContent}>
                <h1>Fridge Inventory</h1>
                <p>Manage your items without forgetting they exist </p>
            </div>
        </header>
    )
}

export default Header;