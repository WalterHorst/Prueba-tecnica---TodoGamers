import HappyHourBanner from "@/components/happy-hour-banner";
import BarCarousel from "@/components/bar-carousel";
import { getBreweries } from "@/services/brewery-api.actions";

export default async function Home() {
  // Datos de ejemplo para los carruseles
  const breweries = await getBreweries();

  const californiaOptions = await getBreweries("California");
  return (
    <div className="pb-4 overflow-y-auto no-scrollbar">
      <div className="max-w-7xl mx-auto">
        <HappyHourBanner />
        <BarCarousel title="Todas las opciones" Bars={breweries} />
        <BarCarousel title="Opciones en California" Bars={californiaOptions} />
      </div>
    </div>
  );
}
