'use client'

import { useEffect, useState } from 'react'

import Button from './button'
import Drawer from './drawer'
import Input from './input'

import {
  actualizarMascota,
  obtenerMascotaPorId,
} from '../api/auth'

import type { mascotaRequest } from './dataTable'

interface EditarMascotaDrawerProps {
  isOpen: boolean
  onClose: () => void
  idMascota: number | null
  direction?: 'left' | 'right' | 'bottom'
}

interface FormularioMascota {
  nombre_dueño: string
  nombre_mascota: string
  edad: number
  enfermedad: string
}

const EditarMascotaDrawer: React.FC<EditarMascotaDrawerProps> = ({
  isOpen,
  onClose,
  idMascota,
  direction,
}) => {
  const [formulario, setFormulario] = useState<FormularioMascota>({
    nombre_dueño: '',
    nombre_mascota: '',
    edad: 1,
    enfermedad: '',
  })

  const [cargando, setCargando] = useState(false)
  const [guardando, setGuardando] = useState(false)

  const [message, setMessage] = useState<string>()
  const [error, setError] = useState<string>()

  useEffect(() => {
    if (!isOpen || idMascota === null) {
      return
    }

    const cargarMascota = async () => {
      try {
        setCargando(true)
        setError(undefined)
        setMessage(undefined)

        const mascota = await obtenerMascotaPorId(idMascota)

        console.log('Mascota obtenida:', mascota)

        setFormulario({
          nombre_dueño: mascota.dueño.nombre_dueño,
          nombre_mascota: mascota.nombre_mascota,
          edad: mascota.edad,
          enfermedad: mascota.enfermedad,
        })
      } catch (error) {
        console.error('Error al obtener mascota:', error)

        setError('No se pudo consultar la mascota')
      } finally {
        setCargando(false)
      }
    }

    cargarMascota()
  }, [idMascota, isOpen])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (idMascota === null) {
      return
    }

    if (
      !formulario.nombre_dueño ||
      !formulario.nombre_mascota ||
      !formulario.edad ||
      !formulario.enfermedad
    ) {
      setError('Por favor completa todos los campos')
      return
    }

    const mascotaData: mascotaRequest = {
      nombre_mascota: formulario.nombre_mascota,
      edad: formulario.edad,
      enfermedad: formulario.enfermedad,

      dueño: {
        nombre_dueño: formulario.nombre_dueño,
      },
    }

    try {
      setGuardando(true)
      setError(undefined)
      setMessage(undefined)

      await actualizarMascota(idMascota, mascotaData)

      setMessage('Mascota actualizada correctamente')
    } catch (error) {
      console.error('Error al actualizar mascota:', error)

      setError('Ocurrió un error al actualizar la mascota')
    } finally {
      setGuardando(false)
    }
  }

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Editar mascota"
      direction={direction}
    >
      {cargando ? (
        <div className="py-8 text-center text-sm text-gray-500">
          Cargando información de la mascota...
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <Input
            label="Nombre del dueño"
            name="nombre_dueño"
            placeholder="Ingresa el nombre del dueño"
            value={formulario.nombre_dueño}
            onChange={(event) =>
              setFormulario({
                ...formulario,
                nombre_dueño: event.target.value,
              })
            }
          />

          <Input
            label="Nombre de la mascota"
            name="nombre_mascota"
            placeholder="Ingresa el nombre de la mascota"
            value={formulario.nombre_mascota}
            onChange={(event) =>
              setFormulario({
                ...formulario,
                nombre_mascota: event.target.value,
              })
            }
          />

          <Input
            label="Edad"
            name="edad"
            type="number"
            placeholder="Ingresa la edad de la mascota"
            value={formulario.edad}
            onChange={(event) =>
              setFormulario({
                ...formulario,
                edad: Number(event.target.value),
              })
            }
          />

          <Input
            label="Enfermedad"
            name="enfermedad"
            placeholder="Ingresa la enfermedad"
            value={formulario.enfermedad}
            onChange={(event) =>
              setFormulario({
                ...formulario,
                enfermedad: event.target.value,
              })
            }
          />

          {message && (
            <p className="text-sm font-medium text-green-600">
              {message}
            </p>
          )}

          {error && (
            <p className="text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <div className="mt-4 flex justify-end gap-3">
            <Button
              variant="outline"
              type="button"
              onClick={onClose}
              disabled={guardando}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              disabled={guardando}
            >
              {guardando ? 'Guardando...' : 'Actualizar mascota'}
            </Button>
          </div>
        </form>
      )}
    </Drawer>
  )
}

export default EditarMascotaDrawer