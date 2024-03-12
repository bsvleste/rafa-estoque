import { addDoc, collection, onSnapshot } from 'firebase/firestore'
import { FormEvent, useEffect, useState } from 'react'
import uuid from 'react-uuid'
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
  const [pricePerKilo, setPerKilo] = useState(0)
  const [gramas, setGramas] = useState(0)

  async function createProduct(e: FormEvent) {
    e.preventDefault()

    const data = {
      id: uuid(),
      name,
      pricePerKilo: Number(pricePerKilo),
      gramas: Number(gramas),
      finalPrice: (pricePerKilo / KILO) * gramas,
    }
    await addDoc(collection(firestore, 'products'), {
      data,
    })
    setName('')
    setPerKilo(0)
    setGramas(0)
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
            value={pricePerKilo}
          />
          <label htmlFor="gramas">Kg</label>
          <input
            type="text"
            id="gramas"
            onChange={(e) => setGramas(e.target.value)}
            className="text-zinc-900 rounded"
            value={gramas}
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
