"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AgentMatchingModal from "@/components/ui/AgentMatchingModal";

const heroImages = [
  "/assets/images/slider-1.png",
  "/assets/images/slider-2.png",
  "/assets/images/slider-3.png",
  "/assets/images/slider-4.png",
  "/assets/images/slider-5.png",
  "/assets/images/slider-6.png",
  "/assets/images/slider-7.png",
];

const propertyTabs = ["For Sale", "For Rent"];

const sortOptions = ["Newest", "Popular", "Recommendation"];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("For Sale");
  const [activeSort, setActiveSort] = useState("Newest");
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    price: "",
    location: "",
    rooms: "",
  });

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    setIsModalOpen(true);
  };

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isMounted]);

  return (
    <>
      <AgentMatchingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        searchCriteria={{
          type: formData.type,
          price: formData.price,
          location: formData.location,
          rooms: formData.rooms,
          tab: activeTab,
          sort: activeSort,
        }}
      />
      <section className="relative">
        {/* Carousel Background */}
        <div className="relative h-[90vh] max-h-215 min-h-140 overflow-hidden">
          {heroImages.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-navy/30 z-10" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={`Luxury property ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </div>
          ))}

          {/* Hero Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center lg:justify-end items-center lg:items-start px-4 sm:px-6 lg:px-8 lg:pb-24 max-w-7xl mx-auto w-full">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white max-w-xl leading-[1.1] text-center lg:text-left">
              Building Premium Luxury Homes In Lagos
            </h1>
          </div>

          {/* Info Card — desktop overlay (top right) */}
          <div className="absolute top-6 right-4 lg:right-12 z-20 bg-navy/90 backdrop-blur-sm text-white p-6 rounded-2xl max-w-sm hidden md:block">
            <h2 className="text-lg font-bold mb-3">
              Luxury Homes & Real Estate Development in Lagos
            </h2>
            <p className="text-sm text-white/80 leading-relaxed mb-4">
              Experience unparalleled luxury living in Lagos. Our team of
              skilled architects, builders, realtors, and interior designers has
              created something extraordinary just for you.
            </p>
            <Link
              href="/properties"
              className="text-xs font-semibold uppercase tracking-wider border-b-2 border-white pb-1 hover:text-white/80 transition-colors"
            >
              Explore Our Portfolio
            </Link>
          </div>
        </div>

        {/* Info Card — mobile full-width block (below carousel) */}
        <div className="md:hidden bg-blue-steel text-white px-6 py-8">
          <h2 className="text-lg font-bold mb-3">
            Luxury Homes & Real Estate Development in Lagos
          </h2>
          <p className="text-sm text-white/80 leading-relaxed mb-4">
            Experience unparalleled luxury living in Lagos. Our team of skilled
            architects, builders, realtors, and interior designers has created
            something extraordinary just for you.
          </p>
          <Link
            href="/properties"
            className="text-xs font-semibold uppercase tracking-wider border-b-2 border-white pb-1 hover:text-white/80 transition-colors"
          >
            Explore Our Portfolio
          </Link>
        </div>

        {/* Search Panel */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:-mt-16 relative z-30">
          {/* Mobile title */}
          <h2 className="md:hidden text-xl font-bold text-navy mb-4">
            Explore Our Portfolio
          </h2>
          <div className="bg-white rounded-2xl shadow-xl p-6">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 justify-start">
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {propertyTabs.map((tab) => (
                  <button
                    type="button"
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-sm font-medium italic transition-colors ${
                      activeTab === tab
                        ? "text-navy border-b-2 border-navy"
                        : "text-gray hover:text-navy"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Type */}
              <div>
                <label
                  htmlFor="hero-type"
                  className="text-xs font-semibold text-navy mb-1 block"
                >
                  Type
                </label>
                <div className="relative flex items-center">
                  <img
                    src="/assets/images/Icon/Building.svg"
                    alt=""
                    className="absolute left-3 w-4 h-4 pointer-events-none"
                  />
                  <select
                    id="hero-type"
                    value={formData.type}
                    onChange={(e) => handleFormChange("type", e.target.value)}
                    className="w-full border border-gray-200 rounded-full pl-9 pr-4 py-2.5 text-sm text-gray-dark focus:outline-none focus:ring-2 focus:ring-navy/20 appearance-none"
                  >
                    <option value="">Select</option>
                    <option>Apartment</option>
                    <option>Duplex</option>
                    <option>Terrace</option>
                    <option>Detached</option>
                  </select>
                </div>
              </div>
              {/* Price */}
              <div>
                <label className="text-xs font-semibold text-navy mb-1 block">
                  Price
                </label>
                <div className="relative flex items-center">
                  <img
                    src="/assets/images/Icon/Money.svg"
                    alt=""
                    className="absolute left-3 w-4 h-4 pointer-events-none"
                  />
                  <input
                    type="text"
                    placeholder="Set Range"
                    value={formData.price}
                    onChange={(e) => handleFormChange("price", e.target.value)}
                    className="w-full border border-gray-200 rounded-full pl-9 pr-4 py-2.5 text-sm text-gray-dark focus:outline-none focus:ring-2 focus:ring-navy/20"
                  />
                </div>
              </div>
              {/* Location */}
              <div>
                <label className="text-xs font-semibold text-navy mb-1 block">
                  Location
                </label>
                <div className="relative flex items-center">
                  <img
                    src="/assets/images/Icon/location-icon.svg"
                    alt=""
                    className="absolute left-3 w-4 h-4 pointer-events-none"
                  />
                  <input
                    type="text"
                    placeholder="Search"
                    value={formData.location}
                    onChange={(e) =>
                      handleFormChange("location", e.target.value)
                    }
                    className="w-full border border-gray-200 rounded-full pl-9 pr-4 py-2.5 text-sm text-gray-dark focus:outline-none focus:ring-2 focus:ring-navy/20"
                  />
                </div>
              </div>
              {/* Number Of Rooms */}
              <div>
                <label
                  htmlFor="hero-rooms"
                  className="text-xs font-semibold text-navy mb-1 block"
                >
                  Number Of Rooms
                </label>
                <div className="relative flex items-center">
                  <img
                    src="/assets/images/Icon/Bedrooms.svg"
                    alt=""
                    className="absolute left-3 w-4 h-4 pointer-events-none"
                  />
                  <select
                    id="hero-rooms"
                    value={formData.rooms}
                    onChange={(e) => handleFormChange("rooms", e.target.value)}
                    className="w-full border border-gray-200 rounded-full pl-9 pr-4 py-2.5 text-sm text-gray-dark focus:outline-none focus:ring-2 focus:ring-navy/20 appearance-none"
                  >
                    <option value="">Choose</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4+</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Sort & Search Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-sm text-navy font-medium">Sort By</span>
                <div className="flex items-center gap-2">
                  {sortOptions.map((option) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => setActiveSort(option)}
                      className={`text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full border transition-colors whitespace-nowrap ${
                        activeSort === option
                          ? "border-navy text-navy font-medium"
                          : "border-gray-200 text-gray hover:border-navy hover:text-navy"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={handleSearch}
                className="bg-navy text-white px-8 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-navy-dark transition-colors"
              >
                <svg
                  className="w-4 h-4"
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
                Search
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
