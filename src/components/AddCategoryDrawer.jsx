import { useState, useEffect } from "react";

const AddCategoryDrawer = ({ isOpen, onClose, title, subtitle, category, fields, onSubmit }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryName, setCategoryName] = useState("")
    useEffect(() => {

        if (isOpen && category?.length > 0) {
            setSelectedCategory(category[0].id)
        }
    }, [isOpen, category])



    const handleSubmit = () => {
        onSubmit(categoryName)
        setCategoryName("")
        onClose();
    };
    const selected = category.find((c) => c.id === selectedCategory);


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

            {/* Fields */}
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{subtitle}</h2>

            </div>
            {/* Fields */}
            <div className="p-4 pt-0">
                {fields.map((field) => (
                    <div key={field.id} className="mt-2">
                        <input
                            type={field.type || "text"}
                            placeholder={field.placeholder}
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className="w-full border text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800"
                        />
                    </div>
                ))}
            </div>

            {/* for category subfields */}
            <div className="p-4 flex gap-4">
                {category && category.map((field) => {
                    const { id, name: category_name, widgets } = field
                    const firstWord = category_name.split(" ")[0];

                    return (
                        <div key={id} className="flex flex-col">
                            {/* Category Name */}
                            <div
                                className={`${selectedCategory === id ? "border-b-2 border-b-blue-950 text-blue-900" : 'text-gray-600 '} cursor-pointer font-semibold `}
                                onClick={() => setSelectedCategory(id)}
                            >
                                {firstWord}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Render widgets for selected category in one place */}
            <div className="p-4">
                {selected ? (
                    selected.widgets.length > 0 ? (
                        selected.widgets.map((wid, i) => (
                            <label key={`${selectedCategory}-${i}`} className="flex gap-2 text-gray-900">
                                {wid.widgetName}
                            </label>
                        ))
                    ) : (
                        <p className="text-gray-900">No Widgets added</p>
                    )
                ) : (
                    <p className="text-gray-500">Select a category to see widgets</p>
                )}
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

export default AddCategoryDrawer;
