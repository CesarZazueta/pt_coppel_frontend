export interface Mascotas {
    edad_mascota: number
    enfermedad_mascota: string
    nombre_dueño: string
    id: number
    dueño: dueño
    nombre_mascota: string
    edad: number
    enfermedad: string
    fecha_creacion: Date
    esta_activo: boolean
}

export interface dueño {
    id?: number
    nombre_dueño: string
    esta_activo?: boolean
}

export interface mascotaRequest {
    nombre_mascota: string
    edad: number
    enfermedad: string
    dueño: dueño
}


export interface MascotasData {
    id_mascota: number
    nombre_dueño: string
    nombre_mascota: string
    edad_mascota: number
    enfermedad_mascota: string
}

export interface Column {
    header: string
    key: string
}

export const columns: Column[] = [
    { header: 'id', key: 'id_mascota' },
    { header: 'nombre dueño', key: 'nombre_dueño' },
    { header: 'nombre mascota', key: 'nombre_mascota' },
    { header: 'enfermedad mascota', key: 'enfermedad_mascota' },
    { header: 'edad de la mascota', key: 'enfermedad_mascota' },
    { header: 'acciones', key: 'actions' },

]
