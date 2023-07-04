import type { ReactNode } from 'react';
import type { DeepReadonly } from 'ts-essentials';

export function withLayout<T>(
    element: (props: T) => JSX.Element,
    Layout?: (props: DeepReadonly<{ children?: ReactNode | undefined }>) => JSX.Element,
): (props: T) => JSX.Element {
    return function withLayoutChosen(props: T): JSX.Element {
        return Layout ? <Layout>{element(props)}</Layout> : <>{element(props)}</>;
    };
}
