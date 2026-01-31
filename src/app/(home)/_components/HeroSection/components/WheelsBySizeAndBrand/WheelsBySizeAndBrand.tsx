"use client";
import { SelectInput } from "@/components/shared/SelectInput/SelectInput";
import { Form } from "@/components/ui/form";
import { useFetchFilters } from "@/hooks/useFetchFilters";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const WheelsBySizeAndBrand = () => {
  const { filters, loading } = useFetchFilters("wheels");
  const router = useRouter();
  console.log("filters", filters)

  const form = useForm({
    defaultValues: {
      bolt_pattern_metric: "",
      width: "",
      diameter: "",
      brand: "",
    },
    resolver: zodResolver(
      z.object({
        bolt_pattern_metric: z.string().min(1, "Required"),
        width: z.string().min(1, "Required"),
        diameter: z.string().min(1, "Required"),
        brand: z.string().min(1, "Required"),
      }),
    ),
  });
  return (
    <>
      <div className="w-full p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((d) => {
              let query = "";
              Object.entries(d).forEach(([key, value]) => {
                if (value) {
                  query += `${key}=${value}&`;
                }
              });
              router.push(`/collections/product-category/wheels?${query}`);
            })}
          >
            <div className="mt-3.5 flex w-full flex-col gap-4 md:flex-row">
              <SelectInput
                className="h-10 bg-white text-lg font-normal text-black"
                control={form.control}
                placeholder={loading ? "Loading..." : "Select Diameter"}
                name="diameter"
                options={
                  filters?.diameter?.map((option) => ({
                    id: option.value,
                    name: option.value.toString(),
                  })) || []
                }
              />

              <SelectInput
                control={form.control}
                className="h-10 bg-white text-lg font-normal text-black"
                placeholder="Select Width"
                name="width"
                options={
                  filters?.width?.map((option) => ({
                    id: option.value,
                    name: option.value,
                  })) || []
                }
              />

              <SelectInput
                className="h-10 bg-white text-lg font-normal text-black"
                control={form.control}
                placeholder="Select Bolt Pattern Metric"
                name="bolt_pattern_metric"
                options={
                  filters?.bolt_pattern_metric?.map((option) => ({
                    id: option.value,
                    name: option.value,
                  })) || []
                }
              />

              <SelectInput
                className="h-10 bg-white text-lg font-normal text-black"
                control={form.control}
                name="brand"
                placeholder="Select Brand"
                options={
                  filters?.brand?.map((option) => ({
                    id: option.value,
                    name: option.value,
                  })) || []
                }
              />
            </div>

            <div className="w-full pt-6">
              <button
                className={cn(
                  "w-full cursor-pointer bg-primary py-3 text-lg uppercase text-white hover:bg-primary-hover",
                )}
              >
                submit
              </button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default WheelsBySizeAndBrand;
