import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Divider, Drawer, IconButton, List, Toolbar } from '@mui/material';
import { mainListItems, secondaryListItems } from '../pages/dashboard';
import type { Immutable } from '../util/immutable';
import type { ISideMenu } from './SideMenu.interface';

function SideMenu(props: Immutable<ISideMenu>): JSX.Element {
    const { isOpen, toggleOpen } = props;

    return (
        <Drawer variant="permanent" open={isOpen}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <IconButton onClick={toggleOpen}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                {mainListItems}
                <Divider sx={{ my: 1 }} />
                {secondaryListItems}
            </List>
        </Drawer>
    );
}

export default SideMenu;
