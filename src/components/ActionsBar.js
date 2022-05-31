import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import SortIcon from "@mui/icons-material/Sort";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import {
  barNumberOptions,
  sortingAlgosList,
  sortingSpeeds,
} from "../algorithms";

const ActionsBar = ({
  selectedAlgo,
  updateSelectedAlgo,
  delay,
  updateDelay,
  numBars,
  updateNumBars,
  startSorting,
  isSorting,
  generateNewArray,
  menuItemClicked,
}) => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleChangeAlgo = (event) => {
    updateSelectedAlgo(event.target.value);
  };

  const handleChangeNumBars = (event) => {
    updateNumBars(event.target.value);
  };

  const handleChangeDelay = (event) => {
    updateDelay(event.target.value);
  };

  const handleMenuItemClicked = (event) => {
    handleCloseNavMenu();
    const { menuItem } = event.currentTarget.dataset;
    menuItemClicked(menuItem);
  };

  const sortingButtonText = isSorting
    ? "Currently sorting..."
    : "Start Sorting!";

  const newArrayButtonText = isSorting
    ? "Currently sorting..."
    : "Generate New Array";

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SortIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SORTING VISUALIZER
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {sortingAlgosList.map((algo) => (
                <MenuItem
                  key={algo}
                  onClick={handleMenuItemClicked}
                  disabled={isSorting}
                  data-menu-item={algo}
                >
                  <Typography textAlign="center">{algo}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <SortIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SORT VISUALIZER
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel
                id="demo-simple-select-standard-label"
                sx={{ color: "white" }}
              >
                Sorting Algorithm
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={selectedAlgo}
                onChange={handleChangeAlgo}
                label="Selected Algorithm"
                sx={{ color: "white" }}
                disabled={isSorting}
              >
                {sortingAlgosList.map((algo) => (
                  <MenuItem value={algo} key={algo}>
                    {algo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel
                id="demo-simple-select-standard-label1"
                sx={{ color: "white" }}
              >
                Bar Count
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard1"
                value={numBars}
                onChange={handleChangeNumBars}
                label="Number Of Bars"
                sx={{ color: "white" }}
                disabled={isSorting}
              >
                {barNumberOptions.map((num) => (
                  <MenuItem value={num} key={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel
                id="demo-simple-select-standard-label2"
                sx={{ color: "white" }}
              >
                Sorting Speed
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label2"
                id="demo-simple-select-standard2"
                value={delay}
                onChange={handleChangeDelay}
                label="Sorting Speed"
                sx={{ color: "white" }}
                disabled={isSorting}
              >
                {sortingSpeeds.map(([speed, text]) => (
                  <MenuItem value={speed} key={speed}>
                    {text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              gap: 4,
            }}
          >
            <Button
              onClick={() => generateNewArray()}
              sx={{ my: 2, color: "white" }}
              disabled={isSorting}
            >
              {newArrayButtonText}
            </Button>
            <Button
              onClick={() => startSorting()}
              sx={{ my: 2, color: "white" }}
              disabled={isSorting}
            >
              {sortingButtonText}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ActionsBar;
