"use client";

import { useState } from "react";
import { Grid } from "@mui/material";
import ImageCard from "./ImageCard";
import ImageModal from "./ImageModal";
import type { CloudinaryImage } from "@/lib/cloudinary";

interface ImageGridProps {
  images: CloudinaryImage[];
}

export default function ImageGrid({ images }: ImageGridProps) {
  const [selectedImage, setSelectedImage] = useState<CloudinaryImage | null>(
    null
  );

  return (
    <>
      <Grid container spacing={2}>
        {images.map((image) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={image.public_id}>
            <ImageCard image={image} onClick={() => setSelectedImage(image)} />
          </Grid>
        ))}
      </Grid>

      <ImageModal
        open={!!selectedImage}
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
}
