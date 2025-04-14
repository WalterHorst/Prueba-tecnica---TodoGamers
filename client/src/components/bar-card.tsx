import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

interface BarCardProps {
  name: string;
  address: string;
  phone: string;
  imageUrl: string;
  id?: string;
}

export default function BarCard({
  name,
  address,
  phone,
  imageUrl,
  id = "1",
}: BarCardProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-4 w-[359px] h-[191px] flex flex-col">
      <div className="flex gap-3 flex-1">
        <div className="shrink-0">
          <div className="w-[60px] h-[60px] relative">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={name}
              fill
              className="rounded-full object-cover"
              sizes="60px"
            />
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <h3 className="font-semibold text-white mb-1 truncate">{name}</h3>
          <div className="flex items-center text-gray-400 text-sm mb-1">
            <MapPin size={14} className="mr-1 shrink-0" />
            <span className="truncate">{address}</span>
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            <Phone size={14} className="mr-1 shrink-0" />
            <span className="truncate">{phone}</span>
          </div>
        </div>
      </div>
      <div className="mt-auto flex justify-center">
        <Link href={`/bar/${id}`}>
          <button className="w-[244px] h-[32px] bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white text-sm rounded-[8px]">
            Ver más
          </button>
        </Link>
      </div>
    </div>
  );
}
