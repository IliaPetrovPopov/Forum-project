import { logOutUser } from "../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase-config";
import { Dropdown, Nav, Navbar } from "react-bootstrap";
import { getUserData } from "../../services/user.service";
import { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import CategoriesDropdown from "../Categories/CategoriesDropdown";
import { ProfilePic } from "../ProfilePic/ProfilePic";
import ResetCategoryButton from "../Categories/ResetCategoryButton";
import { Button, HStack } from "@chakra-ui/react";

const NavBar = () => {
  const [user] = useAuthState(auth);
  const [handle, setHandle] = useState(null);
  const navigate = useNavigate();
  const categoryToShow =
    useContext(CategoryContext).currentCategory || "Categories";

  useEffect(() => {
    if (user) {
      getUserData(user.uid)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            const userHandle = userData[Object.keys(userData)[0]].handle;
            setHandle(userHandle);
          }
        })
        .catch((e) => console.error("Error fetching user data", e));
    }
  }, [user]);

  const onLogout = () => {
    setHandle(null)
    logOutUser();
  };
  return (
    <header>
      <Navbar className="navbar">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Nav className="left-section">
          <CategoriesDropdown />
        </Nav>
        <Nav className="middle-section">
          <Link to="/" >
            <img src='/src/images/BGxpl.png' className="title-navbar"/>
          </Link>
          &nbsp;
        </Nav>

        <Nav className="right-section">
          {user === null && (
            <HStack >
              {" "}
              <Button color='red.700' size='lg' as={Link} to="/register" variant="solid">
                Sign Up
              </Button>{' '}
              <Button color='green.700'  size='lg' as={Link} to="/login" variant="solid">
                Log In
              </Button>
            </HStack>
          )}
          &nbsp;
          {user !== null && (
            <>
              <div onClick={() => navigate(`users/${handle}`)}>
                <ProfilePic handle={handle} />
              </div>
              <i
                className="bi bi-gear larger-icon"
                onClick={() => navigate("/reauthentication")}
              />
              <Link to="/" onClick={onLogout}>
                <i className="bi bi-box-arrow-right larger-icon" />
              </Link>
            </>
          )}
        </Nav>
      </Navbar>
    </header>
  );
};

export default NavBar;
