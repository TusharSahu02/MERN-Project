import { AppBar, Toolbar, styled } from "@mui/material";
import { Link } from "react-router-dom";

const Tabs = styled("p")`
  font-size: 20px;
  margin-right: 20px;
`;

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Tabs>
          <Link to="/">Home</Link>
        </Tabs>
        <Tabs>
          <Link to="/allusers">All Users</Link>
        </Tabs>
        <Tabs>
          <Link to="/adduser">Add User</Link>
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
