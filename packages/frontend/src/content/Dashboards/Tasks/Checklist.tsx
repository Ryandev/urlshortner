import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
import BusinessCenterTwoToneIcon from '@mui/icons-material/BusinessCenterTwoTone';
import RefreshTwoToneIcon from '@mui/icons-material/RefreshTwoTone';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const TimelineWrapper = styled(Timeline)(
    ({ theme }) => `
    margin-left: ${theme.spacing(2)};

    .MuiTimelineDot-root {
      left: -${theme.spacing(2)};
      margin-top: 0;
      top: ${theme.spacing(0.5)};
    }
    
    .MuiTimelineContent-root {
      padding-left: ${theme.spacing(4)};
    }
    
    .MuiFormControlLabel-root {
      margin-left: -${theme.spacing(0.7)};
    }
    
    .MuiFormControlLabel-label {
      color: ${theme.colors.alpha.black[50]};
    }
`,
);

const CheckboxWrapper = styled(Checkbox)(
    ({ theme }) => `
    padding: ${theme.spacing(0.5)};
`,
);

function Checklist() {
    return (
        <Box>
            <CardHeader
                sx={{
                    px: 0,
                    pt: 0,
                }}
                action={
                    <Tooltip arrow title="Refresh list">
                        <IconButton size="small" color="primary">
                            <RefreshTwoToneIcon />
                        </IconButton>
                    </Tooltip>
                }
                title="Checklist"
            />
            <TimelineWrapper>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot color="primary">
                            <AssignmentTwoToneIcon />
                        </TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <Typography
                            variant="h4"
                            sx={{
                                pb: 2,
                            }}
                        >
                            Tasks Quick List
                        </Typography>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <CheckboxWrapper color="primary" name="checkedC" />
                                }
                                label="Prepare website launch"
                            />
                            <FormControlLabel
                                control={
                                    <CheckboxWrapper color="primary" name="checkedC" />
                                }
                                label="Build React Native application"
                            />
                            <FormControlLabel
                                control={
                                    <CheckboxWrapper color="primary" name="checkedC" />
                                }
                                label="Fix remaining bugs for first 4 pages"
                            />
                        </FormGroup>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot color="primary">
                            <AccountTreeTwoToneIcon />
                        </TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <Typography
                            variant="h4"
                            sx={{
                                pb: 2,
                            }}
                        >
                            Project Management
                        </Typography>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <CheckboxWrapper color="primary" name="checkedC" />
                                }
                                label="Complete sales pitch"
                            />
                            <FormControlLabel
                                control={
                                    <CheckboxWrapper color="primary" name="checkedC" />
                                }
                                label="Improve SEO visibility"
                            />
                        </FormGroup>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot color="primary">
                            <BusinessCenterTwoToneIcon />
                        </TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <Typography
                            variant="h4"
                            sx={{
                                pb: 2,
                            }}
                        >
                            Business & Marketing
                        </Typography>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <CheckboxWrapper color="primary" name="checkedC" />
                                }
                                label="Create marketing campaign"
                            />
                            <FormControlLabel
                                control={
                                    <CheckboxWrapper color="primary" name="checkedC" />
                                }
                                label="Sign business contract with partners"
                            />
                        </FormGroup>
                    </TimelineContent>
                </TimelineItem>
            </TimelineWrapper>
        </Box>
    );
}

export default Checklist;
