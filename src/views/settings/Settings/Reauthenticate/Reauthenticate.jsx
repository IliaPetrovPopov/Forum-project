import { useState } from "react";
import { loginUser } from "../../../../services/auth.service";
import { auth } from "../../../../config/firebase-config";
import { useNavigate } from "react-router";
import { 
    Button, 
    FormControl, 
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Box,
    Flex, 
    Heading, 
    Input, 
    Stack, 
    Text, 
    useColorModeValue } from "@chakra-ui/react";
import { useEffect } from "react";

const Reauthenticate = () => {
    const [reauthPass, setReauthPass] = useState('');
    const [wrongPass, setWrongPass] = useState(false);

    const navigate = useNavigate();

    const user = auth.currentUser;

    useEffect(() => {
        setWrongPass(false);
    }, [setWrongPass]);

    const handlePassword = () => {
        
        loginUser(user.email, reauthPass)
            .then(() => navigate("/settings", { state: { pass: reauthPass } }))
            .catch((e) => {
                setWrongPass(true);
                setTimeout(() => {
                    setWrongPass(false);
                }, 3000)
                console.error(`Error: ${e.message}`);
            });
    }

    return ( 
    <Flex
      minH={'74vh'}
      align={'center'}
      justify={'center'}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('green.300')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }} color={'white'}>
          Enter password to continue
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('white')}
          align={'center'}>
          This is done for security measures 🔐
        </Text>
        <FormControl id="password">
          <Input
            placeholder="Password..."
            _placeholder={{ color: 'White' }}
            backgroundColor={"white"}
            type="password"
            onChange={((e) => setReauthPass(e.target.value))}
          />
        </FormControl>
        <Stack spacing={6}>
            {wrongPass && (
                <Alert status='error'>
                <AlertIcon />
                <Box>
                  <AlertTitle>Wrong Password!</AlertTitle>
                  <AlertDescription>
                    Please enter the right password to continue!
                  </AlertDescription>
                </Box>
              </Alert>
            )}
          <Button
            bg={'green.600'}
            color={'white'}
            _hover={{
              bg: 'green.700',
            }}
            onClick={handlePassword}>
            Continue
          </Button>
        </Stack>
      </Stack>
    </Flex>
    )
}

export default Reauthenticate;