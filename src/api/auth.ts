import type { promises } from 'dns'
import type { mascotaRequest, Mascotas } from '../components/dataTable'
import axios from '../libs/axios'

export const LoginReques = async (usuario: string, contraseña: string) => {

    return await axios.post('/auth/login', {
        usuario,
        contraseña
    })
}

export const oBtenerMascotas = async (): promises<Mascotas[]> => {
    const response = await axios.get('/mascotas/obtener_mascotas')
    return response.data;
}

export const obtenerMascotaPorId = async (idMascota: number,): Promise<Mascotas> => {
    const response = await axios.get(`/mascotas/obtener_mascota/${idMascota}`,)
    return response.data
}

export const actualizarMascota = async (
    idMascota: number,
    mascotaData: mascotaRequest,
) => {
    return await axios.post(
        `/mascotas/actualizar_mascota/${idMascota}`,
        mascotaData,
    )
}


export const crearMascota = async (mascotaData: mascotaRequest) => {
    return await axios.post('/mascotas/crear_mascota', mascotaData
    )
}


export const eliminarMascota = async (idMascota: number) => {
    return await axios.get(`/mascotas/eliminar_mascota/${idMascota}`);
};