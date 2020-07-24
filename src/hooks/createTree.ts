import { useState, useEffect, useCallback } from "react";

import { createTree } from "../api/index";

import Tree from "../models/types/Tree";

export const useCreateTree = () => {
    const [id, setId] = useState<string>("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const postTree = async (tree: Tree) => {
        setIsLoading(true);
        try {
            const id = await createTree(tree);
            setId(id);
        } catch (error) {
            setError(error);
        }
        setIsLoading(false);
    };
    return [{ id, error, isLoading }, postTree];
};