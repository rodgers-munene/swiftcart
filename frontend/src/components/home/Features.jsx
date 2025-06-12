import { serviceData } from "../../services/backendApi";

const Features = () => {
  return (
    <div className="flex overflow-x-auto overflow-y-hidden w-screen sm:w-[95vw] p-2 justify-between text-black">
      {serviceData.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className="flex flex-col items-center justify-around min-w-[16rem] sm:min-w-[19rem] h-36 sm:h-44 rounded-xl mr-3"
            style={{ backgroundColor: item.bg }}
          >
            <div className="mb-2 bg-gray-400 p-2 rounded-full ">
              <Icon size={32} />
            </div>
            <h3 className="font-bold">{item.title}</h3>
            <p className="text-xs sm:text-sm ">{item.subtitle}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Features;
