import { Link } from "react-router-dom";

const Layout = () => {
    return(
        <>
            <Link to='/login'>
                Войти
            </Link>
            <Link to='/signup'>
                Регистрация
            </Link>
        </>
    )
}

export default Layout;