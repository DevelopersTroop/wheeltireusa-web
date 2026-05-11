import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useFilterSync } from "@/hooks/useFilterSync";
import { useSearchParams } from "next/navigation";

const SortByFilter = () => {
  const { toggleFilterValue } = useFilterSync();
  const searchParams = useSearchParams();

  const sortOptions = [
    { label: "Price (low to high)", value: "msrp,asc" },
    { label: "Price (high to low)", value: "msrp,desc" },
    { label: "Name (A to Z)", value: "title,asc" },
    { label: "Name (Z to A)", value: "title,desc" },
  ];

  const currentSort = searchParams.get("sort") || "";

  const selectedLabel =
    sortOptions.find((s) => s.value === currentSort)?.label;

  return (
    <div className="w-full max-w-[500px]">
      <Select
        value={currentSort || undefined}
        onValueChange={(value) => {
          toggleFilterValue("sort", value, false);
        }}
      >
        <SelectTrigger className="w-full max-w-[180px]">
          <SelectValue placeholder="Sort options">
            {selectedLabel || "Sort options"}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort Options</SelectLabel>

            {sortOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortByFilter;