// PhotoUploader.jsx
import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const PhotoUploader = ({ photoUrl, setPhotoUrl, stagedPhotos, setStagedPhotos }) => {
  const dispatch = useDispatch();

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const tempUrl = URL.createObjectURL(file);
    setStagedPhotos((prev) => [...prev, { url: tempUrl, loading: true }]);

    const formData = new FormData();
    formData.append("images", file);

    try {
      const res = await axios.post(`${BASE_URL}/profile/upload-photos`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      const updatedUser = res.data.data;
      setPhotoUrl(Array.isArray(updatedUser.photoUrl) ? updatedUser.photoUrl : []);
      dispatch(addUser(updatedUser));
      setStagedPhotos((prev) => prev.filter((p) => p.url !== tempUrl));
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      setStagedPhotos((prev) => prev.filter((p) => p.url !== tempUrl));
      alert("Upload failed. Check console.");
    }
  };

  const removePhoto = async (url, staged = false) => {
    const confirmRemove = window.confirm("Are you sure you want to delete this photo?");
    if (!confirmRemove) return;

    if (staged) {
      setStagedPhotos(stagedPhotos.filter((p) => p.url !== url));
      return;
    }

    try {
      const res = await axios.delete(`${BASE_URL}/profile/remove-photo`, {
        data: { url },
        withCredentials: true,
      });
      const updatedUser = res.data.data;
      setPhotoUrl(Array.isArray(updatedUser.photoUrl) ? updatedUser.photoUrl : []);
      dispatch(addUser(updatedUser));
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("Delete failed. Check console.");
    }
  };

  return (
    <div className="grid grid-cols-3 gap-3 mt-4">
      {Array.isArray(photoUrl) && photoUrl.map((url, idx) => (
        <div key={idx} className="relative w-full h-32">
          <img src={url} alt={`photo-${idx}`} className="w-full h-full object-cover rounded-lg" onError={(e) => (e.target.src = "/placeholder.jpg")} />
          <button type="button" onClick={() => removePhoto(url)} className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full">✕</button>
        </div>
      ))}

      {stagedPhotos.map((p, idx) => (
        <div key={`staged-${idx}`} className="relative w-full h-32">
          {p.loading ? (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-lg">
              <div className="loader"></div>
            </div>
          ) : (
            <img src={p.url} alt={`staged-${idx}`} className="w-full h-full object-cover rounded-lg" />
          )}
          {!p.loading && (
            <button type="button" onClick={() => removePhoto(p.url, true)} className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full">✕</button>
          )}
        </div>
      ))}

      {(photoUrl.length + stagedPhotos.length) < 6 && (
        <label className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600">
          <span className="text-gray-500 dark:text-gray-300">+ Add</span>
          <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
        </label>
      )}
    </div>
  );
};

export default PhotoUploader;
