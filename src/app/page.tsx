"use client";

import { portfolio } from "@/lib/portfolio-data";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BankingDemo from "@/components/BankingDemo";
import ResumePreview from "@/components/ResumePreview";

function useInView() {
  const [inView, setInView] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref);
    return () => {
      observer.unobserve(ref);
    };
  }, [ref]);

  return [setRef, inView] as const;
}

function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">{children}</div>
  );
}

function Card({
  children,
  className = "",
  animated = true,
}: {
  children: ReactNode;
  className?: string;
  animated?: boolean;
}) {
  return (
    <motion.div
      initial={animated ? { opacity: 0, y: 20 } : {}}
      whileInView={animated ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`group rounded-3xl border border-stone-200/60 bg-white/95 shadow-[0_1px_3px_rgba(0,0,0,0.05)] backdrop-blur-sm transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Section({
  id,
  title,
  eyebrow,
  children,
}: {
  id: string;
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      className="scroll-mt-28 py-12"
    >
      <div className="mb-8 flex items-end justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="space-y-2"
        >
          {eyebrow ? (
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
              {eyebrow}
            </div>
          ) : null}
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {title}
          </h2>
        </motion.div>
        <div className="hidden h-px flex-1 bg-gradient-to-r from-stone-300 via-stone-200 to-transparent sm:block" />
      </div>
      <div>{children}</div>
    </motion.section>
  );
}

function Pill({ label }: { label: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="inline-flex items-center rounded-full border border-stone-300/40 bg-stone-50/80 px-3.5 py-1.5 text-xs font-medium text-stone-700 shadow-sm transition-all duration-200 hover:border-stone-400/60 hover:bg-stone-100/80 hover:shadow"
    >
      {label}
    </motion.span>
  );
}

function MediaGrid({
  items,
  columns = "sm:grid-cols-2",
  showCaptions = true,
}: {
  items: Array<{
    src: string;
    type: "image" | "video";
    alt: string;
    caption?: string;
  }>;
  columns?: string;
  showCaptions?: boolean;
}) {
  if (!items?.length) return null;
  return (
    <div className={`grid gap-3 ${columns}`}>
      {items.map((item, idx) => (
        <motion.div
          key={item.src}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="overflow-hidden rounded-2xl border border-stone-200/40 bg-stone-50/50 shadow-sm"
        >
          <div className="aspect-video w-full overflow-hidden bg-black/5">
            {item.type === "video" ? (
              <video
                className="h-full w-full object-cover"
                src={item.src}
                controls
                preload="metadata"
              />
            ) : (
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            )}
          </div>
          {showCaptions && item.caption ? (
            <div className="px-4 py-3 text-xs text-slate-600">
              {item.caption}
            </div>
          ) : null}
        </motion.div>
      ))}
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="rounded-xl bg-gradient-to-br from-stone-50 to-slate-50 p-4 text-center shadow-sm transition-all duration-200 hover:shadow-md"
    >
      <div className="text-xl font-bold text-slate-900">
        {value}
      </div>
      <div className="mt-1 text-xs font-medium text-stone-600">{label}</div>
    </motion.div>
  );
}

export default function Home() {
  const nav = [
    { label: "Education", href: "#education" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Leadership", href: "#leadership" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 text-slate-900">
      <a
        href="#main-content"
        className="absolute -top-10 left-0 z-50 rounded bg-slate-900 px-3 py-2 text-sm font-semibold text-white focus:top-0"
      >
        Skip to main content
      </a>
      <header className="sticky top-0 z-50 border-b border-stone-200/40 bg-white/70 shadow-sm backdrop-blur-xl">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <a
              href="#"
              className="text-sm font-bold tracking-tight text-slate-900 transition-colors hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 rounded px-1"
              aria-label="Back to top"
            >
              {portfolio.name}
            </a>
            <nav className="hidden gap-8 text-sm font-medium text-slate-600 sm:flex" aria-label="Main navigation">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="transition-colors hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 rounded px-1"
                  aria-current={item.href === "#" ? "page" : undefined}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </Container>
      </header>

      <main id="main-content" role="main">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden border-b border-stone-200/40 py-32 sm:py-48"
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.65)), url(/hero.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        >
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl"
              >
                {portfolio.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-6 text-xl leading-relaxed text-slate-600"
              >
                {portfolio.headline}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-6 text-base leading-relaxed text-slate-600"
              >
                {portfolio.bio}
              </motion.p>
            </div>
          </Container>
        </motion.section>

        {/* Main Content */}
        <div className="py-12 sm:py-16">
          <Container>
            <div className="mx-auto max-w-4xl">
              <Section id="education" title="Education" eyebrow="Background">
                <motion.div
                  className="space-y-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  {portfolio.education.map((ed) => (
                    <motion.div
                      key={`${ed.school}-${ed.degree}`}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="p-6 sm:p-8" animated={false}>
                      <div className="flex items-start gap-4">
                        {ed.school === "University of British Columbia (UBC)" && (
                          <img 
                            src="/ubclogo-removebg-preview.png" 
                            alt="University of British Columbia logo" 
                            className="h-14 w-14 flex-shrink-0 object-contain"
                            loading="lazy"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-900">
                            {ed.school}
                          </h3>
                          <p className="mt-1 text-base font-medium text-slate-600">
                            {ed.degree}
                          </p>
                          <div className="mt-2 text-sm text-slate-500">
                            {ed.start} — {ed.end}
                            {ed.location ? ` · ${ed.location}` : ""}
                          </div>
                          {ed.notes?.length ? (
                            <ul className="mt-4 space-y-2 text-sm text-slate-600">
                              {ed.notes.map((n) => (
                                <li key={n} className="flex items-start gap-2">
                                  <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-stone-400" />
                                  <span>{n}</span>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </Section>

              <Section id="projects" title="Projects" eyebrow="Selected work">
                <motion.div
                  className="grid gap-6 lg:grid-cols-2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  {portfolio.projects.map((project, index) => (
                    <motion.div
                      key={project.name}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.5 }}
                      className={index === 1 || index === 2 ? "lg:col-span-2" : "lg:col-span-2"}
                    >
                      <Card className="overflow-hidden p-0 transition-all duration-200 hover:shadow-lg" animated={false}>
                        {index === 0 && project.media?.length ? (
                          // LinkMCP with video beside description
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="p-6 sm:p-8">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <h3 className="text-xl font-bold text-slate-900">
                                    {project.name}
                                  </h3>
                                  {project.year ? (
                                    <div className="mt-1 text-sm text-slate-500">
                                      {project.year}
                                    </div>
                                  ) : null}
                                </div>
                                {project.links?.length ? (
                                  <div className="flex gap-2 text-sm">
                                    {project.links.map((l) => (
                                      <a
                                        key={l.href}
                                        href={l.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-medium text-stone-700 underline decoration-stone-300 underline-offset-4 transition hover:text-stone-900 hover:decoration-stone-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 rounded px-1"
                                        aria-label={`${l.label} (opens in new window)`}>
                                        {l.label}
                                      </a>
                                    ))}
                                  </div>
                                ) : null}
                              </div>

                              <p className="mt-4 text-base leading-relaxed text-slate-600">
                                {project.description}
                              </p>

                              {project.highlights?.length ? (
                                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                                  {project.highlights.map((h) => (
                                    <li key={h} className="flex items-start gap-2">
                                      <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-stone-400" />
                                      <span>{h}</span>
                                    </li>
                                  ))}
                                </ul>
                              ) : null}

                              <div className="mt-6 flex flex-wrap gap-2">
                                {project.stack.map((s) => (
                                  <Pill key={s} label={s} />
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center justify-center p-6 sm:p-8 bg-stone-50/50">
                              <MediaGrid items={project.media ?? []} columns="" />
                            </div>
                          </div>
                        ) : (
                          // All other projects (Resume Generator, Banking, etc.)
                          <div className="flex flex-col">
                            <div className="p-6 sm:p-8">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <h3 className="text-xl font-bold text-slate-900">
                                    {project.name}
                                  </h3>
                                  {project.year ? (
                                    <div className="mt-1 text-sm text-slate-500">
                                      {project.year}
                                    </div>
                                  ) : null}
                                </div>
                                {project.links?.length ? (
                                  <div className="flex gap-2 text-sm">
                                    {project.links.map((l) => (
                                      <a
                                        key={l.href}
                                        href={l.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-medium text-stone-700 underline decoration-stone-300 underline-offset-4 transition hover:text-stone-900 hover:decoration-stone-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 rounded px-1"
                                        aria-label={`${l.label} (opens in new window)`}>
                                        {l.label}
                                      </a>
                                    ))}
                                  </div>
                                ) : null}
                              </div>

                              <p className="mt-4 text-base leading-relaxed text-slate-600">
                                {project.description}
                              </p>

                              {project.highlights?.length ? (
                                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                                  {project.highlights.map((h) => (
                                    <li key={h} className="flex items-start gap-2">
                                      <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-stone-400" />
                                      <span>{h}</span>
                                    </li>
                                  ))}
                                </ul>
                              ) : null}

                              <div className="mt-6 flex flex-wrap gap-2">
                                {project.stack.map((s) => (
                                  <Pill key={s} label={s} />
                                ))}
                              </div>
                            </div>
                            {index === 1 ? (
                              <div className="border-t border-stone-200/40 bg-stone-50/50 p-6 sm:p-8">
                                <p className="mb-6 text-sm text-slate-600">
                                  Try the interactive demo below. Fill out the form and generate an ATS-friendly resume powered by AI.
                                </p>
                                <ResumePreview />
                              </div>
                            ) : index === 2 ? (
                              <div className="border-t border-stone-200/40 bg-stone-50/50 p-6 sm:p-8">
                                <p className="mb-6 text-sm text-slate-600">
                                  Try the interactive demo below. Create accounts, perform transactions, and experience object-oriented design in action.
                                </p>
                                <BankingDemo />
                              </div>
                            ) : null}
                          </div>
                        )}
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </Section>

              <Section id="experience" title="Experience" eyebrow="What I've done">
                <motion.div
                  className="space-y-5"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  {portfolio.experience.map((job) => (
                    <motion.div
                      key={`${job.org}-${job.title}`}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="p-6 sm:p-8" animated={false}>
                      <div>
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-slate-900">
                              {job.title}
                            </h3>
                            <p className="mt-1 text-sm font-medium text-slate-600">
                              {job.org}
                            </p>
                          </div>
                          <div className="text-sm text-slate-500">
                            {job.start} — {job.end}
                            {job.location ? ` · ${job.location}` : ""}
                          </div>
                        </div>
                        <ul className="mt-4 space-y-2 text-sm text-slate-600">
                          {job.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-2">
                              <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-stone-400" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                        {job.media?.length ? (
                          <div className="mt-6 border-t border-stone-200/40 pt-6">
                            <MediaGrid items={job.media ?? []} columns="sm:grid-cols-2" />
                          </div>
                        ) : null}
                      </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </Section>

              <Section id="leadership" title="Leadership & Awards" eyebrow="Recognition">
                <motion.div
                  className="grid gap-6 sm:grid-cols-2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  {portfolio.leadership.map((item) => (
                    <motion.div
                      key={item.title}
                      variants={{
                        hidden: { opacity: 0, scale: 0.9 },
                        visible: { opacity: 1, scale: 1 },
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="overflow-hidden" animated={false}>
                      <div className="bg-stone-50/50 p-6">
                        <h3 className="text-lg font-bold text-slate-900">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                          {item.subtitle}
                        </p>
                        {item.bullets?.length ? (
                          <ul className="mt-3 space-y-1 text-xs text-slate-600">
                            {item.bullets.map((b) => (
                              <li key={b}>• {b}</li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                      {item.media?.length ? (
                        <div className="border-t border-stone-200/40 p-4">
                          <MediaGrid
                            items={item.media ?? []}
                            columns=""
                            showCaptions={false}
                          />
                        </div>
                      ) : null}
                    </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </Section>

              <Section id="skills" title="Skills" eyebrow="Toolbox">
                <motion.div
                  className="grid gap-6 sm:grid-cols-2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Card className="p-6" animated={false}>
                      <h3 className="text-base font-bold text-slate-900">
                        Languages
                      </h3>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {portfolio.skills.languages.map((s) => (
                          <Pill key={s} label={s} />
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Card className="p-6" animated={false}>
                      <h3 className="text-base font-bold text-slate-900">
                        Developer Tools
                      </h3>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {portfolio.skills.developerTools.map((s) => (
                          <Pill key={s} label={s} />
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Card className="p-6" animated={false}>
                      <h3 className="text-base font-bold text-slate-900">
                        Models & Libraries
                      </h3>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {portfolio.skills.modelsAndLibraries.map((s) => (
                          <Pill key={s} label={s} />
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Card className="p-6" animated={false}>
                      <h3 className="text-base font-bold text-slate-900">
                        Certifications
                      </h3>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {portfolio.skills.certifications.map((s) => (
                          <Pill key={s} label={s} />
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                </motion.div>
              </Section>

              <Section id="contact" title="Contact" eyebrow="Let's talk">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <Card className="overflow-hidden" animated={false}>
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white sm:p-12">
                      <h3 className="text-2xl font-bold">
                        Let's build something together.
                      </h3>
                      <p className="mt-2 text-base text-slate-300">
                        {portfolio.contact.email} · {portfolio.contact.phone}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <motion.a
                          href={`mailto:${portfolio.contact.email}?subject=Let%27s%20build%20together&body=Hi%20Prakul,%20I%27d%20love%20to%20connect...`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                          viewport={{ once: true }}
                          className="inline-block rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-md transition-all duration-200 hover:bg-slate-50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                          aria-label={`Send email to ${portfolio.contact.email}`}
                        >
                          Email me
                        </motion.a>
                        {portfolio.links.map((link, idx) => (
                          <motion.a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3, delay: 0.2 + 0.1 * idx }}
                            viewport={{ once: true }}
                            className="inline-block rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:border-white/60 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                            aria-label={`${link.label} (opens in new window)`}
                          >
                            {link.label}
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </Section>
            </div>
          </Container>
        </div>
      </main>
    </div>
  );
}
