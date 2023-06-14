import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import { formatDistance, subDays } from 'date-fns';
import { useRef, useState } from 'react';

const NotificationsBadge = styled(Badge)(
    ({ theme }) => `
    
    .MuiBadge-badge {
        background-color: ${alpha(theme.palette.error.main, 0.1)};
        color: ${theme.palette.error.main};
        min-width: 16px; 
        height: 16px;
        padding: 0;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 0 1px ${alpha(theme.palette.error.main, 0.3)};
            content: "";
        }
    }
`,
);

function HeaderNotifications() {
    const ref = useRef<HTMLButtonElement | null>(null);
    const [isOpen, setOpen] = useState<boolean>(false);

    const handleOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    return (
        <>
            <Tooltip arrow title="Notifications">
                <IconButton color="primary" ref={ref} onClick={handleOpen}>
                    <NotificationsBadge
                        badgeContent={1}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <NotificationsActiveTwoToneIcon />
                    </NotificationsBadge>
                </IconButton>
            </Tooltip>
            <Popover
                anchorEl={ref.current}
                onClose={handleClose}
                open={isOpen}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Box
                    sx={{ padding: 2 }}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography variant="h5">Notifications</Typography>
                </Box>
                <Divider />
                <List sx={{ padding: 0 }}>
                    <ListItem
                        sx={{
                            padding: 2,
                            minWidth: 350,
                            display: { xs: 'block', sm: 'flex' },
                        }}
                    >
                        <Box flex="1">
                            <Box display="flex" justifyContent="space-between">
                                <Typography sx={{ fontWeight: 'bold' }}>
                                    Messaging Platform
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{ textTransform: 'none' }}
                                >
                                    {formatDistance(subDays(new Date(), 3), new Date(), {
                                        addSuffix: true,
                                    })}
                                </Typography>
                            </Box>
                            <Typography
                                component="span"
                                variant="body2"
                                color="text.secondary"
                            >
                                {' '}
                                new messages in your inbox
                            </Typography>
                        </Box>
                    </ListItem>
                </List>
            </Popover>
        </>
    );
}

export default HeaderNotifications;
