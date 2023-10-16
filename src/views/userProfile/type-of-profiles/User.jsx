import { useNavigate } from "react-router-dom";
import { ProfilePic } from "../../../components/ProfilePic/ProfilePic";
import { Flex, Box, WrapItem, Button } from "@chakra-ui/react";
import PropTypes from "prop-types";

export const User = ({ user, userData, handle }) => {
  const navigate = useNavigate();
  if (user && userData.handle === handle) {
    return (
      <Flex align="center" justify="center" h="35vh">
      <Box id="info-wrapper" backgroundColor={'#C53030'} borderRadius={"1.5cm"} 
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
              colorScheme='orange'
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
      <Box id="info-wrapper" backgroundColor={'#C53030'} borderRadius={"1.5cm"} 
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
          </Box>
        </Flex>
      </Box>
    </Flex>
    );
  }
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  handle: PropTypes.string.isRequired,
};
