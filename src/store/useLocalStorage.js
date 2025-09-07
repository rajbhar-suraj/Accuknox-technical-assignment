import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLocalStore = create(persist((set, get) => ({

    categories: [
        {
            id: 1,
            name: "CSMP Executive Dashboard",
            widgets: [
                { id: 1, widgetName: "Cloud Accounts", widgetText: "Random text 1" },
                { id: 2, widgetName: "Cloud Account Risk Assesment", widgetText: "Random text 2" },
            ],
        },
        {
            id: 2,
            name: "CWPP Dashboard",
            widgets: [
                { id: 1, widgetName: "Top 5 Namespace Specific Alerts", widgetText: "some random text 3" },
                { id: 2, widgetName: "Work Alerts", widgetText: "some random text 4" },

            ],
        },
        {
            id: 3,
            name: "Registry Scan",
            widgets: [
                { id: 1, widgetName: "Image Risk Assessment", widgetText: "some random text 5" },
                { id: 2, widgetName: "Image Security Issues", widgetText: "some random text 6" },

            ],
        },
    ],
    searchQuery: "",

    setSearchQuery: (query) => set({ searchQuery: query }),

    addCategory: (categoryName) => {
        console.log("inside the add category method", categoryName)
        const categories = get().categories;
        const exists = categories.some(
            (c) => Object.keys(c)[0].toLowerCase() === categoryName.toLowerCase()
        );

        if (exists) {
            return toast.error("Category already exists");
        }

        const newCategory = {
            id: Date.now(),
            name: categoryName,
            widgets: [],
        };

        set({
            categories: [...categories, newCategory],
        });

        toast.success("Category added!");
    },

    addWidget: (categoryId, widgetName, widgetText) => {
        const { categories } = get();

        const addedWidget = categories.map((cat) => cat.id === categoryId ?
            { ...cat, widgets: [...cat.widgets, { id: Date.now(), widgetName, widgetText }] } : cat
        )

        set({ categories: addedWidget })
        toast.success("Widget added")
    },
    removeWidget: (categoryId, widgetId) => {
        console.log(categoryId, widgetId)
        const { categories } = get();

        const updatedCategories = categories.map(cat =>
            cat.id === categoryId
                ? { ...cat, widgets: cat.widgets.filter(w => w.id !== widgetId) }
                : cat
        );
        set({ categories: updatedCategories })
        console.log(categories)
        toast.success("Widget removed")
    },
}),
    {
        name: "dashboard-storage",
        getStorage: () => localStorage,
    }

))

export default useLocalStore