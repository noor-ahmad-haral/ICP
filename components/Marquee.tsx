import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import Image from "next/image";

// Generate the reviews array dynamically
const reviews = Array.from({ length: 20 }, (_, i) => ({
  img: `/roll_items/roll_items${(i + 1).toString().padStart(2, '0')}.webp`
}));

// Split reviews into different groups for each row
const firstRow = reviews.slice(0, 7); // First 7 images
const secondRow = reviews.slice(7, 14); // Next 7 images
const thirdRow = reviews.slice(14, 20); // Last 6 images

const ReviewCard = ({ img }: { img: string }) => {
  return (
    <figure
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-2xl border",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center justify-center gap-4 max-w-[120px]">
        <Image src={img} alt="" width={120} height={120} />
      </div>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
      <h1 className="text-3xl font-semibold text-center mt-4 text-black">
        Trained on over a billion+ marketing images
      </h1>
      <p className="text-3xl font-semibold text-center mb-6 text-black">
        We understand better how to highlight product selling points.
      </p>
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:15s]">
        {secondRow.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </Marquee>
      <Marquee pauseOnHover className="[--duration:20s]">
        {thirdRow.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
