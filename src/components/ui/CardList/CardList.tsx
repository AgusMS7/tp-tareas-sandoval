import styles from './CardList.module.css';
import { type FC } from 'react';
import type { ITarea } from '../../../types/ITarea';
import { useTareas } from '../../../hooks/useTareas';

type ICardList = {
    tarea: ITarea;
    handleOpenModalEdit: (tarea:ITarea) => void;
}

export const CardList: FC<ICardList> = ({ tarea, handleOpenModalEdit}) => {


    const { eliminarTarea } = useTareas();
    const eliminarTareaById = () => {
        eliminarTarea(tarea.id!);
    }

    const editarTarea = () => {
        handleOpenModalEdit(tarea);
    }

    const formatearFecha = (fecha: string) => {
        const date = new Date(fecha)
        return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        })
    }
return (
    <div className={styles.containerCard}>
      <div className={styles.contentCard}>
        <h3>{tarea.titulo}</h3>
        <p>{tarea.descripcion}</p>
        <div className={styles.fechaLimite}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          {formatearFecha(tarea.fechaLimite)}
        </div>
      </div>
      <div className={styles.actionCard}>
        <button className={styles.editButton} onClick={editarTarea} title="Editar tarea">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
        <button className={styles.deleteButton} onClick={eliminarTareaById} title="Eliminar tarea">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
    </div>
  )
}
