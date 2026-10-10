import { z } from "zod";

export const ProjectCategoryEnum = z.enum(["SaaS", "Automation", "R&D"]);
export const ProjectStatusEnum = z.enum(["published", "draft", "archived"]);

export const ProjectSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(100),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  tagline: z.string().max(160).optional().nullable(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: ProjectCategoryEnum,
  tech_stack: z.array(z.string()).min(1, "Specify at least one technology"),
  cover_image: z.string().min(1, "Cover image is required"),
  video_url: z.string().optional().nullable().or(z.literal("")),
  featured: z.boolean().default(false),
  status: ProjectStatusEnum.default("published"),
  metrics: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
  client: z.string().optional().nullable(),
  live_url: z.string().url().optional().nullable().or(z.literal("")),
  github_url: z.string().url().optional().nullable().or(z.literal("")),
});

export type ProjectInput = z.infer<typeof ProjectSchema>;

export const ContactSubmissionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please provide a valid enterprise email address"),
  company: z.string().max(100).optional().nullable(),
  service_interest: z.string().optional().nullable(),
  budget_range: z.string().optional().nullable(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export type ContactSubmissionInput = z.infer<typeof ContactSubmissionSchema>;

export const ServiceSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  tagline: z.string(),
  description: z.string(),
  pillar: ProjectCategoryEnum,
  features: z.array(z.string()),
  icon: z.string(),
});

export type ServiceInput = z.infer<typeof ServiceSchema>;
