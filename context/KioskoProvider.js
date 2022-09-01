import { useState, useEffect, createContext } from "react";
import axios from "axios";
import {toast} from 'react-toastify'
import { useRouter } from "next/dist/client/router";

const KioskoContext = createContext()

export const KioskoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [paso, setPaso] = useState(1)
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)
    const router = useRouter()

    const obtenerCategorias = async () => {
        const { data } = await axios('/api/categorias')
        setCategorias(data)  
    } 
    
    const handleClickCategoria = (id) => {
        const categoria = categorias.filter(c => c.id === id)
        setCategoriaActual(categoria[0])
        router.push('/')
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)    
    }

    const handleAgregarPedido = ({categoriaId, ...producto}) => {
        if(pedido.some(p => p.id === producto.id)){
            const pedidoActualizado = pedido.map(p => p.id === producto.id ? producto : p)
            setPedido(pedidoActualizado)
            toast.success('Guardado correctamente')
        }else{
            setPedido([...pedido, producto])
            toast.success('Agregado al pedido')
        }

        setModal(false)
    }

    const handleChangePaso = (paso) => {
        setPaso(paso)
    }

    const handleEditarCantidad = (id) => {   
        const pedidoActualizado = pedido.filter(producto => producto.id === id)
        handleSetProducto(pedidoActualizado[0])
        setModal(!modal)
    }

    const handleEliminarProducto = (id) => {
        const actualizarPedido = pedido.filter(producto => producto.id !== id)
        setPedido(actualizarPedido)
        console.log('Ya eliminaste')
    }

    const colocarOrden = async (e) => {
        e.preventDefault()

        try {
            await axios.post('/api/ordenes', {nombre, pedido, total, fecha: Date.now().toString()})

            //Resetear App
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)

            //Orden agregada
            toast.success('Orden agregada correctamente')

            setTimeout(() => {
                router.push('/')
            }, 3000)


        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        obtenerCategorias()
    }, [])

    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio*producto.cantidad)+total, 0)
        setTotal(nuevoTotal)
    }, [pedido])

    return(
        <KioskoContext.Provider value={{categorias, handleClickCategoria, categoriaActual, handleSetProducto, producto, modal, handleChangeModal, handleAgregarPedido, pedido, paso, handleChangePaso, handleEditarCantidad, handleEliminarProducto, nombre, setNombre, colocarOrden, total}}>
            {children}
        </KioskoContext.Provider>
    )
}

export default KioskoContext