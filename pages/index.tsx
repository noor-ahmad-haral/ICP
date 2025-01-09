import Image from "next/image";
import Link from "next/link";
import { title, subtitle } from "@/components/primitives";
import Layout from "../layouts/default";
import { MarqueeDemo } from "@/components/Marquee";


export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <Layout>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 text-center px-4">
          <div className="inline-block max-w-lg">
            <h1 className={title() + " text-3xl md:text-5xl"}>Your&nbsp;</h1>
            <h1 className={title({ color: "violet" }) + " text-3xl md:text-5xl"}>Journey&nbsp;</h1>
            <br />
            <h1 className={title() + " text-3xl md:text-5xl"}>To stunning images</h1>
            <br />
            <h1 className={title({ color: "violet" }) + " text-3xl md:text-5xl"}>Begins&nbsp;</h1>
            <h1 className={title() + " text-3xl md:text-5xl"}>Here.</h1>
            <h4 className={subtitle({ class: "mt-4 text-lg md:text-xl" })}>
              Create professional images for free with the most capable AI photo editor.
            </h4>
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105">
              <Link href="/tools">Get Started</Link>
            </button>
          </div>
        </section>

        <section className="space-y-8 p-4 max-w-[1200px] mx-auto">
          {/* Background Remover */}
          <div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-lg border border-gray-200">
            <div className="w-full md:w-1/2 p-4">
              <div className="flex justify-center">
                <Image
                  src="/tools-images/background-remover.jpg"
                  alt="Erase any background"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover w-full h-48 md:h-auto transition-transform hover:scale-105"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 p-6 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-semibold text-blue-900">AI Background Remover</h3>
              <p className="mt-4 text-gray-600 leading-relaxed text-sm md:text-base">
              Remove backgrounds from your photos with precision and speed. Achieve clean, professional images in seconds using advanced AI tools, perfect for product photography, portraits, or creative projects!
              </p>
              <button className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors">
                <Link href="/tools/background-remover">Try Now!</Link>
              </button>
            </div>
          </div>

          {/* Image Upscaler */}
          <div className="flex flex-col md:flex-row-reverse items-center bg-white p-6 rounded-lg border border-gray-200">
            <div className="w-full md:w-1/2 p-4">
              <div className="flex justify-center">
                <Image
                  src="/tools-images/Image-Upscaler.png"
                  alt="Upscale Images with AI"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover w-full h-48 md:h-auto transition-transform hover:scale-105"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 p-6 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-semibold text-blue-900">AI Image Upscaler</h3>
              <p className="mt-4 text-gray-600 leading-relaxed text-sm md:text-base">
              Enhance your images with cutting-edge AI technology, delivering sharp, high-resolution results instantly. ImageCraftPro ensures your product visuals stand out with studio-quality clarity and detail, perfect for professional presentations.
              </p>
              <button className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors">
                <Link href="/tools/image-upscaler">Try Now!</Link>
              </button>
            </div>
          </div>

          {/* third one  */}
          <div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-lg border border-gray-200">
            <div className="w-full md:w-1/2 p-4">
              <div className="flex justify-center">
                <Image
                  src="/tools-images/image-denoise.jpg"
                  alt="Erase any background"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover w-full h-48 md:h-auto transition-transform hover:scale-105"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 p-6 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-semibold text-blue-900">Image Denoiser</h3>
              <p className="mt-4 text-gray-600 leading-relaxed text-sm md:text-base">
              Enhance the clarity of your images by removing unwanted noise and grain. Perfect for improving low-light or high-ISO photos, our tool ensures sharper and cleaner results without losing details. Transform noisy visuals into professional-quality images effortlessly.
              </p>
              <button className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors">
                <Link href="/tools/image-denoiser">Try Now! </Link>
              </button>
            </div>
          </div>
        </section>

        <div className="w-full overflow-hidden px-4 md:px-20">
          <MarqueeDemo />
        </div>
      </Layout>
    </main>
  );
}
