import {
  Brewery,
  BreweryParsed,
  BreweryDetailParsed,
} from "@/types/brewerys.type";
import axios from "axios";

export async function getBreweries(state?: string): Promise<BreweryParsed[]> {
  try {
    const res = await axios.get<Brewery[]>(
      "https://api.openbrewerydb.org/v1/breweries",
      {
        params: {
          by_state: state,
        },
      }
    );

    const breweries: BreweryParsed[] = res.data.map((b) => ({
      id: b.id,
      name: b.name,
      address: `${b.street}, ${b.city}, ${b.state_province ?? b.state}`,
      phone: b.phone ?? "No disponible",
      imageUrl:
        "https://i.pinimg.com/736x/0f/6a/be/0f6abebb50c51850ad109944a289d86d.jpg",
    }));

    return breweries;
  } catch (error) {
    console.error("Error en getBreweries:", error);
    throw error;
  }
}

export async function getBreweryById(id: string): Promise<BreweryDetailParsed> {
  try {
    const res = await axios.get(
      `https://api.openbrewerydb.org/v1/breweries/${id}`
    );

    const brewery: BreweryDetailParsed = {
      id: res.data.id,
      name: res.data.name,
      address: `${res.data.street}, ${res.data.city}, ${
        res.data.state_province ?? res.data.state
      }`,
      phone: res.data.phone ?? "No disponible",
      images: [
        "https://installbeer.com/cdn/shop/articles/barcelona-la-meca-de-la-cerveza_1200x.webp?v=1697728782",
        "https://www.thelodgeatcreel.com/cerveceria/1.jpg",
        "https://portaluniversidad.org.ar/wp-content/uploads/2022/12/rts.jpg",
      ],
      reviews: [
        {
          name: "Cris",
          image: "https://randomuser.me/api/portraits/men/75.jpg",
          comment:
            "Gran variedad de cervezas artesanales. Probé una IPA local que estaba espectacular.",
        },
        {
          name: "Dina",
          image: "https://randomuser.me/api/portraits/women/65.jpg",
          comment:
            "El ambiente es relajado y la atención excelente. Recomiendo la cerveza de trigo.",
        },
        {
          name: "Julia",
          image: "https://randomuser.me/api/portraits/women/55.jpg",
          comment:
            "Las cervezas están frías y bien servidas. Ideal para venir con amigos después del trabajo.",
        },
        {
          name: "Rubén",
          image: "https://randomuser.me/api/portraits/men/45.jpg",
          comment:
            "Muy buena música y birra artesanal. La porter de la casa es una joyita.",
        },
        {
          name: "Bruno",
          image: "https://randomuser.me/api/portraits/men/85.jpg",
          comment:
            "Precios accesibles y muchas opciones de cervezas tiradas. Volvería sin dudar.",
        },
      ],
    };

    return brewery;
  } catch (error) {
    console.error("Error en getBreweryById:", error);
    throw error;
  }
}
