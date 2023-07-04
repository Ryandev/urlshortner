import Dialog from '@mui/material/Dialog';
import type { ReactNode } from 'react';
import type { DeepReadonly } from 'ts-essentials';

export interface IModal {
    isOpen?: boolean;
    onClose?: () => void;
    title?: string;
    children?: ReactNode;
}

function Modal(props: DeepReadonly<IModal>): JSX.Element {
    return (
        <Dialog
            open={props.isOpen ?? false}
            onClose={() => {
                props.onClose?.();
            }}
        >
            {props.children}
        </Dialog>
    );
}

export default Modal;
