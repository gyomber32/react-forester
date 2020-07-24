import { useState, useEffect } from "react";

import { getAllTrees } from "../api/index";

import Tree from "../models/types/Tree";

export const useFetchAllTrees = () => {
    const [trees, setTrees] = useState<Tree[]>([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchTrees = async () => {
            setIsLoading(true);
            try {
                const trees = await getAllTrees();
                setTrees(trees);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTrees();
    }, []);
    return { trees, isLoading, error };
};