'use client';

import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography
} from '@mui/material';
import { Close } from '@mui/icons-material';
import type { CloudinaryImage } from '@/lib/cloudinary';

interface ImageModalProps {
  open: boolean;
  image: CloudinaryImage | null;
  onClose: () => void;
}

export default function ImageModal({ open, image, onClose }: ImageModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          height: '90vh',
          overflow: 'hidden'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Typography variant="h6">
          {image?.public_id.split('/').pop()}
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        {image && (
          <Box
            component="img"
            src={image.secure_url}
            alt={image.public_id}
            sx={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain'
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}