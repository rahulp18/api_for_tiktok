import Cloudinary from "./cloudinary.js";

export const upload = async (folder, video) => {
  const result = await Cloudinary.uploader.upload(video, {
    folder: folder,
    crop: "scale",
  });
  return result;
};

export const destroyVideo = async (video) => {
  Cloudinary.uploader.destroy(video, function (error, result) {
    console.log(result, error);
  });
};
