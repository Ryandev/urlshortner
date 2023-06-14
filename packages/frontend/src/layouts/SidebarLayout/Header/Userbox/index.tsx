import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Hidden from '@mui/material/Hidden';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { lighten, styled } from '@mui/material/styles';
import NextLink from 'next/link';
import { useRef, useState } from 'react';

const UserBoxButton = styled(Button)(
    ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`,
);

const MenuUserBox = styled(Box)(
    ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`,
);

const UserBoxText = styled(Box)(
    ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`,
);

const UserBoxLabel = styled(Typography)(
    ({ theme }) => `
        font-weight: ${String(theme.typography.fontWeightBold) || 'initial'};
        color: ${theme.palette.secondary.main};
        display: block;
`,
);

const UserBoxDescription = styled(Typography)(
    ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`,
);

function HeaderUserbox() {
    const user = {
        name: 'Catherine Pike',
        avatar: '/static/images/avatars/1.jpg',
        jobtitle: 'Project Manager',
    };

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
            <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
                <Avatar variant="rounded" alt={user.name} src={user.avatar} />
                <Hidden mdDown>
                    <UserBoxText>
                        <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
                        <UserBoxDescription variant="body2">
                            {user.jobtitle}
                        </UserBoxDescription>
                    </UserBoxText>
                </Hidden>
                <Hidden smDown>
                    <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
                </Hidden>
            </UserBoxButton>
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
                <MenuUserBox sx={{ minWidth: 210 }} display="flex">
                    <Avatar variant="rounded" alt={user.name} src={user.avatar} />
                    <UserBoxText>
                        <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
                        <UserBoxDescription variant="body2">
                            {user.jobtitle}
                        </UserBoxDescription>
                    </UserBoxText>
                </MenuUserBox>
                <Divider sx={{ mb: 0 }} />
                <List sx={{ padding: 1 }} component="nav">
                    <NextLink href="/management/profile" passHref>
                        <ListItem button>
                            <AccountBoxTwoToneIcon fontSize="small" />
                            <ListItemText primary="My Profile" />
                        </ListItem>
                    </NextLink>
                    <NextLink href="/applications/messenger" passHref>
                        <ListItem button>
                            <InboxTwoToneIcon fontSize="small" />
                            <ListItemText primary="Messenger" />
                        </ListItem>
                    </NextLink>
                    <NextLink href="/management/profile/settings" passHref>
                        <ListItem button>
                            <AccountTreeTwoToneIcon fontSize="small" />
                            <ListItemText primary="Account Settings" />
                        </ListItem>
                    </NextLink>
                </List>
                <Divider />
                <Box sx={{ margin: 1 }}>
                    <Button color="primary" fullWidth>
                        <LockOpenTwoToneIcon sx={{ mr: 1 }} />
                        Sign out
                    </Button>
                </Box>
            </Popover>
        </>
    );
}

export default HeaderUserbox;
