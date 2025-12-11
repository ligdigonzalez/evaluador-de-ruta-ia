// Email capture form displayed after completing assessment
// Collects email before showing full results

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, User, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface EmailCaptureProps {
  onSubmit: (email: string, name: string) => void;
}

export function EmailCapture({ onSubmit }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate email
    if (!email.trim()) {
      setError("Por favor ingresa tu email");
      return;
    }
    if (!validateEmail(email)) {
      setError("Por favor ingresa un email válido");
      return;
    }

    setIsSubmitting(true);

    // Simulate brief delay for UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Call parent handler
    onSubmit(email.trim(), name.trim());
    
    toast.success("¡Perfecto! Preparando tus resultados...");
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-scale-in">
        {/* Success badge */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-secondary" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
            🎉 ¡Análisis Completo!
          </h2>
          <p className="text-muted-foreground">
            Hemos creado tu roadmap personalizado de aprendizaje en IA.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email *
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className={cn(
                  "pl-10 h-12",
                  error && "border-destructive focus-visible:ring-destructive"
                )}
                required
                aria-describedby={error ? "email-error" : undefined}
              />
            </div>
            {error && (
              <p id="email-error" className="text-sm text-destructive">
                {error}
              </p>
            )}
          </div>

          {/* Name field (optional) */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Nombre{" "}
              <span className="text-muted-foreground font-normal">(opcional)</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Nos ayuda a personalizarte mejor
            </p>
          </div>

          {/* Consent checkbox */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
            <Checkbox
              id="consent"
              checked={consent}
              onCheckedChange={(checked) => setConsent(checked === true)}
              className="mt-0.5"
            />
            <Label
              htmlFor="consent"
              className="text-sm text-muted-foreground cursor-pointer leading-relaxed"
            >
              Sí, quiero recibir recursos gratuitos sobre IA y actualizaciones de AprendeIA
            </Label>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="btn-accent w-full h-12 text-base"
          >
            {isSubmitting ? (
              <span>Procesando...</span>
            ) : (
              <>
                <span>Ver Mi Roadmap</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>

          {/* Privacy note */}
          <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" />
            Respetamos tu privacidad. Nunca compartiremos tu email.
          </p>
        </form>
      </div>
    </div>
  );
}
