// Email capture form displayed after completing assessment
// Collects email, name, and country before showing full results

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, User, Lock, ArrowRight, CheckCircle2, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface EmailCaptureProps {
  onSubmit: (email: string, name: string, country: string) => void;
}

export function EmailCapture({ onSubmit }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [consent, setConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; name?: string; country?: string }>({});

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; name?: string; country?: string } = {};

    // Validate all fields
    if (!email.trim()) {
      newErrors.email = "Por favor ingresa tu email";
    } else if (!validateEmail(email)) {
      newErrors.email = "Por favor ingresa un email válido";
    }

    if (!name.trim()) {
      newErrors.name = "Por favor ingresa tu nombre";
    }

    if (!country.trim()) {
      newErrors.country = "Por favor ingresa tu país";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate brief delay for UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Call parent handler
    onSubmit(email.trim(), name.trim(), country.trim());
    
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
            🎉 ¡Análisis completo!
          </h2>
          <p className="text-muted-foreground">
            Hemos creado tu roadmap personalizado de aprendizaje en IA.
          </p>
          <p className="text-muted-foreground mt-2 text-sm">
            Completa tus datos para ver tus resultados y recibirlos por correo.
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
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                className={cn(
                  "pl-10 h-12",
                  errors.email && "border-destructive focus-visible:ring-destructive"
                )}
                required
                aria-describedby={errors.email ? "email-error" : undefined}
              />
            </div>
            {errors.email && (
              <p id="email-error" className="text-sm text-destructive">
                {errors.email}
              </p>
            )}
          </div>

          {/* Name field (required) */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Nombre *
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                className={cn(
                  "pl-10 h-12",
                  errors.name && "border-destructive focus-visible:ring-destructive"
                )}
                required
                aria-describedby={errors.name ? "name-error" : undefined}
              />
            </div>
            {errors.name && (
              <p id="name-error" className="text-sm text-destructive">
                {errors.name}
              </p>
            )}
          </div>

          {/* Country field */}
          <div className="space-y-2">
            <Label htmlFor="country" className="text-sm font-medium">
              País *
            </Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="country"
                type="text"
                placeholder="¿Desde qué país nos escribes?"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  if (errors.country) setErrors((prev) => ({ ...prev, country: undefined }));
                }}
                className={cn(
                  "pl-10 h-12",
                  errors.country && "border-destructive focus-visible:ring-destructive"
                )}
                required
                aria-describedby={errors.country ? "country-error" : undefined}
              />
            </div>
            {errors.country && (
              <p id="country-error" className="text-sm text-destructive">
                {errors.country}
              </p>
            )}
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
                <span>Ver mi roadmap</span>
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
