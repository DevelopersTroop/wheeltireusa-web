import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, FileText, X, Send, Upload } from "lucide-react";
import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { StarRatingInput } from "../StarRatingInput/StarRatingInput";
import { Textarea } from "@/components/ui/textarea";
import { triggerEvent } from "@/utils/analytics";
import { TextInput } from "@/components/ui/textinput";
import { useCreateReviewMutation } from "@/redux/apis/reviews";

// Mock reviewSchema and types

const reviewSchema = z.object({
  comment: z.string().min(3, "Please enter your comment"),
  rating: z.number().min(1, "Please select a valid rating").max(5),
  productId: z.string(),
  name: z.string().min(1, "Please select a valid user name"),
  email: z.string().min(1, "Please select a valid email"),
});

type TReviewFormValues = z.infer<typeof reviewSchema>;

// Define the max number of files and total size
const MAX_FILES = 10;
const MAX_TOTAL_SIZE_MB = 50;
const MAX_TOTAL_SIZE_BYTES = MAX_TOTAL_SIZE_MB * 1024 * 1024;

export const WriteAReview: React.FC<{ productId: string | undefined }> = ({
  productId,
}) => {
  const [selectedStars, setSelectedStars] = useState(0);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const { user } = useAuth();
  const [createReview, { isLoading }] = useCreateReviewMutation();

  const handleStarClick = useCallback((star: number) => {
    setSelectedStars(star);
  }, []);

  const defaultValues = useMemo(
    () => ({
      productId: productId || "",
      rating: 0,
      comment: "",
      name: user ? `${user?.firstName} ${user?.lastName}` : "",
      email: user?.email || "",
    }),
    [productId, user]
  );

  const form = useForm<TReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues,
    values: defaultValues,
  });

  useEffect(() => {
    // Reset form when user logs in/out or productId changes
    form.reset(defaultValues);
  }, [defaultValues, form]);

  useEffect(() => {
    form.setValue("rating", selectedStars);
  }, [selectedStars, form]);

  // Calculate total size of current files
  const totalFileSize = useMemo(
    () => mediaFiles.reduce((acc, file) => acc + file.size, 0),
    [mediaFiles]
  );

  // --- File Handling Logic ---

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileError(null); // Clear previous errors
    const files = e.target.files ? Array.from(e.target.files) : [];

    if (!files.length) return;

    const newFiles = [...mediaFiles, ...files];

    // Check file count
    if (newFiles.length > MAX_FILES) {
      setFileError(`You can only upload a maximum of ${MAX_FILES} files.`);
      return;
    }

    // Check total size
    const newTotalSize = newFiles.reduce((acc, file) => acc + file.size, 0);
    if (newTotalSize > MAX_TOTAL_SIZE_BYTES) {
      setFileError(
        `Total file size cannot exceed ${MAX_TOTAL_SIZE_MB}MB. Current size: ${(
          newTotalSize /
          (1024 * 1024)
        ).toFixed(2)}MB`
      );
      return;
    }

    setMediaFiles(newFiles);
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setFileError(null);
    setMediaFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // --- Form Submission ---

  const onSubmit = (data: TReviewFormValues) => {
    // Create FormData
    const formData = new FormData();

    // Append all form fields
    formData.append("productId", data.productId);
    formData.append("rating", data.rating.toString());
    formData.append("comment", data.comment);

    // Only append name/email if user is not logged in (and fields exist)
    if (!user) {
      formData.append("name", data.name || "");
      formData.append("email", data.email || "");
    }

    // Append all media files with the *same key* 'media'
    mediaFiles.forEach((file) => {
      formData.append("media", file);
    });

    createReview(formData)
      .unwrap()
      .then(() => {
        triggerEvent("review_submitted", {
          url: window.location.href,
          userName: data.name,
          email: data.email,
          mediaCount: mediaFiles.length,
          rating: data.rating,
          comment: data.comment,
        });
      });
  };

  const sizeProgressPercent = Math.min(
    (totalFileSize / MAX_TOTAL_SIZE_BYTES) * 100,
    100
  );

  return (
    <div className="my-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight uppercase">
          Write a Review
        </h2>
        <div className="mt-2 h-[3px] w-12 bg-[#dc5454] rounded-full" />
        <p className="mt-2 text-sm text-gray-500">
          Share your experience with this product to help other customers.
        </p>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col gap-y-5"
          onSubmit={form.handleSubmit(onSubmit)}
          // We must use this encoding type for file uploads
          encType="multipart/form-data"
        >
          {/* --- Rating Section --- */}
          <FormField
            control={form.control}
            name="rating"
            render={() => (
              <FormItem>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                  <FormLabel className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 block">
                    Your Rating
                  </FormLabel>
                  <StarRatingInput
                    selectedStars={selectedStars}
                    onSelect={handleStarClick}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* --- Comment --- */}
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Your Comment
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us what you thought about this product..."
                    rows={4}
                    className="resize-none bg-gray-50 border-gray-200 focus:border-[#dc5454] focus:ring-[#dc5454]/20 transition-colors rounded-lg text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* --- File Upload --- */}
          <div>
            <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2 block">
              Upload Photos & Videos{" "}
              <span className="text-gray-400 font-normal normal-case">(Optional)</span>
            </Label>

            {/* Drop zone style file input */}
            <label
              className={`group relative flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg p-6 cursor-pointer transition-all duration-200
                ${mediaFiles.length >= MAX_FILES
                  ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
                  : "border-gray-300 bg-gray-50/50 hover:border-[#dc5454]/50 hover:bg-red-50/30"
                }`}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 group-hover:bg-red-50 transition-colors">
                <ImagePlus className="w-5 h-5 text-gray-400 group-hover:text-[#dc5454] transition-colors" />
              </div>
              <div className="text-center">
                <span className="text-sm font-medium text-gray-600">
                  Click to upload
                </span>
                <p className="text-xs text-gray-400 mt-0.5">
                  Up to {MAX_FILES} files · Max {MAX_TOTAL_SIZE_MB}MB total
                </p>
              </div>
              <Input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={mediaFiles.length >= MAX_FILES}
              />
            </label>

            {fileError && (
              <div className="mt-2 flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
                <X className="w-4 h-4 shrink-0" />
                <span>{fileError}</span>
              </div>
            )}
          </div>

          {/* --- File Preview --- */}
          {mediaFiles.length > 0 && (
            <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
              {/* File list header */}
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-semibold text-gray-700">
                    {mediaFiles.length}/{MAX_FILES} files selected
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  {(totalFileSize / (1024 * 1024)).toFixed(2)}MB / {MAX_TOTAL_SIZE_MB}MB
                </span>
              </div>

              {/* Size progress bar */}
              <div className="h-1 bg-gray-100">
                <div
                  className="h-full transition-all duration-300 rounded-r-full"
                  style={{
                    width: `${sizeProgressPercent}%`,
                    backgroundColor:
                      sizeProgressPercent > 80 ? "#ef4444" : sizeProgressPercent > 50 ? "#f59e0b" : "#22c55e",
                  }}
                />
              </div>

              {/* File list */}
              <ul className="divide-y divide-gray-100">
                {mediaFiles.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50/50 transition-colors group/item"
                  >
                    <div className="flex items-center gap-3 overflow-hidden min-w-0">
                      <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-100 shrink-0">
                        <FileText className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm text-gray-700 font-medium">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 shrink-0 opacity-50 group-hover/item:opacity-100 hover:bg-red-50 hover:text-red-500 transition-all rounded-full"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* --- Name & Email (for logged-out users) --- */}
          {!user && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput
                className="h-11 bg-gray-50 border-gray-200 focus:border-[#dc5454] focus:ring-[#dc5454]/20 rounded-lg text-sm"
                label="Name"
                control={form.control}
                placeholder="Enter your name"
                name="name"
              />
              <TextInput
                className="h-11 bg-gray-50 border-gray-200 focus:border-[#dc5454] focus:ring-[#dc5454]/20 rounded-lg text-sm"
                label="Email"
                placeholder="Enter your email"
                control={form.control}
                name="email"
              />
            </div>
          )}

          {/* --- Submit Button --- */}
          <div className="pt-1">
            <Button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2 bg-primary hover:bg-[#c04444] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm hover:shadow-md transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
              disabled={isLoading || !!fileError}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Review
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
