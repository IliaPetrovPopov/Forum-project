import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { storage } from "../../config/firebase-config";
import "./UploadImage.css";
import PropTypes from "prop-types";
import { Box, Button, HStack, Input } from "@chakra-ui/react";

const UploadImage = ({ post, onImageUrlsChange }) => {
  const [image, setImage] = useState([]);
  const [url, setURL] = useState([]);

  const handleUpload = () => {
    if (image === null) return;
    const imageRef = ref(storage, `posts/${post.id}/images/${image.name}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setURL(url);
        onImageUrlsChange(url);
      });
    });
  };
  return (
    <Box mt={4}>
      <HStack alignItems={'center'}>
        <Input justifyItems={'center'} border='none' colorScheme="purple" type="file" onChange={(e) => setImage(e.target.files[0])} />
        {image.length !== 0 && <Button colorScheme="purple" size={'sm'} onClick={handleUpload}>Upload</Button>}
      </HStack>
      <img className="post-image" key={url} src={url} />
    </Box>
  );
};

export default UploadImage;

UploadImage.propTypes = {
  post: PropTypes.object,
  onImageUrlsChange: PropTypes.func,
};
