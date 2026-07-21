import {
  defineCollection,
  reference,
  z,
  type SchemaContext,
} from "astro:content";

// Loaders
import { glob, file } from "astro/loaders";

// Options
// const colorOptions = ["primary", "secondary", "accent"] as const;
const monthOptions = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

// When creating separate function schema, for image we should use context and not destructing
const membersSchema = (context: SchemaContext) =>
  z.object({
    name: z.string(),
    position: z.string(),
    picture: context.image(),
    indexId: z.number(),
  });

// Schemas
const members = defineCollection({
  loader: file("./src/content/team/team.json"),
  schema: membersSchema,
});

const membersEn = defineCollection({
  loader: file("./src/content/team/team-en.json"),
  schema: membersSchema,
});

const reportsSchema = (context: SchemaContext) =>
  z.object({
    href: z.string(),
    picture: context.image(),
    year: z.number(),
    alt: z.string(),
  });

const reports = defineCollection({
  loader: file("./src/content/reports/reports.json"),
  schema: reportsSchema,
});

const librarySchema = (context: SchemaContext) =>
  z.object({
    id: z.number(),
    href: z.string(),
    picture: context.image(),
    alt: z.string(),
    titleUA: z.string(),
    titleEN: z.string(),
  });

const library = defineCollection({
  loader: file("./src/content/library/publications.json"),
  schema: librarySchema,
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      id: z.string().optional(),
      title: z.string().max(60, {
        message: "Title cannot be longer that 38 characters",
      }),
      description: z
        .string()
        .max(280, {
          message: "Description cannot be longer than 280 characters",
        })
        .optional(),
      // validate as a local image
      cover: z.object({
        // Cover should be 1120px
        image: image(),
        alt: z.string(),
      }),
      // color: z.enum(colorOptions).optional(),
      pubDate: z.date(),
      isActive: z.boolean(),
      isCollage: z.boolean().optional(),
      isDraft: z.boolean().optional(),
      startYear: z.number().optional(),
      startMonth: z.enum(monthOptions).optional(),
      endYear: z.number().optional(),
      endMonth: z.enum(monthOptions).optional(),
      period: z
        .object({
          startYear: z.number(),
          startMonth: z.enum(monthOptions),
          endYear: z.number(),
          endMonth: z.enum(monthOptions),
        })
        .optional(),
    }),
});

export const collections = {
  members,
  membersEn,
  library,
  reports,
  projects,
};
