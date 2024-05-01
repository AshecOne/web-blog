import * as React from "react";

interface IDestinationProps {
  img: string;
  name: string;
  about: string;
}

const Destination: React.FunctionComponent<IDestinationProps> = ({
  img,
  name,
  about,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <div
      className="relative mx-5 transition-all cursor-pointer duration-300 ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={img}
        alt={name}
        className={`destination-image m:w-[260px] m:h-[140px] md:w-[160px] md:h-[170px] lg:w-[250px] lg:h-[200px] transition-all duration-300 ease-in-out ${
          isHovered ? "scale-110" : ""
        }`}
      />
      <span
        className={`absolute inset-0 flex text-center items-center justify-center font-bold text-white transition-all duration-300 ease-in-out ${
          isHovered ? "lg:text-xl text-md" : "text-xs lg:text-md"
        }`}
      >
        {about}
      </span>
    </div>
  );
};

export default Destination;
