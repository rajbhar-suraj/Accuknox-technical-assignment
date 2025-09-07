import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLocalStore = create(persist((set, get) => ({

    categories: [
        {
            id: 1,
            name: "CSMP EXECUTIVE DASHBOARD",
            widgets: [
                { id: 1, widgetName: "some random1", widgetText: "some random text1" },
                { id: 2, widgetName: "some random2", widgetText: "some random text2" },
            ],
        },
        {
            id: 2,
            name: "CWPP DASHBOARD",
            widgets: [
                { id: 3, widgetName: "some random3", widgetText: "some random text3" },
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