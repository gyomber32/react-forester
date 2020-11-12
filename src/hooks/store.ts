/* hooks for getting data from global redux store */
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from 'react-redux';
import { Actions, actions, selectors } from "../store";
import { useMemo } from "react";

type BoundActions = { [K in keyof Actions]: Actions[K] };

export const useActions = (): BoundActions => {
    const dispatch = useDispatch();
    return useMemo(() => {
        return Object.keys(actions).reduce(
            (acc, actionName) => ({
                ...acc,
                [actionName]: bindActionCreators(actions[actionName as keyof typeof actions], dispatch)
            }),
            {} as BoundActions
        )
    }, [dispatch])
};

export const useTrees = () => useSelector(selectors.getTrees);
export const useSeedlings = () => useSelector(selectors.getSeedlings);
export const useSeeds = () => useSelector(selectors.getSeeds);
export const useLoader = () => useSelector(selectors.getLoader);
export const usePopup = () => useSelector(selectors.getPopup);
export const useWeather = () => useSelector(selectors.getWeather);
export const useAuth = () => useSelector(selectors.getAuth);