import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/auth"
import { columns, type Mascotas, type MascotasData } from "../components/dataTable"
import MascotaDashboard from "../components/table"
import { oBtenerMascotas } from "../api/auth"
import { useEffect, useState } from "react"
import StudentDrawer from "../components/MascotaDrawer"
import Button from "../components/button"


interface Profile {
    usuario: string;
}

interface MascotaApi {
    id: number;
    nombre_dueño: string;
    nombre_mascota: string;
    edad_mascota: string;
    enfermedad_mascota: string;
}

function Dashboar() {
    const [mascotas, setMascotas] = useState<Mascotas[]>([])
    const [mascotaData, setMascotaData] = useState<MascotasData[]>([])
    const [isOpen, setIsOpen] = useState(false)


    const logout: () => void = useAuthStore((state) => state.logout)
    const navigate = useNavigate();

    const profile: Profile = useAuthStore((state) => state.profile)

    const cargarMascotas = async (): Promise<void> => {
        const mascotasObtenidas: Mascotas[] = await oBtenerMascotas()

        const mascotaProcesadas: MascotasData[] = mascotasObtenidas
            .filter((mascota: Mascotas) => mascota.esta_activo === true)
            .map((mascota: Mascotas): MascotasData => {
                const mascotaProcesada: MascotasData = {
                    id_mascota: mascota.id,
                    nombre_dueño: mascota.nombre_mascota,
                    nombre_mascota: mascota.nombre_mascota,
                    edad_mascota: mascota.edad,
                    enfermedad_mascota: mascota.enfermedad
                }

                return mascotaProcesada
            })

        setMascotas(mascotasObtenidas as unknown as Mascotas[]);
        setMascotaData(mascotaProcesadas);

        console.log("mascotas obtenidas", mascotasObtenidas);


    }

    useEffect(() => {
        cargarMascotas()
    }, [])

    return (
        <div >
            <div >
                hola {profile.usuario}
            </div>
            <button onClick={() => {
                logout()
                navigate('/login')
            }}>
                cerrar sesion
            </button>
            <div className="flex flex-col items-center gap-6 p-8">
                <Button onClick={() => setIsOpen(true)}>Crear registro de mascota</Button>
                <StudentDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} direction="right" />
            </div>
            <MascotaDashboard columns={columns} data={mascotaData} />



        </div>
    )
}

export default Dashboar