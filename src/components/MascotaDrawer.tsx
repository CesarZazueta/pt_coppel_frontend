import { useActionState } from 'react'
import Button from './button'
import Drawer from './drawer'
import Input from './input'

import { crearMascota } from '../api/auth'
import type { mascotaRequest } from './dataTable'

interface MascotaDrawerProps {
  isOpen: boolean
  onClose: () => void
  direction?: 'left' | 'right' | 'bottom'
}

interface FormState {
  nombre_dueño: string
  nombre_mascota: string
  edad: number
  enfermedad: string
  message?: string
  error?: string
}

const initialState: FormState = {
  nombre_dueño: '',
  nombre_mascota: '',
  edad: 1,
  enfermedad: '',
}

const handleMascotaSubmit = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const nombre_dueño = formData.get('nombre_dueño') as string
  const nombre_mascota = formData.get('nombre_mascota') as string
  const edad = Number(formData.get('edad'))
  const enfermedad = formData.get('enfermedad') as string

  if (!nombre_dueño || !nombre_mascota || !edad || !enfermedad) {
    return {
      ...prevState,
      error: 'Por favor completa todos los campos',
      message: undefined,
    }
  }

  const mascotaData: mascotaRequest = {
    nombre_mascota,
    edad,
    enfermedad,
    dueño: {
      nombre_dueño,
    },
  }


  try {
    await crearMascota(mascotaData)


    return {
      nombre_dueño: '',
      nombre_mascota: '',
      edad: 1,
      enfermedad: '',
      message: 'Mascota agregada correctamente',
      error: undefined,
    }
  } catch (error) {
    console.error('Error al guardar mascota:', error)

    return {
      ...prevState,
      nombre_dueño,
      nombre_mascota,
      edad,
      enfermedad,
      message: undefined,
      error: 'Ocurrió un error al guardar la mascota',
    }
  }
}

const MascotaDrawer: React.FC<MascotaDrawerProps> = ({
  isOpen,
  onClose,
  direction,
}) => {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    handleMascotaSubmit,
    initialState,
  )

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Agregar nueva mascota"
      direction={direction}
    >
      <form action={formAction} className="flex flex-col gap-4">
        <Input
          label="Nombre del dueño"
          name="nombre_dueño"
          placeholder="Ingresa el nombre del dueño"
          defaultValue={state.nombre_dueño}
        />

        <Input
          label="Nombre de la mascota"
          name="nombre_mascota"
          placeholder="Ingresa el nombre de la mascota"
          defaultValue={state.nombre_mascota}
        />

        <Input
          label="Edad"
          name="edad"
          type="number"
          placeholder="Ingresa la edad de la mascota"
          defaultValue={state.edad}
        />

        <Input
          label="Enfermedad"
          name="enfermedad"
          placeholder="Ingresa la enfermedad"
          defaultValue={state.enfermedad}
        />

        {state.message && (
          <p className="text-sm font-medium text-green-600">
            {state.message}
          </p>
        )}

        {state.error && (
          <p className="text-sm font-medium text-red-600">
            {state.error}
          </p>
        )}

        <div className="mt-4 flex justify-end gap-3">
          <Button
            variant="outline"
            type="button"
            onClick={onClose}
            disabled={isPending}
          >
            Cancelar
          </Button>

          <Button type="submit" disabled={isPending}>
            {isPending ? 'Guardando...' : 'Guardar mascota'}
          </Button>
        </div>
      </form>
    </Drawer>
  )
}

export default MascotaDrawer