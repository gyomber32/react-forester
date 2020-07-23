import { useState, useEffect } from 'react';
import Tree from '../models/types/Tree';
import { getAllTrees } from '../api';

export const useFetchAllTrees = () => {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchAllTrees = async () => {
    try {
      setIsLoading(true);
      const trees = await getAllTrees();
      setTrees(trees);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchAllTrees();
  }, []);
  return { trees, isLoading, error };
};
