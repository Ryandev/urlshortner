import { Button } from '@mui/material';
import { useModeSwitcher } from '../util/modeSwitcher';

function ModeToggleButton() {
    const [mode, setMode] = useModeSwitcher();
    const toggleMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    };

    return (
        <Button variant="outlined" onClick={toggleMode}>
            {mode === 'light' ? 'Turn dark' : 'Turn light'}
        </Button>
    );
}

export default ModeToggleButton;
