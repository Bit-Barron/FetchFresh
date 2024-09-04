import React from "react";
import Image from "next/image";

interface ProductImageProps {
  imageURL?: string;
  title: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ imageURL, title }) => {
  const decodedImageUrl = imageURL ? decodeURIComponent(imageURL) : "";

  return imageURL ? (
    <div className="lg:64 relative h-32 w-full overflow-hidden md:h-64">
      <Image
        src={decodedImageUrl}
        alt={title}
        layout="fill"
        objectFit="cover"
        className="object-cover"
        unoptimized
      />
    </div>
  ) : (
    <div className="flex items-center justify-center bg-gray-200 text-gray-600">
      Kein Bild verfügbar
    </div>
  );
};

export default ProductImage;
