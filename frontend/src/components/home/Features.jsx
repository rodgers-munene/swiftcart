import { serviceData } from "../../services/backendApi";

const Features = () => {
  return (
    <div className="flex flex-wrap w-screen sm:w-[95vw] p-2 justify-center my-10 text-black">
      {serviceData.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className="flex flex-col dark:text-white items-center justify-center min-w-[16rem] sm:min-w-[19rem] h-36 sm:h-44"
          >
            <div className="mb-3 bg-gray-400 p-2 rounded-full ">
              <Icon size={32} color="blue" />
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
