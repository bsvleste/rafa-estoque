import { addDoc, collection, onSnapshot } from 'firebase/firestore'
import { FormEvent, useEffect, useState } from 'react'
import { firestore } from '../../firabaseconfig/firabase'
import { priceFormatter } from '../../utils/formatter'
export interface ProductsProps {
  id: string
  data: {
    name: string
    pricePerKilo: number
    gramas: number
    finalPrice: number
  }
}
/* 
const productsFormSchema = z.objec({
  name:z.string().min(3,{message:"o nome do produto deve conter no minimo 3 carcteres"}),
  pricePerKilo:z.number(),
  gramas
}) */
const KILO = 1000
export function Home() {
  const [products, setProducts] = useState<ProductsProps[]>([])
  const [name, setName] = useState('')
  const [kilo, setPerKilo] = useState('')
  const [kiloGramas, setGramas] = useState('')

  async function createProduct(e: FormEvent) {
    e.preventDefault()

    const campo = {
      name,
      pricePerKilo: Number(kilo),
      gramas: Number(kiloGramas),
    }
    const data = {
      ...campo,
      finalPrice: (campo.pricePerKilo / KILO) * campo.gramas,
    }
    console.log(data)
    await addDoc(collection(firestore, 'products'), {
      data,
    })
    setName('')
    setPerKilo('')
    setGramas('')
  }
  useEffect(
    () =>
      onSnapshot(collection(firestore, 'products'), (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        }) as ProductsProps[]
        console.log(data)
        setProducts(data)
      }),
    [],
  )

  return (
    <div className=" h-screen justify-center items-center flex flex-col mx-8 ">
      <div className="flex justify-center items-center">
        <form
          action=""
          className="flex flex-col w-[250px] h-[250px] rounded-lg bg-zinc-700 p-4"
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            className="text-zinc-900 rounded"
            value={name}
          />
          <label htmlFor="pricePerKilo">Preço por Kilo</label>
          <input
            type="text"
            id="pricePerKilo"
            onChange={(e) => setPerKilo(e.target.value)}
            className="text-zinc-900 rounded"
            value={kilo}
          />
          <label htmlFor="gramas">Kg</label>
          <input
            type="text"
            id="gramas"
            onChange={(e) => setGramas(e.target.value)}
            className="text-zinc-900 rounded"
            value={kiloGramas}
          />
          <button
            className=" p-4 bg-violet-500 rounded-lg mt-4"
            onClick={(e) => createProduct(e)}
          >
            Cadastar novo Produto
          </button>
        </form>
      </div>
      <div className="flex flex-col w-full ">
        <div className="flex gap-3 justify-between">
          <h1>Nome</h1>
          <h1>K/kg</h1>
          <h1>Valor por Kilo</h1>
          <h1>Preco Final</h1>
        </div>
        {products.map((product: ProductsProps) => (
          <div key={product.id} className="flex gap-2 justify-between">
            <h1>{product.data.name}</h1>
            <h2>{product.data.gramas}</h2>
            <h2>{product.data.pricePerKilo}</h2>
            <h2>{priceFormatter.format(product.data.finalPrice)}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}
