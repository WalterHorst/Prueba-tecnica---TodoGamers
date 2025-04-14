import BarCard from "./bar-card";

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
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4 px-4 md:px-8 lg:px-16">{title}</h2>

      <div className="overflow-x-auto no-scrollbar pb-4">
        <div className="flex gap-4 px-4 md:px-8 lg:px-16">
          {Bars.map((Bar, index) => (
            <div
              key={index}
              className="min-w-[280px] md:min-w-[320px] flex-shrink-0"
            >
              <BarCard
                name={Bar.name}
                address={Bar.address}
                phone={Bar.phone}
                imageUrl={Bar.imageUrl}
                id={Bar.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
