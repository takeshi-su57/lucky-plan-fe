import { Button } from "@heroui/react";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold">Lucky Plan</h1>
        <p className="text-default-500">Foundation is ready.</p>
        <Button variant="primary">Get Started</Button>
      </div>
    </main>
  );
}
