export const enableCamera = (video) => {
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        if (!video) return;
        video.current.srcObject = stream;
        // ref to stream
        video.current.stream = stream;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const takePhoto = async (videoRef, canvasRef) => {
  const video = videoRef.current as HTMLVideoElement;
  const canvas = canvasRef.current as HTMLCanvasElement;
  if (video && canvas) {
    const context = canvas.getContext("2d");
    canvas.style.display = "block";
    if (!context) return;
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    return;
  }
};

export const getBlob = async (canvas) => {
  if (!canvas) return;
  canvas = canvas.current;
  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/jpeg")
  );
  return blob as Blob;
};

export const disableCamera = (video) => {
  if (!video || !video.current || !video.current.stream) return;
  const stream = video.current.stream;
  stream.getTracks().forEach((track) => {
    track.stop();
  });
  video.current.srcObject = null; // Clear the video source
};
