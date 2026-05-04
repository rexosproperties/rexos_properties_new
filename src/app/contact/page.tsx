"use client";

import { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
  const [form, setForm] = useState({
    enquiryType: "",
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit enquiry");
      }

      setSuccessMessage(
        "Thank you! Your enquiry has been received. Check your email for an auto-response from our team.",
      );
      setForm({
        enquiryType: "",
        fullName: "",
        phone: "",
        email: "",
        message: "",
      });

      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to submit enquiry. Please try again.",
      );
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <div>
            <p className="text-sm text-gray-dark mb-3">Contact Us</p>
            <h1 className="text-3xl lg:text-5xl font-bold text-navy mb-4 leading-tight">
              Let&apos;s Start Your Property Journey Together
            </h1>
            <p className="text-gray-dark leading-relaxed mb-10">
              Our team is here to help you make confident property decisions
              every step of the way.
            </p>

            {/* Contact Details */}
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center shrink-0">
                  <Image
                    src="/assets/images/Icon/Phone.png"
                    alt="Phone"
                    width={18}
                    height={18}
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-dark mb-1">Phone Number</p>
                  <a
                    href="tel:+2349164742000"
                    className="text-sm font-semibold text-navy whitespace-nowrap hover:text-navy-dark transition-colors"
                  >
                    +234 916 474 2000
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center shrink-0">
                  <Image
                    src="/assets/images/Icon/Envelope.png"
                    alt="Email"
                    width={18}
                    height={18}
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-dark mb-1">Email</p>
                  <p className="text-sm font-semibold text-navy">
                    info@rexsoproperties.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center shrink-0">
                  <Image
                    src="/assets/images/Icon/Location.png"
                    alt="Address"
                    width={18}
                    height={18}
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-dark mb-1">Address</p>
                  <p className="text-sm font-semibold text-navy">
                    No 8B, Abiodun Ikomi Street, Lekki, Lagos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Enquiry Type */}
              <div>
                <select
                  name="enquiryType"
                  value={form.enquiryType}
                  onChange={handleChange}
                  required
                  title="Enquiry Type"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-dark focus:outline-none focus:ring-2 focus:ring-navy/20"
                >
                  <option value="" disabled>
                    Enquiry Type
                  </option>
                  <option>Property Purchase</option>
                  <option>Property Investment</option>
                  <option>Schedule a Visit</option>
                  <option>General Enquiry</option>
                </select>
              </div>

              {/* Full Name + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-dark focus:outline-none focus:ring-2 focus:ring-navy/20"
                />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-dark focus:outline-none focus:ring-2 focus:ring-navy/20"
                />
              </div>

              {/* Email */}
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-dark focus:outline-none focus:ring-2 focus:ring-navy/20"
              />

              {/* Message */}
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Message"
                required
                rows={5}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-dark focus:outline-none focus:ring-2 focus:ring-navy/20 resize-none"
              />

              {/* Success Message */}
              {successMessage && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
                  {successMessage}
                </div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {errorMessage}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-navy text-white py-3 rounded-full text-sm font-semibold hover:bg-navy-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
