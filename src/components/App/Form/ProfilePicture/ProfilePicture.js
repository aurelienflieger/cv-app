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
  const { isUploadMode, toggleUploadMode } = useState(true);
  const { isCropMode, toggleCropMode } = useState(false);
  const { uncroppedPicture, setUncroppedPicture } = useState("");
  const { croppedPicture, setCroppedPicture } = useState("");

  const saveCroppedPicture = () => {
    const cropper = cropperRef.current.cropper;
    setCroppedPicture(cropper.getCroppedCanvas().toDataURL());
    toggleCropMode(false);
  };
  const startPictureCrop = (event) => {
    setUncroppedPicture(event.target.files[0]);
    toggleUploadMode(false);
    toggleCropMode(true);
  };

  return (
    <main className="profile-picture" aria-label="profile-picture">
      <div
        className="profile-picture__frame"
        aria-label="profile-picture__frame"
      >
        {isUploadMode && (
          <label htmlFor="file-uploader">
            <input
              type="file"
              className="file-uploader"
              aria-label="file-uploader"
              accept="image/png, image/jpeg"
              onChange={startPictureCrop}
            />
          </label>
        )}

        {isCropMode && (
          <Cropper
            src={uncroppedPicture}
            style={{ height: 400, width: "100%" }}
            initialAspectRatio={1 / 3}
            crop={saveCroppedPicture}
            ref={cropperRef}
          />
        )}

        {!isUploadMode && !isCropMode && (
          <img
            className="cropped-picture"
            aria-label="cropped-picture"
            alt="Cropped"
            src={croppedPicture}
          />
        )}

        {isUploadMode && (
          <SkipSectionButton displayNextPage={displayNextPage} />
        )}

        {isCropMode && (
          <button
            className="confirm-crop"
            aria-label="confirm-crop"
            onClick={() => toggleCropMode(false)}
          >
            I have finished cropping this picture.
          </button>
        )}

        <div className="buttons-group" aria-label="buttons-group">
          {!isUploadMode &&
            !isCropMode &&
            (reviewMode ? (
              <>
                <SaveReviewedSectionButton
                  updateDataHistoryAndDisableReviewMode={() =>
                    updateDataHistoryAndDisableReviewMode(currentSectionName, croppedPicture)
                  }
                />
              </>
            ) : (
              <>
                <NextSectionButton
                  onClick={() =>
                    updateDataHistoryAndDisplayNextPage(
                      currentSectionName,
                      croppedPicture
                    )
                  }
                />
              </>
            )) && (
              <>
                <button
                  className="retry-button"
                  onClick={() => toggleUploadMode(true)}
                >
                  I'd like to try again.
                </button>
              </>
            )}
        </div>
      </div>
    </main>
  );
};

export default ProfilePicture;
