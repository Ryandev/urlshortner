import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import DisplaySettingsTwoToneIcon from '@mui/icons-material/DisplaySettingsTwoTone';
import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import { alpha, styled } from '@mui/material/styles';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import type { DeepReadonly } from 'ts-essentials';
import { SidebarContext } from '../../../../contexts/SidebarContext';

const MenuWrapper = styled(Box)(
    ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`,
);

const SubMenuWrapper = styled(Box)(
    ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create(['transform', 'opacity'])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`,
);

function SideItemButton(
    props: DeepReadonly<{
        text: string;
        href: string;
        onClick: () => void;
        icon: JSX.Element;
    }>,
): JSX.Element {
    const router = useRouter();
    const currentRoute = router.pathname;

    return (
        <ListItem component="div">
            <NextLink href={props.href} passHref>
                <Button
                    className={currentRoute === props.href ? 'active' : ''}
                    disableRipple
                    component="a"
                    onClick={props.onClick}
                    startIcon={props.icon}
                >
                    {props.text}
                </Button>
            </NextLink>
        </ListItem>
    );
}

function SidebarMenu() {
    const { closeSidebar } = useContext(SidebarContext);

    return (
        <MenuWrapper>
            <List component="div">
                <SubMenuWrapper>
                    <List component="div">
                        <SideItemButton
                            text="Overview"
                            href="/"
                            onClick={closeSidebar}
                            icon={<DesignServicesTwoToneIcon />}
                        />
                    </List>
                </SubMenuWrapper>
            </List>
            <List
                component="div"
                subheader={
                    <ListSubheader component="div" disableSticky>
                        Management
                    </ListSubheader>
                }
            >
                <SubMenuWrapper>
                    <List component="div">
                        <SideItemButton
                            text="URLs"
                            href="/management/transactions"
                            onClick={closeSidebar}
                            icon={<TableChartTwoToneIcon />}
                        />
                    </List>
                </SubMenuWrapper>
            </List>
            <List
                component="div"
                subheader={
                    <ListSubheader component="div" disableSticky>
                        Accounts
                    </ListSubheader>
                }
            >
                <SubMenuWrapper>
                    <List component="div">
                        <SideItemButton
                            text="User Profile"
                            href="/management/profile"
                            onClick={closeSidebar}
                            icon={<AccountCircleTwoToneIcon />}
                        />
                        <SideItemButton
                            text="Profile Settings"
                            href="/management/settings"
                            onClick={closeSidebar}
                            icon={<DisplaySettingsTwoToneIcon />}
                        />
                    </List>
                </SubMenuWrapper>
            </List>
        </MenuWrapper>
    );
}

export default SidebarMenu;
