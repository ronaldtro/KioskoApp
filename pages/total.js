import Layout from "../layout/Layout"
import { useEffect, useCallback } from "react"
import useKiosko from "../hooks/useKiosko"
import { formatearDinero } from "../helpers"

export default function Total() {

    const {pedido, nombre, setNombre, colocarOrden, total} = useKiosko()

    const comprobarPedido = useCallback( () => {
        return pedido.length === 0 || nombre === ''
    }, [pedido, nombre])

    useEffect(() => {
        comprobarPedido()
    }, [pedido, comprobarPedido])

    return(
        <Layout pagina='Total'>
            <h1 className="text-4xl font-black">Total y confirmar pedido</h1>
            <p className="text-2xl my-10">Confirma tu pedido a continuacion</p>
            <form onSubmit={colocarOrden}>
                <div>
                    <label htmlFor='nombre' className="block uppercase text-slate-800 font-bold text-xl">Nombre</label>
                    <input value={nombre} onChange={e => setNombre(e.target.value)} id='nombre' type='text' className="bg-gray-200 w-full mt-3 lg:w-1/3 p-2 rounded-md"/>
                </div>
                <div className="mt-10">
                    <p className="text-2xl">Total a pagar {''} <span className="font-bold">{formatearDinero(total)}</span></p>
                </div>
                <div className='mt-5'>
                    <input type='submit' className={`${comprobarPedido() ? 'bg-indigo-100' : 'bg-indigo-600 hover:bg-indigo-800'} text-center w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white`} value='confirmar pedido' disabled={comprobarPedido()} />
                </div>
            </form>
        </Layout>
    )
}