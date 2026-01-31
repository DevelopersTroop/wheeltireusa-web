import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Control, FieldPath } from "react-hook-form";

export type FieldValues = Record<string, any>;

type Option<T> = {
  [key in keyof T]: T[key];
};

interface SelectInputProps<T> {
  label?: string;
  valueKey?: keyof T;
  options: Option<T>[];
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export function SelectInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  options,
  valueKey = "id",
  disabled = false,
  placeholder = `Select`,
  className,
}: SelectInputProps<{ id: any; name: any }> & {
  name: TName;
  control?: Control<TFieldValues>;
}) {
  return (
    <FormField
      render={({ field }) => {
        return (
          <FormItem className={"w-full"}>
            <FormLabel>{label}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger
                  disabled={disabled}
                  className={cn("w-full min-w-[200px]", className)}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options
                  ? options.map((option: any) => (
                      <SelectItem
                        key={option.id}
                        value={option[valueKey]?.toString()}
                      >
                        {option.name}
                      </SelectItem>
                    ))
                  : []}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
      name={name}
      control={control}
    />
  );
}
