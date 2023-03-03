import { useRef, useState } from "react";
import Cropper from "react-cropper";
import {
  NextSectionButton,
  SaveReviewedSectionButton,
  SkipSectionButton,
} from "../../elements/Buttons";
import "cropperjs/dist/cropper.css";

const Picture = ({ currentSectionName, eventHandlers, reviewMode }) => {
  const cropperRef = useRef(null);
  const [isUploadMode, toggleUploadMode] = useState(true);
  const [isCropMode, toggleCropMode] = useState(false);
  const [uncroppedPicture, setUncroppedPicture] = useState("");
  const [croppedPicture, setCroppedPicture] = useState("");
  const genericPicture = require(`../../../../assets/${currentSectionName}/generic-user.png`);
  const { displayNextPage, handleSubmission } = eventHandlers;

  const resetProcess = () => {
    setCroppedPicture("");
    setUncroppedPicture("");
    toggleUploadMode(true);
  };

  const saveCroppedPicture = () => {
    const cropper = cropperRef.current.cropper;
    setCroppedPicture(cropper.getCroppedCanvas().toDataURL());
  };

  const startPictureCrop = (event) => {
    setUncroppedPicture(URL.createObjectURL(event.target.files[0]));
    toggleUploadMode(false);
    toggleCropMode(true);
  };

  return (
    <main className="section picture" aria-label="profile-picture">
      <div
        className={`picture-area ${
          isUploadMode || isCropMode ? "uncropped" : "cropped"
        }`}
      >
        {!isCropMode && (
          <div
            className={`uploaded-picture__wrapper ${
              isUploadMode || isCropMode ? "uncropped" : "cropped"
            }`}
          >
            <img
              className="uploaded-picture"
              aria-label="uploaded-picture"
              alt="uploaded"
              src={croppedPicture || genericPicture}
            />
          </div>
        )}
        {isUploadMode && (
          <>
            <label
              className="file-uploader-label"
              aria-label="file-uploader-label"
              htmlFor="file-uploader"
            />
            <input
              type="file"
              className="file-uploader"
              aria-label="file-uploader"
              id="file-uploader"
              accept="image/png, image/jpeg"
              onChange={startPictureCrop}
            />
          </>
        )}
      </div>

      {isCropMode && (
        <div className="picture__modal-background">
          <div className="picture__modal">
            <div className="modal__title-area">
              <span className="modal__title">
                Time to adjust your likeness!
              </span>
            </div>
            <div className="crop__frame" aria-label="crop__frame">
              <Cropper
                className="cropper"
                src={uncroppedPicture}
                style={{ height: 300, width: 300 }}
                crop={() => saveCroppedPicture()}
                ref={cropperRef}
                viewMode={3}
              />
            </div>
            <button
              className="confirm-crop button"
              aria-label="confirm-crop"
              onClick={() => toggleCropMode(false)}
            >
              I have finished cropping this picture.
            </button>
          </div>
        </div>
      )}

      <div className="buttons-group" aria-label="buttons-group">
        {isUploadMode && !reviewMode && (
          <SkipSectionButton
            customHandler={() => displayNextPage("Optional")}
          />
        )}

        {!isUploadMode &&
          !isCropMode &&
          (reviewMode ? (
            <>
              <SaveReviewedSectionButton
                customHandler={() =>
                  handleSubmission(
                    { croppedPicture, currentSectionName },
                    { isOptionalSection: true, isReviewMode: reviewMode }
                  )
                }
              />
            </>
          ) : (
            <>
              <button className="retry button" onClick={resetProcess}>
                I'd like to try again.
              </button>
              <NextSectionButton
                customHandler={() =>
                  handleSubmission(
                    { values: croppedPicture, currentSectionName },
                    { isOptionalSection: true, isReviewMode: reviewMode }
                  )
                }
              />
            </>
          ))}
      </div>
    </main>
  );
};

export default Picture;
