import React, { useEffect, useState } from "react";
import { getPlacePhotoByText } from "@/service/GlobalApi";

export default function PlaceImage({
  text,
  alt = "",
  className = "rounded-xl w-full h-44 object-cover",
}) {
  const [src, setSrc] = useState(null);
  useEffect(() => {
    let mounted = true;
    if (!text) return;
    (async () => {
      try {
        const photo = await getPlacePhotoByText(text);
        if (!mounted) return;
        if (photo) setSrc(photo);
      } catch (e) {
        // ignore — getPlacePhotoByText already logs
      }
    })();
    return () => {
      mounted = false;
    };
  }, [text]);

  const placeholder =
    "https://t4.ftcdn.net/jpg/00/65/48/25/360_F_65482539_C0ZozE5gUjCafz7Xq98WB4dW6LAhqKfs.jpg";

  return (
    <img
      src={src || placeholder}
      alt={alt}
      className={className}
      onError={(e) => {
        e.currentTarget.src = placeholder;
      }}
    />
  );
}
