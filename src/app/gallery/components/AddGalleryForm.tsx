"use client";
import {
  MultipleImageUploader,
  SingleImageUploader,
} from "@/components/shared/imageUploader";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import useYmm from "@/hooks/useYmm";
import { useFetchFilters } from "@/hooks/useFetchFilters";
import { normalizeImageUrl } from "@/lib/utils";
import { useCreateGalleryMutation } from "@/redux/apis/gallery";
import { useGetProductsQuery } from "@/redux/apis/product";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  useState,
} from "react";
import { toast } from "sonner";

const liftHeightOptions = [
  "Stock",
  "1 Inch",
  "1.5 Inch",
  "2 Inch",
  "2.5 Inch",
  "3 Inch",
  "3.5 Inch",
  "4 Inch",
  "5 Inch",
  "6 Inch",
];

const Button = ({
  children,
  variant = "default",
  className = "",
  ...props
}: any) => {
  const baseStyles =
    "px-6 py-2 rounded font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const variantStyles =
    variant === "outline"
      ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
      : "bg-red-600 text-white hover:bg-red-700";

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string;
};

const Select = ({ children, className = "", ...props }: SelectProps) => (
  <select
    className={`w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white ${className}`}
    {...props}
  >
    {children}
  </select>
);

type CheckboxProps = {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
};

const Checkbox = ({
  label,
  checked,
  onChange,
  className = "",
}: CheckboxProps) => (
  <label className={`flex items-center space-x-2 cursor-pointer ${className}`}>
    <input
      type="checkbox"
      checked={checked}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.checked)
      }
      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
    />
    {label && <span className="text-sm text-gray-700">{label}</span>}
  </label>
);

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
};

const Textarea = ({ className = "", ...props }: TextareaProps) => (
  <textarea
    className={`w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none ${className}`}
    {...props}
  />
);

export default function MultiStepBuildForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { filters: tireFilters } = useFetchFilters("tires");
  const { filters: wheelFilters } = useFetchFilters("wheels");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm);
  const {
    list: { years, makes, models, bodyTypes },
    onYearChange,
    onMakeChange,
    onModelChange,
    isBodyTypeDisabled,
    isModelDisabled,
    isMakeDisabled,
  } = useYmm();
  const [createGallery] = useCreateGalleryMutation();

  const handleSelectProduct = (product: any) => {
    const currentSelected = formData.installedProducts || [];

    // Prevent duplicates
    if (currentSelected.some((p: any) => p._id === product._id)) return;

    updateField("installedProducts", [...currentSelected, product]);
    setSearchTerm(""); // Clear search after selection
  };

  const handleRemoveProduct = (productId: string) => {
    const filtered = formData.installedProducts.filter(
      (p: any) => p._id !== productId
    );
    updateField("installedProducts", filtered);
  };

  const [formData, setFormData] = useState({
    title: "",
    // Step 1: Vehicle Info
    buildUsername: "",
    instagram: "",
    vehicleType: "",
    year: "",
    make: "",
    model: "",
    liftHeight: "",
    driveType: "",
    engine: "",
    fuelType: "",
    bodyType: "",
    doorsNumber: "",
    bedLength: "",

    // Step 2: Wheels & Tires
    stockWheels: false,
    wheelBrand: "",
    wheelModel: "",
    wheelSize: "",
    wheelWidth: "",
    wheelOffset: "",
    spacers: "",
    stockTires: false,
    tireBrand: "",
    tireModel: "",
    tireSize: "",
    additionalInfo: "",

    // Step 3: Products
    searchProducts: "",

    // Step 5: Account
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    subscribe: true,
    mainImage: "",
    additionalImages: [],
    installedProducts: [],
  });

  console.log("TCL: MultiStepBuildForm -> formData", formData);
  const steps = [
    { num: 1, label: "VEHICLE" },
    { num: 2, label: "SET-UP" },
    { num: 3, label: "PRODUCTS" },
    { num: 4, label: "PHOTOS" },
  ];

  const updateField = (field: any, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Build Title is required";
    if (!formData.buildUsername.trim())
      newErrors.buildUsername = "Build username is required";
    if (!formData.vehicleType)
      newErrors.vehicleType = "Vehicle type is required";
    if (!formData.year) newErrors.year = "Year is required";
    if (!formData.make) newErrors.make = "Make is required";
    if (!formData.model) newErrors.model = "Model is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.stockWheels) {
      if (!formData.wheelBrand)
        newErrors.wheelBrand = "Wheel brand is required";
      if (!formData.wheelModel)
        newErrors.wheelModel = "Wheel model is required";
    }
    if (!formData.stockTires) {
      if (!formData.tireBrand) newErrors.tireBrand = "Tire brand is required";
      if (!formData.tireModel) newErrors.tireModel = "Tire model is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.mainImage)
      newErrors.mainImage = "At least one image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = true;

    if (currentStep === 1) isValid = validateStep1();
    if (currentStep === 2) isValid = validateStep2();
    if (currentStep === 4) isValid = validateStep4();

    if (isValid && currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const router = useRouter();

  const { isLoading, data } = useGetProductsQuery(
    {
      q: debouncedSearch,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // const newErrors: Record<string, string> = {};

    // if (!formData.firstName.trim())
    //   newErrors.firstName = "First name is required";
    // if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    // if (!formData.email.trim()) newErrors.email = "Email is required";
    // else if (!/\S+@\S+\.\S+/.test(formData.email))
    //   newErrors.email = "Email is invalid";
    // if (!formData.password) newErrors.password = "Password is required";
    // else if (formData.password.length < 6)
    //   newErrors.password = "Password must be at least 6 characters";
    // if (formData.password !== formData.confirmPassword)
    //   newErrors.confirmPassword = "Passwords do not match";

    // setErrors(newErrors);

    try {
      await createGallery({
        ...formData,
        installedProducts: formData.installedProducts.map((p: any) => p._id),
      }).unwrap();
      toast.success("Your submission is being reviewd");
      router.replace("/gallery");
    } catch (error) {
      toast.error("Something wen't wrong");
    }
    // if (Object.keys(newErrors).length === 0) {
    //   console.log("Form submitted:", formData);
    //   alert("Build submitted successfully!");
    // }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-300 via-slate-200 to-slate-300 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-white pt-8 pb-6 px-8">
          <h1 className="text-3xl font-bold text-center mb-8 tracking-wide">
            {currentStep === 5 ? "LAST STEP" : "SUBMIT YOUR BUILD"}
          </h1>

          {currentStep < 5 && (
            <div className="flex justify-center items-center space-x-8 mb-8">
              {steps.map((step) => (
                <div key={step.num} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold mb-2 transition-all ${currentStep > step.num
                      ? "bg-red-600 border-red-600 text-white"
                      : currentStep === step.num
                        ? "border-black text-black"
                        : "border-gray-300 text-gray-400"
                      }`}
                  >
                    {currentStep > step.num ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      step.num
                    )}
                  </div>
                  <span
                    className={`text-xs font-semibold ${currentStep >= step.num ? "text-black" : "text-gray-400"
                      }`}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="h-px bg-gray-200 mb-6"></div>
        </div>

        {/* Form Content */}
        <div className="px-8 pb-8">
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-center mb-6">
                BUILD DETAILS
              </h2>

              <div className="mb-6">
                <h3 className="text-sm font-bold mb-3 text-gray-700">
                  BASIC INFO
                </h3>
                <div className="mb-4">
                  <Input
                    placeholder="BUILD Title"
                    className="h-11"
                    value={formData.title}
                    onChange={(e) => updateField("title", e.target.value)}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      className="h-11"
                      placeholder="BUILD USERNAME"
                      value={formData.buildUsername}
                      onChange={(e) =>
                        updateField("buildUsername", e.target.value)
                      }
                    />
                    {errors.buildUsername && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.buildUsername}
                      </p>
                    )}
                  </div>
                  <Input
                    className="h-11"
                    placeholder="Instagram (optional)"
                    value={formData.instagram}
                    onChange={(e) => updateField("instagram", e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-bold mb-3 text-gray-700">
                  VEHICLE INFO
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Select
                      value={formData.year}
                      onChange={(e) => {
                        updateField("year", e.target.value);
                        onYearChange(e);
                      }}
                    >
                      <option value="">YEAR</option>
                      {years?.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Select>
                    {errors.year && (
                      <p className="text-red-500 text-xs mt-1">{errors.year}</p>
                    )}
                  </div>
                  <div>
                    <Select
                      value={formData.make}
                      onChange={(e) => {
                        updateField("make", e.target.value);
                        onMakeChange(e);
                      }}
                      disabled={isMakeDisabled}
                    >
                      <option value="">MAKE</option>
                      {makes?.map((m) => (
                        <option value={m} key={m}>
                          {m}
                        </option>
                      ))}
                    </Select>
                    {errors.make && (
                      <p className="text-red-500 text-xs mt-1">{errors.make}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Select
                      value={formData.model}
                      disabled={isModelDisabled}
                      onChange={(e) => {
                        updateField("model", e.target.value);
                        onModelChange(e);
                      }}
                    >
                      <option value="">MODEL</option>
                      {models?.map((m) => (
                        <option value={m}>{m}</option>
                      ))}
                    </Select>
                    {errors.model && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.model}
                      </p>
                    )}
                  </div>

                  <div>
                    <Select
                      value={formData.vehicleType}
                      onChange={(e) =>
                        updateField("vehicleType", e.target.value)
                      }
                    >
                      <option value="">VEHICLE TYPE</option>\
                      {[
                        "Sedan",
                        "Hatchback",
                        "SUV",
                        "Crossover",
                        "Coupe",
                        "Convertible",
                        "Wagon",
                        "Van",
                        "Minivan",
                        "Pickup Truck",
                        "Microbus",
                        "Jeep",
                        "Roadster",
                        "Sports Car",
                        "Luxury Car",
                        "Electric Vehicle (EV)",
                        "Hybrid",
                        "Bus",
                        "Truck",
                        "Trailer",
                      ].map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </Select>
                    {errors.vehicleType && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.vehicleType}
                      </p>
                    )}
                  </div>
                </div>

                <Select
                  value={formData.liftHeight}
                  onChange={(e) => updateField("liftHeight", e.target.value)}
                >
                  <option value="">LIFT HEIGHT OPTIONS</option>
                  {liftHeightOptions.map((height) => (
                    <option key={height} value={height}>
                      {height}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <h3 className="text-sm font-bold mb-3 text-gray-700">
                  OPTIONAL VEHICLE INFO
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Select
                    value={formData.driveType}
                    onChange={(e) => updateField("driveType", e.target.value)}
                  >
                    <option value="">Drive Type</option>
                    <option value="4WD">4WD</option>
                    <option value="AWD">AWD</option>
                    <option value="2WD">2WD</option>
                  </Select>
                  <Select
                    value={formData.engine}
                    onChange={(e) => updateField("engine", e.target.value)}
                  >
                    <option value="">Engine</option>
                    <option value="V6">V6</option>
                    <option value="V8">V8</option>
                    <option value="I4">I4</option>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Select
                    value={formData.fuelType}
                    onChange={(e) => updateField("fuelType", e.target.value)}
                  >
                    <option value="">Fuel Type</option>
                    <option value="Gasoline">Gasoline</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                  </Select>
                  <Select
                    value={formData.bodyType}
                    onChange={(e) => updateField("bodyType", e.target.value)}
                  >
                    <option value="">Body Type</option>
                    <option value="Extended Cab">Extended Cab</option>
                    <option value="Crew Cab">Crew Cab</option>
                    <option value="Regular Cab">Regular Cab</option>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Select
                    value={formData.doorsNumber}
                    onChange={(e) => updateField("doorsNumber", e.target.value)}
                  >
                    <option value="">Doors Number</option>
                    <option value="2">2</option>
                    <option value="4">4</option>
                  </Select>
                  <Select
                    value={formData.bedLength}
                    onChange={(e) => updateField("bedLength", e.target.value)}
                  >
                    <option value="">Bed Length</option>
                    <option value="Short">Short</option>
                    <option value="Standard">Standard</option>
                    <option value="Long">Long</option>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-center mb-6">
                WHEELS & TIRES
              </h2>

              <div className="mb-6">
                <h3 className="text-sm font-bold mb-3 text-gray-700">WHEELS</h3>
                <div className="mb-4">
                  <Checkbox
                    label="Stock"
                    checked={formData.stockWheels}
                    onChange={(checked) => updateField("stockWheels", checked)}
                  />
                </div>

                {!formData.stockWheels && (
                  <>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <Select
                          value={formData.wheelBrand}
                          onChange={(e) =>
                            updateField("wheelBrand", e.target.value)
                          }
                        >
                          <option value="">BRAND</option>
                          <option value="American Force">American Force</option>
                          <option value="Fuel">Fuel</option>
                          <option value="Method">Method</option>
                        </Select>
                        {errors.wheelBrand && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.wheelBrand}
                          </p>
                        )}
                      </div>
                      <div>
                        <Select
                          value={formData.wheelModel}
                          onChange={(e) =>
                            updateField("wheelModel", e.target.value)
                          }
                        >
                          <option value="">MODEL</option>
                          <option value="AC001 RUSH">AC001 RUSH</option>
                          <option value="Independence">Independence</option>
                          <option value="Octane">Octane</option>
                        </Select>
                        {errors.wheelModel && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.wheelModel}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <Select
                        value={formData.wheelSize}
                        onChange={(e) =>
                          updateField("wheelSize", e.target.value)
                        }
                      >
                        <option value="">SIZE</option>
                        <option value="15">15</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="20">20</option>
                      </Select>
                      <Select
                        value={formData.wheelWidth}
                        onChange={(e) =>
                          updateField("wheelWidth", e.target.value)
                        }
                      >
                        <option value="">WIDTH</option>
                        <option value="8.25">8.25</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="WHEEL OFFSET"
                        value={formData.wheelOffset}
                        onChange={(e) =>
                          updateField("wheelOffset", e.target.value)
                        }
                      />
                      <Select
                        value={formData.spacers}
                        onChange={(e) => updateField("spacers", e.target.value)}
                      >
                        <option value="">SPACERS</option>
                        <option value="2 Inch">2 Inch</option>
                        <option value="1.5 Inch">1.5 Inch</option>
                        <option value="1 Inch">1 Inch</option>
                      </Select>
                    </div>
                  </>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-bold mb-3 text-gray-700">TIRES</h3>
                <div className="mb-4">
                  <Checkbox
                    label="Stock"
                    checked={formData.stockTires}
                    onChange={(checked) => updateField("stockTires", checked)}
                  />
                </div>

                {!formData.stockTires && (
                  <>
                    <div className="mb-4">
                      <Select
                        value={formData.tireBrand}
                        onChange={(e) =>
                          updateField("tireBrand", e.target.value)
                        }
                      >
                        <option value="">BRAND</option>
                        <option value="Delium">Delium</option>
                        <option value="BFGoodrich">BFGoodrich</option>
                        <option value="Nitto">Nitto</option>
                      </Select>
                      {errors.tireBrand && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.tireBrand}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <Select
                        value={formData.tireModel}
                        onChange={(e) =>
                          updateField("tireModel", e.target.value)
                        }
                      >
                        <option value="">MODEL</option>
                        <option value="Terra Raider A/T-X">
                          Terra Raider A/T-X
                        </option>
                        <option value="All-Terrain T/A">All-Terrain T/A</option>
                        <option value="Ridge Grappler">Ridge Grappler</option>
                      </Select>
                      {errors.tireModel && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.tireModel}
                        </p>
                      )}
                    </div>

                    <Select
                      value={formData.tireSize}
                      onChange={(e) => updateField("tireSize", e.target.value)}
                    >
                      <option value="">SIZE</option>
                      <option value="285/55R22">285/55R22</option>
                      <option value="275/65R18">275/65R18</option>
                      <option value="35x12.50R20">35x12.50R20</option>
                    </Select>
                  </>
                )}
              </div>

              <div>
                <h3 className="text-sm font-bold mb-3 text-gray-700">
                  ADDITIONAL MODS
                </h3>
                <Textarea
                  placeholder="Additional information about your build (optional)"
                  rows={4}
                  value={formData.additionalInfo}
                  onChange={(e) =>
                    updateField("additionalInfo", e.target.value)
                  }
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-center mb-1 uppercase tracking-tight">
                  Products Installed
                </h2>
                <p className="text-center text-gray-500 text-sm mb-6">
                  Search and select products used in this build
                </p>

                {/* Search Input */}
                <div className="relative">
                  <Input
                    placeholder="Search by name or SKU (e.g. 'Shocks' or 'Lift Kit')"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10 h-12"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                    ) : (
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Dropdown Results */}
                  {searchTerm.length >= 2 && data?.products && (
                    <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                      {data?.products?.length > 0 ? (
                        data?.products.map((product: any) => (
                          <div
                            key={product._id}
                            onClick={() => handleSelectProduct(product)}
                            className="p-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between border-b last:border-0"
                          >
                            <div className="flex flex-col">
                              <span className="font-medium text-sm text-gray-900">
                                {product.title}
                              </span>
                              <span className="text-xs text-gray-500">
                                SKU: {product.sku || "N/A"}
                              </span>
                            </div>
                            <button className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                              Add
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-sm text-gray-500">
                          No products found
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Selected Products List */}
              <div className="mt-8">
                <h3 className="text-xs font-bold uppercase text-gray-400 mb-3 tracking-widest">
                  Selected Products ({formData.installedProducts?.length || 0})
                </h3>
                <div className="space-y-2">
                  {formData.installedProducts?.map((product: any) => (
                    <div
                      key={product._id}
                      className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white border rounded flex-shrink-0 flex items-center justify-center">
                          {product.thumbnail ? (
                            <img
                              src={product.thumbnail}
                              alt=""
                              className="w-8 h-8 object-contain"
                            />
                          ) : (
                            <span className="text-[10px] text-gray-400">
                              RC
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-medium">
                          {product.title}
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemoveProduct(product._id)}
                        className="p-1 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                  {(!formData.installedProducts ||
                    formData.installedProducts.length === 0) && (
                      <div className="text-center py-6 border-2 border-dashed rounded-lg text-gray-400 text-sm">
                        No products selected yet
                      </div>
                    )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-center mb-3">
                UPLOAD IMAGES
              </h2>
              <p className="text-center text-gray-600 text-sm mb-6">
                Add ten (10) photos to show off your build. Include front, back,
                side
                <br />
                profile, and quarter views of your vehicle and close-up image of
                the
                <br />
                installed accessories.
              </p>

              {formData.mainImage ? (
                <div className="mb-6 relative">
                  <img
                    src={normalizeImageUrl(formData.mainImage)}
                    alt="Main build"
                    className="w-full h-96 object-cover rounded"
                  />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded text-sm font-semibold">
                    MAIN IMAGE
                  </div>
                </div>
              ) : (
                <div className="mb-6 border-2 border-dashed border-gray-300 rounded p-8 text-center">
                  <SingleImageUploader
                    field={"mainImage"}
                    setFieldValue={setFormData}
                    title="Upload main image"
                    values={formData}
                  />
                </div>
              )}

              {errors.mainImage && (
                <p className="text-red-500 text-sm mb-4 text-center">
                  {errors.mainImage}
                </p>
              )}

              <div className="border-2 border-dashed border-gray-300 rounded p-6 text-center">
                <MultipleImageUploader
                  field="additionalImages"
                  setFieldValue={setFormData}
                  title="Add More images"
                  values={formData}
                />
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div>
              {/* <h2 className="text-2xl font-bold text-center mb-3">
                CREATE AN ACCOUNT TO
              </h2>
              <h2 className="text-2xl font-bold text-center mb-4">
                CLAIM YOUR BUILD
              </h2>
              <p className="text-center text-gray-600 text-sm mb-8">
                We'll email you when your build goes live. Sign in any time
                <br />
                to keep your build up-to-date.
              </p> */}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* <div>
                  <Input
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => updateField("password", e.target.value)}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      updateField("confirmPassword", e.target.value)
                    }
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div> */}

                <div className="flex justify-center pt-4">
                  <Button type="submit" className="px-12">
                    SUBMIT BUILD
                  </Button>
                </div>

                <p className="text-center text-xs text-gray-600 mt-4">
                  By clicking the Submit Build button, you agree to the{" "}
                  <a href="#" className="text-red-600 hover:underline">
                    Terms of Use
                  </a>
                </p>

                {/* <div className="flex items-start space-x-2 mt-6">
                  <Checkbox
                    label="Count me in for Rough Country emails & product updates"
                    checked={formData.subscribe}
                    onChange={(checked) => updateField("subscribe", checked)}
                  />
                </div> */}

                <p className="text-xs text-gray-500 mt-4 text-center">
                  By providing this info I want to create an account at
                  RoughCountry.com
                </p>
              </form>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 5 && (
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {currentStep === 4 && (
            <div className="flex justify-center mt-6">
              <Button onClick={handleNext} className="px-12">
                CONTINUE
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
