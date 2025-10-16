export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to ROOME
        </h1>
        <p className="text-center text-lg mb-4">
          Room Booking and Management System
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="p-6 border border-gray-200 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Frontend</h2>
            <p>Next.js 14 + React + TypeScript + Tailwind CSS</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Backend</h2>
            <p>Node.js + Express + TypeScript + MongoDB</p>
          </div>
        </div>
      </div>
    </main>
  );
}
