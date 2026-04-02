"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface NeedHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle?: string;
}

export function NeedHelpModal({ isOpen, onClose, vehicle }: NeedHelpModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Form submission:", {
        vehicle: vehicle || "Not selected",
        name,
        email,
        phone,
        message,
      });

      toast.success("Submission received! A specialist will contact you shortly.");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      onClose();
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent hideCloseButton className="max-w-3xl max-h-[90vh] md:max-h-[90vh] h-[100dvh] max-h-[100dvh] md:h-auto md:rounded-xl rounded-none p-0 overflow-hidden border-0 bg-white shadow-2xl">
        {/* Single Close Button - Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/90 hover:bg-white shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105"
        >
          <X className="h-4 w-4 text-neutral-700" />
        </button>

        <div className="flex flex-col h-[100dvh] md:max-h-[90vh] md:h-auto overflow-y-auto">
          {/* Mobile Hero Banner */}
          <div className="md:hidden relative h-40 overflow-hidden shrink-0">
            <img
              src="/images/landing-page/wheel-tire-usa.webp"
              alt="Wheel & Tire"
              className="w-full h-full object-cover object-center opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-neutral-900/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-block px-2 py-1 bg-primary text-white text-[9px] font-bold uppercase tracking-wider rounded mb-2">
                Free Quote
              </span>
              <h3 className="text-lg font-bold text-white leading-tight mb-1">
                BUILD YOUR PERFECT SETUP
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Tell us about your vehicle and we'll match you with the perfect wheels, tires, or accessories.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Left Side - Image/Brand (Desktop) */}
            <div className="hidden md:flex relative w-2/5 bg-neutral-900 overflow-hidden flex-col justify-end p-8 shrink-0">
              <div className="absolute inset-0 z-0">
                <img
                  src="/images/landing-page/wheel-tire-usa.webp"
                  alt="Wheel & Tire"
                  className="w-full h-full object-cover object-center opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-neutral-900/30 to-transparent" />
              </div>

              <div className="relative z-10">
                <span className="inline-block px-2 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-wider rounded mb-3">
                  Free Quote
                </span>
                <h3 className="text-2xl font-bold text-white leading-tight mb-2">
                  BUILD YOUR<br />PERFECT SETUP
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Tell us about your vehicle and we'll match you with the perfect wheels, tires, or accessories.
                </p>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 p-5 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                {/* Vehicle */}
                <div>
                  <Label htmlFor="vehicle" className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider">
                    Vehicle
                  </Label>
                  <Input
                    id="vehicle"
                    value={vehicle || ""}
                    readOnly
                    placeholder="e.g. 2021 BMW M4"
                    className="h-10 bg-neutral-50 border-neutral-200 text-sm focus-visible:ring-primary focus-visible:ring-offset-0"
                  />
                </div>

                {/* Two Column Grid for Name/Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="name" className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="h-10 bg-neutral-50 border-neutral-200 text-sm focus-visible:ring-primary focus-visible:ring-offset-0"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider">
                      Email
                    </Label>
                    <Input
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="you@example.com"
                      className="h-10 bg-neutral-50 border-neutral-200 text-sm focus-visible:ring-primary focus-visible:ring-offset-0"
                      required
                    />
                  </div>
                </div>

                {/* Phone & Message Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="phone" className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider">
                      Phone <span className="text-neutral-400 font-normal">(optional)</span>
                    </Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="tel"
                      placeholder="For faster response"
                      className="h-10 bg-neutral-50 border-neutral-200 text-sm focus-visible:ring-primary focus-visible:ring-offset-0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider">
                      Notes <span className="text-neutral-400 font-normal">(optional)</span>
                    </Label>
                    <Input
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Fitment, brands, style..."
                      className="h-10 bg-neutral-50 border-neutral-200 text-sm focus-visible:ring-primary focus-visible:ring-offset-0"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-semibold h-11 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {loading ? "Submitting..." : "Get My Custom Setup"}
                </button>

                {/* Trust Line */}
                <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] text-neutral-500 pt-1">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-primary" />
                    Fitment guaranteed
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-primary" />
                    Response within 24h
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-primary" />
                    Expert advice
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
