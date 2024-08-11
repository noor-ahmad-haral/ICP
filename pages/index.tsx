import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { title, subtitle } from "@/components/primitives";
import Layout from "../layouts/default";
import WhyUs from "@/components/WhyUs";
import {MarqueeDemo} from "@/components/Marquee";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <Layout>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 text-center ">
          <div className="inline-block max-w-lg">
            <h1 className={title()}>Your&nbsp;</h1>
            <h1 className={title({ color: "violet" })}>Journey&nbsp;</h1>
            <br />
            <h1 className={title()}>To stunning images</h1>
            <br />
            <h1 className={title({ color: "violet" })}>Begins&nbsp;</h1>
            <h1 className={title()}>Here.</h1>
            <h4 className={subtitle({ class: "mt-4" })}>
              Create professional images for free with the most capable AI photo editor.
            </h4>
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105">
              <Link href="/tools">Get Started</Link>
            </button>
          </div>
        </section>

        <section className="space-y-8 p-8">
          <div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <div className="md:w-1/2 p-4">
              <div className="flex justify-center">
                <Image src="/tools-images/background-remover.jpg" alt="Erase any background" width={500} height={500} className="rounded shadow-md object-cover w-full h-64" />
              </div>
            </div>
            <div className="md:w-1/2 p-4 text-center md:text-left">
              <h3 className="text-2xl font-bold text-blue-900">Erase any background</h3>
              <p className="mt-4 text-gray-600">
                Edit photos quickly and accurately without any effort. Photoaura simplifies your images, maintaining focus on the foreground and is twice as accurate as other apps.
              </p>
              <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105">
                Explore Background Removal
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <div className="md:w-1/2 p-4">
              <div className="flex justify-center">
                <Image src="/tools-images/Image-Upscaler.png" alt="Create backgrounds instantly with AI" width={500} height={500} className="rounded shadow-md object-cover w-full h-64" />
              </div>
            </div>
            <div className="md:w-1/2 p-4 text-center md:text-left">
              <h3 className="text-2xl font-bold text-blue-900">Upscale Images with AI</h3>
              <p className="mt-4 text-gray-600">
                ImageCraftPro uses the power of AI to create realistic, studio-quality backgrounds for your product images in seconds.
              </p>
              <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105">
                Image Upscaler
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <div className="md:w-1/2 p-4">
              <div className="flex justify-center">
                <Image src="/tools-images/image-denoise.jpg" alt="Expand images beyond their borders with AI" width={500} height={500} className="rounded shadow-md object-cover w-full h-64" />
              </div>
            </div>
            <div className="md:w-1/2 p-4 text-center md:text-left">
              <h3 className="text-2xl font-bold text-blue-900">Good Bye Blurry Noisy Images</h3>
              <p className="mt-4 text-gray-600">
              Revive Your Photos with Effortless Clarity.
              Transform Noisy Images into Stunning Masterpieces.
              Experience the Magic of Seamless Denoising Today.
              </p>
              <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105">
                Image Denoiser 
              </button>
             

            </div>
            
          </div>
        </section>
        {/* <WhyUs /> */}

        <div className="mx-20">
        <MarqueeDemo />
        </div>


      </Layout>
    </main>
  );
}
