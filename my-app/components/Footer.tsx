export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 text-center mt-auto">
      <div className="container mx-auto px-6">
        <p>&copy; {new Date().getFullYear()} Your App Name. All rights reserved.</p>
        <p className="text-sm mt-2">Built with Next.js and Tailwind CSS</p>
      </div>
    </footer>
  );
}