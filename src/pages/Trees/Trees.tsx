import React, { Fragment, useState, useEffect, useCallback } from 'react';

import Card from '../../components/Card/Card';
import DetailsModal from '../../components/DetailsModal/DetailsModal';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import AddModal from '../../components/AddModal/AddModal';
import Backdrop from '../../components/Backdrop/Backdrop';
import AddButton from '../../components/AddButton/AddButton';
import Navigation from '../../components/Navigation/Navigation';
import Popup from '../../components/Popup/Popup';
import Spinner from '../../components/Spinner/Spinner';
import Chart from '../../components/Chart/Chart';
import NoData from '../../components/NoData/NoData';

import Tree from '../../models/types/Tree';
import PopUp from '../../models/types/PopUp';

import { getAllTrees, getOneTree, removeTree, createTree } from '../../api/index';

import { useFetchTree } from "../../hooks/fetchTree";

import styles from './Trees.module.scss';

const TreesPage: React.FC = props => {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [selectedTree, setSelectedTree] = useState<Tree>({} as Tree);
  const [detailsModal, setDetailsModal] = useState<boolean>(false);
  const [addModal, setAddModalState] = useState<boolean>(false);
  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);
  const [popup, setPopup] = useState<PopUp>({ isOpen: false, message: '' });
  const [loading, setLoading] = useState<boolean>(false);

  const { trees, isLoading, message, fetchTree } = useFetchTree();

  const fetchOneTree = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        const tree = await getOneTree(id);
        setTrees([...trees, tree]);
      } catch (error) {
        setPopup({
          isOpen: true,
          message: error.message
        });
        setTimeout(() => {
          setPopup({ isOpen: false, message: '' });
        }, 5500);
        console.log(error);
      }
      setLoading(false);
    },
    [getOneTree]
  );

  const fetchAllTrees = useCallback(async () => {
    fetchTree('GET_ALL', {} as Tree);
    setLoading(true);
    try {
      const trees = await getAllTrees();
      setTrees(trees);
    } catch (error) {
      setPopup({
        isOpen: true,
        message: error.message
      });
      setTimeout(() => {
        setPopup({ isOpen: false, message: '' });
      }, 5500);
      console.log(error);
    }
    setLoading(false);
  }, [getAllTrees]);

  useEffect(() => {
    document.addEventListener('keydown', closeOnEscapeButton, false);
    fetchAllTrees();
    return () => {
      document.removeEventListener('keydown', closeOnEscapeButton, false);
    };
  }, []);

  const closeOnEscapeButton = useCallback((event?: any) => {
    if (event.keyCode === 27) {
      closeDetailsModal();
      closeAddModal();
      closeConfirmationModal();
    }
  }, []);

  const openDetailsModal = useCallback(
    (id: string) => {
      const tree = trees.filter(tree => tree._id === id)[0];
      setSelectedTree(tree);
      setDetailsModal(true);
    },
    [setDetailsModal]
  );

  const closeDetailsModal = useCallback(() => {
    setDetailsModal(false);
    setSelectedTree({} as Tree);
  }, [setDetailsModal]);

  const openAddModal = useCallback(() => {
    setAddModalState(true);
  }, [setAddModalState]);

  const closeAddModal = useCallback(() => {
    setAddModalState(false);
  }, [setAddModalState]);

  const openConfirmationModal = useCallback(() => {
    setConfirmationModal(true);
  }, [setConfirmationModal]);

  const closeConfirmationModal = useCallback(() => {
    setConfirmationModal(false);
    if (detailsModal) {
      closeDetailsModal();
    }
  }, [setConfirmationModal]);

  const deleteTree = useCallback(async () => {
    setLoading(true);
    closeConfirmationModal();
    try {
      const responseMessage = await removeTree(selectedTree);
      await fetchAllTrees();
      setPopup({
        isOpen: true,
        message: responseMessage
      });
      setTimeout(() => {
        setPopup({ isOpen: false, message: '' });
      }, 5500);
    } catch (error) {
      setPopup({ isOpen: true, message: error.message });
      setTimeout(() => {
        setPopup({ isOpen: false, message: '' });
      }, 5500);
      console.log(error);
    }
    setSelectedTree({} as Tree);
    setLoading(false);
  }, [removeTree, selectedTree]);

  const onSubmit = useCallback(async (value: any) => {
    setLoading(true);
    closeAddModal();
    value.survivedQuantity = value.plantedQuantity;
    try {
      const id = await createTree(value);
      await fetchOneTree(id);
      setPopup({ isOpen: true, message: 'Tree created successfully' });
      setTimeout(() => {
        setPopup({ isOpen: false, message: '' });
      }, 5500);
    } catch (error) {
      setPopup({ isOpen: true, message: error.message });
      setTimeout(() => {
        setPopup({ isOpen: false, message: '' });
      }, 5500);
      console.log(error);
    }
    setLoading(false);
  }, []);

  return (
    <Fragment>
      <Navigation />
      <div className={styles.Trees}>
        {loading && (
          <Fragment>
            <Backdrop zIndex={3}></Backdrop>
            <Spinner></Spinner>
          </Fragment>
        )}
        {popup.isOpen && <Popup message={popup.message}></Popup>}
        {!loading && trees.length > 0 && (
          <Fragment>
            <div className={styles.Trees_cardsContainer}>
              {trees.map((item: Tree) => (
                <Card
                  key={item._id}
                  species={item.species}
                  picture={item.picture}
                  survivedQuantity={item.survivedQuantity}
                  click={() => openDetailsModal(item._id)}
                />
              ))}
            </div>
            <Chart length={trees.length} data={trees}></Chart>
          </Fragment>
        )}
        {!loading && trees.length === 0 && <NoData>trees</NoData>}
        {detailsModal && <Backdrop click={closeDetailsModal}></Backdrop>}
        {detailsModal && (
          <DetailsModal
            species={selectedTree.species}
            picture={selectedTree.picture}
            plantedQuantity={selectedTree.plantedQuantity}
            survivedQuantity={selectedTree.survivedQuantity}
            datePlanted={selectedTree.datePlanted}
            daysInSoil={selectedTree.daysInSoil}
            openConfirmationModal={openConfirmationModal}
          ></DetailsModal>
        )}
        {confirmationModal && (
          <Fragment>
            <Backdrop click={closeConfirmationModal} zIndex={3}></Backdrop>
            <ConfirmationModal onYes={deleteTree} onCancel={closeConfirmationModal}></ConfirmationModal>
          </Fragment>
        )}
        {addModal && <Backdrop click={closeAddModal}></Backdrop>}
        {addModal && (
          <AddModal type="trees" onSubmit={onSubmit} onCancel={closeAddModal}>
            tree
          </AddModal>
        )}
        <AddButton click={openAddModal}></AddButton>
      </div>
    </Fragment>
  );
};

export default TreesPage;
