"use client";

import React, { useRef, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { BsUpload } from "react-icons/bs";
import { errorMessage } from "@/lib/toast";
import { normalizeImageUrl } from "@/lib/utils";
import { s3BucketUrl } from "@/utils/api";
import { useRemoveFileMutation, useUploadFileMutation } from "@/redux/apis/file";

type SingleImageUploaderProps<T extends Record<string, any>> = {
  title: string;
  field: keyof T;
  values: T;
  setFieldValue: React.Dispatch<React.SetStateAction<T>>;
  handleUpdate?: (args: any) => void;
  payload?: any;
};

/**
 * ✅ Single File Upload Component
 */
export const SingleImageUploader = <T extends Record<string, any>>({
  title,
  field,
  values,
  setFieldValue,
  handleUpdate,
  payload,
}: SingleImageUploaderProps<T>) => {
  console.log("TCL: values", values);
  const [fileUploading, setFileUploading] = useState(false);
  const [fileRemoving, setFileRemoving] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [uploadFile] = useUploadFileMutation();
  const [removeFile] = useRemoveFileMutation();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFile = e.target.files?.[0];
    if (!inputFile) return;

    const maxSize = 10 * 1024 * 1024;
    const ext = inputFile.name.split(".").pop()?.toLowerCase();

    if (!ext || !["png", "jpg", "jpeg", "webp"].includes(ext)) {
      errorMessage("Only .png, .jpg, .webp, or .jpeg files are supported");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    if (inputFile.size > maxSize) {
      errorMessage("File size must be less than 10MB");
      return;
    }

    const formData = new FormData();
    formData.append("files", inputFile);

    setFileUploading(true);
    try {
      const res = await uploadFile(formData).unwrap();
      console.log("TCL: handleFileChange -> res", res);
      const item_image = res?.files?.[0]?.path;

      if (handleUpdate) {
        const newValues = { ...payload?.data, [field]: item_image };
        handleUpdate({
          id: payload?.id,
          loggedInUser: payload?.loggedInUser,
          data: newValues,
        });
      }

      setFieldValue((prev) => ({ ...prev, [field]: item_image }));
    } catch (error) {
      errorMessage("Upload failed");
    } finally {
      setFileUploading(false);
    }
  };

  const handleFileDelete = async (file: string) => {
    setFileRemoving(true);
    try {
      await removeFile({ path: file }).unwrap();

      if (handleUpdate) {
        const newValues = { ...payload?.data, [field]: null };
        handleUpdate({
          id: payload?.id,
          loggedInUser: payload?.loggedInUser,
          data: newValues,
        });
      }

      setFieldValue((prev) => ({ ...prev, [field]: null }));
    } catch (error) {
      errorMessage("Delete failed");
    } finally {
      setFileRemoving(false);
    }
  };

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

/**
 * ✅ Multiple File Upload Component
 */
type MultipleImageUploaderProps<T extends Record<string, any>> = {
  title: string;
  field: keyof T;
  values: T;
  setFieldValue: React.Dispatch<React.SetStateAction<T>>;
  className?: string;
};

export const MultipleImageUploader = <T extends Record<string, any>>({
  title,
  field,
  values,
  setFieldValue,
  className,
}: MultipleImageUploaderProps<T>) => {
  const [fileUploading, setFileUploading] = useState(false);
  const [fileRemovingMap, setFileRemovingMap] = useState<
    Record<string, boolean>
  >({});

  const [uploadFile] = useUploadFileMutation();
  const [removeFile] = useRemoveFileMutation();

  const handleMultipleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputFiles = e.target.files;
    if (!inputFiles?.length) return;

    const maxSize = 10 * 1024 * 1024;
    const formData = new FormData();

    for (const file of Array.from(inputFiles)) {
      const ext = file.name.split(".").pop()?.toLowerCase();
      if (!ext || !["png", "jpg", "jpeg", "webp"].includes(ext)) {
        errorMessage("Only .png, .jpg, .jpeg, .webp files are supported");
        return;
      }
      if (file.size > maxSize) {
        errorMessage("File size must be less than 10MB");
        return;
      }
      formData.append("files", file);
    }

    setFileUploading(true);
    try {
      const res = await uploadFile(formData).unwrap();
      const newImages = res?.files?.map((f: any) => f.path) || [];
      console.log("TCL: newImages", newImages);

      setFieldValue((prev) => {
        const currentImages = (prev[field] as string[]) || [];
        return { ...prev, [field]: [...currentImages, ...newImages] };
      });
    } catch (error) {
      errorMessage("Upload failed");
    } finally {
      setFileUploading(false);
    }
  };

  const handleGalleryFileDelete = async (fileToDelete: string) => {
    setFileRemovingMap((prev) => ({ ...prev, [fileToDelete]: true }));
    try {
      await removeFile({ path: fileToDelete }).unwrap();

      setFieldValue((prev) => {
        const currentImages = (prev[field] as string[]) || [];
        const updatedFiles = currentImages.filter(
          (f: string) => f !== fileToDelete
        );
        return { ...prev, [field]: updatedFiles };
      });
    } catch (error) {
      errorMessage("Delete failed");
    } finally {
      setFileRemovingMap((prev) => ({ ...prev, [fileToDelete]: false }));
    }
  };

  const currentImages = (values[field] as string[]) || [];

  return (
    <div className="my-4">
      <label className="text-sm font-medium">{title}</label>
      <div className="flex flex-wrap gap-2 mt-2">
        {currentImages.map((file: string, index: number) => (
          <div key={index} className="relative w-24 h-24">
            <img
              src={normalizeImageUrl(file)}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-md"
            />
            <button
              type="button"
              className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full"
              onClick={() => handleGalleryFileDelete(file)}
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
