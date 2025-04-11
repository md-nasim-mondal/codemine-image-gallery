'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function UploadButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    setLoading(true);
    try {
      const formData = new FormData();
      for (const file of Array.from(e.target.files)) {
        formData.append('file', file);
      }

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      component="label"
      disabled={loading}
    >
      {loading ? 'Uploading...' : 'Upload Images'}
      <input
        type="file"
        hidden
        accept="image/*"
        multiple
        onChange={handleUpload}
      />
    </Button>
  );
}