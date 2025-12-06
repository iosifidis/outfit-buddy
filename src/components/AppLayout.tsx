'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Shirt,
  Heart,
  History,
  PanelLeft,
  Settings,
  ShoppingBag,
  Gift,
} from 'lucide-react';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Logo } from '@/components/icons';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from './ui/card';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/wardrobe', icon: Shirt, label: 'Wardrobe' },
  { href: '/shop', icon: ShoppingBag, label: 'Shop' },
  { href: '/favorites', icon: Heart, label: 'Favorites' },
  { href: '/history', icon: History, label: 'History' },
];

const userAvatar = PlaceHolderImages.find(p => p.id === 'userAvatar');

function MainSidebar() {
  const pathname = usePathname();
  const { isMobile, state } = useSidebar();

  return (
    <Sidebar
      collapsible={isMobile ? 'offcanvas' : 'icon'}
      className="border-sidebar-border"
    >
      <SidebarHeader className="h-16 p-4">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
            <Logo className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight font-headline text-sidebar-foreground group-data-[collapsible=icon]:hidden">
            OUTFIT BUDDY
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map(item => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  className="group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:h-12"
                  tooltip={{ children: item.label, className: 'group-data-[collapsible=icon]:hidden' }}
                >
                  <item.icon className="group-data-[collapsible=icon]:w-6 group-data-[collapsible=icon]:h-6" />
                  <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-3 flex flex-col gap-3">
          <Card className="bg-green-600/20 border-green-500/50 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:border-0">
             <CardContent className="p-3">
                <Link href="/impact" className="flex items-center gap-3">
                    <div className="bg-green-500/80 text-white rounded-full p-2">
                        <Gift className="w-5 h-5"/>
                    </div>
                    <div className="group-data-[collapsible=icon]:hidden">
                        <p className="font-semibold text-sm text-green-100">Your Impact</p>
                        <p className="text-xs text-green-200/80">Donate unused items</p>
                    </div>
                </Link>
             </CardContent>
          </Card>
          
          <div className="h-px w-full bg-sidebar-border" />

          <div className="flex items-center gap-3">
             <Avatar className="h-10 w-10 border-2 border-primary">
                {userAvatar && (
                  <AvatarImage
                    src={userAvatar.imageUrl}
                    alt="User Avatar"
                    data-ai-hint={userAvatar.imageHint}
                  />
                )}
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="group-data-[collapsible=icon]:hidden">
                <p className="font-semibold text-sm">John Doe</p>
                <p className="text-xs text-muted-foreground">Premium User</p>
              </div>
          </div>
      </SidebarFooter>
    </Sidebar>
  );
}

function Header() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-background/80 backdrop-blur-sm border-b md:px-6 md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="md:hidden"
      >
        <PanelLeft />
        <span className="sr-only">Toggle Menu</span>
      </Button>
    </header>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <MainSidebar />
        <SidebarInset className="min-w-0">
          <Header />
          <main>{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
