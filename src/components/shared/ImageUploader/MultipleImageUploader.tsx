'use client';

import React from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { BsUpload } from 'react-icons/bs';
import { useMultipleImageUpload } from './hooks/useMultipleImageUpload';
import { normalizeImageUrl } from '@/lib/utils';

export interface MultipleImageUploaderProps<T extends Record<string, any>> {
  title: string;
  field: keyof T;
  values: T;
  setFieldValue: React.Dispatch<React.SetStateAction<T>>;
  className?: string;
}

/**
 * ✅ Multiple File Upload Component
 * Renders grid of image previews with delete buttons, or upload dropzone
 * File logic extracted to useMultipleImageUpload hook
 */
export const MultipleImageUploader = <T extends Record<string, any>>({
  title,
  field,
  values,
  setFieldValue,
  className,
}: MultipleImageUploaderProps<T>) => {
  const {
    fileUploading,
    fileRemovingMap,
    handleMultipleFileChange,
    handleGalleryFileDelete,
  } = useMultipleImageUpload({
    field,
    values,
    setFieldValue,
  });

  const currentImages = (values[field] as string[]) || [];

  return (
    <div className="my-4">
      <label className="text-sm font-medium">{title}</label>
      <div className="flex flex-wrap gap-2 mt-2">
        {currentImages.map((file: string, index: number) => (
          <div key={index} className="relative w-24 h-24">
            <img
              src={normalizeImageUrl(file)}
              alt={`Preview ${index + 1}`}
              className="w-24 h-24 object-cover rounded-md"
            />
            <button
              type="button"
              className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full"
              onClick={() => handleGalleryFileDelete(file)}
              aria-label={`Remove image ${index + 1}`}
            >
              {fileRemovingMap[file] ? (
                <BiLoaderAlt size={20} className="animate-spin text-white" />
              ) : (
                <MdDelete size={20} />
              )}
            </button>
          </div>
        ))}
      </div>

      {fileUploading ? (
        <BiLoaderAlt className="animate-spin text-4xl text-primary dark:text-white mt-2" />
      ) : (
        <label
          className={`${className} relative border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 mt-2`}
        >
          <BsUpload
            size={50}
            strokeWidth={1.5}
            className="text-gray-500 mb-2"
          />
          <p className="text-sm text-gray-500">
            Click or drag images to upload
          </p>
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            multiple
            onChange={handleMultipleFileChange}
          />
        </label>
      )}
    </div>
  );
};
