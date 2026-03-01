"use client";

import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Briefcase, ChevronDown, CheckCircle2, Clock, MapPin } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

const EXPERIENCES = [
  {
    company: "Accenture",
    role: "Packaged App Developer",
    period: "Oct 2024 – Present",
    location: "Noida",
    summary: [
      "Designed scalable RESTful APIs & Microservices",
      "Integrated third-party APIs with OAuth2/JWT",
      "Built scheduled background jobs",
      "Improved production stability"
    ],
    details: {
      architecture: "Clean architecture & modular design patterns",
      stack: "Spring Boot, Spring MVC, Spring Data JPA, Hibernate",
      docs: "Swagger/OpenAPI documentation and API versioning",
      features: "Data export APIs (CSV/Excel), Spring Scheduler & Cron jobs",
      tools: "Postman testing & validation, Monitoring with Kibana & Splunk",
      ops: "Root Cause Analysis (RCA) and Agile collaboration"
    }
  },
  {
    company: "Tata Consultancy Services",
    role: "Application Developer",
    period: "Aug 2021 – Nov 2024",
    location: "Delhi",
    summary: [
      "Developed high-performance Spring Boot APIs",
      "Achieved ~80% test coverage",
      "Optimized database interactions",
      "Provided production support"
    ],
    details: {
      orm: "Hibernate, JPA, complex transaction management",
      db: "MySQL/Oracle optimization and query tuning",
      testing: "JUnit, Mockito for comprehensive testing",
      support: "UAT & production support, resolving performance bottlenecks & memory leaks",
      docs: "SwaggerHub documentation and API lifecycle management",
      logging: "Log analysis using PuTTY/WinSCP and Splunk",
      methodology: "Active participation in Agile ceremonies"
    }
  },
  {
    company: "Tata Consultancy Services",
    role: "SAP Commerce Developer",
    period: "Aug 2020 – Aug 2021",
    location: "Remote/Noida",
    summary: [
      "SAP Commerce customization",
      "CronJobs automation",
      "Production troubleshooting"
    ],
    details: {
      customization: "Explorer Tree customization and Backoffice enhancements",
      docs: "Comprehensive SOP documentation for incident resolution",
      collab: "Close collaboration with marketing/business teams for functional alignment",
      tech: "Java, Hybris Core, CronJob automation",
      impact: "Reduced incident resolution time by implementing structured SOPs"
    }
  }
];

export function ExperienceTimeline() {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  const toggleItem = (idx: number) => {
    setOpenItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 md:space-y-8">
      {EXPERIENCES.map((exp, idx) => (
        <Collapsible 
          key={idx} 
          open={openItems[idx]} 
          onOpenChange={() => toggleItem(idx)}
          className="group"
        >
          <div className={cn(
            "relative p-5 md:p-8 rounded-[20px] md:rounded-[32px] border-2 transition-all duration-300",
            openItems[idx] 
              ? "bg-white border-brand-teal shadow-xl md:shadow-2xl ring-4 ring-brand-teal/5" 
              : "bg-white border-gray-100 hover:border-brand-teal/30 shadow-sm"
          )}>
            <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-6">
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-colors shrink-0",
                    openItems[idx] ? "bg-brand-teal text-white" : "bg-brand-light text-brand-dark"
                  )}>
                    <Briefcase className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-2xl font-extrabold text-brand-dark leading-tight">{exp.company}</h3>
                    <p className="text-sm md:text-lg font-bold text-brand-teal">{exp.role}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 md:gap-4 text-[9px] md:text-sm font-bold text-gray-500 uppercase tracking-widest">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Clock className="w-3 h-3 md:w-4 md:h-4 text-brand-teal" /> {exp.period}
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <MapPin className="w-3 h-3 md:w-4 md:h-4 text-brand-teal" /> {exp.location}
                  </div>
                </div>

                <ul className="space-y-2 pt-1 md:pt-2">
                  {exp.summary.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 md:gap-3 text-xs md:text-base text-muted-foreground font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 md:w-5 md:h-5 text-brand-teal shrink-0 mt-0.5 md:mt-1" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-end justify-end pt-2 md:pt-0">
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "rounded-full px-4 md:px-6 py-4 md:py-6 h-auto text-xs md:text-base font-bold gap-2 group-hover:bg-brand-teal group-hover:text-white transition-all",
                      openItems[idx] && "bg-brand-teal text-white"
                    )}
                  >
                    {openItems[idx] ? "Show Less" : "Details"}
                    <ChevronDown className={cn("w-4 h-4 md:w-5 md:h-5 transition-transform duration-300", openItems[idx] && "rotate-180")} />
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>

            <CollapsibleContent className="pt-6 md:pt-8 mt-6 md:mt-8 border-t border-gray-100 animate-in fade-in slide-in-from-top-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {Object.entries(exp.details).map(([key, value], i) => (
                  <div key={i} className="space-y-1 md:space-y-2">
                    <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">{key.replace('_', ' ')}</h4>
                    <p className="text-brand-dark font-medium leading-relaxed text-xs md:text-base">{value}</p>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      ))}
    </div>
  );
}
