'use client';

import { useState, useCallback } from 'react';
import { errorMessage } from '@/lib/toast';
import { useRemoveFileMutation, useUploadFileMutation } from '@/redux/apis/file';

export interface UseSingleImageUploadParams<T extends Record<string, any>> {
  field: keyof T;
  values: T;
  setFieldValue: React.Dispatch<React.SetStateAction<T>>;
  handleUpdate?: (args: any) => void;
  payload?: any;
}

export interface UseSingleImageUploadReturn {
  fileUploading: boolean;
  fileRemoving: boolean;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleFileDelete: (file: string) => Promise<void>;
}

/**
 * Hook for single image upload functionality
 * Handles file validation, upload via Redux mutation, and deletion
 */
export const useSingleImageUpload = <T extends Record<string, any>>({
  field,
  values,
  setFieldValue,
  handleUpdate,
  payload,
}: UseSingleImageUploadParams<T>): UseSingleImageUploadReturn => {
  const [fileUploading, setFileUploading] = useState(false);
  const [fileRemoving, setFileRemoving] = useState(false);

  const [uploadFile] = useUploadFileMutation();
  const [removeFile] = useRemoveFileMutation();

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFile = e.target.files?.[0];
    if (!inputFile) return;

    const maxSize = 10 * 1024 * 1024;
    const ext = inputFile.name.split('.').pop()?.toLowerCase();

    if (!ext || !['png', 'jpg', 'jpeg', 'webp'].includes(ext)) {
      errorMessage('Only .png, .jpg, .webp, or .jpeg files are supported');
      return;
    }
    if (inputFile.size > maxSize) {
      errorMessage('File size must be less than 10MB');
      return;
    }

    const formData = new FormData();
    formData.append('files', inputFile);

    setFileUploading(true);
    try {
      const res = await uploadFile(formData).unwrap();
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
      errorMessage('Upload failed');
    } finally {
      setFileUploading(false);
    }
  }, [uploadFile, field, handleUpdate, payload, setFieldValue]);

  const handleFileDelete = useCallback(async (file: string) => {
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
      errorMessage('Delete failed');
    } finally {
      setFileRemoving(false);
    }
  }, [removeFile, field, handleUpdate, payload, setFieldValue]);

  return {
    fileUploading,
    fileRemoving,
    handleFileChange,
    handleFileDelete,
  };
};
