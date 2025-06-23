'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Templates from '@/app/(data)/Templates'
import { TEMPLATE } from '../../TemplatesListSection'
import Form from '../_components/Form'
import Output from '../_components/Output'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useUser } from '@clerk/nextjs'

function CreateContent() {
  const params = useParams()
  const slug = params['template-slug']
  const selectedTemplate: TEMPLATE | undefined = Templates.find(item => item.slug === slug)

  const [result, setResult] = useState('')
  const [formData, setFormData] = useState<any>({})

  const { user, isLoaded } = useUser()
  const userEmail = user?.emailAddresses[0]?.emailAddress || ''

  const handleResult = (res: string, data?: any) => {
    setResult(res)
    if (data) setFormData(data)
  }

  return (
    <div className="p-8 bg-slate-200">
      <Link href={'/dashboard'}>
        <Button className="bg-purple-600 cursor-pointer">
          <ArrowLeft /> Back
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        <div className="md:col-span-1 flex flex-col">
          <Form selectedTemplate={selectedTemplate} onResult={handleResult} />
        </div>
        <div className="md:col-span-2 flex flex-col">
          <Output
            result={result}
            formData={formData}
            templateSlug={selectedTemplate?.slug}
            userEmail={userEmail}
          />
        </div>
      </div>
    </div>
  )
}

export default CreateContent
