import CommentTwoToneIcon from '@mui/icons-material/CommentTwoTone';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Text from '../../../../components/Text';

const CardActionsWrapper = styled(CardActions)(
    ({ theme }) => `
     background: ${theme.colors.alpha.black[5]};
     padding: ${theme.spacing(3)};
`,
);

function ActivityTab() {
    return (
        <Card>
            <CardHeader
                avatar={<Avatar src="/static/images/avatars/5.jpg" />}
                action={
                    <IconButton color="primary">
                        <MoreHorizTwoToneIcon fontSize="medium" />
                    </IconButton>
                }
                titleTypographyProps={{ variant: 'h4' }}
                subheaderTypographyProps={{ variant: 'subtitle2' }}
                title="Allison Lipshutz"
                subheader={
                    <>
                        Managing Partner,{' '}
                        <Link
                            href="@/content/Management/Users/settings/ActivityTab#"
                            underline="hover"
                        >
                            #software
                        </Link>
                        ,{' '}
                        <Link
                            href="@/content/Management/Users/settings/ActivityTab#"
                            underline="hover"
                        >
                            #managers
                        </Link>
                        , Google Inc.
                    </>
                }
            />
            <Box px={3} pb={2}>
                <Typography variant="h4" fontWeight="normal">
                    Welcome to organizing your remote office for maximum productivity.
                </Typography>
            </Box>
            <CardMedia
                sx={{ minHeight: 280 }}
                image="/static/images/placeholders/covers/6.jpg"
                title="Card Cover"
            />
            <Box p={3}>
                <Typography variant="h2" sx={{ pb: 1 }}>
                    Organizing Your Remote Office for Maximum Productivity
                </Typography>
                <Typography variant="subtitle2">
                    <Link
                        href="@/content/Management/Users/settings/ActivityTab#"
                        underline="hover"
                    >
                        example.com
                    </Link>{' '}
                    • 4 mins read
                </Typography>
            </Box>
            <Divider />
            <CardActionsWrapper
                sx={{
                    display: { xs: 'block', md: 'flex' },
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Box>
                    <Button startIcon={<ThumbUpAltTwoToneIcon />} variant="contained">
                        Like
                    </Button>
                    <Button
                        startIcon={<CommentTwoToneIcon />}
                        variant="outlined"
                        sx={{ mx: 2 }}
                    >
                        Comment
                    </Button>
                    <Button startIcon={<ShareTwoToneIcon />} variant="outlined">
                        Share
                    </Button>
                </Box>
                <Box sx={{ mt: { xs: 2, md: 0 } }}>
                    <Typography variant="subtitle2" component="span">
                        <Text color="black">
                            <b>485</b>
                        </Text>{' '}
                        reactions •{' '}
                        <Text color="black">
                            <b>63</b>
                        </Text>{' '}
                        comments
                    </Typography>
                </Box>
            </CardActionsWrapper>
        </Card>
    );
}

export default ActivityTab;
