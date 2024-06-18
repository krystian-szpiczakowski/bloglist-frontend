import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import blogService from "../services/blogs";
const BlogContext = createContext()

export const BlogProvider = ({ children }) => {
    const blogs = useQuery(
        {
          queryKey: ["blogs"],
          queryFn: blogService.getAll,
          retry: 2
        }
      )

    return (
        <BlogContext.Provider value={blogs}>
            {children}
        </BlogContext.Provider>
    )
}

export const useBlogData = () => {
    return useContext(BlogContext)
}