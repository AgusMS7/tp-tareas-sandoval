import { useEffect, useState } from 'react';
import { tareaStore } from '../../../store/tareaStore';
import styles from './ListTareas.module.css';
import { CardList } from '../CardList/CardList';
import { Modal } from '../Modal/Modal';
import type { ITarea } from '../../../types/ITarea';
import { useTareas } from '../../../hooks/useTareas';

export const ListTareas = () => {

    const { tareas, getTareas } = useTareas();
    
    const setTareaActiva = tareaStore((state) => state.setTareaActiva);



    const [openModalTarea, setOpenModalTarea] = useState (false);

    const handleOpenModalEdit = (tarea:ITarea) => {
        setTareaActiva(tarea);
        setOpenModalTarea(true);
    }

    const handleCloseModal = () => {
        setOpenModalTarea(false);
    }

    useEffect(() => {
        getTareas();
    }, []);

    return (
        <>
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTitleAndButton}>
                    <h2>Lista de tareas</h2>
                    <button className={styles.addButton} onClick={()=>{setOpenModalTarea(true)}}>Agregar tarea</button>
                </div>
                <div className={styles.containerList}>
                    {
                    tareas.length > 0 ? 
                    tareas.map((el) => (
                        <CardList
                            handleOpenModalEdit={handleOpenModalEdit}
                            tarea={el}
                        />
                    )) : (
                        <h3>No hay tareas</h3>
                    )}
                </div>
            </div>
            {openModalTarea && <Modal handleCloseModal={handleCloseModal}/>}
        </>
    );
}