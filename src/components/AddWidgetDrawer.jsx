import { useState, useEffect } from "react";
import useLocalStore from "../store/useLocalStorage";

const AddWidgetDrawer = ({ isOpen, onClose, title, subtitle, category, categoryId, fields, onSubmit }) => {
    const { addWidget } = useLocalStore()
    const [formData, setFormData] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(categoryId);

    useEffect(() => {
        if (categoryId) {
            setSelectedCategory(categoryId);
        } else {
            setSelectedCategory(category[0].id)

        }
    }, [categoryId]);

    const handleChange = (e, name) => {
        setFormData({ ...formData, [name]: e.target.value });
    };

    const handleSubmit = () => {
        const { widgetname, widgettext } = formData;
        if (!widgetname || !widgettext) return alert("All fields are required!");

        addWidget(selectedCategory, widgetname, widgettext);
        setFormData({});
        onClose();
    };
    if (!isOpen) return null;

    return (
        <div
            className={`fixed top-0 right-0 h-full bg-white shadow-xl transform transition-transform duration-300 z-50
                    ${isOpen ? "translate-x-0" : "translate-x-full"}
                    w-full sm:w-180`}
        >
            {/* Header */}
            <div className="flex justify-between items-center bg-blue-950 text-white p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">{title}</h2>
                <button
                    className="text-white text-2xl hover:text-gray-300"
                    onClick={onClose}
                >
                    ✕
                </button>
            </div>


            <div className="p-5">
                <h2 className="text-lg text-gray-600 font-semibold">{subtitle}</h2>
            </div>

            {/* for category subfields */}
            <div className="p-4 flex gap-4">

                {category && category.map((field) => {
                    const { id, name: category_name, widgets } = field; 
                    const firstWord = category_name.split(" ")[0];

                    return (
                        <div key={id} className="flex flex-col">
                            {/* Category Name */}
                            <div
                                className={`${selectedCategory === id ? " border-b-2 border-b-blue-950 text-blue-900" : 'text-gray-600 '} cursor-pointer font-semibold `}
                                onClick={() => setSelectedCategory(id)}
                            >
                                {firstWord}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Fields */}
            <div className="p-4 pt-0">
                {fields.map((field) => (
                    <div key={field.id} className="mt-2">
                        <input
                            type={field.type || "text"}
                            placeholder={field.placeholder}
                            value={formData[field.name] || ""}
                            onChange={(e) => handleChange(e, field.name)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="p-4 fixed bottom-0 right-0 flex justify-end gap-2 border-gray-200">
                <button
                    className="px-5 py-1 rounded-md border border-blue-700 text-blue-950  "
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button
                    className="px-5 py-1 rounded-md bg-blue-950 text-white hover:bg-blue-900"
                    onClick={handleSubmit}
                >
                    Confirm
                </button>
            </div>
        </div>
    );
};

export default AddWidgetDrawer;
