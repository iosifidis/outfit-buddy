import { AppLayout } from '@/components/AppLayout';
import { ChatInterface } from '@/components/chat/ChatInterface';

export default function ChatPage() {
  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        <div className="flex items-center justify-between p-4 border-b">
           <h1 className="text-2xl font-bold tracking-tight">Chat with Stylist</h1>
        </div>
        <ChatInterface />
      </div>
    </AppLayout>
  );
}
