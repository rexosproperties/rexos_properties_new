"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AgentMatchingModal from "@/components/ui/AgentMatchingModal";

const propertyTabs = ["For Sale", "For Rent", "Shortlet"];

const properties = [
  {
    id: 1,
    title: "Rex'o's Signature Residences (Oral Estate)",
    location: "Oral Estate, Lekki.",
    price: 200000000,
    status: "For Sale",
    slug: "signature-residences-oral-estate",
    image: "/assets/images/estate-1.png",
    bedrooms: 1,
    livingRoom: 1,
    diningArea: 1,
    bathrooms: 2,
    kitchen: 2,
  },
  {
    id: 2,
    title: "Rex'o's Signature Residences (White Sand Beach Estate)",
    location: "White Sand Beach Estate, Ologolo Lekki",
    price: 200000000,
    status: "For Sale",
    slug: "signature-residences-white-sand",
    image: "/assets/images/estate-2.png",
    bedrooms: 1,
    livingRoom: 1,
    diningArea: 1,
    bathrooms: 2,
    kitchen: 2,
  },
  {
    id: 3,
    title: "Rex'o's Signature Residences (Royal Pine Estate)",
    location: "Orchid Road, Lekki",
    price: 200000000,
    status: "For Sale",
    slug: "signature-residences-royal-pine",
    image: "/assets/images/estate-3.png",
    bedrooms: 1,
    livingRoom: 1,
    diningArea: 1,
    bathrooms: 2,
    kitchen: 2,
  },
  {
    id: 4,
    title: "Rex'o's Signature Residences ()",
    location: "Lekki Phase 1, Lagos",
    price: 200000000,
    status: "For Sale",
    slug: "signature-residences-4",
    image: "/assets/images/estate-4.png",
    bedrooms: 1,
    livingRoom: 1,
    diningArea: 1,
    bathrooms: 2,
    kitchen: 2,
  },
  {
    id: 5,
    title: "Rex'o's Signature Residences ()",
    location: "Chevron Drive, Lekki",
    price: 200000000,
    status: "For Sale",
    slug: "signature-residences-5",
    image: "/assets/images/estate-5.png",
    bedrooms: 1,
    livingRoom: 1,
    diningArea: 1,
    bathrooms: 2,
    kitchen: 2,
  },
  {
    id: 6,
    title: "Rex'o's Signature Residences ()",
    location: "Ikate, Lekki",
    price: 200000000,
    status: "For Sale",
    slug: "signature-residences-6",
    image: "/assets/images/estate-6.png",
    bedrooms: 1,
    livingRoom: 1,
    diningArea: 1,
    bathrooms: 2,
    kitchen: 2,
  },
];

export default function PropertiesPage() {
  const [activeTab, setActiveTab] = useState("For Sale");
  const [activeSort, setActiveSort] = useState("Newest");
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
      {/* Page Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-navy mb-4">
            Find Your Dream Home
          </h1>
          <p className="text-gray-dark text-base max-w-xl mx-auto">
            Explore a curated selection of properties that match your needs and preferences.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {/* Tabs */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 border-b border-gray-100 pb-4">
            {propertyTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-medium pb-1 transition-colors ${
                  activeTab === tab
                    ? "text-navy border-b-2 border-navy"
                    : "text-gray hover:text-navy"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {/* Type */}
            <div>
              <label htmlFor="prop-type" className="text-xs font-semibold text-navy mb-1 block">Type</label>
              <div className="relative flex items-center">
                <img src="/assets/images/Icon/Building.svg" alt="" className="absolute left-3 w-4 h-4 pointer-events-none" />
                <select
                  id="prop-type"
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
              <label className="text-xs font-semibold text-navy mb-1 block">Price</label>
              <div className="relative flex items-center">
                <img src="/assets/images/Icon/Money.svg" alt="" className="absolute left-3 w-4 h-4 pointer-events-none" />
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
              <label className="text-xs font-semibold text-navy mb-1 block">Location</label>
              <div className="relative flex items-center">
                <img src="/assets/images/Icon/Location Icon.svg" alt="" className="absolute left-3 w-4 h-4 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search"
                  value={formData.location}
                  onChange={(e) => handleFormChange("location", e.target.value)}
                  className="w-full border border-gray-200 rounded-full pl-9 pr-4 py-2.5 text-sm text-gray-dark focus:outline-none focus:ring-2 focus:ring-navy/20"
                />
              </div>
            </div>
            {/* Number Of Rooms */}
            <div>
              <label htmlFor="prop-rooms" className="text-xs font-semibold text-navy mb-1 block">Number Of Rooms</label>
              <div className="relative flex items-center">
                <img src="/assets/images/Icon/Bedrooms.svg" alt="" className="absolute left-3 w-4 h-4 pointer-events-none" />
                <select
                  id="prop-rooms"
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
          {/* Sort & Search */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-sm text-navy font-medium">Sort By</span>
              <div className="flex items-center gap-2">
                {["Newest", "Popular", "Recommendation"].map((option) => (
                  <button
                    key={option}
                    type="button"
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
              className="w-full sm:w-auto justify-center bg-navy text-white px-8 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-navy-dark transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Property Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div key={property.id} className="group">
                {/* Image */}
                <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-navy text-xs font-semibold px-4 py-1.5 rounded-full">
                    {property.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-navy mb-1">{property.title}</h3>

                {/* Location */}
                <div className="flex items-center gap-1 text-xs text-gray-dark mb-3">
                  <Image src="/assets/images/Icon/Location Icon.svg" alt="Location" width={12} height={12} />
                  {property.location}
                </div>

                {/* Amenities */}
                <div className="flex items-center gap-3 text-xs text-gray-dark mb-4">
                  <span className="flex items-center gap-1">
                    <Image src="/assets/images/Icon/Bedrooms.svg" alt="Bedrooms" width={16} height={16} />
                    {property.bedrooms}
                  </span>
                  <span className="flex items-center gap-1">
                    <Image src="/assets/images/Icon/living room.svg" alt="Living Room" width={16} height={16} />
                    {property.livingRoom}
                  </span>
                  <span className="flex items-center gap-1">
                    <Image src="/assets/images/Icon/Dining area.svg" alt="Dining Area" width={16} height={16} />
                    {property.diningArea}
                  </span>
                  <span className="flex items-center gap-1">
                    <Image src="/assets/images/Icon/bathroom.svg" alt="Bathrooms" width={16} height={16} />
                    {property.bathrooms}
                  </span>
                  <span className="flex items-center gap-1">
                    <Image src="/assets/images/Icon/kitchen.svg" alt="Kitchen" width={16} height={16} />
                    {property.kitchen}
                  </span>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-navy">
                    ₦{property.price.toLocaleString()}
                  </span>
                  <Link
                    href={`/properties/${property.slug}`}
                    className="bg-navy text-white px-6 py-2 rounded-full text-xs font-semibold hover:bg-navy-dark transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-12">
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                type="button"
                className={`w-9 h-9 rounded-full text-sm font-medium transition-colors ${
                  page === 1
                    ? "bg-navy text-white"
                    : "border border-gray-200 text-gray-dark hover:border-navy hover:text-navy"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
