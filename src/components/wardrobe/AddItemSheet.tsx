'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CATEGORIES, SEASONS, LENGTHS } from '@/lib/types';
import { Upload, Camera, Sparkles, Loader2 } from 'lucide-react';
import { getItemRecognition } from '@/actions/ai';
import type { RecognizeItemOutput } from '@/ai/flows/recognize-item-flow';


const clothingItemSchema = z.object({
  description: z.string().min(3, { message: 'Description must be at least 3 characters.' }),
  category: z.enum(CATEGORIES),
  color: z.string().min(2, { message: 'Color is required.' }),
  fabric: z.string().min(2, { message: 'Fabric is required.' }),
  pattern: z.string().min(2, { message: 'Pattern is required.' }),
  season: z.enum(SEASONS),
  length: z.enum(LENGTHS),
  occasion: z.string().min(2, { message: 'Occasion is required.' }),
  image: z.any().refine(file => file, 'Image is required.'),
});

type ClothingItemFormValues = z.infer<typeof clothingItemSchema>;

const defaultValues: Partial<ClothingItemFormValues> = {
  description: '',
  color: '',
  fabric: '',
  pattern: '',
  occasion: '',
};

export function AddItemSheet({
  children,
  open,
  onOpenChange
}: {
  children: React.ReactNode,
  open?: boolean,
  onOpenChange?: (open: boolean) => void
}) {
  const form = useForm<ClothingItemFormValues>({
    resolver: zodResolver(clothingItemSchema),
    defaultValues,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageChange = (file: File | null) => {
    if (file) {
      form.setValue('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setShowCamera(false); 
    }
  };
  
  const handleScanItem = async () => {
    if (!imagePreview) return;
    setIsRecognizing(true);
    try {
      const result = await getItemRecognition(imagePreview);
      if (result) {
        // Coerce AI response to valid form values
        const newValues: Partial<ClothingItemFormValues> = {
          description: result.description,
          color: result.color,
          fabric: result.fabric,
          pattern: result.pattern,
          occasion: result.occasion,
          category: CATEGORIES.includes(result.category as any) ? result.category : undefined,
          season: SEASONS.includes(result.season as any) ? result.season : undefined,
          length: LENGTHS.includes(result.length as any) ? result.length : undefined,
        };
  
        // Set values one by one to ensure reactivity
        Object.entries(newValues).forEach(([key, value]) => {
          if (value) {
            form.setValue(key as keyof ClothingItemFormValues, value);
          }
        });
  
        toast({
          title: 'Item Recognized!',
          description: `AI thinks this is a: ${result.description}`,
        });
      } else {
        throw new Error('Recognition failed.');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Recognition Failed',
        description: 'Could not recognize the item. Please fill the form manually.',
      });
    } finally {
      setIsRecognizing(false);
    }
  };

  const handleShowCamera = async () => {
    setShowCamera(true);
    setImagePreview(null);
    form.setValue('image', null);
  };
  
  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if(context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/png');
        setImagePreview(dataUrl);
        
        fetch(dataUrl)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], "capture.png", { type: "image/png" });
            form.setValue('image', file);
          });
      }
      setShowCamera(false);
    }
  };
  
  useEffect(() => {
    let stream: MediaStream | null = null;
    const enableCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCameraPermission(true);
      } catch (err) {
        console.error("Error accessing camera: ", err);
        setHasCameraPermission(false);
        setShowCamera(false);
        toast({
          variant: "destructive",
          title: "Camera Access Denied",
          description: "Please enable camera permissions in your browser settings.",
        });
      }
    };
    if (showCamera) {
      enableCamera();
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [showCamera]);
  
  function onSubmit(data: ClothingItemFormValues) {
    console.log(data);
    toast({
      title: 'Item Added!',
      description: `${data.description} has been added to your wardrobe.`,
    });
    onOpenChange?.(false);
    form.reset();
    setImagePreview(null);
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset(defaultValues);
      setImagePreview(null);
      setShowCamera(false);
    }
    onOpenChange?.(isOpen);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add New Clothing Item</SheetTitle>
          <SheetDescription>
            Upload a photo or take a picture of your item, then let our AI recognize it for you.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                   <div className="space-y-2">
                     {showCamera && (
                        <div className="w-full">
                          <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted playsInline />
                          {hasCameraPermission === false && (
                            <Alert variant="destructive">
                              <AlertTitle>Camera Access Required</AlertTitle>
                              <AlertDescription>
                                Please allow camera access to use this feature.
                              </AlertDescription>
                            </Alert>
                          )}
                          <div className="flex justify-center gap-2 mt-2">
                            <Button type="button" onClick={handleCapture} disabled={hasCameraPermission === false}>Capture Photo</Button>
                            <Button type="button" variant="outline" onClick={() => setShowCamera(false)}>Cancel</Button>
                          </div>
                        </div>
                      )}
                      
                      {!showCamera && (
                        <>
                          {imagePreview ? (
                              <div className="relative w-full pt-[100%]">
                                <Image src={imagePreview} alt="Item preview" fill className="object-contain rounded-md" />
                              </div>
                          ) : (
                            <div className="flex items-center justify-center w-full">
                              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-border bg-muted/50 hover:bg-muted">
                                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                      <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                      <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                  </div>
                                  <Input id="dropzone-file" type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)} />
                              </label>
                            </div> 
                          )}
                        
                          <div className="flex gap-2">
                            <Button type="button" variant="outline" size="sm" onClick={handleShowCamera} className="flex-1">
                              <Camera className="mr-2 h-4 w-4" /> Take a Picture
                            </Button>
                            <Button type="button" size="sm" onClick={handleScanItem} disabled={!imagePreview || isRecognizing} className="flex-1">
                              {isRecognizing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                              Scan Item
                            </Button>
                          </div>
                        </>
                      )}
                   </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <canvas ref={canvasRef} className="hidden"></canvas>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Blue floral summer dress" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="season"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Season</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select a season" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SEASONS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="color" render={({ field }) => (
                    <FormItem><FormLabel>Color</FormLabel><FormControl><Input placeholder="e.g., Navy Blue" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="fabric" render={({ field }) => (
                    <FormItem><FormLabel>Fabric</FormLabel><FormControl><Input placeholder="e.g., Cotton" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="pattern" render={({ field }) => (
                    <FormItem><FormLabel>Pattern</FormLabel><FormControl><Input placeholder="e.g., Solid" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="occasion" render={({ field }) => (
                    <FormItem><FormLabel>Occasion</FormLabel><FormControl><Input placeholder="e.g., Casual" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
            </div>
            <FormField
              control={form.control}
              name="length"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Length</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select a length" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {LENGTHS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter className="pt-4 sticky bottom-0 bg-background">
              <Button type="submit">Save Item</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
