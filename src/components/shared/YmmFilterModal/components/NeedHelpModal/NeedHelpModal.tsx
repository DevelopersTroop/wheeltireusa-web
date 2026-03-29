"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { toast } from "sonner";

interface NeedHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NeedHelpModal({ isOpen, onClose }: NeedHelpModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call will be added when backend is ready
      // await apiInstance.post("/quotes", { name, email, phone });

      toast.success("Submission received! A specialist will contact you shortly.");

      setName("");
      setEmail("");
      setPhone("");
      onClose();
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden border-0 rounded-2xl bg-white shadow-2xl">
        <div className="flex flex-col md:flex-row max-h-[85vh] md:max-h-[600px]">
          {/* Left Side: Image / Brand */}
          <div className="hidden md:flex relative w-2/5 bg-[#1a0000] overflow-hidden flex-col justify-between p-8 text-white">
            <div className="absolute inset-0 z-0">
              <div
                className="absolute inset-0 bg-cover bg-no-repeat bg-[center_bottom] opacity-30"
                style={{ backgroundImage: "url('/images/landing-page/passenger.webp')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            </div>
            <div className="relative z-10">
              <span className="text-5xl font-black tracking-widest text-red-700 select-none">
                WT
              </span>
            </div>
            <div className="relative z-10 mt-auto">
              <h3 className="text-3xl font-black tracking-[0.1em] leading-tight mb-3">
                NEED<br />HELP?
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed max-w-[220px]">
                Our wheel specialists are here to help you find the perfect fit.
              </p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="flex-1 p-6 sm:p-8 md:p-8 relative overflow-y-auto">
            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full bg-white p-1.5 shadow-lg hover:bg-gray-100 z-50 border border-gray-200 md:hidden"
            >
              <X className="h-5 w-5 text-primary" />
            </button>

            <DialogHeader className="mb-6">
              <DialogTitle className="text-xl sm:text-2xl md:text-2xl font-black tracking-[0.1em] text-gray-900 mb-2">
                GET A CUSTOM QUOTE
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500 leading-relaxed">
                Fill out the details below and a dedicated specialist will contact you shortly to
                help you find the perfect setup.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:gap-5">
                <div className="grid gap-2">
                  <Label
                    htmlFor="name"
                    className="text-xs font-bold text-gray-700 tracking-wider uppercase"
                  >
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="bg-gray-50 border-gray-200 h-11 sm:h-12 focus-visible:ring-red-700 focus-visible:ring-offset-0 placeholder:text-gray-400 rounded-lg"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="email"
                    className="text-xs font-bold text-gray-700 tracking-wider uppercase"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="jane@example.com"
                    className="bg-gray-50 border-gray-200 h-11 sm:h-12 focus-visible:ring-red-700 focus-visible:ring-offset-0 placeholder:text-gray-400 rounded-lg"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="phone"
                    className="text-xs font-bold text-gray-700 tracking-wider uppercase"
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    placeholder="(555) 555-5555"
                    className="bg-gray-50 border-gray-200 h-11 sm:h-12 focus-visible:ring-red-700 focus-visible:ring-offset-0 placeholder:text-gray-400 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="mt-6 sm:mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary hover:bg-red-800 text-white text-xs font-black tracking-[0.15em] px-6 sm:px-8 py-3 sm:py-3 w-full sm:w-auto transition-all duration-300 shadow-lg hover:shadow-xl rounded-sm disabled:opacity-50"
                >
                  {loading ? "SUBMITTING..." : "SUBMIT REQUEST"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
