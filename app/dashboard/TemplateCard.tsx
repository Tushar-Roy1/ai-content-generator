import Image from 'next/image';
import React from 'react';
import { TEMPLATE } from './TemplatesListSection';
import Link from 'next/link';

function TemplateCard(item: TEMPLATE) {
  return (
   <Link href={`/dashboard/content/${item.slug}`}>
    <div className=" w- full h-60 p-5 shadow-md border-1 rounded-xl bg-white flex flex-col gap-4 cursor-pointer transition-transform hover:scale-105 hover:shadow-lg">
      {/* Icon */}
      <div className="w-12 h-12 relative">
        <Image
          src={item.icon}
          alt={`${item.name} icon`}
          fill
          className="object-contain"
        />
      </div>

      {/* Template Name */}
      <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>

      {/* Description */}
      <p className="text-sm text-gray-600 line-clamp-3">{item.desc}</p>
    </div>
   </Link>
  );
}

export default TemplateCard;
