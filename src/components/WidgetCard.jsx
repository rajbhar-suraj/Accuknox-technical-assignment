import { AiOutlineBarChart } from "react-icons/ai";
import { FiX } from "react-icons/fi";
import useLocalStore from "../store/useLocalStorage";

const WidgetCard = ({ widgetName, widgetText, categoryId, widgetId }) => {
  const { removeWidget } = useLocalStore();

  const handleDelete = () => {

    removeWidget(categoryId, widgetId);
  };

  return (
    <div className="relative w-95 h-55 bg-white rounded-xl shadow-md p-4 flex flex-col">
      {/* Delete Icon */}
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 text-gray-500 p-2 hover:text-blue-900 opacity-0 hover:opacity-100  duration-200"
        aria-label="Delete widget"
      >
        <FiX size={25} />
      </button>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        {widgetName}
      </h2>

      {/* Subtitle */}
      <p className="text-xs font-medium text-gray-500 mb-4">{widgetText}</p>

      {/* Empty State */}
      <div className="flex flex-1 flex-col justify-center items-center text-gray-400">
        <AiOutlineBarChart className="w-10 h-10 mb-2" />
        <p className="text-sm">No Graph data available!</p>
      </div>
    </div>
  );
};

export default WidgetCard;
