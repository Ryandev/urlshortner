import type { ComponentProps, ElementType, FunctionComponent, ReactNode } from 'react';

function withDefaultProps<C extends ElementType, PartialProps extends Partial<ComponentProps<C>>>(
    component: C,
) {
    const ResultComponent = component as FunctionComponent<PartialProps>;
    /* We return generic function, that accepts Partial component props as argument */
    const newComponent = (defaultProps: Readonly<PartialProps>) => {
        /* Now we have access to D keys and can exclude them from final props with Omit */
        const renderer = <NewProps extends Omit<ComponentProps<C>, keyof PartialProps>>(
            finalProps: Readonly<
                NewProps & {
                    children?: ReactNode;
                }
            >,
        ) => (
            <ResultComponent {...defaultProps} {...finalProps}>
                {' '}
                {finalProps.children ?? <></>}{' '}
            </ResultComponent>
        );
        renderer.displayName = `withDefault(${String(
            ResultComponent.displayName ?? String(ResultComponent),
        )}`;
        return renderer;
    };
    return newComponent;
}

export { withDefaultProps };
