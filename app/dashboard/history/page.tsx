'use client';
import React, { useEffect, useState } from 'react';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Templates from '@/app/(data)/Templates';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import toast from 'react-hot-toast';

export interface HistoryItem {
  templateSlug: string;
  aiResponse: string;
  createdAt: string;
}

function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const { user } = useUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress || '';

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await fetch(`/api/history?email=${userEmail}`);
      const data = await res.json();
      setHistory(data);
    };

    fetchHistory();
  }, [userEmail]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const truncate = (text: string, length: number = 100) =>
    text.length > length ? text.slice(0, length) + '...' : text;

  const getIcon = (slug: string) => {
    const template = Templates.find(t => t.slug === slug);
    return template?.icon || '/default-icon.png';
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Usage History</h2>

      {history.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-10">
          😢 <span className="ml-2">No history to show</span>
        </div>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">Icon</th>
              <th className="p-2 text-left">Template</th>
              <th className="p-3 border">AI Response</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Words</th>
              <th className="p-2 text-left">Copy</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">
                  <Image src={getIcon(item.templateSlug)} alt="icon" width={40} height={40} />
                </td>
                <td className="p-2 capitalize">{item.templateSlug.replace(/-/g, ' ')}</td>
                <td className="p-3 border font-mono whitespace-pre-wrap max-w-xs">
                  {truncate(item.aiResponse)}
                </td>
                <td className="p-2">
                  {new Date(item.createdAt).toLocaleDateString('en-CA', {
                    timeZone: 'Asia/Kolkata',
                  })}
                </td>
                <td className="p-2">{item.aiResponse?.split(/\s+/).length || 0}</td>
                <td className="p-2">
                  <Button
                    onClick={() => handleCopy(item.aiResponse)}
                    className="bg-purple-600 text-white hover:bg-purple-800 cursor-pointer"
                  >
                    <Copy size={16} className="mr-2" />
                    Copy
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HistoryPage;
