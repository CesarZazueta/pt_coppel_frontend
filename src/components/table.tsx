import { SquarePen, Trash2 } from "lucide-react"
import type { Column, MascotasData } from "./dataTable"
import { useState } from "react"
import EditarMascotaDrawer from "./EditarMascotaDrawer"
import { eliminarMascota } from "../api/auth"


interface EmployeeTableProps {
    columns: Column[]
    data: MascotasData[]
}

const MascotaDashboard: React.FC<EmployeeTableProps> = ({ columns, data: mascotaData }) => {
    const [idMascotaEditar, setIdMascotaEditar] =
        useState<number | null>(null)

    const [editarAbierto, setEditarAbierto] = useState(false)

    const handleEliminarMascota = async (idMascota: number) => {
        try {
            await eliminarMascota(idMascota)

            console.log('Mascota eliminada correctamente')
        } catch (error) {
            console.error('Error al eliminar la mascota:', error)
        }
    }


    return (
        <div className="mx-auto my-8 max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-8">
            <h1 className="mb-12 text-center text-2xl font-semibold text-gray-800">Mascota Dashboard</h1>
            <table className="w-full table-auto overflow-hidden rounded-lg border border-gray-200 shadow-xs">
                <thead className="bg-gray-100">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className="px-4 py-4 text-left text-sm font-semibold text-[#91929E] uppercase"
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {mascotaData.map((mascota, index) => (
                        <tr
                            key={index}
                            className="bg-white transition duration-200 ease-in-out hover:bg-gray-100"
                        >
                            <td className="px-4 py-6 text-sm text-[#0A1629]">{mascota.id_mascota}</td>
                            <td className="px-4 py-6 text-sm text-[#0A1629]">{mascota.nombre_mascota}</td>
                            <td className="px-4 py-6 text-sm text-[#0A1629]">{mascota.nombre_dueño}</td>
                            <td className="px-4 py-6 text-sm text-[#0A1629]">{mascota.enfermedad_mascota}</td>
                            <td className="px-4 py-6 text-sm text-[#0A1629]">{mascota.edad_mascota}</td>
                            <td className="px-6 py-6 text-sm text-[#0A1629]">
                                <div className="flex space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIdMascotaEditar(mascota.id_mascota)
                                            setEditarAbierto(true)
                                        }}
                                        className="text-[#0A1629] hover:text-gray-700"
                                    >
                                        <SquarePen size={16} />
                                    </button>
                                    <EditarMascotaDrawer
                                        isOpen={editarAbierto}
                                        onClose={() => {
                                            setEditarAbierto(false)
                                            setIdMascotaEditar(null)
                                        }}
                                        idMascota={idMascotaEditar}
                                        direction="right"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleEliminarMascota(mascota.id_mascota)}
                                        className="text-[#F65160] hover:text-red-700"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default MascotaDashboard