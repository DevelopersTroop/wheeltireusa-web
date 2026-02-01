import Image from "next/image";

const TireImage = () => {
  return (
    <div>
      <Image
        className={"mx-auto d-block w-full max-w-[400px] object-cover"}
        height={238}
        width={238}
        alt={"Tire Image"}
        src={"/images/tires/tire-size.webp"}
      ></Image>
      <div className="flex justify-center items-center py-4 font-medium">
        <p>Tires</p>
      </div>
    </div>
  );
};

export default TireImage;
