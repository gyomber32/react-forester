import { useState, useEffect, useCallback } from 'react';
import { getAllSeedlings, getOneSeedling, createSeedling, removeSeedling } from '../api';
import Seedling from '../models/types/Seedling';
import PopUp from "../models/types/PopUp";

export const useFetchSeedling = () => {

    const [seedlings, setSeedlings] = useState<Seedling[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [popup, setPopup] = useState<PopUp>({ isOpen: false, message: "" });

    const fetchSeedling = useCallback(async (method: string, seedling?: Seedling) => {
        try {
            setIsLoading(true);
            switch (method) {
                case 'GET_ALL':
                    const seedlings = await getAllSeedlings();
                    setSeedlings(seedlings);
                    setPopup({ isOpen: true, message: 'Seedlings have been fetched successfully' });
                    break;
                case 'CREATE':
                    const id = await createSeedling(seedling!);
                    const responseSeedling = await getOneSeedling(id);
                    setSeedlings(seedlings => [...seedlings, responseSeedling]);
                    setPopup({ isOpen: true, message: 'Seedling has been created successfully' });
                    break;
                case 'DELETE':
                    await removeSeedling(seedling!);
                    const responseSeedlings = await getAllSeedlings();
                    setSeedlings(responseSeedlings);
                    setPopup({ isOpen: true, message: 'Seedling has been deleted successfully' });
                    break;
            }
        } catch (error) {
            setPopup({ isOpen: true, message: error.message });
        } finally {
            setIsLoading(false);
            setTimeout(() => {
                setPopup({ isOpen: false, message: "" });
            }, 5500);
        }
    }, []);

    useEffect(() => {
        fetchSeedling('GET_ALL');
    }, [fetchSeedling])

    return {
        seedlings,
        isLoading,
        popup,
        fetchSeedling
    };
};
