'use client'
import Image from "next/image";
import Layout from "../layouts/default";

const focusAreas = [
    {
        title: 'Computer Vision',
        description: 'Developing advanced computer vision algorithms to enhance image processing capabilities.',
    },
    {
        title: 'Image Upscaler',
        description: 'Creating an AI-powered image upscaling tool for generating high-resolution images.',
    },
    {
        title: 'Background Remover',
        description: 'Building an automatic background removal tool using advanced segmentation techniques.',
    },
    {
        title: 'Object Remover',
        description: 'Developing a tool to seamlessly remove unwanted objects from images.',
    },
    {
        title: 'Generative AI',
        description: 'Exploring generative AI models for creative applications such as image synthesis and style transfer.',
    },
];

export default function Example() {
    return (
        <Layout>
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl space-y-16 divide-y divide-gray-100 lg:mx-0 lg:max-w-none">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Get in touch</h2>
                                <p className="mt-4 leading-7 text-gray-600">
                                    Quam nunc nunc eu sed. Sed rhoncus quis ultricies ac pellentesque.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
                                <div className="rounded-2xl bg-gray-50 p-10">
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">Collaborate</h3>
                                    <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                                        <div>
                                            <dt className="sr-only">Email</dt>
                                            <dd>
                                                <a href="mailto:collaborate@example.com" className="font-semibold text-indigo-600">
                                                    collaborate@example.com
                                                </a>
                                            </dd>
                                        </div>
                                        <div className="mt-1">
                                            <dt className="sr-only">Phone number</dt>
                                            <dd>+1 (555) 905-2345</dd>
                                        </div>
                                    </dl>
                                </div>
                                <div className="rounded-2xl bg-gray-50 p-10">
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">Press</h3>
                                    <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                                        <div>
                                            <dt className="sr-only">Email</dt>
                                            <dd>
                                                <a href="mailto:press@example.com" className="font-semibold text-indigo-600">
                                                    press@example.com
                                                </a>
                                            </dd>
                                        </div>
                                        <div className="mt-1">
                                            <dt className="sr-only">Phone number</dt>
                                            <dd>+1 (555) 905-3456</dd>
                                        </div>
                                    </dl>
                                </div>
                                <div className="rounded-2xl bg-gray-50 p-10">
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">Join our team</h3>
                                    <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                                        <div>
                                            <dt className="sr-only">Email</dt>
                                            <dd>
                                                <a href="mailto:careers@example.com" className="font-semibold text-indigo-600">
                                                    careers@example.com
                                                </a>
                                            </dd>
                                        </div>
                                        <div className="mt-1">
                                            <dt className="sr-only">Phone number</dt>
                                            <dd>+1 (555) 905-4567</dd>
                                        </div>
                                    </dl>
                                </div>
                                <div className="rounded-2xl bg-gray-50 p-10">
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">Say hello</h3>
                                    <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                                        <div>
                                            <dt className="sr-only">Email</dt>
                                            <dd>
                                                <a href="mailto:hello@example.com" className="font-semibold text-indigo-600">
                                                    hello@example.com
                                                </a>
                                            </dd>
                                        </div>
                                        <div className="mt-1">
                                            <dt className="sr-only">Phone number</dt>
                                            <dd>+1 (555) 905-5678</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 pt-16 lg:grid-cols-3">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Locations</h2>
                                <p className="mt-4 leading-7 text-gray-600">
                                    Consequat sunt cillum cillum elit sint. Qui occaecat nisi in ipsum commodo.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
                                <div className="rounded-2xl bg-gray-50 p-10">
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">Los Angeles</h3>
                                    <address className="mt-3 space-y-1 text-sm not-italic leading-6 text-gray-600">
                                        <p>4556 Brendan Ferry</p>
                                        <p>Los Angeles, CA 90210</p>
                                    </address>
                                </div>
                                <div className="rounded-2xl bg-gray-50 p-10">
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">New York</h3>
                                    <address className="mt-3 space-y-1 text-sm not-italic leading-6 text-gray-600">
                                        <p>886 Walter Street</p>
                                        <p>New York, NY 12345</p>
                                    </address>
                                </div>
                                <div className="rounded-2xl bg-gray-50 p-10">
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">Toronto</h3>
                                    <address className="mt-3 space-y-1 text-sm not-italic leading-6 text-gray-600">
                                        <p>7363 Cynthia Pass</p>
                                        <p>Toronto, ON N3Y 4H8</p>
                                    </address>
                                </div>
                                <div className="rounded-2xl bg-gray-50 p-10">
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">Chicago</h3>
                                    <address className="mt-3 space-y-1 text-sm not-italic leading-6 text-gray-600">
                                        <p>726 Mavis Island</p>
                                        <p>Chicago, IL 60601</p>
                                    </address>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-xl lg:max-w-4xl">
                        <h2 className="text-4xl font-bold tracking-tight text-gray-900">Let’s talk about your project</h2>
                        <p className="mt-2 text-lg leading-8 text-gray-600">
                            We help companies and individuals build out their brand guidelines.
                        </p>
                        <div className="mt-16 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
                            <form action="#" method="POST" className="lg:flex-auto">
                                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                            First name
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                id="first-name"
                                                name="first-name"
                                                type="text"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                            Last name
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                id="last-name"
                                                name="last-name"
                                                type="text"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="budget" className="block text-sm font-semibold leading-6 text-gray-900">
                                            Budget
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                id="budget"
                                                name="budget"
                                                type="text"
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="website" className="block text-sm font-semibold leading-6 text-gray-900">
                                            Website
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                id="website"
                                                name="website"
                                                type="url"
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                                            Message
                                        </label>
                                        <div className="mt-2.5">
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={4}
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                defaultValue={''}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-10">
                                    <button
                                        type="submit"
                                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Let’s talk
                                    </button>
                                </div>
                                <p className="mt-4 text-sm leading-6 text-gray-500">
                                    By submitting this form, I agree to the{' '}
                                    <a href="#" className="font-semibold text-indigo-600">
                                        privacy&nbsp;policy
                                    </a>
                                    .
                                </p>
                            </form>
                            <div className="lg:mt-6 lg:w-80 lg:flex-none">
                                <img alt="" src="https://tailwindui.com/img/logos/workcation-logo-indigo-600.svg" className="h-12 w-auto" />
                                <figure className="mt-10">
                                    <blockquote className="text-lg font-semibold leading-8 text-gray-900">
                                        <p>
                                            “Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias
                                            molestiae. Numquam corrupti in laborum sed rerum et corporis.”
                                        </p>
                                    </blockquote>
                                    <figcaption className="mt-10 flex gap-x-6">
                                        <img
                                            alt=""
                                            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=96&h=96&q=80"
                                            className="h-12 w-12 flex-none rounded-full bg-gray-50"
                                        />
                                        <div>
                                            <div className="text-base font-semibold text-gray-900">Brenna Goyette</div>
                                            <div className="text-sm leading-6 text-gray-600">CEO of Workcation</div>
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}