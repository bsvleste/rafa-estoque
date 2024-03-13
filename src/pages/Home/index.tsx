import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { firestore } from '../../firabaseconfig/firabase'
import { priceFormatter } from '../../utils/formatter'
import * as Dialog from '@radix-ui/react-dialog'
import { AddProductModal } from '@src/components/AddProductModal'

export interface ProductsProps {
  id: string
  data: {
    name: string
    pricePerKilo: number
    gramas: number
    finalPrice: number
  }
}

export function Home() {
  const [products, setProducts] = useState<ProductsProps[]>([])
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
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="p-6 bg-violet-500 rounded-lg">
              Add Products
            </button>
          </Dialog.Trigger>
          <AddProductModal />
        </Dialog.Root>
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
