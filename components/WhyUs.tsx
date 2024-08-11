'use client'
import React, { useEffect, useState } from 'react';
import { FaFileSignature, FaShieldAlt, FaDollarSign } from 'react-icons/fa';
import { faScissors } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function WhyUsSection() {
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRotation((prevRotation) => (prevRotation >= 180 ? 0 : prevRotation + 1));
        }, 35); // Adjust the interval for smoother or faster animation

        return () => clearInterval(intervalId);
    }, []);
    return (
        <div className="my-16 min-h-[60vh] md:min-h-[50vh] space-y-4">
            <div style={{ overflow: 'hidden', scrollBehavior: 'smooth' }}>
                <div style={{ opacity: 1, transform: 'translateY(0%) translateZ(0px)' }}>
                    <div className="" style={{ opacity: 1 }}>
                        <div className="items-center text-center space-y-5">
                            <h1 className="text-4xl md:text-7xl font-bold text-gray-500 pt-3" style={{ opacity: 1 }}>
                                Why US
                            </h1>
                            <p className="text-sm md:text-lg text-gray-500" style={{ opacity: 1 }}></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative flex w-full flex-col items-center justify-center max-w-7xl mx-auto space-y-4 overflow-hidden px-4 pt-12">
                <div className="mx-auto w-full max-w-md">
                    <div className="flex w-full items-center justify-center space-x-10 md:justify-between md:space-x-0">
                        <div className="h-[130px] w-[230px] overflow-hidden">
                            <div className="relative z-50 flex flex-col items-center justify-center space-y-2" style={{ opacity: 1, transform: 'none' }}>
                                <div className="flex h-8 md:h-12 w-8 md:w-12 items-center justify-center rounded-full bg-white shadow-neomorphism shadow-lg" style={{ transform: 'scale(1.02611) translateZ(0px)' }}>
                                    {/* <FaScissors className="lucide lucide-scissors h-4 md:h-6 w-4 md:w-6 text-slate-700" /> */}
                                    <FontAwesomeIcon icon={faScissors} />

                                </div>
                                <div className="rounded-md px-2 py-2 pb-5">
                                    <div className="text-center text-sm md:text-xl font-bold text-slate-500 bg-white rounded-full px-4 py-2">
                                        Easy Exit Policy
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-[130px] w-[230px] overflow-hidden">
                            <div className="relative z-50 flex flex-col items-center justify-center space-y-2" style={{ opacity: 1, transform: 'none' }}>
                                <div className="flex h-8 md:h-12 w-8 md:w-12 items-center justify-center rounded-full bg-white shadow-neomorphism shadow-lg" style={{ transform: 'scale(1.02611) translateZ(0px)' }}>
                                    <FaFileSignature className="lucide lucide-file-signature h-4 md:h-6 w-4 md:w-6 text-slate-700" />
                                </div>
                                <div className="rounded-md px-2 py-2 pb-5">
                                    <div className="text-center text-sm md:text-xl font-bold text-slate-500 bg-white rounded-full px-4 py-2">
                                        Fully Signed NDA
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto w-full max-w-3xl">
                    <div className="flex w-full items-center justify-center space-x-10 md:justify-between md:space-x-0">
                        <div className="h-[130px] w-[230px] overflow-hidden">
                            <div className="relative z-50 flex flex-col items-center justify-center space-y-2" style={{ opacity: 1, transform: 'none' }}>
                                <div className="flex h-8 md:h-12 w-8 md:w-12 items-center justify-center rounded-full bg-white shadow-neomorphism shadow-lg" style={{ transform: 'scale(1.07434) translateZ(0px)' }}>
                                    <FaShieldAlt className="lucide lucide-shield h-4 md:h-6 w-4 md:w-6 text-slate-700" />
                                </div>
                                <div className="rounded-md px-2 py-2 pb-5">
                                    <div className="text-center text-sm md:text-xl font-bold text-slate-500 bg-white rounded-full px-4 py-2">
                                        Code Security
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-[130px] w-[230px] overflow-hidden">
                            <div className="relative z-50 flex flex-col items-center justify-center space-y-2" style={{ opacity: 1, transform: 'none' }}>
                                <div className="flex h-8 md:h-12 w-8 md:w-12 items-center justify-center rounded-full bg-white shadow-neomorphism shadow-lg"  style={{ transform: 'scale(1.07467) translateZ(0px)' }}>
                                    <FaDollarSign className="lucide lucide-dollar-sign h-4 md:h-6 w-4 md:w-6 text-slate-700 " />
                                </div>
                                <div className="rounded-md px-2 py-2 pb-5">
                                    <div className="text-center text-sm md:text-xl font-bold text-slate-500 bg-white rounded-full px-4 py-2">
                                        No Hidden Costs
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex h-20 w-20 border-3 items-center justify-center rounded-full absolute -bottom-12">
                    <div
                        className="absolute right-1/2 top-1/2 z-40 flex h-[5px] overflow-hidden w-[340px] md:w-[300px] items-end justify-center bg-transparent"
                        style={{
                            transformOrigin: 'right center',
                            transform: `rotate(${rotation}deg) translateZ(0px)`,
                        }}
                    >
                        <div className="relative z-40 h-[2px] w-full bg-gradient-to-r from-transparent via-purple-400 to-blue-400"></div>
                    </div>
                    <div style={{ height: '5rem', width: '5rem', border: '1px solid rgba(71, 85, 105, 0.9)', opacity: 1 }} className="absolute inset-0 left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full"></div>
                    <div style={{ height: '10rem', width: '10rem', border: '1px solid rgba(71, 85, 105, 0.8)', opacity: 1 }} className="absolute inset-0 left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full"></div>
                    <div style={{ height: '15rem', width: '15rem', border: '1px solid rgba(71, 85, 105, 0.7)', opacity: 1 }} className="absolute inset-0 left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full"></div>
                    <div style={{ height: '20rem', width: '20rem', border: '1px solid rgba(71, 85, 105, 0.6)', opacity: 1 }} className="absolute inset-0 left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full"></div>
                    <div style={{ height: '25rem', width: '25rem', border: '1px solid rgba(71, 85, 105, 0.5)', opacity: 1 }} className="absolute inset-0 left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full"></div>
                    <div style={{ height: '30rem', width: '30rem', border: '1px solid rgba(71, 85, 105, 0.4)', opacity: 1 }} className="absolute inset-0 left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full"></div>
                    <div style={{ height: '35rem', width: '35rem', border: '1px solid rgba(71, 85, 105, 0.3)', opacity: 1 }} className="absolute inset-0 left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full"></div>
                </div>
                <div className="absolute bottom-0 z-[41] h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
            </div>
        </div>
    );
};

