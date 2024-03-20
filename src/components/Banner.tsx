import * as React from 'react';

interface IBannerProps {
}

const Banner: React.FunctionComponent<IBannerProps> = (props) => {
  return (
    <div
          className="relative flex items-center justify-center text-white text-center h-[400px]"
          style={{
            backgroundImage: 'url("/beach.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>

          <div className="z-10 p-8">
            <span className="bg-white opacity-40 font-bold text-black text-xs py-1 px-3 rounded inline-block mb-2">
              Travel
            </span>
            <h1 className="text-4xl font-bold mb-2">
              Richird Norton photorealistic rendering as real
            </h1>
            <p className="text-xl mb-4">
              Progressively incentivize cooperative systems through technically
              sound functionalities. The credibly productivate seamless data.
            </p>
            <button className="bg-white text-black hover:bg-gray-500 hover:text-white transition duration-300 font-semibold py-2 px-4 rounded">
              Start planning your trip
            </button>
          </div>
        </div>
  );
};

export default Banner;
