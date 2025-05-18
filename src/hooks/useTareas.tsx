import { useShallow } from "zustand/shallow"
import { tareaStore } from "../store/tareaStore"
import { editarTarea, eliminarTareaPorID, getAllTareas, postNuevaTarea } from "../http/tareas"
import type { ITarea } from "../types/ITarea"
import Swal from "sweetalert2"

export const useTareas = () => {

    const {tareas, setArrayTareas, agregarNuevaTarea, eliminarUnaTarea, editarUnaTarea}= tareaStore(
        useShallow((state) => ({
            tareas: state.tareas,
            setArrayTareas: state.setArrayTareas,
            agregarNuevaTarea: state.agregarNuevaTarea,
            eliminarUnaTarea: state.eliminarUnaTarea,
            editarUnaTarea: state.editarUnaTarea,
        }))
    );

    const getTareas = async () => {
        const data = await getAllTareas()
        if (data) setArrayTareas(data);
    }

    const crearTarea = async (nuevaTarea: ITarea) => {

        agregarNuevaTarea(nuevaTarea);

        try {
            await postNuevaTarea(nuevaTarea);
        } catch (error) {
            eliminarUnaTarea(nuevaTarea.id!);
            Swal.fire("Éxito", "Tarea creada", "success");
        }
    }

    const putTareaEditar = async (tareaEditada: ITarea) => {
        
        const estadoPrevio = tareas.find((el) => el.id === tareaEditada.id);

        try {
            await editarTarea(tareaEditada)
            await getTareas();
            Swal.fire("Éxito", "Tarea actualizada", "success");
        } catch (error) {
            if (estadoPrevio) editarTarea(estadoPrevio);
        }
    }

    const eliminarTarea = async (idTarea: string) => {

        const estadoPrevio = tareas.find((el) => el.id === idTarea);
            const confirm = await Swal.fire({
                title: "¿Está seguro?",
                text: "No podrá revertir esta acción",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
            });

            if(!confirm.isConfirmed) return;
            eliminarUnaTarea(idTarea);

            try {
                await eliminarTareaPorID(idTarea);
                await getTareas();
                Swal.fire("Éxito", "Tarea eliminada", "success");
            } catch (error) {
                if (estadoPrevio) editarTarea(estadoPrevio);
                Swal.fire("Éxito", "Tarea creada", "success");
            }
    }

    return {
        getTareas,
        crearTarea,
        putTareaEditar,
        eliminarTarea,
        tareas,
    }
}