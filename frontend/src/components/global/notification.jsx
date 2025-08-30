import { useEffect } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

const Notification = ({ 
  message, 
  duration = 3000, 
  onClose, 
  type = "success" // "success" | "warning"
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const styles = {
    success: {
      bg: "bg-green-100",
      border: "border-green-400",
      text: "text-green-800",
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    },
    warning: {
      bg: "bg-red-100",
      border: "border-red-400",
      text: "text-red-800",
      icon: <AlertCircle className="w-5 h-5 text-red-600" />,
    },
  };

  const style = styles[type] || styles.success;

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-[999]">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border w-64 ${style.bg} ${style.border} ${style.text} animate-fade-in`}
      >
        {style.icon}
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

export default Notification;
