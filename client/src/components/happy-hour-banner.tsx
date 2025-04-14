export default function HappyHourBanner() {
  return (
    <div className="relative bg-amber-50  p-4 flex items-center gap-4 border border-amber-100 shadow-sm">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 "></div>
      <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
        <span className="text-white font-bold text-xl">!</span>
      </div>

      <div>
        <h3 className="text-gray-800 text-xl font-semibold">Happy Hour</h3>
        <p className="text-gray-700">16:00 - 17:00 hs MEX</p>
      </div>
    </div>
  );
}
