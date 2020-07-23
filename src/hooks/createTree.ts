import { useState, useEffect, useCallback } from 'react';
import Tree from '../models/types/Tree';
import { createTree } from '../api';
import { useFetchAllTrees } from './fetchAllTress';

export const useCreateTree = (tree: Tree) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateTree = useCallback(async () => {
    try {
      setIsLoading(true);
      const message = await createTree(tree);
      useFetchAllTrees();
      setMessage(message);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [createTree]);

  useEffect(() => {
    handleCreateTree();
  }, [tree]);
  return { message, isLoading, error };
};
