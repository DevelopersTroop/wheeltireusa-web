"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { X, Phone, Clock, Shield } from "lucide-react";
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
      <DialogContent className="md:w-1/2 p-0 border-0 overflow-hidden bg-white rounded-2xl shadow-2xl">
        {/* Hero Image Banner */}
        <div className="relative h-40 sm:h-48 overflow-hidden">
          <img
            src="/images/landing-page/passenger.webp"
            alt="Wheel & Tire"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            <X className="h-4 w-4 text-white" />
          </button>

          {/* Overlay Text */}
          <div className="absolute bottom-4 left-5 right-5">
            <span className="inline-block px-2 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-wider rounded mb-2">
              Free Quote
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Need Help Finding Wheels?
            </h2>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-5 sm:p-6">
          <p className="text-sm text-neutral-500 mb-5">
            Our specialists will help you find the perfect fit for your vehicle.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="h-11 bg-neutral-50 border-neutral-200 rounded-lg focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary"
              required
            />

            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email address"
              className="h-11 bg-neutral-50 border-neutral-200 rounded-lg focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary"
              required
            />

            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              placeholder="Phone number"
              className="h-11 bg-neutral-50 border-neutral-200 rounded-lg focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary"
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Get My Free Quote</span>
              )}
            </button>
          </form>

          {/* Trust Badges */}
          <div className="mt-5 pt-5 border-t border-neutral-100 grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center text-center">
              <Phone className="h-4 w-4 text-primary mb-1" />
              <span className="text-[10px] text-neutral-500 font-medium">Quick Call</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Clock className="h-4 w-4 text-primary mb-1" />
              <span className="text-[10px] text-neutral-500 font-medium">24hr Response</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield className="h-4 w-4 text-primary mb-1" />
              <span className="text-[10px] text-neutral-500 font-medium">Secure</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
