"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { Loader2, ChevronLeft, ChevronRight, ExternalLink, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfHorizontalViewerProps {
  url?: string;
  fallbackUrl?: string;
  autoScroll?: boolean;
  interval?: number;
  className?: string;
}

export function PdfHorizontalViewer({ 
  url = "", 
  fallbackUrl = "",
  autoScroll = false, 
  interval = 3000,
  className 
}: PdfHorizontalViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [useIframeFallback, setUseIframeFallback] = useState<boolean>(false);
  const [activeUrl, setActiveUrl] = useState<string>(url || fallbackUrl);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasesRef = useRef<(HTMLCanvasElement | null)[]>([]);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const isGoogleDrive = (u: string) => u && u.startsWith('https://') && (u.includes('drive.google.com') || u.includes('googleusercontent.com'));

  const renderPage = useCallback(async (pdf: any, pageNum: number) => {
    try {
      const page = await pdf.getPage(pageNum);
      const containerWidth = containerRef.current?.offsetWidth || 800;
      // Calculate responsive scale: 1.5 for desktop, smaller for mobile
      const scale = containerWidth < 640 ? 0.8 : 1.5;
      const viewport = page.getViewport({ scale });
      const canvas = canvasesRef.current[pageNum - 1];

      if (canvas) {
        const context = canvas.getContext('2d');
        if (context) {
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          await page.render(renderContext).promise;
        }
      }
    } catch (err) {
      console.error(`Error rendering page ${pageNum}:`, err);
    }
  }, []);

  const loadPdf = useCallback(async () => {
    if (!activeUrl) {
      if (fallbackUrl) {
        setActiveUrl(fallbackUrl);
        return;
      }
      setLoading(false);
      setError("Document not found.");
      return;
    }

    if (isGoogleDrive(activeUrl)) {
      setUseIframeFallback(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const loadingTask = pdfjs.getDocument(activeUrl);
      const pdf = await loadingTask.promise;
      setNumPages(pdf.numPages);
      
      canvasesRef.current = new Array(pdf.numPages).fill(null);
      
      setTimeout(async () => {
        for (let i = 1; i <= pdf.numPages; i++) {
          await renderPage(pdf, i);
        }
        setLoading(false);
      }, 100);
    } catch (err: any) {
      console.warn(`PDF.js failed to load ${activeUrl}. Attempting recovery...`);
      if (fallbackUrl && activeUrl !== fallbackUrl && fallbackUrl !== "") {
        setActiveUrl(fallbackUrl);
      } else {
        setUseIframeFallback(true);
        setLoading(false);
      }
    }
  }, [activeUrl, fallbackUrl, renderPage]);

  useEffect(() => {
    loadPdf();
  }, [loadPdf]);

  const scrollToPage = (pageNum: number) => {
    if (containerRef.current) {
      const pageWidth = containerRef.current.offsetWidth;
      containerRef.current.scrollTo({
        left: (pageNum - 1) * pageWidth,
        behavior: 'smooth'
      });
      setCurrentPage(pageNum);
    }
  };

  const handleNext = useCallback(() => {
    if (numPages > 0) {
      const next = currentPage >= numPages ? 1 : currentPage + 1;
      scrollToPage(next);
    }
  }, [currentPage, numPages]);

  const handlePrev = () => {
    const prev = currentPage <= 1 ? numPages : currentPage - 1;
    scrollToPage(prev);
  };

  useEffect(() => {
    if (autoScroll && numPages > 1 && !loading && !useIframeFallback) {
      scrollIntervalRef.current = setInterval(handleNext, interval);
    }
    return () => {
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    };
  }, [autoScroll, numPages, loading, handleNext, interval, useIframeFallback]);

  const handleScroll = () => {
    if (containerRef.current) {
      const pageWidth = containerRef.current.offsetWidth;
      const newPage = Math.round(containerRef.current.scrollLeft / pageWidth) + 1;
      if (newPage !== currentPage && newPage > 0 && newPage <= numPages) {
        setCurrentPage(newPage);
      }
    }
  };

  if (useIframeFallback) {
    const iframeSrc = isGoogleDrive(activeUrl)
      ? (activeUrl.includes('/preview') ? activeUrl : activeUrl.replace('/view', '/preview').replace('uc?id=', 'file/d/').split('&')[0] + '/preview')
      : activeUrl;

    if (!iframeSrc) {
      return (
        <div className={cn("relative w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400 p-8 text-center", className)}>
          <AlertCircle className="w-10 h-10 md:w-12 md:h-12 mb-4 opacity-20" />
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Document Unavailable</p>
        </div>
      );
    }

    return (
      <div className={cn("relative w-full h-full bg-white rounded-3xl overflow-hidden", className)}>
        <iframe 
          src={iframeSrc}
          className="w-full h-full border-none"
          title="Document Viewer"
        />
      </div>
    );
  }

  return (
    <div className={cn("relative w-full h-full flex flex-col items-center bg-gray-50/50 rounded-3xl overflow-hidden group", className)}>
      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <Loader2 className="w-8 h-8 md:w-10 md:h-10 text-brand-teal animate-spin" />
        </div>
      )}

      {error && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 md:p-8 text-center bg-white/90">
          <AlertCircle className="w-8 h-8 text-destructive/20 mb-4" />
          <p className="text-destructive font-bold mb-4 text-xs md:text-sm">{error}</p>
          <Button onClick={() => window.open(activeUrl || fallbackUrl, '_blank')} variant="outline" size="sm" className="rounded-full">
            <ExternalLink className="mr-2 w-3.5 h-3.5" /> Open Manually
          </Button>
        </div>
      )}

      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar w-full h-full"
      >
        {Array.from({ length: numPages }).map((_, i) => (
          <div 
            key={i} 
            className="min-w-full h-full flex items-center justify-center snap-center p-2 md:p-4"
          >
            <canvas 
              ref={(el) => { canvasesRef.current[i] = el; }}
              className="max-w-full max-h-full shadow-lg rounded-sm bg-white"
            />
          </div>
        ))}
      </div>

      {!loading && numPages > 1 && (
        <>
          <div className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
            <Button size="icon" variant="secondary" className="rounded-full shadow-lg h-9 w-9 md:h-11 md:w-11 bg-white/90" onClick={handlePrev}>
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
          </div>
          <div className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
            <Button size="icon" variant="secondary" className="rounded-full shadow-lg h-9 w-9 md:h-11 md:w-11 bg-white/90" onClick={handleNext}>
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
          </div>
          
          <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 p-1.5 md:p-2 bg-black/10 backdrop-blur-md rounded-full border border-white/20">
            {Array.from({ length: numPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToPage(i + 1)}
                className={cn(
                  "h-1 md:h-1.5 transition-all rounded-full",
                  currentPage === i + 1 ? "w-4 md:w-6 bg-brand-teal" : "w-1 md:w-1.5 bg-white/50 hover:bg-white/80"
                )}
              />
            ))}
          </div>
        </>
      )}

      {numPages > 0 && !loading && (
        <div className="absolute top-3 left-3 md:top-4 md:left-4 text-[9px] md:text-[10px] font-bold bg-brand-dark/80 text-white px-2.5 py-0.5 md:px-3 md:py-1 rounded-full backdrop-blur-md">
          {currentPage} / {numPages}
        </div>
      )}
    </div>
  );
}
