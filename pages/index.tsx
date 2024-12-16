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

        <section className="space-y-8 p-4">
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
              <h3 className="text-xl md:text-2xl font-semibold text-blue-900">Erase any background</h3>
              <p className="mt-4 text-gray-600 leading-relaxed text-sm md:text-base">
                Edit photos quickly and accurately without any effort. Photoaura simplifies your images, maintaining focus on the foreground and is twice as accurate as other apps.
              </p>
              <button className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors">
                <Link href="/tools/background-remover">Background Remover</Link>
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
              <h3 className="text-xl md:text-2xl font-semibold text-blue-900">Upscale Images with AI</h3>
              <p className="mt-4 text-gray-600 leading-relaxed text-sm md:text-base">
                ImageCraftPro uses the power of AI to create realistic, studio-quality backgrounds for your product images in seconds.
              </p>
              <button className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors">
                <Link href="/tools/image-upscaler">Image Upscaler</Link>
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
