import { cn } from "@/lib/utils";

export type Category = "tire" | "wheels";

interface CategoryToggleProps {
  category: Category;
  onCategoryChange: (category: Category) => void;
  variant?: "desktop" | "mobile";
}

export default function CategoryToggle({ category, onCategoryChange, variant = "desktop" }: CategoryToggleProps) {
  const baseClass = "px-3 py-1 rounded text-[10px] font-semibold uppercase transition-colors";
  const activeClass = "bg-primary text-white";
  const inactiveClass = "bg-gray-100 text-gray-600 hover:bg-gray-200";

  const desktopClasses = {
    container: "flex gap-2 h-0 overflow-hidden transition-all duration-200 ease-out group-hover:h-6 group-hover:mb-3",
    button: "opacity-0 transition-all duration-200 ease-out group-hover:opacity-100",
  };

  const mobileClasses = {
    container: "flex gap-2",
    button: "",
  };

  const classes = variant === "desktop" ? desktopClasses : mobileClasses;

  return (
    <div className={classes.container}>
      {(["tire", "wheels"] as Category[]).map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onCategoryChange(cat)}
          className={cn(
            baseClass,
            classes.button,
            category === cat ? activeClass : inactiveClass
          )}
        >
          {cat === "tire" ? "Tires" : "Wheels"}
        </button>
      ))}
    </div>
  );
}
