import { useState, useEffect, useCallback } from 'react';
import { getAllSeeds, getOneSeed, createSeed, removeSeed } from '../api';
import Seed from '../models/types/Seed';
import PopUp from "../models/types/PopUp";

export const useFetchSeed = () => {

    const [seeds, setSeeds] = useState<Seed[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [popup, setPopup] = useState<PopUp>({ isOpen: false, message: "" });

    const fetchSeed = useCallback(async (method: string, seed?: Seed) => {
        try {
            setIsLoading(true);
            switch (method) {
                case 'GET_ALL':
                    const seeds = await getAllSeeds();
                    setSeeds(seeds);
                    setPopup({ isOpen: true, message: 'Seeds have been fetched successfully' });
                    break;
                case 'CREATE':
                    const id = await createSeed(seed!);
                    const responseSeed = await getOneSeed(id);
                    setSeeds(seeds => [...seeds, responseSeed]);
                    setPopup({ isOpen: true, message: 'Seed has been created successfully' });
                    break;
                case 'DELETE':
                    await removeSeed(seed!);
                    const responseSeeds = await getAllSeeds();
                    setSeeds(responseSeeds);
                    setPopup({ isOpen: true, message: 'Seed has been deleted successfully' });
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
        fetchSeed('GET_ALL');
    }, [fetchSeed])

    return {
        seeds,
        isLoading,
        popup,
        fetchSeed
    };
};
