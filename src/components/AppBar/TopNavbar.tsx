import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Outlet } from "react-router-dom";
import { colors } from "@/utilities";
import { EditNoteOutlined, Logout } from "@mui/icons-material";
import { DummyImage, ExcelInsightLogo } from "@/assets";
import ExcelIcon from "../ExcelIcon/ExcelIcon";
import { useDispatch } from "react-redux";
import { AppDispatch, resetState } from "@/redux/combineStore";
// import { routes } from "@/utilities/routes";

const drawerWidth = 240;
const appBarHeight = 64;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  //   flexGrow: 1,
  marginTop: `${appBarHeight}px`,
  padding: 0,
  height: `calc(100vh - ${appBarHeight}px)`,
  width: "100vw",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `${drawerWidth}px`,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  backgroundColor: colors.WHITE,
  zIndex: 2,
  height: `${appBarHeight}px`,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

export default function TopNavbar() {
  const [open] = React.useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(resetState());
  };
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => handleDrawerSwitch(!open)}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon style={{ color: colors.BLACK }} />
          </IconButton> */}
          <a href="/">
            <img src={ExcelInsightLogo} alt="" className="h-8" />
          </a>
          <Box sx={{ display: "flex", flexGrow: 1 }} />
          <div className="flex flex-row ">
            <div className="text-right text-black flex-col justify-center md:flex hidden">
              <h4 className="text-md-1 font-semi-bold">John Shell</h4>
              <h6 className="text-sm font-medium">johnshell55@email.com</h6>
            </div>
            <div className="flex flex-col justify-center p-basic">
              {/* <AccountCircle style={{ color: colors.BLACK, fontSize: 36 }} /> */}
              <img src={DummyImage} alt="" className="h-10" />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          // width: drawerWidth,
          zIndex: 1,
          height: `calc(100svh - ${appBarHeight}px)`,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            height: `calc(100vh - ${appBarHeight}px)`,
            marginTop: `${appBarHeight}px`,
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: colors.SECONDARY_THEME_2,
            display: "flex",
            flexDirection: "column",
            // justifyContent: "space-between",
            paddingBottom: "5px",
          },
        }}
        variant={"persistent"}
        anchor="left"
        open={open}
        // onClose={() => (windowSize.width < 748 ? setOpen("none") : null)}
      >
        {/* <DrawerHeader></DrawerHeader>
        <Divider /> */}
        <List >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                sx={{
                  fontWeight: "400",
                  fontFamily: "Inter",
                  "& .MuiTypography-root": {
                    fontSize: 16,
                    fontFamily: "Inter",
                    fontWeight: "400",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  },
                }}
              >
                <ExcelIcon height={30} width={30} iconSize={22} />
                <span>
                  Excel <strong>Chat</strong>
                </span>
              </ListItemText>
              <ListItemIcon sx={{ justifyContent: "flex-end" }}>
                <EditNoteOutlined />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
        <div className="grow" />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemText
                primary={"Logout"}
                sx={{
                  fontWeight: "500",
                  fontFamily: "Inter",
                  "& .MuiTypography-root": {
                    fontSize: 15,
                    fontFamily: "Inter",
                    fontWeight: "500",
                  },
                }}
              />
              <ListItemIcon sx={{ justifyContent: "flex-end" }}>
                <Logout />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Main className="flex flex-col bg-secondary-theme" open={open}>
        <Outlet />
      </Main>
    </Box>
  );
}
