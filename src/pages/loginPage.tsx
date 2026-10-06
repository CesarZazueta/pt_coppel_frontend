import type React from "react";
import { LoaderCircle, Lock, Mail, User } from 'lucide-react'
import { LoginReques } from "../api/auth";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { useState, type ChangeEvent } from "react";

function LoginPage() {
    const [user, setUser] = useState({ usuario: '', password: '' })
    const [errors, setErrors] = useState({ usuario: '', password: '' })
    const [loading, setLoading] = useState(false)


    const setToken = useAuthStore(state => state.setToken)
    const setProfile = useAuthStore(state => state.setProfile)
    const navigate = useNavigate()


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
        setErrors({ ...errors, [name]: '' })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let newErrors = { usuario: '', password: '' }

        if (!user.usuario.trim()) newErrors.usuario = 'Please enter a valid usuario.'
        if (!user.password.trim()) newErrors.password = 'Password cannot be empty.'

        if (newErrors.usuario || newErrors.password) {
            setErrors(newErrors)
            return
        }


        const usuario = (e.currentTarget.elements[0] as HTMLInputElement).value
        const contraseña = (e.currentTarget.elements[1] as HTMLInputElement).value

        const resLogin = await LoginReques(usuario, contraseña);

        console.log(resLogin);
        setToken(resLogin.data.token)
        setProfile(resLogin.data.profile)

        navigate('/dashboard');

    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md rounded-lg bg-white p-6">
                <div className="mb-4 flex justify-center">
                    <span className="text-3xl font-bold text-yellow-500">⚡</span>
                </div>
                <h2 className="mb-8 text-center text-2xl font-semibold text-gray-800">Iniciar sesion</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="usuario" className="mb-1.5 block text-sm font-medium text-gray-700">
                            usuario
                        </label>
                        <div className="relative flex items-center">
                            <span className="absolute left-3 text-gray-500">
                                <User size={20} />
                            </span>
                            <input
                                id="usuario"
                                type="text"
                                name="usuario"
                                placeholder="Enter your usuario"
                                value={user.usuario}
                                onChange={handleChange}
                                className={`w-full rounded-lg border px-4 py-2.5 pl-10 focus:ring-2 focus:ring-blue-200 ${errors.usuario ? 'border-red-500 ring-red-200' : 'border-gray-300'
                                    }`}
                            />
                        </div>
                        {errors.usuario && <p className="mt-1 text-sm text-red-600">{errors.usuario}</p>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <div className="relative flex items-center">
                            <span className="absolute left-3 text-gray-500">
                                <Lock size={20} />
                            </span>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Ingrese su contraseña"
                                value={user.password}
                                onChange={handleChange}
                                className={`w-full rounded-lg border px-4 py-2.5 pl-10 focus:ring-2 focus:ring-blue-200 ${errors.password ? 'border-red-500 ring-red-200' : 'border-gray-300'
                                    }`}
                            />
                        </div>
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex h-10 w-full items-center justify-center rounded-lg bg-neutral-800 text-black hover:bg-neutral-700 disabled:bg-gray-300"
                    >
                        {loading ? <LoaderCircle className="animate-spin" size={20} /> : 'Iniciar sesion'}
                    </button>
                </form>
            </div>
        </div>
    )

}

export default LoginPage;