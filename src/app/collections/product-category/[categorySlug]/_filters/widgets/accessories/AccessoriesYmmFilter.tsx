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

const AccessoriesYMMFilters = () => {
  const [years, setYears] = useState<string[]>(["2020", "2021", "2022"]);
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [trims, setTrims] = useState<string[]>([]);
  const [drives, setDrives] = useState<string[]>([]);
  const [loadingMakes, setLoadingMakes] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);
  const [loadingTrims, setLoadingTrims] = useState(false);
  const [loadingDrives, setLoadingDrives] = useState(false);

  const form = useForm({
    defaultValues: {
      year: "",
      make: "",
      model: "",
      trim: "",
      drive: "",
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

  const onModelChange = (value: string) => {
    setLoadingTrims(true);
    console.log("onModelChange", value);
    form.setValue("model", value);
    form.setValue("trim", "");
    setTimeout(() => {
      setTrims(["LT", "RS"]);
      setLoadingTrims(false);
    }, 1000);
  };

  const onTrimChange = (value: string) => {
    console.log("onTrimChange", value);
    form.setValue("trim", value);
    form.setValue("drive", "");
    setLoadingDrives(true);
    setTimeout(() => {
      setDrives(["RWD"]);
      setLoadingDrives(false);
    }, 1000);
  };

  const onSubmit = (values: any) => {
    console.log(values);
    setYears(values.year);
    setMakes(values.make);
    setModels(values.model);
    setTrims(values.trim);
    setDrives(values.drive);
  };

  return (
    <div className={"filter-shadow bg-gray-200"}>
      <div
        className={
          "flex justify-between items-center font-medium text-gray-900 hover:text-gray-600 transition-colors pr-5 pb-3 "
        }
      >
        <div className="uppercase bg-primary hover:bg-primary-hover text-white pl-3 pr-7 py-1">
          <p className="text-xs">Search by</p>
          <h2 className="text-base">Vehicle</h2>
        </div>
        <p className="text-xs text-primary cursor-pointer">
          New Vehicle Search
        </p>
      </div>
      <div className="px-8 py-2 text-center">
        <h2 className="font-medium text-gray-800 text-base">
          2024 GMC Hummer EV Pickup Accessories
        </h2>
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
                      {years.map((year) => (
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
                    onValueChange={onModelChange}
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

            <FormField
              control={form.control}
              name="trim"
              rules={{ required: "Please select a trim" }}
              render={({ field }) => (
                <FormItem className="bg-white">
                  <Select
                    onValueChange={onTrimChange}
                    value={field.value}
                    disabled={!form.getValues("model") || loadingTrims}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            loadingTrims ? "Loading..." : "Select Trim"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {trims.map((trim) => (
                        <SelectItem key={`trim-${trim}`} value={trim}>
                          {trim}
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
              name="drive"
              rules={{ required: "Please select a drive" }}
              render={({ field }) => (
                <FormItem className="bg-white">
                  <Select
                    onValueChange={(value) => form.setValue("drive", value)}
                    value={field.value}
                    disabled={!form.getValues("trim") || loadingDrives}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            loadingDrives ? "Loading..." : "Select Drive"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {drives.map((drive) => (
                        <SelectItem key={`drive-${drive}`} value={drive}>
                          {drive}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("year") &&
              form.watch("make") &&
              form.watch("model") &&
              form.watch("trim") &&
              form.watch("drive") && (
                <div className="flex justify-center pt-3">
                  <button
                    type="submit"
                    className="rounded-none px-16 py-1 mx-auto bg-primary hover:bg-primary-hover text-white uppercase"
                  >
                    Update
                  </button>
                </div>
              )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AccessoriesYMMFilters;
