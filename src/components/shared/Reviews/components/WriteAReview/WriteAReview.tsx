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
import { File, X } from "lucide-react";
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

  return (
    <div className="my-4">
      <h2 className="text-2xl font-semibold mb-4 pb-1 border-b">
        Write a review
      </h2>
      <Form {...form}>
        <form
          className="flex flex-col gap-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
          // We must use this encoding type for file uploads
          encType="multipart/form-data"
        >
          {/* --- Rating --- */}
          <FormField
            control={form.control}
            name="rating"
            render={() => (
              <FormItem>
                <StarRatingInput
                  selectedStars={selectedStars}
                  onSelect={handleStarClick}
                />
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
                <FormLabel>Your Comment</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us what you thought..."
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* --- File Upload --- */}
          <div>
            <Label>Upload Photos & Videos (Optional)</Label>
            <div>
              <Input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="cursor-pointer"
                disabled={mediaFiles.length >= MAX_FILES}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {`You can upload up to ${MAX_FILES} files. Max total size: ${MAX_TOTAL_SIZE_MB}MB.`}
            </p>
            {fileError && (
              <p className="text-sm font-medium text-red-500">{fileError}</p>
            )}
          </div>

          {/* --- File Preview --- */}
          {mediaFiles.length > 0 && (
            <div className="space-y-2 rounded-md border p-3">
              <h4 className="text-sm font-medium">
                Selected Files ({mediaFiles.length}/{MAX_FILES})
              </h4>
              <p className="text-sm text-muted-foreground">
                Total size: {(totalFileSize / (1024 * 1024)).toFixed(2)}MB /{" "}
                {MAX_TOTAL_SIZE_MB}MB
              </p>
              <ul className="space-y-2">
                {mediaFiles.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between rounded-md bg-gray-300 p-2"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <File className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate text-sm">{file.name}</span>
                      <span className="ml-2 flex-shrink-0 text-xs text-muted-foreground">
                        ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 flex-shrink-0"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* --- Name & Email (for logged-out users) --- */}
          {!user && (
            <>
              <TextInput
                className="h-10"
                label="Name"
                control={form.control}
                placeholder="Enter your name"
                name="name"
              />
              <TextInput
                className="h-10"
                label="Email"
                placeholder="Enter your email"
                control={form.control}
                name="email"
              />
            </>
          )}

          {/* --- Submit Button --- */}
          <Button
            type="submit"
            className="rounded-xl px-3 min-[1300px]:px-6 flex gap-2 justify-center items-center flex-1 relative w-[150px] min-h-12 bg-[#db1922] hover:bg-red-700 hover:text-white disabled:bg-red-500 disabled:cursor-not-allowed transition duration-300 ease-in-out"
            disabled={isLoading || !!fileError}
          >
            {isLoading ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
