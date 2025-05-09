import { useState } from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import { FaTshirt, FaTshirt as FaHoodie, FaTshirt as FaShirt } from 'react-icons/fa'

const categories = [
  { id: 'tshirts', name: 'T-Shirts', icon: FaTshirt },
  { id: 'hoodies', name: 'Hoodies', icon: FaHoodie },
  { id: 'polos', name: 'Polo Shirts', icon: FaShirt },
]

const templates = {
  tshirts: [
    { id: 1, name: 'Classic T-Shirt', image: '/templates/tshirt-1.png' },
    { id: 2, name: 'V-Neck T-Shirt', image: '/templates/tshirt-2.png' },
    { id: 3, name: 'Slim Fit T-Shirt', image: '/templates/tshirt-3.png' },
  ],
  hoodies: [
    { id: 1, name: 'Classic Hoodie', image: '/templates/hoodie-1.png' },
    { id: 2, name: 'Zip-Up Hoodie', image: '/templates/hoodie-2.png' },
    { id: 3, name: 'Oversized Hoodie', image: '/templates/hoodie-3.png' },
  ],
  polos: [
    { id: 1, name: 'Classic Polo', image: '/templates/polo-1.png' },
    { id: 2, name: 'Slim Fit Polo', image: '/templates/polo-2.png' },
    { id: 3, name: 'Performance Polo', image: '/templates/polo-3.png' },
  ],
}

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState('tshirts')

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Template
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Select from our collection of premium clothing templates
          </p>
        </div>

        {/* Category selector */}
        <div className="mt-8">
          <div className="flex justify-center space-x-4">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-md ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {category.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Template grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {templates[selectedCategory as keyof typeof templates].map((template) => (
            <Link
              key={template.id}
              href={`/designer?template=${selectedCategory}-${template.id}`}
              className="group"
            >
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="absolute inset-0 bg-gray-100 animate-pulse" />
                <Image
                  src={template.image}
                  alt={template.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-semibold text-white">{template.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
} 