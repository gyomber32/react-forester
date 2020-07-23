import { useState, useEffect, useCallback } from 'react';
import Tree from '../models/types/Tree';
import { getAllTrees, getOneTree, createTree, removeTree } from '../api';

export const useFetchTree = () => {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchTree = useCallback(async (method: string, tree?: Tree) => {
    try {
      setIsLoading(true);
      switch (method) {
        case 'GET_ALL':
          const trees = await getAllTrees();
          setTrees(trees);
          setMessage('Trees have been fetched successfully');
        /*case 'GET_ONE':
          const responseOneTree = await getOneTree(tree._id);
          setMessage('Tree has been fetched successfully');
          setTrees(trees => [...trees, responseOneTree]);*/
        case 'CREATE':
          const id = await createTree(tree!);
          const responseTree = await getOneTree(id);
          setMessage('Tree has been created successfully');
          setTrees(trees => [...trees, responseTree]);
        case 'DELETE':
          const message = await removeTree(tree!);
          const responseTrees = await getAllTrees();
          setTrees(responseTrees);
          setMessage('Tree has been deleted successfully');
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    trees,
    isLoading,
    message,
    fetchTree
  };
};
