import { useCallback } from 'react';
import { getAllSeedlings, createSeedling, deleteSeedling } from '../api';
import { useActions } from './store';
import Seedling from '../models/types/Seedling';

export const useFetchAllSeedlings = () => {
    const { setSeedlings } = useActions();
    const { toggleLoader } = useActions();
    const { togglePopup } = useActions();

    return useCallback(async () => {
        toggleLoader(true);
        const responseSeedlings = await getAllSeedlings();
        if (responseSeedlings && responseSeedlings.length > 0) {
            setSeedlings(responseSeedlings);
            togglePopup({ isOpen: true, message: "Seedlings have been fetched successfully" });
            setTimeout(() => {
                togglePopup({ isOpen: false, message: "" });
            }, 5500);
        }
        toggleLoader(false);
    }, [setSeedlings, toggleLoader, togglePopup]);
};

export const useCreateSeedling = () => {
    const { addSeedling } = useActions();
    const { toggleLoader } = useActions();
    const { togglePopup } = useActions();

    return useCallback(async (seedling: Seedling) => {
        toggleLoader(true);
        const responseSeedling = await createSeedling(seedling);
        if (responseSeedling) {
            addSeedling(responseSeedling);
            togglePopup({ isOpen: true, message: "Seedling has been added successfully" });
            setTimeout(() => {
                togglePopup({ isOpen: false, message: "" });
            }, 5500)
        }
        toggleLoader(false);
    }, [addSeedling, toggleLoader, togglePopup]);
};

export const useDeleteSeedling = () => {
    const { removeSeedling } = useActions();
    const { toggleLoader } = useActions();
    const { togglePopup } = useActions();

    return useCallback(async (seedling: Seedling) => {
        toggleLoader(true);
        const responseId = await deleteSeedling(seedling);
        if (responseId) {
            removeSeedling(responseId);
            togglePopup({ isOpen: true, message: "Seedling has been removed successfully" });
            setTimeout(() => {
                togglePopup({ isOpen: false, message: "" });
            }, 5500)
        }
        toggleLoader(false);
    }, [removeSeedling, toggleLoader, togglePopup]);
};