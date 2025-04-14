export interface Brewery {
  id: string;
  name: string;
  brewery_type: string;
  address_1: string | null;
  address_2: string | null;
  address_3: string | null;
  city: string;
  state_province: string | null;
  postal_code: string;
  country: string;
  longitude: number | null;
  latitude: number | null;
  phone: string | null;
  website_url: string | null;
  state: string | null;
  street: string | null;
}

export interface BreweryParsed {
  id: string;
  name: string;
  address: string;
  phone: string;
  imageUrl: string;
}

export interface Review {
  name: string;
  image: string;
  comment: string;
}

export interface BreweryDetailParsed {
  id: string;
  name: string;
  address: string;
  phone: string;
  images: string[];
  reviews: Review[];
}
