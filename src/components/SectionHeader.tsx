
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
}

export function SectionHeader({ title, subtitle, className, light }: SectionHeaderProps) {
  const isCentered = className?.includes("text-center");

  return (
    <div className={cn(
      "mb-10 md:mb-16 space-y-3 md:space-y-6 flex flex-col w-full max-w-5xl",
      isCentered && "items-center text-center mx-auto",
      className
    )}>
      <h2 className={cn(
        "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight", 
        light ? "text-white" : "text-brand-dark"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-3xl", 
          light ? "text-gray-400" : "text-muted-foreground",
          isCentered && "mx-auto"
        )}>
          {subtitle}
        </p>
      )}
      <div className={cn(
        "h-1 md:h-1.5 w-12 md:w-24 bg-brand-teal rounded-full",
        isCentered && "mx-auto"
      )} />
    </div>
  );
}
