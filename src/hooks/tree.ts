import { useCallback } from 'react';
import { getAllTrees, createTree, deleteTree } from '../api';
import { useActions } from './store';
import Tree from '../models/types/Tree';

export const useFetchAllTrees = () => {
    const { setTrees } = useActions();
    const { toggleLoader } = useActions();
    const { togglePopup } = useActions();

    return useCallback(async () => {
        toggleLoader(true);
        const responseTrees = await getAllTrees();
        if (responseTrees) {
            setTrees(responseTrees);
            togglePopup({ isOpen: true, message: "Trees have been fetched successfully" });
            setTimeout(() => {
                togglePopup({ isOpen: false, message: "" });
            }, 5500);
        }
        toggleLoader(false);
    }, [setTrees, toggleLoader, togglePopup]);
};

export const useCreateTree = () => {
    const { addTree } = useActions();
    const { toggleLoader } = useActions();
    const { togglePopup } = useActions();

    return useCallback(async (tree: Tree) => {
        toggleLoader(true);
        const responseTree = await createTree(tree);
        if (responseTree) {
            addTree(responseTree);
            togglePopup({ isOpen: true, message: "Tree has been added successfully" });
            setTimeout(() => {
                togglePopup({ isOpen: false, message: "" });
            }, 5500)
        }
        toggleLoader(false);
    }, [addTree, toggleLoader, togglePopup]);
};

export const useDeleteTree = () => {
    const { removeTree } = useActions();
    const { toggleLoader } = useActions();
    const { togglePopup } = useActions();

    return useCallback(async (tree: Tree) => {
        toggleLoader(true);
        const responseId = await deleteTree(tree);
        if (responseId) {
            removeTree(responseId);
            togglePopup({ isOpen: true, message: "Tree has been removed successfully" });
            setTimeout(() => {
                togglePopup({ isOpen: false, message: "" });
            }, 5500)
        }
        toggleLoader(false);
    }, [removeTree, toggleLoader, togglePopup]);
};