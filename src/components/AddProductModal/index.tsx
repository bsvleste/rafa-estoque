import * as Dialog from '@radix-ui/react-dialog'
import { firestore } from '@src/firabaseconfig/firabase'
import { addDoc, collection } from 'firebase/firestore'
import { X } from 'lucide-react'
import { FormEvent, useState } from 'react'

const KILO = 1000
export function AddProductModal() {
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
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed w-screen h-full inset-0 bg-zinc-900/75" />
      <Dialog.Content className="min-w[32rem] rounded-lg px-3 py-3 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Dialog.Title>Cadastrar Produto</Dialog.Title>
        <Dialog.Close className="absolute bg-transparent border-0 top-10 right-3 leading-none pointer bg-zinc-400 rounded-lg">
          <X size={32} />
        </Dialog.Close>
        <form
          action=""
          className="flex flex-col w-[400px] h-[250px] rounded-lg bg-zinc-700 p-4"
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
      </Dialog.Content>
    </Dialog.Portal>
  )
}
/* 
  const [name, setName] = useState('')
  const [kilo, setPerKilo] = useState('')
  const [kiloGramas, setGramas] = useState('')
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button className="p-6 bg-violet-500 rounded-lg">Add Products</button>
      </Dialog.Trigger>
      <Dialog.Content>
        <div>
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

        <div>
          <Dialog.Close>
            <button>Close</button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
*/
