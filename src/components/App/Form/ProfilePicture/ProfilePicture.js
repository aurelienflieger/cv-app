import "cropperjs/dist/cropper.css";
import Cropper from "react-cropper";
import { useRef, useState } from "react";
import {
  NextSectionButton,
  SaveReviewedSectionButton,
  SkipSectionButton,
} from "../../elements/Buttons";

const ProfilePicture = ({
  currentSectionName,
  displayNextPage,
  updateDataHistoryAndDisplayNextPage,
  updateDataHistoryAndDisableReviewMode,
  reviewMode,
}) => {
  const cropperRef = useRef(null);
  const [isUploadMode, toggleUploadMode] = useState(true);
  const [isCropMode, toggleCropMode] = useState(false);
  const [uncroppedPicture, setUncroppedPicture] = useState("");
  const [croppedPicture, setCroppedPicture] = useState("");
  const genericPicture = require(`../../../../assets/${currentSectionName}/generic-user.png`);

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
    <main className="profile-picture" aria-label="profile-picture">
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
        <div className="profile-picture__modal-background">
          <div className="profile-picture__modal">
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
        {isUploadMode && (
          <SkipSectionButton displayNextPage={displayNextPage} />
        )}

        {!isUploadMode &&
          !isCropMode &&
          (reviewMode ? (
            <>
              <SaveReviewedSectionButton
                updateDataHistoryAndDisableReviewMode={() =>
                  updateDataHistoryAndDisableReviewMode(
                    currentSectionName,
                    croppedPicture
                  )
                }
              />
            </>
          ) : (
            <>
              <button className="retry-button button" onClick={resetProcess}>
                I'd like to try again.
              </button>
              <NextSectionButton
                onClick={() =>
                  updateDataHistoryAndDisplayNextPage(
                    currentSectionName,
                    croppedPicture
                  )
                }
              />
            </>
          ))}
      </div>
    </main>
  );
};

export default ProfilePicture;
