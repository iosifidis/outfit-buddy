'use client';
import { useUser } from '@/firebase';
import { redirect } from 'next/navigation';

export default function Home() {
  const { user, isUserLoading } = useUser();

  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (user) {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }
}
