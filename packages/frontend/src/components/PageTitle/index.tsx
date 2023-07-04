import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

interface PageTitleProps {
    heading?: string;
    subHeading?: string;
    docs?: string;
}

function PageTitle(props: PageTitleProps): JSX.Element {
    const { heading = '', subHeading = '', docs = '', ...rest } = props;

    return (
        <Grid container justifyContent="space-between" alignItems="center" {...rest}>
            <Grid item>
                <Typography variant="h3" component="h3" gutterBottom>
                    {heading}
                </Typography>
                <Typography variant="subtitle2">{subHeading}</Typography>
            </Grid>
            <Grid item>
                <Button
                    href={docs}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ mt: { xs: 2, md: 0 } }}
                    variant="contained"
                    startIcon={<AddTwoToneIcon fontSize="small" />}
                >
                    {heading} Documentation
                </Button>
            </Grid>
        </Grid>
    );
}

export default PageTitle;
