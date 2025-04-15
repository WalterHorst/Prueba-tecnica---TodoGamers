"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

import Image from "next/image";
import { MapPin, Phone, ArrowLeft } from "lucide-react";
import { getBreweryById } from "@/services/brewery-api.actions";
import { useEffect, useState } from "react";
import {
  BreweryDetailParsed,
  Review as ReviewType,
} from "@/types/brewerys.type";
import Loader from "@/components/loader";

interface ReviewProps {
  name: string;
  image: string;
  comment: string;
}

function Review({ name, image, comment }: ReviewProps) {
  return (
    <div className="bg-black text-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={image}
              alt="Profile picture"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          </div>
          <h3 className="font-bold text-lg">{name}</h3>
        </div>
        <button className="text-purple-500 font-medium">Responder</button>
      </div>
      <div className="mt-2">
        <p className="text-white/90 text-sm">{comment}</p>
      </div>
    </div>
  );
}

export default function BarPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [breweryDetails, setBreweryDetails] = useState<BreweryDetailParsed>();

  useEffect(() => {
    if (id) {
      getBreweryById(id as string)
        .then((data) => {
          setBreweryDetails(data);
        })
        .catch((error) => {
          console.error("Error fetching brewery:", error);
        });
    }
  }, [id]);

  if (!breweryDetails) return <Loader />;

  return (
    <>
      <div className="pb-20 overflow-y-auto no-scrollbar">
        <div className="max-w-3xl mx-auto">
          <div className="p-4 md:p-6 lg:p-8">
            <button
              onClick={() => router.back()}
              className="mb-4 flex items-center text-gray-400"
            >
              <ArrowLeft size={18} className="mr-1" />
              Volver
            </button>
            <h1 className="text-2xl font-bold mb-2">{breweryDetails.name}</h1>
            <div className="flex items-center text-gray-400 mb-2">
              <MapPin size={16} className="mr-2" />
              <span>{breweryDetails.address}</span>
            </div>
            <div className="flex items-center text-gray-400">
              <Phone size={16} className="mr-2" />
              <span>{breweryDetails.phone}</span>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar p-4 md:p-6 lg:p-8  ">
            {breweryDetails.images.map((image: string, index: number) => (
              <div
                key={index}
                className="flex-shrink-0 w-[156px] h-[104px] relative rounded-lg overflow-hidden bg-gray-900"
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${breweryDetails.name} image ${index + 1}`}
                  width={200}
                  height={120}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="p-4 md:p-6 lg:p-8">
            <h2 className="text-xl font-bold mb-3">Opiniones</h2>
            <div className="space-y-1">
              {breweryDetails.reviews.map(
                (review: ReviewType, index: number) => (
                  <Review
                    key={index}
                    name={review.name}
                    image={review.image}
                    comment={review.comment}
                  />
                )
              )}
            </div>
          </div>

          <div className="px-4 md:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:gap-4 space-y-3 md:space-y-0">
              <button className="w-full md:w-1/2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-[12px] h-[48px] font-medium transition-colors">
                Reservar mesa
              </button>
              <div className="w-full md:w-1/2">
                <div className="relative rounded-[12px] p-[1px] bg-gradient-to-r from-blue-600 to-pink-600">
                  <button className="w-full text-white text-base font-medium bg-black rounded-[12px] h-[48px]">
                    Opciones de transporte
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
