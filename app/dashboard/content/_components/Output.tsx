'use client';

import React, { useRef, useEffect, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast'; // ✅ Import toast

const Editor = dynamic(
  () => import('@toast-ui/react-editor').then((mod) => mod.Editor),
  { ssr: false }
);

interface OutputProps {
  result?: string;
  formData?: object;
  templateSlug?: string;
  userEmail?: string;
}

function Output({ result, formData, templateSlug, userEmail }: OutputProps) {
  const editorRef = useRef<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      editorInstance.setMarkdown(result || 'Result Will Appear Here');
    }
  }, [result]);

  useEffect(() => {
    if (!result) return;

    const saveResponse = async () => {
      setSaving(true);
      try {
        const response = await fetch('/api/save-response', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            aiResponse: result,
            formData: JSON.stringify(formData || {}),
            templateSlug: templateSlug || 'default-template',
            createdBy: userEmail || 'anonymous@example.com',
          }),
        });

        const data = await response.json();
        if (!data.success) {
          console.error('Failed to save:', data.error);
        }
      } catch (error) {
        console.error('Error saving AI response:', error);
      }
      setSaving(false);
    };

    saveResponse();
  }, [result, formData, templateSlug, userEmail]);

  const handleCopy = () => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      const markdown = editorInstance.getMarkdown();
      navigator.clipboard.writeText(markdown).then(() => {
        toast.success('Copied to clipboard!'); // ✅ Toast message
      });
    }
  };

  return (
    <div className="bg-white shadow-lg border rounded-lg">
      <div className="flex justify-between items-center p-5">
        <h2 className="font-bold text-lg">Your Result</h2>
        <Button
          className="cursor-pointer bg-purple-600 flex items-center gap-2"
          onClick={handleCopy}
          disabled={saving}
        >
          <Copy />
          {saving ? 'Saving...' : 'Copy'}
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Result Will Appear Here"
        initialEditType="wysiwyg"
        height="600px"
        useCommandShortcut={true}
      />
    </div>
  );
}

export default Output;
