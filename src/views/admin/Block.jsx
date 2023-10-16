import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router";
import { blockUser } from "./funcs/blockUser";
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

export const Block = () => {

    const [reason, setReason] = useState('');
    const [isBlocked, setIsBlocked] = useState(false);
    const navigate = useNavigate();
    const handle = useLocation().state.handle;

    useEffect(() => {
        setIsBlocked(false);
    }, [setIsBlocked])

    const block = async () => {
        await blockUser(handle, reason);
        setIsBlocked(true);
        setTimeout(() => {
            setIsBlocked(false);
            navigate('/');
        }, 3000)
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
                bg={useColorModeValue('red.300')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }} color={'white'} align={"center"}>
                  Reason to block
                </Heading>
                <Text
                  fontSize={{ base: 'sm', sm: 'md' }}
                  color={useColorModeValue('white')}
                  align={'center'}>
                  Type in reason why you want to block this <strong>user</strong> 🔐
                </Text>
                <FormControl id="reason">
                  <Input
                    placeholder="Reason..."
                    _placeholder={{ color: 'White' }}
                    backgroundColor={"white"}
                    type="text"
                    onChange={(e) => setReason(e.target.value)}
                  />
                </FormControl>
                <Stack spacing={6}>
                    {isBlocked && (
                      <Alert status='warning'>
                        <AlertIcon />
                            <Box>
                                <AlertTitle>User blocked!</AlertTitle>
                                <AlertDescription>
                                Now redirecting you to the home page!
                                </AlertDescription>
                            </Box>
                        </Alert>
            )}
                  <Button
                    bg={'red.600'}
                    color={'white'}
                    _hover={{
                      bg: 'red.700',
                    }}
                    onClick={block}>
                    Continue
                  </Button>
                </Stack>
              </Stack>
            </Flex>
            )
}
