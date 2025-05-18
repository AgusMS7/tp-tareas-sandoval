import styles from './Modal.module.css';
import { tareaStore } from '../../../store/tareaStore';
import { useEffect, useState, type ChangeEvent, type FC, type FormEvent } from 'react';
import type { ITarea } from '../../../types/ITarea';
import { useTareas } from '../../../hooks/useTareas';
type IModal = {
    handleCloseModal: VoidFunction
}
export const Modal :FC<IModal> = ({ handleCloseModal }) => {

    const setTareaActiva = tareaStore((state) => state.setTareaActiva);

    const tareaActiva = tareaStore((state) => state.tareaActiva)

    const initialState: ITarea = {
        titulo: "",
        descripcion: "",
        fechaLimite: "",
    }

    const {crearTarea, putTareaEditar} = useTareas();

    const [formValues, setFormValues] = useState<ITarea>(initialState)

    useEffect(() => {
        if(tareaActiva) setFormValues(tareaActiva);
    },[])

    const handleChange = (
        e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({...prev, [name]: value}));
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        if(tareaActiva) {
            putTareaEditar(formValues);
        } else {
            crearTarea({...formValues, id: new Date().toDateString()});
        }
        setTareaActiva(null);
        handleCloseModal();
    }

return (
    <div className={styles.containerPrincipalModal}>
      <div className={styles.contentPopUP}>
        <div className={styles.modalHeader}>
          <h3>{tareaActiva ? "Editar tarea" : "Crear tarea"}</h3>
          <button className={styles.closeButton} onClick={handleCloseModal} aria-label="Cerrar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.formContent}>
          <div className={styles.formGroup}>
            <label htmlFor="titulo">Título</label>
            <input
              id="titulo"
              placeholder="Ingrese un título"
              type="text"
              required
              onChange={handleChange}
              value={formValues.titulo}
              autoComplete="off"
              name="titulo"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              placeholder="Ingrese una descripción"
              required
              onChange={handleChange}
              value={formValues.descripcion}
              name="descripcion"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="fechaLimite">Fecha límite</label>
            <input
              id="fechaLimite"
              type="date"
              required
              value={formValues.fechaLimite}
              onChange={handleChange}
              autoComplete="off"
              name="fechaLimite"
            />
          </div>

          <div className={styles.buttonCard}>
            <button type="button" className={`${styles.cancelButton}`} onClick={handleCloseModal}>
              Cancelar
            </button>
            <button type="submit" className={`${styles.submitButton}`}>
              {tareaActiva ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginRight: "6px" }}
                  >
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                    <polyline points="7 3 7 8 15 8"></polyline>
                  </svg>
                  Guardar cambios
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginRight: "6px" }}
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Crear tarea
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}