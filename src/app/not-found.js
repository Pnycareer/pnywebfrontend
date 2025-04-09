import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4 text-center">
      <h1 className="text-8xl font-extrabold text-red-600 drop-shadow-md">404</h1>

      <h2 className="text-2xl md:text-3xl font-semibold mt-6 text-gray-800">
        Oops! Page not found
      </h2>

      <p className="text-gray-500 mt-4 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.&nbsp;
        Check the URL or go back to the homepage.
      </p>

      <Link
        href="/"
        className="mt-6 inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 shadow-md"
      >
        Go&nbsp;Home
      </Link>
    </div>
  );
}
