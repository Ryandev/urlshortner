import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

function NotificationsTab() {
    const [state, setState] = useState({
        checkedA: true,
        checkedB: false,
        checkedC: true,
        checkedD: false,
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Box pb={2}>
                    <Typography variant="h3">Account</Typography>
                    <Typography variant="subtitle2">
                        Choose what notifications you want to receive
                    </Typography>
                </Box>
                <Card>
                    <List>
                        <ListItem sx={{ padding: 3 }}>
                            <ListItemText
                                primaryTypographyProps={{
                                    variant: 'h5',
                                    gutterBottom: true,
                                }}
                                secondaryTypographyProps={{
                                    variant: 'subtitle2',
                                    lineHeight: 1,
                                }}
                                primary="Widthdraw Activity"
                                secondary="Receive an email when a widthdrawal is made"
                            />
                            <Switch
                                color="primary"
                                checked={state.checkedA}
                                onChange={handleChange}
                                name="checkedA"
                            />
                        </ListItem>
                        <Divider component="li" />
                        <ListItem sx={{ padding: 3 }}>
                            <ListItemText
                                primaryTypographyProps={{
                                    variant: 'h5',
                                    gutterBottom: true,
                                }}
                                secondaryTypographyProps={{
                                    variant: 'subtitle2',
                                    lineHeight: 1,
                                }}
                                primary="Weekly Report"
                                secondary="Receive account status weekly report in your inbox"
                            />
                            <Switch
                                color="primary"
                                checked={state.checkedB}
                                onChange={handleChange}
                                name="checkedB"
                            />
                        </ListItem>
                    </List>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Box pb={2}>
                    <Typography variant="h3">Orders</Typography>
                    <Typography variant="subtitle2">
                        Receive email notifications related to your orders activity
                    </Typography>
                </Box>
                <Card>
                    <List>
                        <ListItem sx={{ padding: 3 }}>
                            <ListItemText
                                primaryTypographyProps={{
                                    variant: 'h5',
                                    gutterBottom: true,
                                }}
                                secondaryTypographyProps={{
                                    variant: 'subtitle2',
                                    lineHeight: 1,
                                }}
                                primary="Failed Payment"
                                secondary="Get a message when a payment fails"
                            />
                            <Switch
                                color="primary"
                                checked={state.checkedC}
                                onChange={handleChange}
                                name="checkedC"
                            />
                        </ListItem>
                        <Divider component="li" />
                        <ListItem sx={{ padding: 3 }}>
                            <ListItemText
                                primaryTypographyProps={{
                                    variant: 'h5',
                                    gutterBottom: true,
                                }}
                                secondaryTypographyProps={{
                                    variant: 'subtitle2',
                                    lineHeight: 1,
                                }}
                                primary="Order Status Update"
                                secondary="Whenever an order is updated, get a notification on your phone"
                            />
                            <Switch
                                color="primary"
                                checked={state.checkedD}
                                onChange={handleChange}
                                name="checkedD"
                            />
                        </ListItem>
                    </List>
                </Card>
            </Grid>
        </Grid>
    );
}

export default NotificationsTab;
