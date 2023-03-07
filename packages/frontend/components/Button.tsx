import type { IButton } from './Button.interface';

export default function Button(props: Readonly<IButton>): JSX.Element {
    return <button>{props.name}</button>;
}
