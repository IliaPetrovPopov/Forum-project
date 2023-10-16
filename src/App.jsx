import "./App.css";
import { AuthContext } from "./context/AuthContext";
import { useEffect, useState } from "react";
import Register from "./views/register/register";
import LogIn from "./views/logIn/LogIn";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase-config";
import { Route, Routes } from "react-router-dom";
import { getUserData } from "./services/user.service";
import NavBar from "./components/NavBar/NavBar";
import Home from "./views/home/Home";
import { Settings } from "./views/settings/Settings/Settings";
import "bootstrap/dist/css/bootstrap.min.css";
import Reauthenticate from "./views/settings/Settings/Reauthenticate/Reauthenticate";
import "bootstrap/dist/css/bootstrap.min.css";
import SinglePost from "./views/single-post/SinglePost";
import { Block } from "./views/admin/Block";
import UserProfile from "./views/userProfile/userProfile";
import { CreatePost } from "./components/CreatePost/CreatePost";
import { CategoryProvider } from "./context/CategoryContext";
import { RoleProvider } from "./context/RoleContext";
import { ResetPassword } from "./components/ResetPassword/ResetPassword";
import { Box, ChakraProvider } from "@chakra-ui/react";

function App() {
  const [user] = useAuthState(auth);
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });

  if (appState.user !== user) {
    setAppState({ user });
  }

  useEffect(() => {
    if (user === null) return;

    getUserData(user.uid)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          throw new Error("Something went wrong!");
        }

        setAppState({
          ...appState,
          userData: snapshot.val()[Object.keys(snapshot.val())[0]],
        });
      })
      .catch((e) => console.error(e.message));
  }, [user]);

  return (
    <ChakraProvider>
      <AuthContext.Provider value={{ ...appState, setContext: setAppState }}>
        <RoleProvider>
          <CategoryProvider>
            <div className="App">
              <Box className="container">
                <NavBar />
                <footer />
                <Routes>
                  <Route path="/" element={<Home />} />
                  {user !== null && (
                    <Route path="/block-user" element={<Block />} />
                  )}
                  <Route path="/single-post/:postId" element={<SinglePost />} />

                  {user !== null && (
                    <>
                      <Route
                        path="/reauthentication"
                        element={<Reauthenticate />}
                      />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/create-post" element={<CreatePost />} />
                      <Route path="/users/:handle" element={<UserProfile />} />
                    </>
                  )}

                  {user === null && (
                    <>
                      <Route path="/login" element={<LogIn />} />
                      <Route
                        path="/reset-password"
                        element={<ResetPassword />}
                      />
                      <Route path="/register" element={<Register />} />
                    </>
                  )}
                </Routes>
              </Box>
            </div>
          </CategoryProvider>
        </RoleProvider>
      </AuthContext.Provider>
    </ChakraProvider>
  );
}

export default App;
