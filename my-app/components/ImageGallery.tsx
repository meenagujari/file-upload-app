import Image from 'next/image';

const images = [
  { src: '/images/pexels-4.jpg', alt: 'pexels-4' },
  { src: '/images/Mask group.png', alt: 'Mask Group' },
  { src: '/images/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-118143566.webp', alt: 'Environment Earth Day' },
  { src: '/images/free-nature-images.jpg', alt: 'Free Nature Images' },
  { src: '/images/istockphoto-1550071750-612x612.jpg', alt: 'Istockphoto' },
  { src: '/images/nature-background-high-resolution-wallpaper-for-a-serene-and-stunning-view-photo.jpg', alt: 'Nature Background' },
  { src: '/images/pexels-souvenirpixels-417074.jpg', alt: 'Pexels Souvenirpixels' },
{ src: '/images/beautiful-landscape 1.png', alt: 'beautiful-landscape' },

]; 

export default function ImageGallery() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div key={index} className="relative w-full h-48 overflow-hidden rounded-lg shadow-lg">
              <a href={image.src} target="_blank" rel="noopener noreferrer">
                <Image
                  src={image.src}
                  alt={image.alt}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </a>
            </div>
          ))}
        </div>
       
      </div>
    </section>
  );
}