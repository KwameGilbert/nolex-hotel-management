import { Eye, Target } from "lucide-react";

const MissionAndVersion = () => {
  return (
    <div className="bg-gray-100 py-10 px-4 md:px-8">
      <div className="flex items-center justify-center gap-10 flex-col md:flex-row">
        <div className="flex-[1] flex flex-col gap-5">
          <div>
          <h1 className="text-3xl text-[#1A365D] mb-4 flex items-center gap-3 font-semibold">
              <Target className="text-[#C9A55C] w-8 h-8"/>
              Our Mission</h1>
            <p className="text-lg">
              To create extraordinary experiences that exceed expectations,
              providing unparalleled luxury, comfort, and personalized service
              that makes every guest feel truly special. We are committed to
              being the premier destination for discerning travelers seeking the
              finest in hospitality.
            </p>
          </div>

          <div>
            <h1 className="text-3xl text-[#1A365D] mb-4 flex items-center gap-3 font-semibold">
              <Eye className="text-[#C9A55C] w-8 h-8"/>
              Our Vision</h1>
            <p className="text-lg">
            To be recognized globally as the epitome of luxury hospitality, setting new standards for excellence while maintaining our commitment to sustainability, innovation, and the communities we serve. We envision a future where every interaction creates lasting memories.
            </p>
          </div>
        </div>

        <div className="flex-[1] shadow-md bg-gray-200">
          <img src="../../../public/assets/images/swiper1.jpg" alt="" className="rounded-sm"/>
        </div>
      </div>
    </div>
  );
};

export default MissionAndVersion;
