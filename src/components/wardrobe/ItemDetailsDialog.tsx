'use client';

import Image from 'next/image';
import { ClothingItem } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shirt, Trash2, X } from 'lucide-react';
import { BriefcaseIcon, ThermometerIcon, SmileIcon } from '@/components/icons';
import { toast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';


interface ItemDetailsDialogProps {
  item: ClothingItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete?: (itemId: string) => void;
}

export function ItemDetailsDialog({ item, open, onOpenChange, onDelete }: ItemDetailsDialogProps) {

  const handleDelete = () => {
    toast({
      title: 'Item Deleted',
      description: `${item.description} has been removed.`,
      variant: 'destructive',
    });
    if (onDelete) onDelete(item.id);
    onOpenChange(false);
  };
  
  const getProgressColor = (value: number) => {
    if (value <= 3) return 'bg-blue-500';
    if (value <= 7) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card border-border p-0">
        <div className="flex">
          <div className="w-1/2 p-6 pr-0">
            <div className="relative aspect-square bg-background rounded-lg flex items-center justify-center">
              <Image
                src={item.imageUrl}
                alt={item.description}
                width={250}
                height={250}
                className="object-contain"
                data-ai-hint={`${item.color} ${item.category}`}
              />
              <Badge className="absolute bottom-3 left-3">{item.category}</Badge>
            </div>
          </div>
          <div className="w-1/2 p-6 flex flex-col">
            <DialogClose className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </DialogClose>
            <h2 className="text-2xl font-bold font-headline mb-1">{item.description}</h2>
            <p className="text-muted-foreground mb-6">{item.color} • {item.pattern}</p>
            
            <div className="bg-background/80 rounded-lg p-3 flex items-center gap-4 mb-6">
                <div className="bg-secondary p-2 rounded-md">
                    <Shirt className="h-6 w-6 text-primary"/>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground uppercase">Fabric Material</p>
                    <p className="font-semibold text-card-foreground">{item.fabric}</p>
                </div>
            </div>

            <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                    <BriefcaseIcon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground flex-1">Formal Scale</span>
                    <Progress value={(item.formal || 0) * 10} className="w-24 h-1.5" indicatorClassName={getProgressColor(item.formal || 0)} />
                    <span className="w-8 text-right font-mono text-xs">{(item.formal || 0)}/10</span>
                </div>
                 <div className="flex items-center gap-3">
                    <ThermometerIcon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground flex-1">Warmth Scale</span>
                    <Progress value={(item.warmth || 0) * 10} className="w-24 h-1.5" indicatorClassName={getProgressColor(item.warmth || 0)} />
                    <span className="w-8 text-right font-mono text-xs">{(item.warmth || 0)}/10</span>
                </div>
                 <div className="flex items-center gap-3">
                    <SmileIcon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground flex-1">Relaxed Scale</span>
                    <Progress value={(item.relaxed || 0) * 10} className="w-24 h-1.5" indicatorClassName={getProgressColor(item.relaxed || 0)} />
                    <span className="w-8 text-right font-mono text-xs">{(item.relaxed || 0)}/10</span>
                </div>
            </div>

            <div className="mt-auto pt-6 flex gap-2">
                 <Button variant="secondary" className="w-full" onClick={() => onOpenChange(false)}>Close</Button>
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                       <Button variant="destructive" className="w-full">
                         <Trash2 className="w-4 h-4 mr-2"/>
                         Remove
                       </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to permanently delete this item?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
