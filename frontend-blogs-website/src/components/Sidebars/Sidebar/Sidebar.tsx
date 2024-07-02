import { useLocation } from 'react-router-dom';
import SidebarArticlesPage from '../SidebarArticlesPage/SidebarArticlesPage';
import SidebarFeedbackPage from '../SidebarFeedbackPage/SidebarFeedbackPage';
import SidebarProfilePage from '../SidebarProfilePage/SidebarProfilePage';

const Sidebar = () => {
    const location = useLocation();
    
    return(
        <>
            {location.pathname == '/articles' && <SidebarArticlesPage />}
            {location.pathname == '/feedback' && <SidebarFeedbackPage />}
            {/* {location.pathname == '/users/:username' && <SidebarProfilePage />} */}
        </>
    )
}

export default Sidebar;