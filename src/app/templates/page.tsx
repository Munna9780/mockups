'use client'

import { useState } from 'react'
import Link from 'next/link'

const categories = [
  'All',
  'T-Shirts',
  'Hoodies',
  'Polo Shirts',
  'Devices',
  'Print',
  'Social Media'
]

const templates = [
  // T-Shirt Templates
  {
    id: 1,
    title: 'Classic T-Shirt - Front',
    category: 'T-Shirts',
    thumbnail: '/templates/tshirt-front.jpg',
    description: 'Classic t-shirt mockup with front view.',
    type: 'tshirt',
    view: 'front'
  },
  {
    id: 2,
    title: 'Classic T-Shirt - Back',
    category: 'T-Shirts',
    thumbnail: '/templates/tshirt-back.jpg',
    description: 'Classic t-shirt mockup with back view.',
    type: 'tshirt',
    view: 'back'
  },
  {
    id: 3,
    title: 'Classic T-Shirt - Side',
    category: 'T-Shirts',
    thumbnail: '/templates/tshirt-side.jpg',
    description: 'Classic t-shirt mockup with side view.',
    type: 'tshirt',
    view: 'side'
  },
  // Hoodie Templates
  {
    id: 4,
    title: 'Classic Hoodie - Front',
    category: 'Hoodies',
    thumbnail: '/templates/hoodie-front.jpg',
    description: 'Classic hoodie mockup with front view.',
    type: 'hoodie',
    view: 'front'
  },
  {
    id: 5,
    title: 'Classic Hoodie - Back',
    category: 'Hoodies',
    thumbnail: '/templates/hoodie-back.jpg',
    description: 'Classic hoodie mockup with back view.',
    type: 'hoodie',
    view: 'back'
  },
  {
    id: 6,
    title: 'Classic Hoodie - Side',
    category: 'Hoodies',
    thumbnail: '/templates/hoodie-side.jpg',
    description: 'Classic hoodie mockup with side view.',
    type: 'hoodie',
    view: 'side'
  },
  // Polo Shirt Templates
  {
    id: 7,
    title: 'Classic Polo - Front',
    category: 'Polo Shirts',
    thumbnail: '/templates/polo-front.jpg',
    description: 'Classic polo shirt mockup with front view.',
    type: 'polo',
    view: 'front'
  },
  {
    id: 8,
    title: 'Classic Polo - Back',
    category: 'Polo Shirts',
    thumbnail: '/templates/polo-back.jpg',
    description: 'Classic polo shirt mockup with back view.',
    type: 'polo',
    view: 'back'
  },
  {
    id: 9,
    title: 'Classic Polo - Side',
    category: 'Polo Shirts',
    thumbnail: '/templates/polo-side.jpg',
    description: 'Classic polo shirt mockup with side view.',
    type: 'polo',
    view: 'side'
  }
]

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredTemplates = selectedCategory === 'All'
    ? templates
    : templates.filter(template => template.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Mockup Templates</h1>
        
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">Template Preview</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{template.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                <Link
                  href={`/designer?template=${template.id}&type=${template.type}&view=${template.view}`}
                  className="btn-primary w-full text-center"
                >
                  Use Template
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 