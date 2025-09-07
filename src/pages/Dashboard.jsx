import { FaPlus, FaClock, FaAngleDown } from "react-icons/fa6";
import { SlRefresh } from "react-icons/sl";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useMemo, useState } from "react";
import useLocalStore from "../store/useLocalStorage";
import AddWidgetDrawer from "../components/AddWidgetDrawer";
import WidgetCard from "../components/WidgetCard";

const widgetFields = [
  { id: 1, type: "text", name: "widgetname", placeholder: "Widget name..." },
  { id: 2, type: "text", name: "widgettext", placeholder: "Widget text..." }
];

const Dashboard = () => {
  const { categories, searchQuery } = useLocalStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCloseDrawer = () => {
    setSelectedCategory(null);
    setIsOpen(false);
  };

  const filteredCategories = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return categories;

    return categories
      .map((cat) => {
        const categoryMatches = cat.name.toLowerCase().includes(query);
        const filteredWidgets = cat.widgets.filter((w) =>
          w.widgetName.toLowerCase().includes(query) ||
          w.widgetText.toLowerCase().includes(query)
        );
        return categoryMatches
          ? { ...cat }
          : { ...cat, widgets: filteredWidgets };
      })
      .filter((cat) =>
        cat.name.toLowerCase().includes(query) || cat.widgets.length > 0
      );
  }, [categories, searchQuery]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={handleCloseDrawer}
        />
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center p-5 md:px-10 md:pt-10">
        <h1 className="text-2xl font-bold text-black">CNAPP Dashboard</h1>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 bg-white border border-gray-300 rounded-md px-3 sm:px-4 py-2 text-gray-700 shadow-sm hover:shadow-md text-sm sm:text-base"
          >
            Add Widget
            <FaPlus size={16} />
          </button>

          <button className="flex items-center justify-center bg-white border border-gray-300 rounded-md px-3 sm:px-4 py-2 text-gray-700 shadow-sm hover:shadow-md">
            <SlRefresh size={18} />
          </button>

          <button className="flex items-center justify-center bg-white border border-gray-300 rounded-md px-3 sm:px-4 py-2 text-gray-700 shadow-sm hover:shadow-md">
            <BsThreeDotsVertical size={18} />
          </button>

          <div className="flex items-center gap-1 cursor-pointer border border-blue-900 bg-white rounded-md px-3 py-2 shadow-sm hover:shadow-md">
            <FaClock className="text-blue-950" size={18} />
            <div className="h-5 w-px bg-blue-900 mx-1" />
            <span className="text-blue-950 font-semibold text-sm sm:text-base">Last 2 days</span>
            <FaAngleDown className="text-blue-950" size={18} />
          </div>
        </div>

        <AddWidgetDrawer
          fields={widgetFields}
          isOpen={isOpen}
          onClose={handleCloseDrawer}
          category={categories}
          categoryId={selectedCategory}
          title="Add Widget"
          subtitle="Personalize your dashboard by adding widgets"
        />
      </div>

      {/* Main Content */} 
      <div className="p-5 md:p-0 md:pl-14">
        {filteredCategories.length === 0 ? (
          <p className="text-gray-500">No categories or widgets found.</p>
        ) : (
          filteredCategories.map((field) => {
            const { id, name: category_name, widgets } = field;

            return (
              <div key={id} className="mb-8">
                {/* Category Name */}
                <h2 className="font-bold text-gray-800 mb-2 text-lg">{category_name}</h2>

                {/* Widget Row */}
                <div className="flex flex-wrap gap-4 sm:gap-6">
                  {widgets.map((wid, i) => (
                    <WidgetCard
                      key={`${id}-${i}`}
                      categoryId={id}
                      widgetId={wid.id}
                      widgetName={wid.widgetName}
                      widgetText={wid.widgetText}
                    />
                  ))}

                  {/* Add Widget Card */}
                  <div className="w-95 h-55 bg-white rounded-xl shadow-md p-4 flex justify-center items-center">
                    <button
                      onClick={() => {
                        setSelectedCategory(id);
                        setIsOpen(true);
                      }}
                      className="flex items-center gap-2 bg-white border border-gray-300 rounded-md px-3 sm:px-4 py-2 text-gray-700 shadow-sm hover:shadow-md text-sm sm:text-base"
                    >
                      <FaPlus size={16} />
                      Add Widget
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Dashboard;
