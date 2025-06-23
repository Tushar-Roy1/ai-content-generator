'use client'

import React, { useState, useEffect } from 'react'
import { TEMPLATE } from '../../TemplatesListSection'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface PROPS {
  selectedTemplate?: TEMPLATE,
  onResult?: (result: string, formData?: any) => void;  // pass formData too
}

function Form({ selectedTemplate, onResult }: PROPS) {
  const [formData, setFormData] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string>('')

  useEffect(() => {
    setFormData({})
    setResult('')
    onResult && onResult('', {})  // clear parent result and formData on template change
  }, [selectedTemplate])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!selectedTemplate) return

    setLoading(true)
    setResult('')
    onResult && onResult('', {})  // clear parent before generating

    const dynamicInputs = Object.entries(formData)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n')

    const prompt = `${selectedTemplate.aiPrompt}\n\n${dynamicInputs}`

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          slug: selectedTemplate.slug,
          inputs: formData,
        }),
      })

      const data = await response.json()
      if (response.ok) {
        setResult(data.result)
        onResult && onResult(data.result, formData)  // <-- Pass both result and formData here
      } else {
        const errorMsg = 'Error: ' + (data.error || 'Something went wrong')
        setResult(errorMsg)
        onResult && onResult(errorMsg, formData)
      }
    } catch (error: any) {
      const errorMsg = 'Error: ' + error.message
      setResult(errorMsg)
      onResult && onResult(errorMsg, formData)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-5 shadow-md border rounded-lg bg-white">
      <Image
        src={selectedTemplate?.icon || '/default-icon.png'}
        alt="icon"
        width={70}
        height={70}
      />
      <h3 className="font-bold text-2xl mb-2 text-purple-500">{selectedTemplate?.name}</h3>
      <p className="text-gray-500 text-sm">{selectedTemplate?.desc}</p>

      <form className="mt-7" onSubmit={onSubmit}>
        {selectedTemplate?.form?.map((item, index) => (
          <div key={item.name || index} className="flex flex-col gap-2 my-2 mb-7">
            <label htmlFor={item.name} className="font-bold">{item.label}</label>
            {item.field === 'input' ? (
              <Input
                id={item.name}
                name={item.name}
                required={item.required}
                onChange={handleInputChange}
                value={formData[item.name] || ''}
              />
            ) : item.field === 'textarea' ? (
              <Textarea
                id={item.name}
                name={item.name}
                required={item.required}
                onChange={handleInputChange}
                value={formData[item.name] || ''}
              />
            ) : null}
          </div>
        ))}

        <Button
          type="submit"
          className="bg-blue-500 text-white hover:bg-blue-700 w-full cursor-pointer py-5"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate'}
        </Button>
      </form>
    </div>
  )
}

export default Form
