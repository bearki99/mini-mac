import React, { ReactNode, useState, useRef } from "react";
import { memo } from "react";
import Webcam from "react-webcam";
import { saveAs } from "file-saver";
interface IProps {
  children?: ReactNode;
}

const Camera: React.FC<IProps> = () => {
  const [click, setClick] = useState(false);
  const [img, setImg] = useState("");
  const camRef = useRef<Webcam>(null);
  const capture = () => {
    if (!camRef.current) return;
    const camSrc = camRef.current.getScreenshot() as string;
    setImg(camSrc);
    const blob = base64ToBlob(camSrc);
    saveAs(blob, "photo.jpg");
  };
  function base64ToBlob(base64: string) {
    const parts = base64.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) uInt8Array[i] = raw.charCodeAt(i);

    return new Blob([uInt8Array], { type: contentType });
  }
  return (
    <div className="relative flex-col h-full space-y-6 bg-gray-800 flex-center">
      <Webcam
        className="border-8 border-white max-h-60 md:max-h-96 mt-10"
        ref={camRef}
        screenshotFormat="image/jpeg"
        audio={false}
      />
      <button
        className="w-16 h-16 mx-auto text-red-900 bg-purple-300 border rounded-full no-outline border-black/50"
        onClick={() => {
          setClick(true);
          capture();
        }}
      >
        Save
      </button>
    </div>
  );
};
export default memo(Camera);
Camera.displayName = "Camera";
