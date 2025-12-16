// Course recommendation card
// Shows the recommended course based on user's profile

import { Button } from "@/components/ui/button";
import { Roadmap } from "@/data/roadmaps";
import { GraduationCap, Calendar, Clock, ArrowRight, Bell } from "lucide-react";

interface CourseCardProps {
  course: Roadmap["recommendedCourse"];
  profileName: string;
}

export function CourseCard({ course, profileName }: CourseCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="text-sm font-medium uppercase tracking-wide opacity-90">
            Curso recomendado para ti
          </span>
        </div>
        <h3 className="text-xl md:text-2xl font-display font-bold">
          {course.name}
        </h3>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta info */}
        <div className="flex flex-wrap gap-4 mb-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Lanzamiento {course.launchDate}</span>
          </div>
        </div>

        {/* Why it's perfect */}
        <div className="mb-5">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
            ¿Por qué es perfecto para ti?
          </p>
          <p className="text-foreground/80 leading-relaxed">
            Este curso está diseñado específicamente para profesionales como tú.{" "}
            {course.description}
          </p>
        </div>

        {/* CTA */}
        <Button className="btn-primary w-full h-12 gap-2">
          <Bell className="w-4 h-4" />
          <span>Apúntate a la Lista de Espera</span>
          <ArrowRight className="w-4 h-4" />
        </Button>

        <p className="text-xs text-center text-muted-foreground mt-3">
          Te avisaremos cuando esté disponible
        </p>
      </div>
    </div>
  );
}
