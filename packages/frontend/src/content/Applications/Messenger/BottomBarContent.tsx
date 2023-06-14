import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Tooltip from '@mui/material/Tooltip';
import { styled, useTheme } from '@mui/material/styles';

const MessageInputWrapper = styled(InputBase)(
    ({ theme }) => `
    font-size: ${theme.typography.pxToRem(18)};
    padding: ${theme.spacing(1)};
    width: 100%;
`,
);

const Input = styled('input')({
    display: 'none',
});

function BottomBarContent() {
    const theme = useTheme();

    const user = {
        name: 'Catherine Pike',
        avatar: '/static/images/avatars/1.jpg',
    };

    return (
        <Box
            sx={{
                background: theme.colors.alpha.white[50],
                display: 'flex',
                alignItems: 'center',
                padding: 2,
            }}
        >
            <Box flexGrow={1} display="flex" alignItems="center">
                <Avatar
                    sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1 }}
                    alt={user.name}
                    src={user.avatar}
                />
                <MessageInputWrapper placeholder="Write your message here..." fullWidth />
            </Box>
            <Box>
                <Tooltip arrow placement="top" title="Choose an emoji">
                    <IconButton
                        sx={{ fontSize: theme.typography.pxToRem(16) }}
                        color="primary"
                    >
                        😀
                    </IconButton>
                </Tooltip>
                <Input accept="image/*" id="messenger-upload-file" type="file" />
                <Tooltip arrow placement="top" title="Attach a file">
                    <label htmlFor="messenger-upload-file">
                        <IconButton sx={{ mx: 1 }} color="primary" component="span">
                            <AttachFileTwoToneIcon fontSize="small" />
                        </IconButton>
                    </label>
                </Tooltip>
                <Button startIcon={<SendTwoToneIcon />} variant="contained">
                    Send
                </Button>
            </Box>
        </Box>
    );
}

export default BottomBarContent;
