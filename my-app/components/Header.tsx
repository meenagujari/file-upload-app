import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white hover:text-gray-300 transition duration-300">
             PhotoBook
        </Link>
        <nav>
          <ul className="flex space-x-6">
           
            <li>
              <Link href="/auth/login" className="hover:text-gray-300 transition duration-300">
                  Login
              </Link>
            </li>
            <li>
              <Link href="/auth/register" className="hover:text-gray-300 transition duration-300">
                  Register
              </Link>
            </li>
            {/* Add more navigation links as needed */}
          </ul>
        </nav>
      </div>
    </header>
  );
}