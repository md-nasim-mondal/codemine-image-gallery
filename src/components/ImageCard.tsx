'use client';

import { Card, CardMedia, IconButton, CardActions } from '@mui/material';
import { Delete, ZoomIn } from '@mui/icons-material';
import { useState } from 'react';
import DeleteDialog from './DeleteDialog';
import type { CloudinaryImage } from '@/lib/cloudinary';

interface ImageCardProps {
  image: CloudinaryImage;
  onClick: () => void;
}

export default function ImageCard({ image, onClick }: ImageCardProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <Card sx={{ maxWidth: 345, position: 'relative' }}>
      <CardMedia
        component="img"
        height="200"
        image={image.secure_url}
        alt={image.public_id}
        sx={{ objectFit: 'cover' }}
      />
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <IconButton aria-label="view" onClick={onClick}>
          <ZoomIn />
        </IconButton>
        <IconButton 
          aria-label="delete" 
          onClick={() => setDeleteOpen(true)}
          color="error"
        >
          <Delete />
        </IconButton>
      </CardActions>

      <DeleteDialog
        open={deleteOpen}
        publicId={image.public_id}
        onClose={() => setDeleteOpen(false)}
      />
    </Card>
  );
}