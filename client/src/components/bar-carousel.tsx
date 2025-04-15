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
  const itemsPerPage = 4;
  const totalPages = Math.ceil(Bars.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="mt-8 mb-12">
      <div className="flex justify-between items-center mb-6 px-4 md:px-0">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      {/* Mobile  */}
      <div className="lg:hidden relative">
        <div className="overflow-x-auto no-scrollbar snap-x snap-mandatory">
          <div className="flex gap-4 px-4">
            {Bars.map((bar) => (
              <div key={bar.id} className="w-[359px] flex-shrink-0 snap-start">
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

      {/* Vista escritorio */}
      <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Paginacion */}
      {totalPages > 1 && (
        <div className="hidden lg:flex justify-center mt-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage(0)}
              className="h-8 w-8 rounded-full flex items-center justify-center border border-gray-700 hover:bg-gray-800 transition-colors"
              disabled={currentPage === 0}
            >
              <span className="text-xs font-bold">&laquo;</span>
              <span className="sr-only">Primera página</span>
            </button>
            <button
              onClick={prevPage}
              className="h-8 w-8 rounded-full flex items-center justify-center border border-gray-700 hover:bg-gray-800 transition-colors"
              disabled={currentPage === 0}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Página anterior</span>
            </button>

            <span className="text-sm text-gray-400 min-w-[50px] text-center">
              {currentPage + 1} / {totalPages}
            </span>

            <button
              onClick={nextPage}
              className="h-8 w-8 rounded-full flex items-center justify-center border border-gray-700 hover:bg-gray-800 transition-colors"
              disabled={currentPage === totalPages - 1}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Página siguiente</span>
            </button>
            <button
              onClick={() => setCurrentPage(totalPages - 1)}
              className="h-8 w-8 rounded-full flex items-center justify-center border border-gray-700 hover:bg-gray-800 transition-colors"
              disabled={currentPage === totalPages - 1}
            >
              <span className="text-xs font-bold">&raquo;</span>
              <span className="sr-only">Última página</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
