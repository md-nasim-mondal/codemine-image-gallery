"use client";

import { useState } from "react";
import { Box } from "@mui/material";
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
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, minmax(0, 1fr))",
            sm: "repeat(2, minmax(0, 1fr))",
            md: "repeat(3, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
          gap: 2,
          padding: 2
        }}>
        {images.map((image) => (
          <Box key={image.public_id}>
            <ImageCard image={image} onClick={() => setSelectedImage(image)} />
          </Box>
        ))}
      </Box>

      <ImageModal
        open={!!selectedImage}
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
}
