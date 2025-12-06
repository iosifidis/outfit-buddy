'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';
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
import { Slider } from '@/components/ui/slider';
import { CATEGORIES } from '@/lib/types';
import { Camera, Sparkles, Loader2, Upload } from 'lucide-react';
import { getItemRecognition } from '@/actions/ai';

const addItemFormSchema = z.object({
  description: z.string().min(2, { message: 'Description must be at least 2 characters.' }),
  category: z.enum(CATEGORIES),
  color: z.string().min(2, { message: 'Color is required.' }),
  fabric: z.string().min(2, { message: 'Fabric is required.' }),
  pattern: z.string().min(2, { message: 'Pattern is required.' }),
  image: z.any().refine(file => file, 'Image is required.'),
  formal: z.number().min(0).max(10),
  warmth: z.number().min(0).max(10),
  relaxed: z.number().min(0).max(10),
});

type AddItemFormValues = z.infer<typeof addItemFormSchema>;

export function AddItemForm({ onItemAdded }: { onItemAdded: () => void }) {
  const form = useForm<AddItemFormValues>({
    resolver: zodResolver(addItemFormSchema),
    defaultValues: {
      description: '',
      category: 'Top',
      color: '',
      fabric: '',
      pattern: '',
      formal: 5,
      warmth: 5,
      relaxed: 5,
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  
  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleScanItem = async () => {
    if (!imagePreview) return;
    setIsRecognizing(true);
    try {
      const result = await getItemRecognition(imagePreview);
      if (result) {
        form.setValue('description', result.description);
        if (CATEGORIES.includes(result.category as any)) {
            form.setValue('category', result.category as any);
        }
        form.setValue('color', result.color);
        form.setValue('fabric', result.fabric);
        form.setValue('pattern', result.pattern);
        
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
      if (context) {
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
  
  function onSubmit(data: AddItemFormValues) {
    console.log(data);
    toast({
      title: 'Item Added!',
      description: `${data.description} has been added to your wardrobe.`,
    });
    onItemAdded();
    form.reset();
    setImagePreview(null);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="space-y-4">
             <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormControl>
                    <div className="space-y-2">
                       {showCamera ? (
                        <div className="w-full">
                          <video ref={videoRef} className="w-full aspect-square rounded-md bg-muted object-cover" autoPlay muted playsInline />
                          {hasCameraPermission === false && (
                            <Alert variant="destructive" className="mt-2">
                              <AlertTitle>Camera Access Required</AlertTitle>
                              <AlertDescription>Please allow camera access to use this feature.</AlertDescription>
                            </Alert>
                          )}
                          <div className="flex justify-center gap-2 mt-2">
                            <Button type="button" onClick={handleCapture} disabled={hasCameraPermission === false}>Capture</Button>
                            <Button type="button" variant="outline" onClick={() => setShowCamera(false)}>Cancel</Button>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center bg-card hover:bg-muted/50 transition-colors relative">
                           {imagePreview ? (
                             <Image src={imagePreview} alt="Item preview" layout="fill" className="object-cover rounded-md p-2" />
                            ) : (
                              <div className="text-center text-muted-foreground">
                                <p>No image selected</p>
                              </div>
                            )}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="pt-2" />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2">
              <Button type="button" variant="outline" onClick={handleShowCamera}><Camera className="w-4 h-4 mr-2"/> Take Photo</Button>
              <Button type="button" variant="outline" onClick={handleFileSelect}><Upload className="w-4 h-4 mr-2"/> From Device</Button>
              <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)} />
            </div>
            <Button 
                type="button" 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white" 
                onClick={handleScanItem}
                disabled={!imagePreview || isRecognizing}
            >
              {isRecognizing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
              Scan with AI
            </Button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="description" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Input placeholder="e.g. Classic White Tee" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <FormField control={form.control} name="color" render={({ field }) => (<FormItem><FormLabel>Color</FormLabel><FormControl><Input placeholder="e.g. White" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="fabric" render={({ field }) => (<FormItem><FormLabel>Fabric</FormLabel><FormControl><Input placeholder="e.g. Cotton" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="pattern" render={({ field }) => (<FormItem><FormLabel>Pattern</FormLabel><FormControl><Input placeholder="e.g. Solid" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>

            <div className="p-4 rounded-lg bg-card border">
              <h3 className="font-semibold text-card-foreground mb-4">AI STYLE RATINGS</h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="formal"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center"><FormLabel>Formal</FormLabel><span className="text-sm text-muted-foreground">{field.value}/10</span></div>
                      <FormControl>
                        <Slider defaultValue={[field.value]} max={10} step={1} onValueChange={(value) => field.onChange(value[0])} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="warmth"
                  render={({ field }) => (
                    <FormItem>
                       <div className="flex justify-between items-center"><FormLabel>Warmth</FormLabel><span className="text-sm text-muted-foreground">{field.value}/10</span></div>
                      <FormControl>
                        <Slider defaultValue={[field.value]} max={10} step={1} onValueChange={(value) => field.onChange(value[0])} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="relaxed"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center"><FormLabel>Relaxed</FormLabel><span className="text-sm text-muted-foreground">{field.value}/10</span></div>
                      <FormControl>
                        <Slider defaultValue={[field.value]} max={10} step={1} onValueChange={(value) => field.onChange(value[0])} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
             <div className="flex justify-end">
                <Button type="submit">Save to Wardrobe</Button>
            </div>
          </div>
        </div>
      </form>
      <canvas ref={canvasRef} className="hidden"></canvas>
    </Form>
  );
}
