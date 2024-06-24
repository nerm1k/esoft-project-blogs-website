import { useLocation } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import SidebarArticlesPage from '../SidebarArticlesPage/SidebarArticlesPage';
import SidebarFeedbackPage from '../SidebarFeedbackPage/SidebarFeedbackPage';

const Sidebar = () => {
    const location = useLocation();

    return(
        <>
            {location.pathname == '/articles' && <SidebarArticlesPage />}
            {location.pathname == '/feedback' && <SidebarFeedbackPage />}
        </>
    )
}

export default Sidebar;