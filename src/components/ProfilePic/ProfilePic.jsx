import { useEffect, useState } from "react";
import "./ProfilePic.css";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../config/firebase-config";
import PropTypes from "prop-types";
import { Spinner } from "@chakra-ui/react";

export const ProfilePic = ({ handle, style }) => {

  const [photo, setPhoto] = useState("");

  useEffect(() => {
    try {
      const fetchPhotoURL = async () => {
        const imgStorageName = `profile-pic-${handle}`;
        const storageRef = ref(storage);
        const picsInStorage = (await listAll(storageRef)).items;
        const userImg = picsInStorage.find(
          (pic) => pic.name === imgStorageName
        );
        if (userImg) {
          const currentUserPic = await getDownloadURL(userImg);
          setPhoto(currentUserPic);
        } else {
          setPhoto(
            "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
          );
        }
      };

      fetchPhotoURL();
    } catch (error) {
      throw new Error(`Error occured: ${error.message}`);
    }
  }, [handle]);

  useEffect(() => {
    setPhoto("");
  }, [handle]);

  return photo ? (
    <img src={photo} alt="avatar-of-user" style={style} className="user-pic" />
  ) : (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="green.500"
      size="l"
    />
  );
};

ProfilePic.propTypes = {
  handle: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};
