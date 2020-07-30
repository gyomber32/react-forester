import { useCallback } from 'react';
import { getAllSeeds, createSeed, deleteSeed } from '../api';
import { useActions } from './store';
import Seed from '../models/types/Seed';

export const useFetchAllSeeds = () => {
    const { setSeeds } = useActions();
    const { toggleLoader } = useActions();
    const { togglePopup } = useActions();

    return useCallback(async () => {
        toggleLoader(true);
        const responseSeeds = await getAllSeeds();
        if (responseSeeds && responseSeeds.length > 0) {
            setSeeds(responseSeeds);
            togglePopup({ isOpen: true, message: "Seeds have been fetched successfully" });
            setTimeout(() => {
                togglePopup({ isOpen: false, message: "" });
            }, 5500);
        }
        toggleLoader(false);
    }, [setSeeds, toggleLoader, togglePopup]);
};

export const useCreateSeed = () => {
    const { addSeed } = useActions();
    const { toggleLoader } = useActions();
    const { togglePopup } = useActions();

    return useCallback(async (seed: Seed) => {
        toggleLoader(true);
        const responseSeed = await createSeed(seed);
        if (responseSeed) {
            addSeed(responseSeed);
            togglePopup({ isOpen: true, message: "Seed has been added successfully" });
            setTimeout(() => {
                togglePopup({ isOpen: false, message: "" });
            }, 5500)
        }
        toggleLoader(false);
    }, [addSeed, toggleLoader, togglePopup]);
};

export const useDeleteSeed = () => {
    const { removeSeed } = useActions();
    const { toggleLoader } = useActions();
    const { togglePopup } = useActions();

    return useCallback(async (seed: Seed) => {
        toggleLoader(true);
        const responseId = await deleteSeed(seed);
        if (responseId) {
            removeSeed(responseId);
            togglePopup({ isOpen: true, message: "Seed has been removed successfully" });
            setTimeout(() => {
                togglePopup({ isOpen: false, message: "" });
            }, 5500)
        }
        toggleLoader(false);
    }, [removeSeed, toggleLoader, togglePopup]);
};