import Image from "next/image"
import useKiosko from "../hooks/useKiosko"

const Categoria = ({categoria}) => {

    const {id, nombre, icono} = categoria
    const {handleClickCategoria, categoriaActual} = useKiosko()

    return (
        <div className={`${categoriaActual?.id === id && 'bg-amber-400'} flex items-center gap-2 w-full border p-5 hover:bg-amber-400`}>
            <Image width={100} height={100} src={`/assets/img/icono_${icono}.svg`} alt='Imagen icono' />
            <button  onClick={() => handleClickCategoria(id)} type='button' className='text-2xl font-bold hover:cursor-pointer'>{nombre}</button>
        </div>
    )
}

export default Categoria