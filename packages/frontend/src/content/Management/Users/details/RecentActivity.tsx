import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';

const AvatarPrimary = styled(Avatar)(
    ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`,
);

function RecentActivity() {
    const theme = useTheme();

    return (
        <Card>
            <CardHeader title="Recent Activity" />
            <Divider />
            <Box px={2} py={4} display="flex" alignItems="flex-start">
                <AvatarPrimary>
                    <ShoppingBagTwoToneIcon />
                </AvatarPrimary>
                <Box pl={2} flex={1}>
                    <Typography variant="h3">Orders</Typography>

                    <Box pt={2} display="flex">
                        <Box pr={8}>
                            <Typography
                                gutterBottom
                                variant="caption"
                                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                            >
                                Total
                            </Typography>
                            <Typography variant="h2">485</Typography>
                        </Box>
                        <Box>
                            <Typography
                                gutterBottom
                                variant="caption"
                                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                            >
                                Failed
                            </Typography>
                            <Typography variant="h2">8</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Divider />
            <Box px={2} py={4} display="flex" alignItems="flex-start">
                <AvatarPrimary>
                    <FavoriteTwoToneIcon />
                </AvatarPrimary>
                <Box pl={2} flex={1}>
                    <Typography variant="h3">Favourites</Typography>

                    <Box pt={2} display="flex">
                        <Box pr={8}>
                            <Typography
                                gutterBottom
                                variant="caption"
                                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                            >
                                Products
                            </Typography>
                            <Typography variant="h2">64</Typography>
                        </Box>
                        <Box>
                            <Typography
                                gutterBottom
                                variant="caption"
                                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                            >
                                Lists
                            </Typography>
                            <Typography variant="h2">15</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Divider />
            <Box px={2} py={4} display="flex" alignItems="flex-start">
                <AvatarPrimary>
                    <StarTwoToneIcon />
                </AvatarPrimary>
                <Box pl={2} flex={1}>
                    <Typography variant="h3">Reviews</Typography>

                    <Box pt={2} display="flex">
                        <Box pr={8}>
                            <Typography
                                gutterBottom
                                variant="caption"
                                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                            >
                                Total
                            </Typography>
                            <Typography variant="h2">654</Typography>
                        </Box>
                        <Box>
                            <Typography
                                gutterBottom
                                variant="caption"
                                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                            >
                                Useful
                            </Typography>
                            <Typography variant="h2">21</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Card>
    );
}

export default RecentActivity;
