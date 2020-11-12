import { useCallback } from 'react';
import { getAllSeedlings, createSeedling, deleteSeedling, authorization } from '../api';
import { useActions } from './store';
import Seedling from '../models/types/Seedling';
import { useHistory } from 'react-router-dom';

export const useFetchAllSeedlings = () => {
    const { setSeedlings } = useActions();
    const { toggleLoader } = useActions();
    const { togglePopup } = useActions();
    const { setAuth } = useActions();
    const history = useHistory();

    return useCallback(async () => {
        try {
            const loggedIn = await authorization();
            setAuth(loggedIn);
            toggleLoader(true);
            const responseSeedlings = await getAllSeedlings();
            if (responseSeedlings && responseSeedlings.length > 0) {
                setSeedlings(responseSeedlings);
                togglePopup({ isOpen: true, message: "Seedlings have been fetched successfully" });
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
    }, [history, setAuth, setSeedlings, toggleLoader, togglePopup]);
};

export const useCreateSeedling = () => {
    const { addSeedling } = useActions();
    const { toggleLoader } = useActions();
    const { togglePopup } = useActions();
    const { setAuth } = useActions();
    const history = useHistory();

    return useCallback(async (seedling: Seedling) => {
        try {
            const loggedIn = await authorization();
            setAuth(loggedIn);
            toggleLoader(true);
            const responseSeedling = await createSeedling(seedling);
            if (responseSeedling) {
                addSeedling(responseSeedling);
                togglePopup({ isOpen: true, message: "Seedling has been added successfully" });
                setTimeout(() => {
                    togglePopup({ isOpen: false, message: "" });
                }, 5500)
            }

        } catch (error) {
            if (error.message === "Unauthorized") {
                history.push('login');
            }
        } finally {
            toggleLoader(false);
        }

    }, [setAuth, toggleLoader, addSeedling, togglePopup, history]);
};

export const useDeleteSeedling = () => {
    const { removeSeedling } = useActions();
    const { toggleLoader } = useActions();
    const { togglePopup } = useActions();
    const { setAuth } = useActions();
    const history = useHistory();

    return useCallback(async (seedling: Seedling) => {
        try {
            const loggedIn = await authorization();
            setAuth(loggedIn);
            toggleLoader(true);
            const responseId = await deleteSeedling(seedling);
            if (responseId) {
                removeSeedling(responseId);
                togglePopup({ isOpen: true, message: "Seedling has been removed successfully" });
                setTimeout(() => {
                    togglePopup({ isOpen: false, message: "" });
                }, 5500)
            }
        } catch (error) {
            if (error.message === "Unauthorized") {
                history.push('login');
            }
        } finally {
            toggleLoader(false);
        }

    }, [history, removeSeedling, setAuth, toggleLoader, togglePopup]);
};