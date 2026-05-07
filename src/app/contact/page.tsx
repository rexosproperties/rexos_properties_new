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
                    className="block text-sm font-semibold text-navy whitespace-nowrap hover:text-navy-dark transition-colors"
                  >
                    +234 916 474 2000
                  </a>
                  <a
                    href="https://wa.me/2349164742000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-green-600 hover:text-green-700 transition-colors mt-1"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    WhatsApp
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
                  <a
                    href="mailto:info@rexosproperties.com"
                    className="text-sm font-semibold text-navy hover:text-navy-dark transition-colors whitespace-nowrap"
                  >
                    info@rexosproperties.com
                  </a>
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
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=No+8B+Abiodun+Ikomi+Street+Lekki+Lagos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-navy hover:text-navy-dark transition-colors"
                  >
                    No 8B, Abiodun Ikomi Street, Lekki, Lagos.
                  </a>
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

      {/* Map */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <iframe
              title="Rexos Properties Office Location"
              src="https://www.google.com/maps?q=No+8B+Abiodun+Ikomi+Street+Lekki+Lagos&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
