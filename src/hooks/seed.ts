import { useCallback } from 'react';
import { getAllSeeds, createSeed, deleteSeed, authorization } from '../api';
import { useActions } from './store';
import Seed from '../models/types/Seed';
import { useHistory } from 'react-router-dom';

export const useFetchAllSeeds = () => {
    const { setSeeds } = useActions();
    const { toggleLoader } = useActions();
    const { togglePopup } = useActions();
    const { setAuth } = useActions();
    const history = useHistory();

    return useCallback(async () => {
        try {
            const loggedIn = await authorization();
            setAuth(loggedIn);
            toggleLoader(true);
            const responseSeeds = await getAllSeeds();
            if (responseSeeds && responseSeeds.length > 0) {
                setSeeds(responseSeeds);
                togglePopup({ isOpen: true, message: "Seeds have been fetched successfully" });
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

    }, [history, setAuth, setSeeds, toggleLoader, togglePopup]);
};

export const useCreateSeed = () => {
    const { addSeed } = useActions();
    const { toggleLoader } = useActions();
    const { togglePopup } = useActions();
    const { setAuth } = useActions();
    const history = useHistory();

    return useCallback(async (seed: Seed) => {
        try {
            const loggedIn = await authorization();
            setAuth(loggedIn);
            toggleLoader(true);
            const responseSeed = await createSeed(seed);
            if (responseSeed) {
                addSeed(responseSeed);
                togglePopup({ isOpen: true, message: "Seed has been added successfully" });
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
    }, [addSeed, history, setAuth, toggleLoader, togglePopup]);
};

export const useDeleteSeed = () => {
    const { removeSeed } = useActions();
    const { toggleLoader } = useActions();
    const { togglePopup } = useActions();
    const { setAuth } = useActions();
    const history = useHistory();

    return useCallback(async (seed: Seed) => {
        try {
            const loggedIn = await authorization();
            setAuth(loggedIn);
            toggleLoader(true);
            const responseId = await deleteSeed(seed);
            if (responseId) {
                removeSeed(responseId);
                togglePopup({ isOpen: true, message: "Seed has been removed successfully" });
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

    }, [history, removeSeed, setAuth, toggleLoader, togglePopup]);
};