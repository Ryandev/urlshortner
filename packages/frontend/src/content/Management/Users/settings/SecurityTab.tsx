import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { format, subDays, subHours, subWeeks } from 'date-fns';
import type { ChangeEvent, MouseEvent } from 'react';
import { useState } from 'react';

const ButtonError = styled(Button)(
    ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `,
);

const AvatarSuccess = styled(Avatar)(
    ({ theme }) => `
    background: ${theme.colors.success.light};
    width: ${theme.spacing(5)};
    height: ${theme.spacing(5)};
`,
);

const AvatarWrapper = styled(Avatar)(
    ({ theme }) => `
    width: ${theme.spacing(5)};
    height: ${theme.spacing(5)};
`,
);

function SecurityTab() {
    const theme = useTheme();

    const [page, setPage] = useState(2);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (_event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const logs = [
        {
            id: 1,
            browser: ' Safari/537.36',
            ipaddress: 'localhost',
            location: 'United States',
            date: subDays(new Date(), 2).getTime(),
        },
        {
            id: 2,
            browser: 'Chrome/36.0.1985.67',
            ipaddress: 'localhost',
            location: 'China',
            date: subDays(new Date(), 6).getTime(),
        },
        {
            id: 3,
            browser: 'Googlebot/2.1',
            ipaddress: 'localhost',
            location: 'China',
            date: subHours(new Date(), 15).getTime(),
        },
        {
            id: 4,
            browser: 'AppleWebKit/535.1',
            ipaddress: 'localhost',
            location: 'Philippines',
            date: subDays(new Date(), 4).getTime(),
        },
        {
            id: 5,
            browser: 'Mozilla/5.0',
            ipaddress: 'localhost',
            location: 'China',
            date: subWeeks(new Date(), 3).getTime(),
        },
    ];

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Box pb={2}>
                    <Typography variant="h3">Social Accounts</Typography>
                    <Typography variant="subtitle2">
                        Manage connected social accounts options
                    </Typography>
                </Box>
                <Card>
                    <List>
                        <ListItem sx={{ padding: 3 }}>
                            <ListItemAvatar sx={{ pr: 2 }}>
                                <AvatarWrapper src="/static/images/logo/google.svg" />
                            </ListItemAvatar>
                            <ListItemText
                                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                                secondaryTypographyProps={{
                                    variant: 'subtitle2',
                                    lineHeight: 1,
                                }}
                                primary="Google"
                                secondary="A Google account hasn’t been yet added to your account"
                            />
                            <Button color="secondary" size="large" variant="contained">
                                Connect
                            </Button>
                        </ListItem>
                    </List>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <List>
                        <ListItem sx={{ padding: 3 }}>
                            <ListItemAvatar sx={{ pr: 2 }}>
                                <AvatarSuccess>
                                    <DoneTwoToneIcon />
                                </AvatarSuccess>
                            </ListItemAvatar>
                            <ListItemText
                                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                                secondaryTypographyProps={{
                                    variant: 'subtitle2',
                                    lineHeight: 1,
                                }}
                                primary="Facebook"
                                secondary="Your Facebook account has been successfully connected"
                            />
                            <ButtonError size="large" variant="contained">
                                Revoke access
                            </ButtonError>
                        </ListItem>
                        <Divider component="li" />
                        <ListItem sx={{ padding: 3 }}>
                            <ListItemAvatar sx={{ pr: 2 }}>
                                <AvatarSuccess>
                                    <DoneTwoToneIcon />
                                </AvatarSuccess>
                            </ListItemAvatar>
                            <ListItemText
                                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                                secondaryTypographyProps={{
                                    variant: 'subtitle2',
                                    lineHeight: 1,
                                }}
                                primary="Twitter"
                                secondary="Your Twitter account was last syncronized 6 days ago"
                            />
                            <ButtonError size="large" variant="contained">
                                Revoke access
                            </ButtonError>
                        </ListItem>
                    </List>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Box pb={2}>
                    <Typography variant="h3">Security</Typography>
                    <Typography variant="subtitle2">
                        Change your security preferences below
                    </Typography>
                </Box>
                <Card>
                    <List>
                        <ListItem sx={{ padding: 3 }}>
                            <ListItemText
                                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                                secondaryTypographyProps={{
                                    variant: 'subtitle2',
                                    lineHeight: 1,
                                }}
                                primary="Change Password"
                                secondary="You can change your password here"
                            />
                            <Button size="large" variant="outlined">
                                Change password
                            </Button>
                        </ListItem>
                        <Divider component="li" />
                        <ListItem sx={{ padding: 3 }}>
                            <ListItemText
                                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                                secondaryTypographyProps={{
                                    variant: 'subtitle2',
                                    lineHeight: 1,
                                }}
                                primary="Two-Factor Authentication"
                                secondary="Enable PIN verification for all sign in attempts"
                            />
                            <Switch color="primary" />
                        </ListItem>
                    </List>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardHeader
                        subheaderTypographyProps={{}}
                        titleTypographyProps={{}}
                        title="Access Logs"
                        subheader="Recent sign in activity logs"
                    />
                    <Divider />
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Browser</TableCell>
                                    <TableCell>IP Address</TableCell>
                                    <TableCell>Location</TableCell>
                                    <TableCell>Date/Time</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {logs.map(log => (
                                    <TableRow key={log.id} hover>
                                        <TableCell>{log.browser}</TableCell>
                                        <TableCell>{log.ipaddress}</TableCell>
                                        <TableCell>{log.location}</TableCell>
                                        <TableCell>
                                            {format(log.date, 'dd MMMM, yyyy - h:mm:ss a')}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Tooltip placement="top" title="Delete" arrow>
                                                <IconButton
                                                    sx={{
                                                        '&:hover': {
                                                            background: theme.colors.error.lighter,
                                                        },
                                                        color: theme.palette.error.main,
                                                    }}
                                                    color="inherit"
                                                    size="small"
                                                >
                                                    <DeleteTwoToneIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box p={2}>
                        <TablePagination
                            component="div"
                            count={100}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Box>
                </Card>
            </Grid>
        </Grid>
    );
}

export default SecurityTab;
