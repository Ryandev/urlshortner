import Box from '@mui/material/Box';
import HeaderNotifications from './Notifications';
import HeaderSearch from './Search';

function HeaderButtons() {
    return (
        <Box sx={{ mr: 1 }}>
            <HeaderSearch />
            <Box sx={{ mx: 0.5 }} component="span">
                <HeaderNotifications />
            </Box>
        </Box>
    );
}

export default HeaderButtons;
