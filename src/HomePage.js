import { useState } from "react";
import ImageUploading from "react-images-uploading";
import axios from "axios";
import "./HomePage.css";

const HomePage = () => {
  const [images, setImages] = useState([]);
  const [pneumoniaState, setPneumoniaState] = useState(null);
  const [uncertanityState, setUncertanityState] = useState(null);
  const [predictedImage, setPredictedImage] = useState(null);

  const maxNumber = 69;
  const [file, setFile] = useState(null);

  const onFileChange = (file) => {
    setFile(file);
  };

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const removeAll = () => {
    setFile(null);
    setPneumoniaState(null);
    setPredictedImage(null);
    setUncertanityState(null);
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:5000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      })
      .then((response) => {
        console.log("Success:", response.headers);
        setPneumoniaState(response.headers["x-result"]);
        setUncertanityState(response.headers["x-uncertainty"]);
        console.log("Response Type:", response.data.type); // Log the MIME type of the blob
        console.log("Response is Blob:", response.data instanceof Blob);
        const url = URL.createObjectURL(response.data);
        setPredictedImage(url);

        // Handle response here
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div className="title">Pneumonia Detection Model</div>
      <div className="upload-section">
        <ImageUploading
          multiple
          value={images}
          onChange={(imageList, addUpdateIndex) => {
            console.log(imageList, addUpdateIndex);
            setImages(imageList);
            // Assuming you only need the first image
            if (imageList.length > 0) {
              onFileChange(imageList[0].file); // Adjusted to pass the file directly
            }
          }}
          maxNumber={maxNumber}
          dataURLKey="data_url"
          acceptType={["jpeg"]}
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <>
              <div className="upload-image-wrapper">
                <button
                  className="modern-button"
                  style={isDragging ? { color: "red" } : null}
                  onClick={() => {
                    onImageUpload();
                    onFileChange();
                  }}
                  {...dragProps}
                >
                  Upload Image Here
                </button>

                {/* <button className="modern-button" onClick={onImageRemoveAll}>
                  Remove all images
                </button> */}
              </div>
              <div className="image-list-container">
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image.data_url} alt="" width="100" />
                    <div className="image-item-btn-wrapper">
                      <button
                        className="modern-button"
                        onClick={() => {
                          onFileUpload();
                        }}
                      >
                        Check
                      </button>
                      <button
                        className="modern-button"
                        onClick={() => {
                          onImageRemove(index);
                          removeAll();
                        }}
                      >
                        Remove
                      </button>
                    </div>
                    <div>
                      {pneumoniaState ? (
                        <div className="status-container pneumonia-status">
                          Pneumonia Status: {pneumoniaState}
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                    <div>
                      {uncertanityState ? (
                        <div className="status-container uncertainty-status">
                          Uncertainity : {uncertanityState}
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                    <div>
                      {predictedImage && (
                        <div className="image-container">
                          <img
                            src={predictedImage}
                            alt="Predicted Output"
                            className="styled-image"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </ImageUploading>
      </div>
    </div>
  );
};

export default HomePage;
