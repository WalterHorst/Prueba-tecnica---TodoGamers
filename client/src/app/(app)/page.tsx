import HappyHourBanner from "@/components/happy-hour-banner";
import BarCarousel from "@/components/bar-carousel";
import { getBreweries } from "@/services/brewery-api.actions";

export default async function Home() {
  const breweries = await getBreweries();
  const californiaOptions = await getBreweries("California");

  console.log("Breweries:", breweries.length);
  console.log("California Options:", californiaOptions.length);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-12">
        <HappyHourBanner />
        <BarCarousel title="Todas las opciones" Bars={breweries} />
        <BarCarousel title="Opciones en California" Bars={californiaOptions} />
      </div>
    </div>
  );
}
