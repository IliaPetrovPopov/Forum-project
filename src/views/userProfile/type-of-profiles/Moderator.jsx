import { useEffect, useState } from "react";
import { ProfilePic } from "../../../components/ProfilePic/ProfilePic";
import PropTypes from "prop-types";
import { get, ref } from "@firebase/database";
import { db } from "../../../config/firebase-config";
import { unblockUser } from "../../admin/funcs/unblockUser";
import { Flex, Box, WrapItem, Button } from "@chakra-ui/react";

export const Moderator = ({ user, userData, handle, navigate }) => {
  const [blocked, setBlocked] = useState(false);
  const [role, setRole] = useState(null);

  const block = () => {
    navigate("/block-user", { state: { handle } });
  };

  const unblock = () => {
    unblockUser(handle);
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

  }, [handle])

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
  } else if(user && role === "admin") {
    return (
    <Flex align="center" justify="center" h="35vh">
      <Box id="info-wrapper" backgroundColor={'#38A169'} borderRadius={"1.5cm"}>
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
          </Box>
        </Flex>
      </Box>
    </Flex>
    );
  } else {
    return(
    <Flex align="center" justify="center" h="35vh">
      <Box id="info-wrapper" backgroundColor={'#38A169'} borderRadius={"1.5cm"}>
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
            {(role === "moderator" || role === "user") && (
                blocked ? (
                  <WrapItem>
                    <Button onClick={unblock} colorScheme='red'>
                        Unblock
                    </Button>
                  </WrapItem>
                ) : (
                  <WrapItem>
                    <Button onClick={block} colorScheme='red'>
                        Block
                    </Button>
                  </WrapItem>
                ))}           
          </Box>
        </Flex>
      </Box>
    </Flex>
    ) 
  } 
};

Moderator.propTypes = {
  user: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  handle: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};
