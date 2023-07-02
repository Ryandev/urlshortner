import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { useRef, useState } from 'react';
import Link from '../../../../components/Link';

import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';

const ListWrapper = styled(Box)(
    ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(['color', 'fill'])};
            
            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 2)};
            
                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            width: 22px;
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            border-radius: ${theme.general.borderRadiusLg};
                            content: "";
                            background: ${theme.colors.primary.main};
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {
                
                    background: transparent;
                
                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
`,
);

function HeaderMenu() {
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
            <ListWrapper
                sx={{
                    display: {
                        xs: 'none',
                        md: 'block',
                    },
                }}
            >
                <List disablePadding component={Box} display="flex">
                    <ListItemButton
                        classes={{ root: 'MuiListItem-indicators' }}
                        component={Link}
                        href="/components/buttons"
                    >
                        <ListItemText
                            primaryTypographyProps={{ noWrap: true }}
                            primary="Buttons"
                        />
                    </ListItemButton>
                    <ListItemButton
                        classes={{ root: 'MuiListItem-indicators' }}
                        component={Link}
                        href="/components/forms"
                    >
                        <ListItemText
                            primaryTypographyProps={{ noWrap: true }}
                            primary="Forms"
                        />
                    </ListItemButton>
                    <ListItemButton
                        classes={{ root: 'MuiListItem-indicators' }}
                        // Ref={ref}
                        onClick={handleOpen}
                    >
                        <ListItemText
                            primaryTypographyProps={{ noWrap: true }}
                            primary={
                                <Box display="flex" alignItems="center">
                                    Others
                                    <Box display="flex" alignItems="center" pl={0.3}>
                                        <ExpandMoreTwoToneIcon fontSize="small" />
                                    </Box>
                                </Box>
                            }
                        />
                    </ListItemButton>
                </List>
            </ListWrapper>
            <Menu anchorEl={ref.current} onClose={handleClose} open={isOpen}>
                <MenuItem sx={{ px: 3 }} component={Link} href="/">
                    Overview
                </MenuItem>
                <MenuItem sx={{ px: 3 }} component={Link} href="/components/tabs">
                    Tabs
                </MenuItem>
                <MenuItem sx={{ px: 3 }} component={Link} href="/components/cards">
                    Cards
                </MenuItem>
                <MenuItem sx={{ px: 3 }} component={Link} href="/components/modals">
                    Modals
                </MenuItem>
            </Menu>
        </>
    );
}

export default HeaderMenu;
