import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { default as Grid } from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import type { DeepReadonly } from 'ts-essentials';
import { withDefaultProps } from '../../util/PartialComponent';

function _isValidURL(urlTest: string): boolean {
    try {
        const url = new URL(urlTest);
        return url.href.length > 0;
    } catch {
        return false;
    }
}

const _nameFromURL = (url: URL): string => url.host.replace(/^www./giu, '');

const FormTextField = withDefaultProps(TextField)({
    variant: 'standard',
    fullWidth: true,
});

function UrlForm(props: {
    onSubmit: (url: URL, name: string, expiry: Date | null) => void;
}): JSX.Element {
    const [url, setUrl] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [date, setDate] = useState<Date | null>(null);
    const [submitEnabled, setSubmitEnabled] = useState(false);
    const [statusText, setStatusText] = useState('');

    const onURLChange = (
        event: DeepReadonly<ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>,
    ) => {
        const newUrl = String(event.target.value);
        setUrl(newUrl);
        setSubmitEnabled(newUrl.length > 0);
        setStatusText('');
    };

    const onNameChange = (
        event: DeepReadonly<ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>,
    ) => {
        setName(String(event.target.value));
    };

    const onClick = () => {
        const canSubmit = _isValidURL(url);

        if (canSubmit) {
            const submitURL = new URL(url);
            props.onSubmit(submitURL, name || _nameFromURL(submitURL), date ?? null);
        } else {
            setStatusText('Invalid URL');
            setSubmitEnabled(false);
        }
    };

    return (
        <Card variant="outlined" sx={{ padding: 4 }}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={0}
                maxWidth="md"
            >
                <Grid xs={12} sx={{ padding: 1 }}>
                    <Typography align="center" variant="h2">
                        New URL
                    </Typography>
                </Grid>
                <Grid xs={8} sx={{ padding: 1 }}>
                    <FormTextField label="Name" onChange={onNameChange} value={name} />
                </Grid>
                <Grid xs={4} sx={{ padding: 2 }}>
                    <DatePicker
                        label="Expiry"
                        slotProps={{
                            textField: {
                                variant: 'standard',
                                fullWidth: true,
                                error: Boolean(date),
                                helperText: date ? 'Invalid date' : '',
                            },
                        }}
                        value={date}
                        onChange={(value: Readonly<Date> | null) => {
                            setDate(value);
                        }}
                    />
                </Grid>
                <Grid xs={12} sx={{ padding: 1 }}>
                    <FormTextField
                        required={true}
                        label="Url"
                        error={url.length !== 0 && !_isValidURL(url)}
                        helperText={statusText}
                        placeholder="https://www.github.com"
                        onChange={onURLChange}
                        value={url}
                    />
                </Grid>
                <Grid xsOffset={8} xs={4} sx={{ padding: 2 }}>
                    <Button
                        disabled={!submitEnabled}
                        variant="outlined"
                        fullWidth
                        sx={{ paddingY: 2 }}
                        onClick={onClick}
                    >
                        <Typography variant="h4">Create</Typography>
                    </Button>
                </Grid>
            </Grid>
        </Card>
    );
}

export default UrlForm;
