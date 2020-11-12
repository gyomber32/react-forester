import { useCallback } from 'react';
import { getAllTrees, createTree, deleteTree, authorization } from '../api';
import { useActions } from './store';
import Tree from '../models/types/Tree';
import { useHistory } from 'react-router-dom';

export const useFetchAllTrees = () => {
    const { setTrees } = useActions();
    const { toggleLoader } = useActions();
    const { togglePopup } = useActions();
    const { setAuth } = useActions();
    const history = useHistory();

    return useCallback(async () => {
        try {
            const loggedIn = await authorization();
            setAuth(loggedIn);
            toggleLoader(true);
            const responseTrees = await getAllTrees();
            if (responseTrees && responseTrees.length > 0) {
                setTrees(responseTrees);
                togglePopup({ isOpen: true, message: "Trees have been fetched successfully" });
                setTimeout(() => {
                    togglePopup({ isOpen: false, message: "" });
                }, 5500);
            }

        } catch (error) {
            if (error.message === "Unauthorized") {
                history.push('login');
            }
        } finally {
            toggleLoader(false);
        }
    }, [history, setAuth, setTrees, toggleLoader, togglePopup]);
};

export const useCreateTree = () => {
    const { addTree } = useActions();
    const { toggleLoader } = useActions();
    const { togglePopup } = useActions();
    const { setAuth } = useActions();
    const history = useHistory();

    return useCallback(async (tree: Tree) => {
        try {
            const loggedIn = await authorization();
            setAuth(loggedIn);
            toggleLoader(true);
            const responseTree = await createTree(tree);
            if (responseTree) {
                addTree(responseTree);
                togglePopup({ isOpen: true, message: "Tree has been added successfully" });
                setTimeout(() => {
                    togglePopup({ isOpen: false, message: "" });
                }, 5500)
            }
        } catch (error) {
            if (error.message === "Unauthorized") {
                history.push('login')
            }
        } finally {
            toggleLoader(false);
        }

    }, [setAuth, toggleLoader, addTree, togglePopup, history]);
};

export const useDeleteTree = () => {
    const { removeTree } = useActions();
    const { toggleLoader } = useActions();
    const { togglePopup } = useActions();
    const { setAuth } = useActions();
    const history = useHistory();

    return useCallback(async (tree: Tree) => {
        try {
            const loggedIn = await authorization();
            setAuth(loggedIn);
            toggleLoader(true);
            const responseId = await deleteTree(tree);
            if (responseId) {
                removeTree(responseId);
                togglePopup({ isOpen: true, message: "Tree has been removed successfully" });
                setTimeout(() => {
                    togglePopup({ isOpen: false, message: "" });
                }, 5500)
            }
        } catch (error) {
            if (error.message === "Unauthorized") {
                history.push('login')
            }
        } finally {
            toggleLoader(false);
        }
    }, [history, removeTree, setAuth, toggleLoader, togglePopup]);
};