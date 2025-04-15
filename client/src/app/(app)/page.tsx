import HappyHourBanner from "@/components/happy-hour-banner";
import BarCarousel from "@/components/bar-carousel";
import { getBreweries } from "@/services/brewery-api.actions";

export default async function Home() {
  const breweries = await getBreweries();
  const californiaOptions = await getBreweries("California");

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="container mx-auto ">
        <HappyHourBanner />
        <BarCarousel title="Todas las opciones" Bars={breweries} />
        <BarCarousel title="Opciones en California" Bars={californiaOptions} />
      </div>
    </div>
  );
}
