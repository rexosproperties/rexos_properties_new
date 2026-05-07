"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AgentMatchingModal from "@/components/ui/AgentMatchingModal";

const propertyTabs = ["For Sale", "For Rent"];
const sortOptions = ["Newest", "Popular", "Recommendation"];

export interface PublicProperty {
  id: string;
  title: string;
  slug: string;
  location: string;
  price: number;
  type: string;
  status: string;
  bedrooms: number;
  bathrooms: number;
  coverImage: string;
  createdAt: string;
}

export default function PropertiesClient({
  properties,
}: {
  properties: PublicProperty[];
}) {
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
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const filtered = useMemo(() => {
    const desiredType = activeTab === "For Rent" ? "rent" : "sale";
    let result = properties.filter((p) => p.type === desiredType);

    if (formData.location.trim()) {
      const q = formData.location.trim().toLowerCase();
      result = result.filter((p) => p.location.toLowerCase().includes(q));
    }
    if (formData.rooms) {
      const minRooms = formData.rooms === "4+" ? 4 : Number(formData.rooms);
      result = result.filter((p) =>
        formData.rooms === "4+"
          ? p.bedrooms >= 4
          : p.bedrooms === minRooms,
      );
    }

    if (activeSort === "Newest") {
      result = [...result].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }
    return result;
  }, [properties, activeTab, activeSort, formData]);

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

      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-navy mb-4">
            Find Your Dream Home
          </h1>
          <p className="text-gray-dark text-base max-w-xl mx-auto">
            Explore a curated selection of properties that match your needs and
            preferences.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
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

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div>
              <label htmlFor="prop-type" className="text-xs font-semibold text-navy mb-1 block">Type</label>
              <select
                id="prop-type"
                value={formData.type}
                onChange={(e) => handleFormChange("type", e.target.value)}
                className="w-full border border-gray-200 rounded-full px-4 py-2.5 text-sm text-gray-dark focus:outline-none focus:ring-2 focus:ring-navy/20 appearance-none"
              >
                <option value="">Select</option>
                <option>Apartment</option>
                <option>Duplex</option>
                <option>Terrace</option>
                <option>Detached</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-navy mb-1 block">Price</label>
              <input
                type="text"
                placeholder="Set Range"
                value={formData.price}
                onChange={(e) => handleFormChange("price", e.target.value)}
                className="w-full border border-gray-200 rounded-full px-4 py-2.5 text-sm text-gray-dark focus:outline-none focus:ring-2 focus:ring-navy/20"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-navy mb-1 block">Location</label>
              <input
                type="text"
                placeholder="Search"
                value={formData.location}
                onChange={(e) => handleFormChange("location", e.target.value)}
                className="w-full border border-gray-200 rounded-full px-4 py-2.5 text-sm text-gray-dark focus:outline-none focus:ring-2 focus:ring-navy/20"
              />
            </div>
            <div>
              <label htmlFor="prop-rooms" className="text-xs font-semibold text-navy mb-1 block">Rooms</label>
              <select
                id="prop-rooms"
                value={formData.rooms}
                onChange={(e) => handleFormChange("rooms", e.target.value)}
                className="w-full border border-gray-200 rounded-full px-4 py-2.5 text-sm text-gray-dark focus:outline-none focus:ring-2 focus:ring-navy/20 appearance-none"
              >
                <option value="">Choose</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4+</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-sm text-navy font-medium">Sort By</span>
              <div className="flex items-center gap-2">
                {sortOptions.map((option) => (
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
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto justify-center bg-navy text-white px-8 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-dark py-12">
              No properties match your filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((property) => (
                <div key={property.id} className="group">
                  <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                    <Image
                      src={property.coverImage}
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-navy text-xs font-semibold px-4 py-1.5 rounded-full">
                      {property.type === "rent" ? "For Rent" : "For Sale"}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-navy mb-1">
                    {property.title}
                  </h3>

                  <div className="flex items-center gap-1 text-xs text-gray-dark mb-3">
                    <Image src="/assets/images/Icon/Location Icon.svg" alt="Location" width={12} height={12} />
                    {property.location}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-dark mb-4">
                    <span className="flex items-center gap-1">
                      <Image src="/assets/images/Icon/Bedrooms.svg" alt="Bedrooms" width={16} height={16} />
                      {property.bedrooms}
                    </span>
                    <span className="flex items-center gap-1">
                      <Image src="/assets/images/Icon/bathroom.svg" alt="Bathrooms" width={16} height={16} />
                      {property.bathrooms}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-navy">
                      ₦{property.price.toLocaleString()}
                    </span>
                    <Link
                      href={`/properties/${property.slug}`}
                      className="bg-navy text-white px-6 py-2 rounded-full text-xs font-semibold hover:opacity-90 transition-opacity"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
