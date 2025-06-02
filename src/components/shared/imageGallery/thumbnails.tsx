import Image from 'next/image';

export const Thumbnail: React.FC<{ src: string; active: boolean }> = ({
  src,
  active,
}) => {
  return (
    <div className="relative flex justify-center items-center">
      {!active ? (
        <div className="h-full w-full absolute top-0 left-0 bg-[#BBBBAA] opacity-50 z-20 rounded-sm" />
      ) : null}
      <Image
        priority={active ? true : false}
        className="z-10"
        src={src?.length > 0 ? src : '/not-available.webp'}
        alt=""
        width={100}
        height={100}
      />
    </div>
  );
};
