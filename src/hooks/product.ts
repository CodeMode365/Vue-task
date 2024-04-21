import axios from 'axios'
import type { iProduct } from '@/types/product'

export const fetchProducts = async (): Promise<iProduct[]> => {
  try {
    const res = await axios.get('https://fakestoreapi.com/products/')
    const data = await res.data
    return data
  } catch (error: unknown) {
    throw Error('Failed to fetch data!')
  }
}
export const fetchProductDetail = async (id: number): Promise<iProduct[]> => {
  try {
    const res = await axios.get(`https://fakestoreapi.com/products/${id}`)
    return await res.data
  } catch (error: unknown) {
    throw Error('Failed to fetch data!')
  }
}

export const searchProduct = async (products: iProduct[], searchText: string) => {
  return products.filter(({ title }) =>
    title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
  )
}
