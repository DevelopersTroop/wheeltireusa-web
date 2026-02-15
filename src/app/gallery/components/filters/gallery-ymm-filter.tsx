import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";

const GalleryYMMFilters = () => {
  const [years, setYears] = useState<string[]>(["2020", "2021", "2022"]);
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [loadingMakes, setLoadingMakes] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);

  const form = useForm({
    defaultValues: {
      year: "",
      make: "",
      model: "",
    },
  });

  const onYearChange = (value: string) => {
    form.setValue("year", value);
    form.setValue("make", "");
    form.setValue("model", "");
    setLoadingMakes(true);
    setTimeout(() => {
      setMakes(["Toyota", "Honda", "Ford"]);
      setLoadingMakes(false);
    }, 1000);
  };

  const onMakeChange = (value: string) => {
    setLoadingModels(true);
    console.log("onMakeChange", value);
    form.setValue("make", value);
    form.setValue("model", "");
    setTimeout(() => {
      setModels(["Corolla", "Camry", "Accord"]);
      setLoadingModels(false);
    }, 1000);
  };

  const onSubmit = (values: any) => {
    console.log(values);
    setYears(values.year);
    setMakes(values.make);
    setModels(values.model);
  };

  return (
    <div className={"filter-shadow bg-gray-200"}>
      <div
        className={
          "flex justify-between items-center font-medium text-gray-900 hover:text-gray-600 transition-colors pr-5 pb-3 "
        }
      >
        <div className="uppercase bg-primary text-white pl-3 pr-7 py-1">
          <p className="text-xs">Search by</p>
          <h2 className="text-base">Vehicle</h2>
        </div>
        <p className="text-xs text-primary cursor-pointer">
          New Vehicle Search
        </p>
      </div>
      <div className="px-8 py-2 text-center">
        <h2 className="font-medium text-gray-800 text-base">Fitment Gallery</h2>
      </div>

      <div className="px-10 pb-10 pt-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0.5">
            <FormField
              control={form.control}
              name="year"
              rules={{ required: "Please select a year" }}
              render={({ field }) => (
                <FormItem className="bg-white">
                  <Select onValueChange={onYearChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {years?.map((year) => (
                        <SelectItem key={`year-${year}`} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="make"
              rules={{ required: "Please select a make" }}
              render={({ field }) => (
                <FormItem className="bg-white">
                  <Select
                    onValueChange={onMakeChange}
                    value={field.value}
                    disabled={!form.getValues("year") || loadingMakes}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            loadingMakes ? "Loading..." : "Select Make"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {makes.map((make) => (
                        <SelectItem key={`make-${make}`} value={make}>
                          {make}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="model"
              rules={{ required: "Please select a model" }}
              render={({ field }) => (
                <FormItem className="bg-white">
                  <Select
                    onValueChange={(value) => form.setValue("model", value)}
                    value={field.value}
                    disabled={!form.getValues("make") || loadingModels}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            loadingModels ? "Loading..." : "Select Model"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {models.map((model) => (
                        <SelectItem key={`model-${model}`} value={model}>
                          {model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center pt-3">
              <button
                type="submit"
                className="rounded-none px-16 py-1 mx-auto bg-primary text-white uppercase"
              >
                Search
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default GalleryYMMFilters;
