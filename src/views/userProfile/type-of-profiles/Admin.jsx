import { useEffect, useState } from "react";
import { ProfilePic } from "../../../components/ProfilePic/ProfilePic";
import PropTypes from "prop-types";
import { get, ref } from "@firebase/database";
import { db } from "../../../config/firebase-config";
import { unblockUser } from "../../admin/funcs/unblockUser";
import './Admin.css';
import { Flex, Box, WrapItem, Button } from "@chakra-ui/react";
import { makeModerator } from "../../admin/funcs/makeModerator";
import { unmakeModerator } from "../../admin/funcs/unmakeModerator";

export const Admin = ({ user, userData, handle, navigate }) => {
  const [blocked, setBlocked] = useState(false);
  const [role, setRole] = useState(null);

  const block = () => {
    navigate("/block-user", { state: { handle } });
  };

  const unblock = () => {
    unblockUser(handle);
    navigate("/");
  };
  
  const moderator = () => {
    makeModerator(handle);
    navigate("/");
  };

  const nonModerator = () => {
    unmakeModerator(handle);
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      const blockedProp = await get(ref(db, `/users/${handle}/blocked`));
      const result = blockedProp.val();
      setBlocked(result);
    };

    fetchData();
  }, [handle]);

  useEffect(() => {
    const fetchData = async () => {
        const roleProp = await get(ref(db, `/users/${handle}/role`));
        const result = roleProp.val();
        setRole(result);
      };
  
      fetchData();

      return () => {
        setRole('');
    };

  }, [handle]);

  if (user && userData.handle === handle) {
    return (
      <Flex align="center" justify="center" h="35vh">
      <Box id="info-wrapper" backgroundColor={'#38A169'} borderRadius={"1.5cm"} 
      >
        <Flex className="profile-card rounded-top text-white" direction="row" alignItems={"center"}>
          <Box
            className="ms-4 mt-5"
            w="3.8cm"
            h="100%"
            d="flex"
            flexDir="column"
            alignItems="center" 
          >
            <ProfilePic handle={handle} style={{ width: "3cm", height: "3cm" }} />
      
          </Box>
          <Box className="ms-4 profile-details" position="relative">
            <h5 style={{fontSize: "1rem",
            whiteSpace: "nowrap"}}>
              <strong>User:</strong> {user.firstName} {user.lastName}
            </h5>
            <h5 style={{fontSize: "1rem",
            whiteSpace: "nowrap"}}>
              <strong>Email:</strong> {user.email}
            </h5>
            <h5 style={{fontSize: "1rem",
            whiteSpace: "nowrap"}}>
            <strong>Role:</strong> {user.role}</h5>
            <WrapItem>
              <Button onClick={() => navigate('/reauthentication')} 
              colorScheme='whatsapp'
              >
                Edit profile</Button>
            </WrapItem>
              
          </Box>
        </Flex>
      </Box>
    </Flex>
    );
  } else {
    return (
      <Flex align="center" justify="center" h="35vh">
      <Box id="info-wrapper" backgroundColor={'#38A169'} borderRadius={"1.5cm"} 
      >
        <Flex className="profile-card rounded-top text-white" direction="row" alignItems={"center"}>
          <Box
            className="ms-4 mt-5"
            w="3.8cm"
            h="100%"
            d="flex"
            flexDir="column"
            alignItems="center" 
          >
            <ProfilePic handle={handle} style={{ width: "3cm", height: "3cm" }} />
      
          </Box>
          <Box className="ms-4 profile-details" position="relative">
            <h5 style={{fontSize: "1rem",
            whiteSpace: "nowrap"}}>
              <strong>User:</strong> {user.firstName} {user.lastName}
            </h5>
            <h5 style={{fontSize: "1rem",
            whiteSpace: "nowrap"}}>
              <strong>Email:</strong> {user.email}
            </h5>
            <h5 style={{fontSize: "1rem",
            whiteSpace: "nowrap"}}>
            <strong>Role:</strong> {user.role}</h5>
            {blocked ? (
              <WrapItem>
                <Button onClick={unblock} colorScheme='red'>
                  Unblock
                </Button>
              </WrapItem>
            ) : (
              <WrapItem>
                <Button onClick={block} colorScheme='red' marginRight="0.2cm">
                  Block
                </Button>
                {role === "user" && (
                  <Button onClick={moderator} colorScheme='orange'>
                    Make Moderator
                  </Button>
                )}
                {role === "moderator" && (
                  <Button onClick={nonModerator} colorScheme='orange'>
                    Demote Moderator
                  </Button>
                )}
              </WrapItem>
            )}
          </Box>
        </Flex>
      </Box>
    </Flex>
    );
  }
};

Admin.propTypes = {
  user: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  handle: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};
