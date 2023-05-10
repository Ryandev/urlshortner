import { useState } from 'react';

export function useSideMenu(): [boolean, () => void] {
    const [open, setOpen] = useState(true);
    const toggle = () => {
        setOpen(!open);
    };

    return [open, toggle];
}
