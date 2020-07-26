import { useState, useEffect, useCallback } from 'react';
import { getAllTrees, getOneTree, createTree, removeTree } from '../api';
import Tree from '../models/types/Tree';
import PopUp from "../models/types/PopUp";

export const useFetchTree = () => {

  const [trees, setTrees] = useState<Tree[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState<PopUp>({ isOpen: false, message: "" });

  const fetchTree = useCallback(async (method: string, tree?: Tree) => {
    try {
      setIsLoading(true);
      switch (method) {
        case 'GET_ALL':
          const trees = await getAllTrees();
          setTrees(trees);
          setPopup({ isOpen: true, message: 'Trees have been fetched successfully' });
          break;
        case 'CREATE':
          const id = await createTree(tree!);
          const responseTree = await getOneTree(id);
          setTrees(trees => [...trees, responseTree]);
          setPopup({ isOpen: true, message: 'Tree has been created successfully' });
          break;
        case 'DELETE':
          await removeTree(tree!);
          const responseTrees = await getAllTrees();
          setTrees(responseTrees);
          setPopup({ isOpen: true, message: 'Tree has been deleted successfully' });
          break;
      }
    } catch (error) {
      setPopup({ isOpen: true, message: error.message });
    } finally {
      setIsLoading(false);
      /* setTimeout(() => {
        setPopup({ isOpen: false, message: "" });
      }, 5500); */
    }
  }, []);

  useEffect(() => {
    fetchTree('GET_ALL');
  }, [fetchTree])

  return {
    trees,
    isLoading,
    popup,
    fetchTree
  };
};
