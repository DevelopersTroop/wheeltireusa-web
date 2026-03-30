'use client';

import { useState, useCallback } from 'react';
import { errorMessage } from '@/lib/toast';
import { useRemoveFileMutation, useUploadFileMutation } from '@/redux/apis/file';

export interface UseMultipleImageUploadParams<T extends Record<string, any>> {
  field: keyof T;
  values: T;
  setFieldValue: React.Dispatch<React.SetStateAction<T>>;
}

export interface UseMultipleImageUploadReturn {
  fileUploading: boolean;
  fileRemovingMap: Record<string, boolean>;
  handleMultipleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleGalleryFileDelete: (fileToDelete: string) => Promise<void>;
}

/**
 * Hook for multiple image upload functionality
 * Handles file validation, batch upload via Redux mutation, and individual deletion
 */
export const useMultipleImageUpload = <T extends Record<string, any>>({
  field,
  values,
  setFieldValue,
}: UseMultipleImageUploadParams<T>): UseMultipleImageUploadReturn => {
  const [fileUploading, setFileUploading] = useState(false);
  const [fileRemovingMap, setFileRemovingMap] = useState<Record<string, boolean>>({});

  const [uploadFile] = useUploadFileMutation();
  const [removeFile] = useRemoveFileMutation();

  const handleMultipleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFiles = e.target.files;
    if (!inputFiles?.length) return;

    const maxSize = 10 * 1024 * 1024;
    const formData = new FormData();

    for (const file of Array.from(inputFiles)) {
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (!ext || !['png', 'jpg', 'jpeg', 'webp'].includes(ext)) {
        errorMessage('Only .png, .jpg, .jpeg, .webp files are supported');
        return;
      }
      if (file.size > maxSize) {
        errorMessage('File size must be less than 10MB');
        return;
      }
      formData.append('files', file);
    }

    setFileUploading(true);
    try {
      const res = await uploadFile(formData).unwrap();
      const newImages = res?.files?.map((f: any) => f.path) || [];

      setFieldValue((prev) => {
        const currentImages = (prev[field] as string[]) || [];
        return { ...prev, [field]: [...currentImages, ...newImages] };
      });
    } catch (error) {
      errorMessage('Upload failed');
    } finally {
      setFileUploading(false);
    }
  }, [uploadFile, field, setFieldValue]);

  const handleGalleryFileDelete = useCallback(async (fileToDelete: string) => {
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
      errorMessage('Delete failed');
    } finally {
      setFileRemovingMap((prev) => ({ ...prev, [fileToDelete]: false }));
    }
  }, [removeFile, field, setFieldValue]);

  return {
    fileUploading,
    fileRemovingMap,
    handleMultipleFileChange,
    handleGalleryFileDelete,
  };
};
