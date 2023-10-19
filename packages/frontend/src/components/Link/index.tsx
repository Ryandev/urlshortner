import type { LinkProps as MuiLinkProps } from '@mui/material/Link';
import MuiLink from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import type { LinkProps as NextLinkProps } from 'next/link';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import type { Ref } from 'react';
import * as React from 'react';

/* Add support for the sx prop for consistency with the other branches. */
const Anchor = styled('a')({});

interface NextLinkComposedProps
    extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
        Omit<NextLinkProps, 'as' | 'href' | 'onClick' | 'onMouseEnter' | 'onTouchStart'> {
    to: Exclude<NextLinkProps['href'], undefined>;
    linkAs: Exclude<NextLinkProps['as'], undefined>;
}

const _NextLinkComposed = (props: NextLinkComposedProps, ref: Ref<HTMLAnchorElement>) => {
    const { to, linkAs, replace, scroll, shallow, prefetch, locale, ...other } = props;
    return (
        <NextLink
            href={to}
            prefetch={Boolean(prefetch)}
            as={linkAs}
            replace={Boolean(replace)}
            scroll={Boolean(scroll)}
            shallow={Boolean(shallow)}
            locale={locale ?? false}
            passHref={true}
        >
            <Anchor ref={ref} {...other} />
        </NextLink>
    );
};
export const NextLinkComposed = React.forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
    _NextLinkComposed,
);

export type LinkProps = Omit<MuiLinkProps, 'href'> &
    Omit<NextLinkComposedProps, 'href' | 'linkAs' | 'to'> & {
        activeClassName?: string;
        as?: NextLinkProps['as'] | undefined;
        href: NextLinkProps['href'];
        /* Useful when the as prop is shallow by styled(). */
        linkAs?: Exclude<NextLinkProps['as'], undefined>;
        noLinkStyle?: boolean;
    };

const isExternalLink = (href: unknown) =>
    typeof href === 'string' && (href.startsWith('http') || href.startsWith('mailto:'));

/*
 * A styled version of the Next.js Link component:
 * https://nextjs.org/docs/api-reference/next/link
 */
/* eslint-disable-next-line max-statements */
function _Link(props: LinkProps, ref: Ref<HTMLAnchorElement>) {
    const {
        activeClassName = 'active',
        as,
        className: classNameProps,
        href,
        linkAs: linkAsProp,
        locale,
        noLinkStyle,
        prefetch,
        replace,
        /* Link don't have roles. */
        role,
        scroll,
        shallow,
        ...other
    } = props;

    const router = useRouter();
    const pathname = typeof href === 'string' ? href : href.pathname;
    const className = clsx(classNameProps, {
        [activeClassName]: router.pathname === pathname && activeClassName,
    });

    if (isExternalLink(href)) {
        if (noLinkStyle ?? false) {
            return (
                <Anchor className={className} href={String(href)} ref={ref} {...other} />
            );
        }
        return <MuiLink className={className} href={String(href)} ref={ref} {...other} />;
    }

    const linkAs = linkAsProp ?? as;
    const nextJSProps = {
        to: href,
        linkAs: linkAs ?? href,
        replace: replace ?? false,
        scroll: scroll ?? false,
        shallow: shallow ?? false,
        prefetch: prefetch ?? false,
        locale: locale ?? false,
    };

    if (noLinkStyle ?? false) {
        return (
            <NextLinkComposed className={className} ref={ref} {...nextJSProps} {...other} />
        );
    }

    return (
        <MuiLink
            component={NextLinkComposed}
            className={className}
            ref={ref}
            {...nextJSProps}
            {...other}
        />
    );
}
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(_Link);

export default Link;
