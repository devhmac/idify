import { ComponentRef, useContext, useRef, useState } from "react";
import {
  disableCamera,
  enableCamera,
  getBlob,
  takePhoto,
} from "../utils/camera";
import { LicenceContext } from "../context/IdContext";
import { ArrowPathIcon, BoltIcon } from "@heroicons/react/16/solid";

export const Idify = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef<ComponentRef<"canvas">>(null);

  const { setLicenceData } = useContext(LicenceContext);

  const [isScreenshot, setIsScreenshot] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  return (
    <div className="">
      <dialog
        className={dialogOpen
          ? "fixed inset-0 size-full flex justify-center items-center bg-white/30 backdrop-blur-lg z-50"
          : "hidden"}
        open={dialogOpen}
      >
        <div
          className="flex flex-col justify-center items-center"
          aria-hidden="true"
        >
          <div className="h-[480px] w-[640px] px-2 overflow-hidden">
            {/* screenshot not yet taken show capture button */}
            {isScreenshot === false && dialogOpen && (
              <video
                className="rounded-lg size-full"
                ref={videoRef}
                autoPlay
              >
              </video>
            )}
            {isSubmitting
              ? (
                <div className=" flex size-full items-center justify-center">
                  <p>Submission Loading...</p>
                </div>
              )
              : (
                <canvas
                  width="1080"
                  height="1080"
                  className={"block size-full"}
                  style={{ display: !isScreenshot ? "none" : "" }}
                  ref={canvasRef}
                >
                </canvas>
              )}
          </div>

          <div className="flex flex-row space-between">
            {!isScreenshot && (
              <button
                onClick={() => {
                  setDialogOpen(false);
                  disableCamera(videoRef);
                }}
                type="button"
              >
                Close
              </button>
            )}
            {!isScreenshot && (
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4"
                onClick={(e) => {
                  e.preventDefault();
                  setIsScreenshot(true);
                  takePhoto(videoRef, canvasRef);
                  disableCamera(videoRef);
                }}
              >
                capture
              </button>
            )}

            {isScreenshot && (
              <button
                onClick={() => {
                  setIsScreenshot(false);
                  enableCamera(videoRef);
                  const canvas = canvasRef.current;
                  canvas?.getContext("2d")?.clearRect(
                    0,
                    0,
                    canvas.width,
                    canvas.height,
                  );
                }}
                type="button"
              >
                Take another
              </button>
            )}
            {/* screenshot true enable submit button */}
            {isScreenshot && (
              <button
                className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded m-4"
                onClick={(e) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  setIsScreenshot(false);
                  setDialogOpen(false);
                  getBlob(canvasRef).then((blob) => {
                    // console.log(blob);
                    if (!blob) return;
                    const form = new FormData();
                    form.append("file", blob);

                    fetch(
                      "https://idify-63022b8d6788.herokuapp.com/upload-image/",
                      {
                        method: "POST",

                        body: form,
                      },
                    )
                      .then((response) => response.json())
                      .then((data) => {
                        setIsSubmitting(false);
                        setSuccess(true);
                        setLicenceData(data.data);
                      })
                      .catch((err) => {
                        console.log(err);
                        setIsSubmitting(false);
                        setError(true);
                      });
                  });
                }}
              >
                {isSubmitting ? "..." : "submit"}
              </button>
            )}
          </div>
        </div>
      </dialog>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
        onClick={(e) => {
          e.preventDefault();
          enableCamera(videoRef);
          setDialogOpen(true);
        }}
      >
        {isSubmitting
          ? (
            <>
              <ArrowPathIcon className="size-6 animate-spin" />
            </>
          )
          : (
            <>
              <BoltIcon className="inline size-6" /> ID-ify
            </>
          )}
      </button>
      {error && !success && (
        <p className="text-red-500">There was an error uploading your image</p>
      )}
      {success && <p className="text-green-600">Information Recieved</p>}
      {isSubmitting && <p className="">Getting your information...</p>}
    </div>
  );
};
