
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "./Input";
import { setRequestedDealer } from "@/redux/features/checkoutSlice";
import { apiBaseUrl } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";

const dealerSchema = z.object({
  name: z.string(),
  website: z.string(),
  phone: z.string(),
});

type DealerRequestType = z.infer<typeof dealerSchema>;

export const DealerRequest: React.FC<{
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  setStep?: (step: number) => void;
}> = ({ isDialogOpen, setIsDialogOpen }) => {
  const dispatch = useDispatch();
  const [responseOk, setResponseOk] = useState(false);

  const form = useForm<DealerRequestType>({
    defaultValues: {
      name: "",
      website: "",
      phone: "",
    },
    resolver: zodResolver(dealerSchema),
  });

  const submit = async (data: DealerRequestType) => {
    try {
      // Dispatching Dealer Request Data to Redux Store
      dispatch(
        setRequestedDealer({
          businessName: data.name,
          contact: data.phone,
          website: data.website,
        }),
      );

      const jsonData = JSON.stringify({
        businessName: data.name,
        website: data.website,
        contact: data.phone,
      });
      const response = await fetch(`${apiBaseUrl}/dealer/dealer-request`, {
        body: jsonData,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to submit dealer request. Please try again.");
      }
      setResponseOk(true);
    } catch {
      toast.error("Failed to submit dealer request. Please try again.");
    } finally {
      form.reset();
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open);
        setResponseOk(false);
      }}
    >
      <DialogContent className="max-w-4xl px-[7.75rem] py-[2.5rem]">
        {responseOk ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M58.6673 32.0002C58.6673 44.571 58.6673 50.8563 54.7621 54.7616C50.8568 58.6668 44.5714 58.6668 32.0007 58.6668C19.4299 58.6668 13.1445 58.6668 9.23923 54.7616C5.33398 50.8563 5.33398 44.571 5.33398 32.0002C5.33398 19.4294 5.33398 13.144 9.23923 9.23874C13.1445 5.3335 19.4299 5.3335 32.0007 5.3335C44.5714 5.3335 50.8568 5.3335 54.7621 9.23874C58.6673 13.144 58.6673 19.4294 58.6673 32.0002ZM46.5461 18.4093C47.4247 19.0787 47.5943 20.3336 46.9249 21.2122L28.6391 45.2122C28.275 45.6901 27.7154 45.979 27.1149 45.9991C26.5144 46.0191 25.9368 45.7681 25.5416 45.3155L17.1607 35.7155C16.4343 34.8834 16.5199 33.62 17.352 32.8935C18.1841 32.1671 19.4475 32.2528 20.174 33.0848L26.9429 40.8384L43.7431 18.7881C44.4125 17.9095 45.6675 17.7399 46.5461 18.4093Z"
                fill="#DB1922"
              />
            </svg>
            <h2 className="text-[2rem] font-bold text-[#210203]">
              We got your request!
            </h2>
            <p className="text-center text-[#210203]">
              An Amani representative will look into this request and be in
              touch shortly. In the meantime you can complete your order.
            </p>
            {/* <Button onClick={setStep ? () => setStep(1) : undefined} className="h-14 bg-primary text-lg">
                            <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.166 0.333496H6.83268C3.68999 0.333496 2.11864 0.333496 1.14233 1.30981C0.439376 2.01276 0.242555 3.02418 0.187446 4.7085H16.8113C16.7561 3.02418 16.5593 2.01276 15.8564 1.30981C14.8801 0.333496 13.3087 0.333496 10.166 0.333496Z" fill="white" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.166 13.6668H6.83268C3.68999 13.6668 2.11864 13.6668 1.14233 12.6905C0.166016 11.7142 0.166016 10.1429 0.166016 7.00016C0.166016 6.63189 0.166016 6.28519 0.167587 5.9585H16.8311C16.8327 6.28519 16.8327 6.63189 16.8327 7.00016C16.8327 10.1429 16.8327 11.7142 15.8564 12.6905C14.8801 13.6668 13.3087 13.6668 10.166 13.6668ZM11.87 7.20849C12.2307 7.20845 12.5613 7.20841 12.8304 7.24458C13.1266 7.28441 13.4397 7.37811 13.6972 7.63563C13.9547 7.89315 14.0484 8.20626 14.0883 8.50249C14.1244 8.7715 14.1244 9.10219 14.1244 9.46288V9.53745C14.1244 9.89813 14.1244 10.2288 14.0883 10.4978C14.0484 10.7941 13.9547 11.1072 13.6972 11.3647C13.4397 11.6222 13.1266 11.7159 12.8304 11.7557C12.5613 11.7919 12.2306 11.7919 11.87 11.7918L11.8327 11.7918L11.7954 11.7918C11.4347 11.7919 11.104 11.7919 10.835 11.7557C10.5388 11.7159 10.2257 11.6222 9.96815 11.3647C9.71063 11.1072 9.61693 10.7941 9.5771 10.4978C9.54093 10.2288 9.54097 9.89813 9.54101 9.53745L9.54102 9.50016L9.54101 9.46288C9.54097 9.10219 9.54093 8.7715 9.5771 8.50249C9.61693 8.20626 9.71063 7.89315 9.96815 7.63563C10.2257 7.37811 10.5388 7.28441 10.835 7.24458C11.104 7.20841 11.4347 7.20845 11.7954 7.20849H11.87ZM2.87435 8.25016C2.87435 7.90498 3.15417 7.62516 3.49935 7.62516H5.16602C5.51119 7.62516 5.79102 7.90498 5.79102 8.25016C5.79102 8.59534 5.51119 8.87516 5.16602 8.87516H3.49935C3.15417 8.87516 2.87435 8.59534 2.87435 8.25016ZM2.87435 10.7502C2.87435 10.405 3.15417 10.1252 3.49935 10.1252H6.83268C7.17786 10.1252 7.45768 10.405 7.45768 10.7502C7.45768 11.0953 7.17786 11.3752 6.83268 11.3752H3.49935C3.15417 11.3752 2.87435 11.0953 2.87435 10.7502Z" fill="white" />
                                <path d="M10.8521 8.51947L10.8541 8.51838C10.8557 8.51754 10.8584 8.51619 10.8627 8.51446C10.8808 8.50699 10.9211 8.49425 11.0016 8.48343C11.1772 8.45982 11.4222 8.4585 11.8327 8.4585C12.2432 8.4585 12.4882 8.45982 12.6638 8.48343C12.7443 8.49425 12.7846 8.50699 12.8027 8.51446C12.8069 8.51619 12.8097 8.51754 12.8113 8.51838L12.8133 8.51953L12.8145 8.52155C12.8153 8.52317 12.8167 8.52593 12.8184 8.53013C12.8259 8.54828 12.8386 8.58858 12.8494 8.66905C12.873 8.84465 12.8743 9.08966 12.8743 9.50016C12.8743 9.91067 12.873 10.1557 12.8494 10.3313C12.8386 10.4117 12.8259 10.452 12.8184 10.4702C12.8167 10.4744 12.8153 10.4772 12.8145 10.4788L12.8133 10.4808L12.8113 10.4819C12.8097 10.4828 12.8069 10.4841 12.8027 10.4859C12.7846 10.4933 12.7443 10.5061 12.6638 10.5169C12.4882 10.5405 12.2432 10.5418 11.8327 10.5418C11.4222 10.5418 11.1772 10.5405 11.0016 10.5169C10.9211 10.5061 10.8808 10.4933 10.8627 10.4859C10.8584 10.4841 10.8557 10.4828 10.8541 10.4819L10.852 10.4808L10.8509 10.4788C10.8501 10.4772 10.8487 10.4744 10.847 10.4702C10.8395 10.452 10.8268 10.4117 10.816 10.3313C10.7923 10.1557 10.791 9.91067 10.791 9.50016C10.791 9.08966 10.7923 8.84465 10.816 8.66905C10.8268 8.58858 10.8395 8.54828 10.847 8.53013C10.8487 8.52593 10.8501 8.52317 10.8509 8.52155L10.8521 8.51947Z" fill="white" />
                            </svg>

                            <span className="font-semibold">
                                Continue to Payment options
                            </span>
                        </Button> */}
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-3xl">
                Request New Dealer
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }: { field: any; fieldState: any }) => (
                    <Input
                      {...field}
                      label="Dealer's First and Last Name"
                      placeholder="John Doe"
                      required
                      error={fieldState.error?.message}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field, fieldState }: { field: any; fieldState: any }) => (
                    <Input
                      {...field}
                      label="Website"
                      required
                      error={fieldState.error?.message}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field, fieldState }: { field: any; fieldState: any }) => (
                    <Input
                      {...field}
                      type="tel"
                      label="Phone number"
                      required
                      error={fieldState.error?.message}
                    />
                  )}
                />
                <div className="px-[5rem]">
                  <Button
                    type="submit"
                    className="h-14 w-full font-bold"
                  // disabled={isLoading}
                  >
                    {false ? "Submitting..." : "Submit Request"}
                  </Button>
                </div>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
