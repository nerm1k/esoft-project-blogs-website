import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import styles from './Layout.module.scss';
import Sidebar from "../../components/Sidebars/Sidebar/Sidebar";

const Layout = () => {
    return(
        <>
            <Header />
            <main>
                <div className={styles.container}>
                    <Outlet />
                    <Sidebar />
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Layout;