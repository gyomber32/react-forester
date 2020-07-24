import { useState, useEffect, useCallback } from "react";

import { getOneTree } from "../api/index";

import Tree from "../models/types/Tree";

export const useFetchOneTree = (id: string) => {
    const [tree, setTree] = useState<Tree>({} as Tree);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchOneTree = async () => {
        setIsLoading(true);
        try {
            const tree = await getOneTree(id);
            setTree(tree);
        } catch (error) {
            setError(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchOneTree();
    }, []);
    return { tree, isLoading, error };
};