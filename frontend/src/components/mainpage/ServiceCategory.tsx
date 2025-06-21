import { useState } from "react";
import { cards, categories } from "./ServiceData";
import { Clock } from "lucide-react";

const ServiceCategory = () => {
  const [activeCategory, setActiveCategory] = useState("Dining & Culinary");

  const filteredCards = cards.filter(
    (card) => card.category === activeCategory
  );

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold text-[#1A365D] text-center mt-10">
        Our Service Categories
      </h1>
      <p className="text-gray-600 text-sm text-center md:text-lg my-4">
        Explore our comprehensive range of services tailored to exceed your
        expectations
      </p>
      <div className="px-4 py-10 max-w-7xl mx-auto">
        {/* Category Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full font-medium transition ${
                category === activeCategory
                  ? "bg-[#C9A55C] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-sm shadow-md overflow-hidden flex flex-col transition hover:shadow-lg"
            >
              {/* Image with gradient */}
              <div
                className="h-44 bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(26, 54, 93, 0.3), rgba(26, 54, 93, 0.3)), url(${card.image})`,
                }}
              />

              {/* Content */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <h3 className="text-lg font-bold text-[#1A365D] mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{card.description}</p>

                {/* Time */}
                <div className="text-sm text-gray-500 flex items-center gap-1 mt-2 mb-2">
                  <Clock className="w-4 h-4" /> {card.time}
                </div>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {card.features.map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-700"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Learn More Button */}
                <button className="mt-4 text-sm font-medium text-[#1A365D] border border-[#1A365D] rounded-md px-4 py-2 flex items-center justify-center gap-2 hover:bg-[#1A365D] hover:text-white transition">
                  Learn More <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCategory;
