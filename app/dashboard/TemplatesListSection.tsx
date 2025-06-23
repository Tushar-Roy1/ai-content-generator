import React, { useEffect, useState } from 'react'
import Templates from '../(data)/Templates'
import TemplateCard from './TemplateCard'


export interface TEMPLATE{
    name:string,
    desc:string,
    icon:string,
    category:string,
    slug:string,
    aiPrompt:string,
    form?:FORM[]
}
export interface FORM{
    label:string,
    field:string,
    name:string,
    required?:boolean
}

const TemplatesListSection = ({userSearchInput}:any) => {

  const [templatesList,setTemplatesList]=useState(Templates);

  useEffect(()=>{
    console.log(userSearchInput)
    if(userSearchInput){
      const filterData=Templates.filter(item=>item.name.toLowerCase().includes(userSearchInput.toLowerCase()));
      setTemplatesList(filterData);
    }else{
      setTemplatesList(Templates);
    }
  },[userSearchInput])
 

  return (
    <>
  <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6 bg-slate-200'>
    {templatesList.map((item: TEMPLATE, index: number) => (
    <TemplateCard key={item.slug || index}{...item} />
  ))}
  </div>
  
</>


  )
}

export default TemplatesListSection