import React, { useState } from "react";
import { Link } from "next/link";

const RecentWork = () => {
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleShowMoreProjects = () => {
    setVisibleProjects((prev) => prev + 6);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setVisibleProjects(6); // Reset visible projects when category changes
  };

  const categories = [
    "all",
    "realestate",
    "bussiness",
    "information",
    "portfolio",
    "ecommerce",
    "tools",
  ];

  const dataArray = [
    {
      id: 10,
      imageUrl: "/assets/axumforge.png",
      logourl: "/assets/icons/axumforge_logo.png",
      title: "Axum forge",
      description: "Premier in Design, Technology, and AI Solutions",
      link: "https://www.axumforge.com/",
      bgColor: "bg-[#3a9ea1]/95",
      categories: ["portfolio", "information"],
    },
    {
      id: 1,
      imageUrl: "/assets/techtribe.webp",
      logourl: "/assets/icons/logo.svg",
      title: "Techtribe",
      description: "Your first-class development and design",
      link: "https://techtribe.vercel.app/",
      bgColor: "bg-[#172d51]/90",
      categories: ["portfolio", "information"],
    },
    {
      id: 4,
      imageUrl: "/assets/rebhub.png",
      logourl: "/assets/icons/rebhub.png",
      title: "",
      description: "Real Estate Made Easy",
      link: "https://rebhub-web-client.vercel.app/",
      bgColor: "bg-[#000000]/85",
      categories: ["realestate", "bussiness"],
    },
    {
      id: 6,
      imageUrl: "/assets/aigenty.png",
      logourl: "/assets/icons/aigenty.png",
      title: "Aigenty",
      description: "The better way of buying and selling",
      link: "https://aigentyportal.azurewebsites.net/",
      bgColor: "bg-[#98ff98]/90",
      categories: ["realestate", "AI", "bussiness"],
    },
    {
      id: 9,
      imageUrl: "/assets/abbasidevelopers.png",
      logourl: "/assets/icons/abbasidevlopers.png",
      title: "AbbasiDevelopers",
      description: "Free Image conversion tool ",
      link: "https://abbasidevelopers.com/",
      bgColor: "bg-[#12446d]/90",
      categories: ["realestate", "bussiness"],
    },
    {
      id: 7,
      imageUrl: "/assets/flt.png",
      logourl: "/assets/icons/flt-icon.png",
      title: "Future Leaders Team",
      description: "Empowering Future Leaders for Sustainable Success",
      link: "https://flt-2-0.vercel.app/",
      bgColor: "bg-[#06b6d4]/90",
      categories: ["bussiness", "information"],
    },
    {
      id: 3,
      imageUrl: "/assets/infohomes.webp",
      logourl: "/assets/icons/infohomeslogo.svg",
      title: "Info Homes",
      description: "Decisions Powered by Data",
      link: "https://infohomes.vercel.app/",
      bgColor: "bg-[#33393f]/90",
      categories: ["bussiness", "information", "realestate"],
    },

    {
      id: 5,
      imageUrl: "/assets/rta.png",
      logourl: "/assets/icons/rtalogo.svg",
      title: "",
      description: "Recommend Services, Get Commissions",
      link: "https://refer-to-agency.vercel.app/",
      bgColor: "bg-[#1278b3]/90",
      categories: ["bussiness", "information"],
    },

    {
      id: 8,
      imageUrl: "/assets/imageconverter.png",
      logourl: "/assets/icons/logo.svg",
      title: "ImageConvert",
      description: "Free Image conversion tool ",
      link: "https://imageconverter.vercel.app/",
      bgColor: "bg-[#ab611a]/85",
      categories: ["tools"],
    },

    {
      id: 2,
      imageUrl: "/assets/salebag.webp",
      logourl: "/assets/icons/logo_full.svg",
      title: "",
      description: "Your one market place",
      link: "https://salebag-2-0.vercel.app/",
      bgColor: "bg-[#10172a]/85",
      categories: ["ecommerce"],
    },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? dataArray
      : dataArray.filter((project) =>
          project.categories.includes(selectedCategory)
        );

  return (
    <div>
      <div className="flex flex-col justify-center items-center w-full max-w-[1480px] gap-4 lg:pt-16 pt-12 lg:p-8 mx-auto">
        {/* Title and description */}
        <h2 className="font-[EurostileBold] text-[35px] font-bold text-center text-[#141c3a] leading-[45px]">
          My Recent Work
        </h2>
        <p className="font-[EuropaRegular] text-[20px] text-center leading-[36px] text-[#5c5c5c]">
          Here are a few projects I've worked on recently. Want to see more?
        </p>

        {/* Filter Menu */}
        <div className="w-full flex justify-center mt-4">
          <div className="flex gap-4 overflow-x-auto px-4  pb-3">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full  ${
                  selectedCategory === category
                    ? "bg-[#6e08f3] text-white"
                    : "bg-transparent border-2 border-[#6e08f3] text-[#6e08f3]"
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-2 md:px-8 lg:px-24 mt-8">
          {filteredProjects.slice(0, visibleProjects).map((item) => (
            <div
              key={item.id}
              className="w-[330px] md:w-[350px] rounded-xl h-[250px] overflow-hidden relative group cursor-pointer"
            >
              <img
                src={item?.imageUrl}
                alt={Screenshot of ${item?.title}}
                className="w-full h-full object-cover object-center"
              />
              <div
                className={w-full h-full absolute hover:bg-[#141c3a] ${item?.bgColor} top-0 transition-all ease-in-out duration-500}
              >
                <div className="w-full group-hover:-translate-y-60 flex justify-center items-center h-full transition-all ease-in-out duration-500">
                  <img
                    src={item?.logourl}
                    alt={Logo of ${item?.title}}
                    className="max-w-[150px] px-[3px] max-h-[60px]"
                  />
                  <p className="font-semibold text-white max-w-36 px-1">
                    {item?.title}
                  </p>
                </div>
                <div className="flex justify-center flex-col gap-4 items-center group-hover:-translate-y-40 transition-all ease-in-out duration-500">
                  <p className="font-[EuropaRegular] text-[20px] text-center leading-[20px] px-4 text-white">
                    {item?.description}
                  </p>
                  <a
                    href={item?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="font-[EuropaRegular] text-[14px] text-white border-2 max-w-[200px] border-[#6e08f3] px-3 py-2 rounded-3xl transition-all ease-in-out duration-500 hover:px-4 cursor-pointer">
                      Visit project
                    </div>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Projects Button */}
        {visibleProjects < filteredProjects.length && (
          <button
            className="mt-8 bg-[#6e08f3] text-white px-6 py-2 rounded-full font-[EuropaRegular] text-lg"
            onClick={handleShowMoreProjects}
          >
            Show More Projects
          </button>
        )}
      </div>
    </div>
  );
};

export default RecentWork;