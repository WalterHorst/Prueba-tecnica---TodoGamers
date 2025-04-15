"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BarCard from "./bar-card";
import { useState } from "react";

interface Bar {
  name: string;
  address: string;
  phone: string;
  imageUrl: string;
  id: string;
}

interface BarCarouselProps {
  title: string;
  Bars: Bar[];
}

export default function BarCarousel({ title, Bars }: BarCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(Bars.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4 px-4 md:px-8 lg:px-16">
        <h2 className="text-2xl font-bold">{title}</h2>

        {/* Desktop pagination controls */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={prevPage}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
            disabled={currentPage === 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="text-sm font-medium">
            {currentPage + 1} / {totalPages}
          </span>
          <button
            onClick={nextPage}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
            disabled={currentPage === totalPages - 1}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile view - Touch scroll */}
      <div className="md:hidden w-full overflow-x-auto overflow-y-hidden touch-pan-x no-scrollbar">
        <div className="inline-flex gap-4 px-4 pb-4">
          {Bars.map((bar) => (
            <div key={bar.id} className="flex-none">
              <BarCard
                name={bar.name}
                address={bar.address}
                phone={bar.phone}
                imageUrl={bar.imageUrl}
                id={bar.id}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop view - Paginated grid */}
      <div className="hidden md:block px-8 lg:px-16">
        <div className="grid grid-cols-3 gap-6">
          {Bars.slice(
            currentPage * itemsPerPage,
            (currentPage + 1) * itemsPerPage
          ).map((bar) => (
            <div key={bar.id}>
              <BarCard
                name={bar.name}
                address={bar.address}
                phone={bar.phone}
                imageUrl={bar.imageUrl}
                id={bar.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
