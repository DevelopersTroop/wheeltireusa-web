'use client';

import React, { useRef } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { BsUpload } from 'react-icons/bs';
import { useSingleImageUpload } from './hooks/useSingleImageUpload';
import { s3BucketUrl } from '@/utils/api';

export interface SingleImageUploaderProps<T extends Record<string, any>> {
  title: string;
  field: keyof T;
  values: T;
  setFieldValue: React.Dispatch<React.SetStateAction<T>>;
  handleUpdate?: (args: any) => void;
  payload?: any;
}

/**
 * ✅ Single File Upload Component
 * Renders image preview with delete button, or upload dropzone
 * File logic extracted to useSingleImageUpload hook
 */
export const SingleImageUploader = <T extends Record<string, any>>({
  title,
  field,
  values,
  setFieldValue,
  handleUpdate,
  payload,
}: SingleImageUploaderProps<T>) => {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const {
    fileUploading,
    fileRemoving,
    handleFileChange,
    handleFileDelete,
  } = useSingleImageUpload({
    field,
    values,
    setFieldValue,
    handleUpdate,
    payload,
  });

  return (
    <div className="col-span-1 sm:col-span-2 my-4">
      <label className="text-sm font-medium">{title}</label>
      {values?.[field] ? (
        <div className="mt-2 relative w-32 h-32">
          <img
            src={s3BucketUrl + values[field]}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-md"
          />
          <button
            type="button"
            className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full"
            onClick={() => handleFileDelete(values[field] as string)}
            aria-label="Remove image"
          >
            {fileRemoving ? (
              <BiLoaderAlt size={20} className="animate-spin text-white" />
            ) : (
              <MdDelete size={20} />
            )}
          </button>
        </div>
      ) : fileUploading ? (
        <BiLoaderAlt className="animate-spin m-auto h-32 text-4xl text-primary" />
      ) : (
        <label className="relative border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 w-full mt-2">
          <BsUpload
            size={40}
            strokeWidth={1.5}
            className="text-gray-500 mb-2"
          />
          <p className="text-sm text-center text-gray-500">
            Click or drag an image to upload
          </p>
          <input
            ref={fileRef}
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
};
