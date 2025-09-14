import React from "react";

const PreviewModal = ({ isOpen, image, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
        <h2 className="text-lg font-semibold mb-4">Profile Photo Preview</h2>

        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="h-40 w-40 object-cover rounded-full mx-auto border shadow"
          />
        )}

        <div className="mt-4 flex justify-center gap-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
