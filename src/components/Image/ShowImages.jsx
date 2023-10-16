import { Carousel } from "react-bootstrap";
import PropTypes from "prop-types";
import { Image } from "@chakra-ui/react";
import 'bootstrap/dist/css/bootstrap.min.css';



const ShowImages = ({ imageUrls }) => {

  return (
    <div style={{ marginTop: '10px', display: 'flex', justifyContent:'center'}}>
      <div style={{ flex: 1 }}>
        <Carousel
          fade
          keyboard
          style={{ maxWidth: "1100px"}}
        >
          {imageUrls.map((url) => (
            <Carousel.Item key={url} style={{ alignItems: "center" }}>
              <Image
                className="d-block w-100"
                src={url}
                style={{ maxHeight: "500px", objectFit: "cover" }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ShowImages;

ShowImages.propTypes = {
  imageUrls: PropTypes.array,
};
