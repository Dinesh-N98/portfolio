"use client";

import { FormEvent, useState } from "react";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

type FieldErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = { name: "", email: "", message: "" };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate() {
    const nextErrors: FieldErrors = {};

    if (!values.name.trim()) nextErrors.name = "Please enter your name.";
    if (!values.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!emailPattern.test(values.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!values.message.trim()) nextErrors.message = "Please enter a message.";

    return nextErrors;
  }

  function updateField(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setStatus("");

    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();

      if (!response.ok) {
        setStatus(result.error ?? "Something went wrong while sending your message.");
        return;
      }

      setValues(initialValues);
      setStatus(result.message);
    } catch {
      setStatus("Something went wrong while sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6" aria-describedby="contact-status">
      <div>
        <label htmlFor="contact-name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className="mt-2 w-full rounded-md border border-white/15 bg-white/[0.03] px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
        {errors.name && <p id="contact-name-error" className="mt-2 text-sm text-red-300">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="contact-email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className="mt-2 w-full rounded-md border border-white/15 bg-white/[0.03] px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
        {errors.email && <p id="contact-email-error" className="mt-2 text-sm text-red-300">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="contact-message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className="mt-2 w-full resize-y rounded-md border border-white/15 bg-white/[0.03] px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
        {errors.message && <p id="contact-message-error" className="mt-2 text-sm text-red-300">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex rounded-md bg-accent px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send message"}
      </button>

        <p 
            id="contact-status" 
            aria-live="polite" 
            className={`text-sm ${status.includes("wrong") || errors ? "text-red-400" : "text-green-400"}`}
        >
        {status}
        </p>
    </form>
  );
}