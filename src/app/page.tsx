"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ChevronRight, 
  Download, 
  Linkedin, 
  Mail, 
  Phone,
  Code2, 
  Layers, 
  Database, 
  Cloud, 
  Activity, 
  Terminal, 
  CheckCircle2,
  Target,
  Maximize2,
  Mountain,
  Dumbbell,
  Utensils,
  FileText,
  Send,
  Loader2,
  Building2,
  Cpu,
  ShieldCheck,
  Server,
  Brain,
  Users,
  Award,
  Zap,
  ArrowRight
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { ExperienceTimeline } from '@/components/ExperienceTimeline';
import { FloatingNav } from '@/components/FloatingNav';
import { ASSET_CONFIG } from '@/lib/config';
import { PdfHorizontalViewer } from '@/components/PdfHorizontalViewer';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inquiryType, setInquiryType] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    emailjs.init("GZmx_ThvuTo7XRCS5");

    // Scroll reveal observer
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      const offset = 80;
      const elementPosition = elem.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const type = inquiryType;
    const subjectDetails = formData.get('subjectDetails') as string;
    const message = formData.get('message') as string;
    const organization = formData.get('organization') as string || "";
    const contactNumber = formData.get('contactNumber') as string || "";

    let typeLabel = "";
    if (type === "job") typeLabel = "Contact for Job Opportunity";
    else if (type === "collab") typeLabel = "Collaboration";
    else if (type === "connect") typeLabel = "Let’s Connect";

    const orgPart = (type === "job" && organization.trim()) ? ` - ${organization.trim()}` : "";
    const generatedSubject = `Portfolio Inquiry - ${typeLabel}${orgPart} - ${subjectDetails} - ${name}`;

    const templateParams = {
      from_name: name,
      reply_to: email,
      inquiry_type: typeLabel,
      organization: organization,
      contact_number: contactNumber,
      message: message,
      generated_subject: generatedSubject
    };

    try {
      await emailjs.send(
        "service_ec20arn",
        "template_sifm936",
        templateParams
      );

      toast({
        title: "Inquiry Sent Successfully!",
        description: "Thank you, Subham will get back to you soon.",
      });
      
      form.reset();
      setInquiryType("");
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was an error sending your message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const heroAsset = ASSET_CONFIG.getAsset('heroImage');
  const resumeAsset = ASSET_CONFIG.getAsset('resumePdf');
  const portfolioAsset = ASSET_CONFIG.getAsset('portfolioPdf');
  const hobbiesAsset = ASSET_CONFIG.getAsset('hobbiesPdf');

  const [heroImageSrc, setHeroImageSrc] = useState(heroAsset.imagePreferred);

  return (
    <main className="min-h-screen relative overflow-x-hidden w-full">
      <FloatingNav />

      {/* HERO SECTION */}
      <section id="home" className="hero-gradient text-white overflow-hidden pt-40 pb-20 md:pt-56 md:pb-32 lg:pt-48 lg:pb-32 lg:min-h-screen flex items-center relative">
        {/* Particle Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:32px_32px]"></div>
        
        {/* Soft Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] md:h-[500px] bg-brand-teal/5 blur-[100px] md:blur-[150px] rounded-full pointer-events-none z-0"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none z-0"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
            
            {/* TEXT CONTENT - LEFT SIDE ON DESKTOP */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-10 md:space-y-12">
              
              {/* Highlight Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 md:gap-3 animate-fade-in-up">
                {[
                  { text: "5+ Years Experience", icon: Cpu },
                  { text: "Microservices & Cloud", icon: Server },
                  { text: "Enterprise APIs", icon: ShieldCheck },
                ].map((badge, i) => (
                  <div key={i} className="badge-glow px-3 py-1.5 md:px-4 md:py-2 rounded-full flex items-center gap-2 transition-transform hover:scale-105 border border-white/5 bg-white/5 backdrop-blur-md">
                    <badge.icon className="w-3 h-3 md:w-3.5 md:h-3.5 text-brand-teal" />
                    <span className="text-[9px] md:text-xs font-bold uppercase tracking-wider text-gray-200">{badge.text}</span>
                  </div>
                ))}
              </div>

              {/* Headline & Name */}
              <div className="space-y-6 md:space-y-8 w-full relative">
                {/* Headline Glow behind the text */}
                <div className="absolute -top-10 left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 w-64 h-64 bg-brand-teal/10 blur-[80px] rounded-full pointer-events-none"></div>

                <div className="space-y-5 md:space-y-8 relative z-10">
                  <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-[0.4em] block animate-fade-in opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                    Senior Java Backend Engineer
                  </span>
                  
                  {/* PRIMARY HEADLINE: NAME */}
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-gradient-teal animate-slide-up opacity-0 leading-[1.2] md:leading-[1.2] pb-3" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                    Subham Agarwal
                  </h1>

                  {/* SECONDARY HEADLINE: ARCHITECTURAL STATEMENT */}
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white/90 leading-tight animate-slide-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                    Designing <span className="text-brand-teal">Resilient</span> & <span className="text-brand-teal">Scalable</span> <br className="hidden md:block" />
                    Backend Architectures
                  </h2>
                </div>
                
                <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl lg:max-w-lg leading-relaxed font-medium animate-fade-in opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                  Senior Java Backend Engineer crafting secure, high-performance microservices and enterprise systems that scale with business growth.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 animate-scale-in opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
                <Button 
                  onClick={() => scrollToSection('experience')} 
                  size="lg" 
                  className="bg-brand-teal hover:bg-brand-teal/90 text-white border-none rounded-xl px-8 md:px-10 h-12 md:h-14 text-sm font-bold shadow-[0_0_20px_rgba(20,184,166,0.2)] transition-all hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(20,184,166,0.4)]"
                >
                  View Experience <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
                
                <Button 
                  onClick={() => scrollToSection('portfolio')}
                  size="lg" 
                  variant="outline"
                  className="rounded-xl border-white/10 text-white bg-white/5 hover:bg-white/10 hover:border-brand-teal/50 transition-all h-12 md:h-14 text-sm font-bold px-8 md:px-10"
                >
                  View Portfolio <Layers className="ml-2 w-4 h-4" />
                </Button>

                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="rounded-xl border-white/10 text-white bg-white/5 hover:bg-white/10 hover:border-brand-teal/50 h-12 md:h-14 w-12 md:w-14 shrink-0 transition-all hover:scale-105"
                    asChild
                  >
                    <a href={ASSET_CONFIG.linkedinUrl} target="_blank" rel="noopener noreferrer" title="LinkedIn Profile">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="rounded-xl border-white/10 text-white bg-white/5 hover:bg-white/10 hover:border-brand-teal/50 h-12 md:h-14 text-sm font-bold px-8 transition-all hover:scale-105"
                    asChild
                  >
                    <a href={resumeAsset.driveDownload} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 w-4 h-4" /> Resume
                    </a>
                  </Button>
                </div>
              </div>

              {/* Tech Stack Strip */}
              <div className="pt-6 md:pt-8 animate-fade-in opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
                <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-5 px-5 py-3 md:px-8 md:py-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
                  {['Java', 'Spring Boot', 'Microservices', 'PostgreSQL', 'AWS'].map((tech, i) => (
                    <React.Fragment key={tech}>
                      <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">{tech}</span>
                      {i < 4 && <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-brand-teal/30"></div>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* HERO IMAGE - RIGHT SIDE ON DESKTOP */}
            <div className="relative group animate-slide-from-right opacity-0 w-full max-w-md mx-auto lg:max-w-none lg:ml-auto" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              {/* Animated soft glow behind image */}
              <div className="absolute -inset-6 bg-brand-teal/15 rounded-[32px] md:rounded-[48px] blur-[40px] md:blur-[60px] opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
              
              <div className="relative overflow-hidden rounded-[24px] md:rounded-[48px] border border-white/10 bg-brand-dark/50 shadow-2xl transition-transform duration-700 ease-out group-hover:scale-[1.02] aspect-square w-full">
                <Image 
                  src={heroImageSrc || "/assets/images/hero-image.png"} 
                  alt="Subham Agarwal" 
                  fill
                  className="object-cover w-full h-full grayscale-[15%] group-hover:grayscale-0 transition-all duration-1000 ease-out scale-100 group-hover:scale-105"
                  priority
                  data-ai-hint="software engineer"
                  onError={() => {
                    if (heroImageSrc !== heroAsset.imageFallback) {
                      setHeroImageSrc(heroAsset.imageFallback);
                    }
                  }}
                />
                {/* Subtle gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-brand-dark/20"></div>
              </div>

              {/* Decorative floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-brand-teal/20 blur-2xl rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-emerald-500/10 blur-2xl rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="py-16 md:py-32 bg-white scroll-mt-16 md:scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader 
            title="Professional Experience" 
            subtitle="My journey through enterprise software development, focused on building high-performance systems for global leaders."
            className="text-center"
          />
          <div className="max-w-4xl mx-auto">
            <ExperienceTimeline />
          </div>
        </div>
      </section>

      {/* EXPERTISE SECTION */}
      <section id="expertise" className="bg-brand-light py-16 md:py-32 scroll-mt-16 md:scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader 
            title="Technical Expertise" 
            subtitle="A comprehensive overview of my core competencies and the technologies I leverage to build enterprise-grade software."
            className="text-center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
            {[
              { category: "Core Programming", icon: Code2, skills: ["Java (8/11/17)", "Multithreading", "Collections", "Design Patterns"] },
              { category: "Backend Frameworks", icon: Layers, skills: ["Spring Boot", "Spring MVC", "Spring Security", "Hibernate/JPA"] },
              { category: "Architecture", icon: Target, skills: ["Microservices", "RESTful APIs", "Distributed Systems", "Clean Architecture"] },
              { category: "Databases", icon: Database, skills: ["Oracle DB", "PostgreSQL", "SQL", "Indexing & Tuning"] },
              { category: "DevOps & CI/CD", icon: Terminal, skills: ["Jenkins", "Maven", "Git", "GitHub Actions"] },
              { category: "Monitoring", icon: Activity, skills: ["Splunk", "Kibana", "Log Analysis", "RCA"] },
              { category: "Cloud", icon: Cloud, skills: ["Docker", "Kubernetes", "AWS (EC2, S3)"] },
              { category: "API Testing", icon: CheckCircle2, skills: ["Postman", "Swagger", "JUnit", "Mockito"] },
            ].map((cat, idx) => (
              <Card key={idx} className="border-none shadow-sm hover:shadow-md transition-all group h-full">
                <CardContent className="p-6 md:p-8 space-y-4">
                  <div className="flex items-center gap-3 text-brand-teal">
                    <cat.icon className="w-5 h-5 shrink-0" />
                    <h3 className="font-bold text-brand-dark text-sm md:text-base">{cat.category}</h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    {cat.skills.map((skill, i) => (
                      <div key={i} className="flex items-center gap-2 group/skill">
                        <CheckCircle2 className="w-3 h-3 text-brand-teal opacity-40 group-hover/skill:opacity-100 transition-opacity" />
                        <span className="text-xs md:text-sm text-gray-600 font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP SECTION */}
      <section id="leadership" className="bg-brand-dark py-16 md:py-32 scroll-mt-16 md:scroll-mt-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-teal/50 to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <SectionHeader 
            title="Engineering Leadership" 
            subtitle="Building scalable systems requires more than code — it requires clarity, ownership, and collaboration."
            className="text-center"
            light
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-7xl mx-auto mt-8 md:mt-12">
            {[
              {
                title: "Analytical Thinking",
                icon: Brain,
                points: ["Strong debugging skills", "Root Cause Analysis (RCA)", "Performance optimization", "Scalable architectures"]
              },
              {
                title: "Communication",
                icon: Users,
                points: ["Technical articulation", "Cross-functional teamwork", "Agile/Scrum participation", "Stakeholder alignment"]
              },
              {
                title: "Leadership",
                icon: Award,
                points: ["Mentoring junior developers", "Clean code practices", "Conducting code reviews", "Architectural decisions"]
              },
              {
                title: "Ownership",
                icon: ShieldCheck,
                points: ["Production support expertise", "Proactive issue resolution", "Feature ownership", "High reliability mindset"]
              },
              {
                title: "Adaptability",
                icon: Zap,
                points: ["Cloud exposure", "Quickly adapting to tools", "Enterprise evolution", "Continuous improvement"]
              }
            ].map((item, idx) => (
              <Card 
                key={idx} 
                className="scroll-reveal bg-white/5 border-white/10 backdrop-blur-md hover:border-brand-teal/50 transition-all duration-500 hover:-translate-y-2 group"
              >
                <CardContent className="p-6 md:p-8 space-y-5 md:space-y-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-brand-teal/10 flex items-center justify-center text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-all duration-500">
                    <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <h3 className="text-base md:text-lg font-bold text-white group-hover:text-brand-teal transition-colors">{item.title}</h3>
                    <ul className="space-y-2.5 md:space-y-3">
                      {item.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-[11px] md:text-sm text-gray-400">
                          <ArrowRight className="w-3.5 h-3.5 text-brand-teal shrink-0 mt-1 opacity-50" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="portfolio" className="py-16 md:py-32 bg-white scroll-mt-16 md:scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader 
            title="Technical Portfolio" 
            subtitle="Deep dive into architectural contributions and high-impact engineering projects."
            className="text-center"
          />
          <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
            <div className="relative aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/9] rounded-[24px] md:rounded-[48px] overflow-hidden border-2 md:border-8 border-brand-light bg-brand-light shadow-2xl group transition-all hover:shadow-brand-teal/10">
              <PdfHorizontalViewer 
                url={portfolioAsset.preferred} 
                fallbackUrl={portfolioAsset.fallback}
                className="w-full h-full"
              />
              <div className="absolute top-4 right-4 md:top-6 md:right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <Button size="icon" variant="secondary" className="rounded-full shadow-lg h-10 w-10 md:h-12 md:w-12 bg-white" asChild>
                  <a href={portfolioAsset.drivePreview} target="_blank" rel="noopener noreferrer" title="View Full Screen">
                    <Maximize2 className="w-4 h-4 md:w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
              <Button size="lg" className="w-full sm:w-auto bg-brand-dark hover:bg-brand-dark/90 rounded-full px-8 md:px-12 h-12 md:h-14 text-xs md:text-sm font-bold shadow-2xl transition-transform hover:scale-105" asChild>
                <a href={portfolioAsset.driveDownload} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-3 w-4 h-4 md:w-5 md:h-5" /> Download Portfolio
                </a>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-brand-dark text-brand-dark hover:bg-brand-dark/5 rounded-full px-8 md:px-12 h-12 md:h-14 text-xs md:text-sm font-bold transition-transform hover:scale-105" asChild>
                <a href={portfolioAsset.drivePreview} target="_blank" rel="noopener noreferrer">
                  <Maximize2 className="mr-3 w-4 h-4 md:w-5 md:h-5" /> View Full Screen
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* RESUME SECTION */}
      <section id="resume" className="py-16 md:py-32 bg-brand-light scroll-mt-16 md:scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 aspect-[1/1.414] border-2 md:border-8 border-white rounded-[24px] md:rounded-[40px] overflow-hidden shadow-2xl bg-white relative group">
               {resumeAsset.drivePreview ? (
                 <iframe 
                  src={resumeAsset.drivePreview} 
                  width="100%" 
                  height="100%" 
                  className="w-full h-full absolute inset-0"
                  title="Subham Agarwal Resume"
                />
               ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/50 p-6 md:p-12 text-center">
                  <FileText className="w-12 h-12 md:w-16 md:h-16 text-gray-200 mb-4 md:mb-6" />
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Resume Preview Unavailable</p>
                  <Button variant="outline" size="sm" className="mt-4 md:mt-6 rounded-full border-gray-200 text-gray-500 hover:bg-white" asChild>
                    <a href={resumeAsset.driveDownload} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 w-3.5 h-3.5" /> Download Instead
                    </a>
                  </Button>
                </div>
               )}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="secondary" className="rounded-full shadow-lg h-9 w-9 md:h-10 md:w-10 bg-white" asChild>
                  <a href={resumeAsset.drivePreview || "#"} target="_blank" rel="noopener noreferrer" title="Open Full Screen">
                    <Maximize2 className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
            <div className="lg:col-span-5 space-y-6 md:space-y-8 text-center lg:text-left">
              <div className="space-y-3 md:space-y-4">
                <h2 className="text-2xl md:text-3xl font-extrabold text-brand-dark leading-tight">Career Documentation</h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md mx-auto lg:mx-0">
                  Detailed technical expertise, certifications, and high-impact projects delivered across global organizations.
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-2.5 md:gap-3 max-w-sm mx-auto lg:mx-0">
                {['5+ Years Engineering Experience', 'Java & Spring Boot Specialist', 'Microservices Architecture'].map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 shadow-sm transition-transform hover:translate-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
                    <span className="font-bold text-brand-dark text-[11px] md:text-sm">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 max-w-sm mx-auto lg:mx-0">
                <Button size="lg" className="w-full bg-brand-teal hover:bg-brand-teal/90 h-12 md:h-14 text-sm font-extrabold rounded-xl shadow-xl shadow-brand-teal/20 transition-transform hover:scale-[1.02]" asChild>
                  <a href={resumeAsset.driveDownload} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-3 w-4 h-4" /> Open PDF Resume
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="w-full border-brand-teal text-brand-teal hover:bg-brand-teal/5 h-12 md:h-14 text-sm font-extrabold rounded-xl transition-transform hover:scale-[1.02]" asChild>
                  <a href={resumeAsset.drivePreview || "#"} target="_blank" rel="noopener noreferrer">
                    <Maximize2 className="mr-3 w-4 h-4" /> View Full Screen
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOBBIES SECTION */}
      <section id="hobbies" className="py-16 md:py-32 bg-white scroll-mt-16 md:scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader 
            title="Life Beyond the Code" 
            subtitle="When I'm not architecting backend systems, I'm staying active and exploring new horizons."
            className="text-center"
          />
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] rounded-[24px] md:rounded-[40px] overflow-hidden border-2 md:border-8 border-brand-light bg-brand-light shadow-2xl group transition-all hover:shadow-brand-teal/10">
              <PdfHorizontalViewer 
                url={hobbiesAsset.preferred} 
                fallbackUrl={hobbiesAsset.fallback}
                autoScroll={true} 
                interval={3000}
                className="w-full h-full"
              />
            </div>
            <div className="grid gap-4 md:gap-6">
              {[
                { title: "Trekking & Adventure", desc: "Exploring the mountains is my way of resetting and finding inspiration in nature's architecture.", icon: Mountain },
                { title: "Fitness & Wellness", desc: "I believe a sharp mind requires a strong body. Regular strength training keeps me focused.", icon: Dumbbell },
                { title: "Culinary Arts", desc: "Exploring flavors and perfecting recipes is my favorite way to unwind and express creativity.", icon: Utensils }
              ].map((hobby, i) => (
                <div key={i} className="flex gap-4 md:gap-5 p-5 md:p-6 rounded-[24px] bg-brand-light border border-gray-100 hover:shadow-md transition-all">
                  <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-teal">
                    <hobby.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-brand-dark text-base md:text-lg">{hobby.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{hobby.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-16 md:py-32 bg-brand-dark text-white scroll-mt-16 md:scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center max-w-6xl mx-auto">
            <div className="space-y-10 text-center lg:text-left">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">Let’s Build Systems Together</h2>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Currently open to backend engineering and architecture opportunities. Reach out to discuss technical challenges or collaborations.
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-5 md:gap-6 max-w-sm mx-auto lg:mx-0">
                <a href={`mailto:${ASSET_CONFIG.email}`} className="flex items-center gap-4 group justify-center lg:justify-start">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-all duration-300">
                    <Mail className="w-4 h-4 md:w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[8px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest">Direct Email</p>
                    <p className="text-xs md:text-sm font-medium group-hover:text-brand-teal transition-colors break-all">{ASSET_CONFIG.email}</p>
                  </div>
                </a>
                
                <a href={`tel:${ASSET_CONFIG.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-4 group justify-center lg:justify-start">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-all duration-300">
                    <Phone className="w-4 h-4 md:w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[8px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest">Phone Number</p>
                    <p className="text-xs md:text-sm font-medium group-hover:text-brand-teal transition-colors">{ASSET_CONFIG.phone}</p>
                  </div>
                </a>
                
                <a href={ASSET_CONFIG.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group justify-center lg:justify-start">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-all duration-300">
                    <Linkedin className="w-4 h-4 md:w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[8px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest">LinkedIn Profile</p>
                    <p className="text-xs md:text-sm font-medium group-hover:text-brand-teal transition-colors">/in/go2-shubham-agarwal</p>
                  </div>
                </a>
              </div>
            </div>
            
            <Card className="bg-white/5 border-white/10 backdrop-blur-md p-6 md:p-8 rounded-[2rem] shadow-2xl overflow-hidden w-full max-w-xl mx-auto lg:mx-0">
              <form className="space-y-5 md:space-y-6" onSubmit={handleContactSubmit}>
                <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
                    <Input name="name" required placeholder="John Doe" className="h-10 md:h-12 bg-white/5 border-white/10 text-white text-sm placeholder:text-gray-600 focus-visible:ring-brand-teal rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
                    <Input name="email" required placeholder="john@example.com" type="email" className="h-10 md:h-12 bg-white/5 border-white/10 text-white text-sm placeholder:text-gray-600 focus-visible:ring-brand-teal rounded-xl" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Inquiry Type</label>
                  <Select onValueChange={setInquiryType} value={inquiryType} required>
                    <SelectTrigger className="h-10 md:h-12 bg-white/5 border-white/10 text-white text-sm rounded-xl focus:ring-brand-teal">
                      <SelectValue placeholder="Select context" />
                    </SelectTrigger>
                    <SelectContent className="bg-brand-dark border-white/10 text-white rounded-xl">
                      <SelectItem value="job" className="text-sm focus:bg-brand-teal">Contact for Job Opportunity</SelectItem>
                      <SelectItem value="collab" className="text-sm focus:bg-brand-teal">Collaboration</SelectItem>
                      <SelectItem value="connect" className="text-sm focus:bg-brand-teal">Let’s Connect</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {inquiryType === "job" && (
                  <div className="grid md:grid-cols-2 gap-4 md:gap-5 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Organization</label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input name="organization" placeholder="e.g. Google" className="h-10 md:h-12 pl-10 bg-white/5 border-white/10 text-white text-sm placeholder:text-gray-600 focus-visible:ring-brand-teal rounded-xl" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Contact No.</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <Input name="contactNumber" placeholder="+91 XXX-XXX-XXXX" className="h-10 md:h-12 pl-10 bg-white/5 border-white/10 text-white text-sm placeholder:text-gray-600 focus-visible:ring-brand-teal rounded-xl" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Subject Details</label>
                  <Input name="subjectDetails" required placeholder="Briefly describe the context" className="h-10 md:h-12 bg-white/5 border-white/10 text-white text-sm placeholder:text-gray-600 focus-visible:ring-brand-teal rounded-xl" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Message</label>
                  <Textarea name="message" required placeholder="Tell me more about the project or role..." className="min-h-[100px] md:min-h-[120px] bg-white/5 border-white/10 text-white text-sm placeholder:text-gray-600 focus-visible:ring-brand-teal resize-none rounded-xl" />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full bg-brand-teal hover:bg-brand-teal/90 h-12 md:h-14 text-sm md:text-base font-bold rounded-xl shadow-2xl transition-transform hover:scale-[1.01]">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" /> Send Inquiry
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-dark py-12 md:py-16 text-white border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center gap-8 md:flex-row md:justify-between text-center md:text-left">
          <div className="flex items-center gap-3">
            <span className="font-headline font-extrabold text-2xl md:text-3xl tracking-tighter">
              SA<span className="text-brand-teal">.</span>
            </span>
            <span className="text-gray-500 font-medium border-l border-white/10 pl-4 md:pl-6 text-xs md:text-sm">
              Subham Agarwal | Senior Backend Engineer
            </span>
          </div>
          <p className="text-gray-500 font-medium text-[10px] md:text-xs">© {currentYear || "..."} Subham Agarwal. Built for Scale.</p>
          <div className="flex gap-8">
            <a href={ASSET_CONFIG.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors font-bold text-[9px] md:text-[11px] uppercase tracking-widest">LinkedIn</a>
            <a href={`mailto:${ASSET_CONFIG.email}`} className="text-gray-500 hover:text-white transition-colors font-bold text-[9px] md:text-[11px] uppercase tracking-widest">Email</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
