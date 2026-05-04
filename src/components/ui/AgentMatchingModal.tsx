"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Form validation schema
const matchingSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  timeline: z.string().min(1, "Please select a timeline"),
});

type MatchingFormData = z.infer<typeof matchingSchema>;

interface AgentMatchingModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchCriteria?: {
    type?: string;
    price?: string;
    location?: string;
    rooms?: string;
    tab?: string;
    sort?: string;
  };
}

export default function AgentMatchingModal({
  isOpen,
  onClose,
  searchCriteria = {},
}: AgentMatchingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MatchingFormData>({
    resolver: zodResolver(matchingSchema),
  });

  const onSubmit = async (data: MatchingFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/agent-matching", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          timeline: data.timeline,
          searchCriteria: searchCriteria,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message:
            "Perfect! Our AI has analyzed your search criteria and matched you with property experts. Check your email for agent recommendations and details.",
        });
        reset();
        // Close modal after 4 seconds
        setTimeout(() => {
          onClose();
          setSubmitStatus(null);
        }, 4000);
      } else {
        setSubmitStatus({
          type: "error",
          message:
            result.error || "Failed to process your request. Please try again.",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Navy Background */}
          <div className="bg-navy text-white px-6 py-8 rounded-t-3xl">
            <h2 className="text-2xl font-bold mb-2">You're one step away</h2>
            <p className="text-white/90">
              We'll match you with a property expert for your search
            </p>
          </div>

          {/* Content */}
          <div className="p-6">
            {submitStatus ? (
              <div
                className={`p-4 rounded-lg text-sm ${
                  submitStatus.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  {submitStatus.type === "success" ? (
                    <svg
                      className="w-5 h-5 shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <p>{submitStatus.message}</p>
                </div>
              </div>
            ) : (
              <>
                {/* Info Box */}
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex gap-3">
                  <svg
                    className="w-5 h-5 text-blue-600 shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm text-blue-800">
                    Our AI will analyse your search criteria and connect you
                    with agents who have matching listings ready.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* First Name & Last Name Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-xs font-semibold text-navy mb-2 uppercase tracking-wide"
                      >
                        First Name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        placeholder="Emeka"
                        {...register("firstName")}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20 text-sm"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-xs font-semibold text-navy mb-2 uppercase tracking-wide"
                      >
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        placeholder="Okafor"
                        {...register("lastName")}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20 text-sm"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-navy mb-2 uppercase tracking-wide"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      {...register("email")}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20 text-sm"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-semibold text-navy mb-2 uppercase tracking-wide"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+234 800 000 0000"
                      {...register("phone")}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20 text-sm"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Timeline Dropdown */}
                  <div>
                    <label
                      htmlFor="timeline"
                      className="block text-xs font-semibold text-navy mb-2 uppercase tracking-wide"
                    >
                      How soon are you looking?
                    </label>
                    <select
                      id="timeline"
                      {...register("timeline")}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20 text-sm appearance-none"
                    >
                      <option value="">Select timeline</option>
                      <option value="immediate">Immediately</option>
                      <option value="1-month">Within 1 month</option>
                      <option value="1-3-months">1-3 months</option>
                      <option value="3-6-months">3-6 months</option>
                      <option value="6-plus-months">6+ months</option>
                      <option value="just-browsing">Just browsing</option>
                    </select>
                    {errors.timeline && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.timeline.message}
                      </p>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-dark rounded-lg hover:border-navy hover:text-navy transition-colors text-sm font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-navy text-white px-4 py-2.5 rounded-lg hover:bg-navy-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                    >
                      {isSubmitting ? "Processing..." : "Submit"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
