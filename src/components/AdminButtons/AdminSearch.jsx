import { useContext, useState } from "react"
import { auth, db } from "../../config/firebase-config";
import { get, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { RoleContext } from "../../context/RoleContext";
import {
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightAddon
  } from "@chakra-ui/react";
  import { Search2Icon } from "@chakra-ui/icons";
  
export const AdminSearch = () => {
    // const { userData } = useContext(AuthContext);
    const { role } = useContext(RoleContext);
    const [searchValue, setSearchValue] = useState('');
    const [alert, setAlert] = useState(false);
    const user = auth.currentUser;
    
    
    const navigate = useNavigate();

    const searchUser = async () => {
        const result = await get(ref(db, `users/${searchValue}`));
        
        if(result.val()) {
            navigate(`/users/${searchValue}`);
        } else {
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 2500);
        }
    };

    return (
        <div >
            {((user !== null && role === 'admin') || (user !== null && role === 'moderator')) && (
            <InputGroup borderRadius={5} size="sm">
                <InputLeftElement
                pointerEvents="none"
                // eslint-disable-next-line react/no-children-prop
                children={<Search2Icon color="gray.600" />}
                />
                <Input type="text" placeholder="Search by username..." border="1px solid #949494" onChange={(e) => setSearchValue(e.target.value)}/>
                <InputRightAddon
                p={0}
                border="none"
                >
                <Button
                colorScheme='green' 
                size="sm" 
                borderLeftRadius={0} 
                borderRightRadius={3.3} 
                border="1px solid #949494"
                onClick={searchUser}>
                    Search
                </Button>
            </InputRightAddon>
        </InputGroup>
        )}

        {alert && (
            <div className="alert alert-danger" role="alert">
                No user matches this handle!
            </div>)}
        </div>
    );
};