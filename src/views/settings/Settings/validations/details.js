import { updateEmail, updatePassword } from "@firebase/auth";
import { validateEmail, validateName, validatePassword } from "../../../../services/document-verifications/user-doc-verification";
import { ref, update } from "@firebase/database";
import { updateStorage } from "../../funcs/updateStorage";

let passRequirements = {
    email: false,
    firstName: false,
    lastName: false,
    photo: false,
    password: false,
};

export const detailsValidation = async (details, photoURL, email, password) => {
        
        if(photoURL) {
            passRequirements.photo = true;
        }
    
        if(Object.keys(details).includes("firstName")) {
            validateName(details.firstName);
            passRequirements.firstName = true;
        }
   
        if(Object.keys(details).includes("lastName")) {
            validateName(details.lastName);
            passRequirements.lastName = true;
        }

        if(password) {
            validatePassword(password);
            passRequirements.password = true;
        }

        if(email) {
            try {
                await validateEmail(email);
                passRequirements.email = true;
            } catch (e) {
                console.error(e.message);
            }
                
        }
};

export const detailsCheck = (details) => {
    if(!details.firstName) delete details.firstName;
    if(!details.lastName) delete details.lastName;
};

export const updates = async(db, user, userData, details, photo, email, password) => {
    
    if(passRequirements.firstName) {
        const firstNamePath = `users/${userData.handle}/firstName`;
        await update(ref(db), { [firstNamePath]: details.firstName });
    }
    
    if(passRequirements.lastName) {
        const lastNamePath = `users/${userData.handle}/lastName`;
        await update(ref(db), { [lastNamePath]: details.lastName });
    }

    if(passRequirements.photo) {
        const photoURLPath = `users/${userData.handle}/photoURL`;
        await update(ref(db), { [photoURLPath] : photo.name});
        await updateStorage(photo, user, userData.handle);
    }

    if(passRequirements.email) {
        try {
            const emailPath = `users/${userData.handle}/email`;
            await update(ref(db), { [emailPath]: email });
            await updateEmail(user, email);
        } catch (error) {
            console.error(error.message);
        }
    }
    
    if(passRequirements.password) {
        try {
            await updatePassword(user, password);
        } catch (e) {
            console.error(e.message);
        }
    }

    passRequirements = { 
    email: false,
    firstName: false,
    lastName: false,
    photo: false,
    password: false,
    };
};
