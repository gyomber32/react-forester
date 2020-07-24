/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useCallback } from "react";

import { createTree } from "../api/index";

import Tree from "../models/types/Tree";

export const useDeleteTree = (tree: Tree) => {
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const postTree = useCallback(async () => {
        setIsLoading(true);
        try {
            const message = await createTree(tree);
            setMessage(message);
        } catch (error) {
            setError(error);
        }
        setIsLoading(false);
    }, [tree]);

    useEffect(() => {
        postTree();
    }, []);
    return { message, isLoading, error };
};