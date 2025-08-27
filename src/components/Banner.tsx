import Image from "next/image";

interface BannerProps {
  title: string;
  subtitle: string;
}

const Banner: React.FC<BannerProps> = ({ title, subtitle }) => (
  <section className="relative w-full h-[420px] flex-shrink-0 flex items-center justify-center overflow-hidden">
    <Image
      src="/banner/banner1.jpg"
      alt="Banner"
      fill
      className="object-cover object-top"
      priority
    />
    <div className="absolute inset-0 bg-[#2e0327bb]"></div>
    <div className="relative z-10 flex flex-col items-center px-4 md:px-0">
      <h1 className="text-white text-6xl font-bold mb-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)] text-center">
        {title}
      </h1>
      <div className="flex items-center gap-2 text-[#FFC827] font-medium text-xl drop-shadow">
        <span>{subtitle}</span>
      </div>
    </div>
  </section>
);

export default Banner;
