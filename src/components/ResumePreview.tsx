"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type GenerationStep =
  | "idle"
  | "collecting-info"
  | "generating-resume"
  | "generating-cover"
  | "preview";

interface FormData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  jobTitle: string;
  summary: string;
  skills: string; // newline-separated
  experiences: string;
  certifications: string;
  education: string;
  company?: string;
  jobDesc?: string;
}

export default function ResumePreview() {
  const [step, setStep] = useState<GenerationStep>("idle");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    jobTitle: "",
    summary: "",
    skills: "",
    experiences: "",
    certifications: "",
    education: "",
    company: "",
    jobDesc: "",
  });
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [previewContent, setPreviewContent] = useState<string>("");
  const [previewType, setPreviewType] = useState<"resume" | "cover-letter" | null>(
    null
  );

  const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateResume = async () => {
    if (!formData.name.trim()) {
      setMessage("✗ Full name is required.");
      return;
    }
    setLoading(true);
    setStep("generating-resume");
    setMessage("⏳ Generating resume preview...");
    await delay(1200);

    try {
      const skillsInline = formData.skills
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
        .join(", ");

      const resumeHTML = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h1 style="text-align: center; margin-bottom: 5px; font-size: 28px;">${formData.name}</h1>
          <p style="text-align: center; margin: 0 0 15px 0; color: #666; font-size: 14px;">
            ${formData.email}${formData.phone ? " · " + formData.phone : ""}
            ${formData.linkedin ? "<br/>" + formData.linkedin : ""}
            ${formData.portfolio ? " · " + formData.portfolio : ""}
          </p>

          ${
            formData.summary
              ? `
            <div style=\"margin-bottom: 15px;\">
              <h2 style=\"font-size: 14px; font-weight: bold; border-bottom: 2px solid #333; padding-bottom: 5px; margin-bottom: 8px;\">PROFESSIONAL SUMMARY</h2>
              <p style=\"margin: 0; font-size: 11px;\">${formData.summary}</p>
            </div>
          `
              : ""
          }

          ${
            skillsInline
              ? `
            <div style=\"margin-bottom: 15px;\">
              <h2 style=\"font-size: 14px; font-weight: bold; border-bottom: 2px solid #333; padding-bottom: 5px; margin-bottom: 8px;\">SKILLS</h2>
              <p style=\"margin: 0; font-size: 11px;\">${skillsInline}</p>
            </div>
          `
              : ""
          }

          ${
            formData.experiences
              ? `
            <div style=\"margin-bottom: 15px;\">
              <h2 style=\"font-size: 14px; font-weight: bold; border-bottom: 2px solid #333; padding-bottom: 5px; margin-bottom: 8px;\">EXPERIENCE</h2>
              <p style=\"margin: 0; font-size: 11px; white-space: pre-wrap;\">${formData.experiences}</p>
            </div>
          `
              : ""
          }

          ${
            formData.education
              ? `
            <div style=\"margin-bottom: 15px;\">
              <h2 style=\"font-size: 14px; font-weight: bold; border-bottom: 2px solid #333; padding-bottom: 5px; margin-bottom: 8px;\">EDUCATION</h2>
              <p style=\"margin: 0; font-size: 11px; white-space: pre-wrap;\">${formData.education}</p>
            </div>
          `
              : ""
          }

          ${
            formData.certifications
              ? `
            <div style=\"margin-bottom: 15px;\">
              <h2 style=\"font-size: 14px; font-weight: bold; border-bottom: 2px solid #333; padding-bottom: 5px; margin-bottom: 8px;\">CERTIFICATIONS & PROJECTS</h2>
              <p style=\"margin: 0; font-size: 11px;\">${formData.certifications}</p>
            </div>
          `
              : ""
          }
        </div>
      `;

      setPreviewContent(resumeHTML);
      setPreviewType("resume");
      setMessage(
        "✓ Resume preview ready! This is what your actual project generates."
      );
      setStep("preview");
    } catch (err) {
      setMessage(
        `✗ ${err instanceof Error ? err.message : "Failed to generate preview"}`
      );
      setStep("collecting-info");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    if (!formData.company?.trim() || !formData.jobDesc?.trim()) {
      setMessage(
        "✗ Company and job description are required for cover letter preview."
      );
      return;
    }
    setLoading(true);
    setStep("generating-cover");
    setMessage("⏳ Generating cover letter preview...");
    await delay(1200);

    try {
      const firstSkill =
        formData.skills
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean)[0] || "software development";

      const topSkills = formData.skills
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 3);

      const coverLetterHTML = `
        <div style=\"font-family: Arial, sans-serif; line-height: 1.6; color: #333;\">
          <div style=\"margin-bottom: 20px;\">
            <p style=\"margin: 0;\">${new Date().toLocaleDateString()}</p>
          </div>

          <div style=\"margin-bottom: 20px;\">
            <p style=\"margin: 0;\"><strong>${formData.company}</strong></p>
          </div>

          <div style=\"margin-bottom: 20px;\">
            <p style=\"margin: 0;\">Dear Hiring Manager,</p>
          </div>

          <div style=\"margin-bottom: 15px;\">
            <p style=\"margin: 0;\">I am writing to express my strong interest in the ${
              formData.jobTitle || "position"
            } role at ${formData.company}.</p>
          </div>

          <div style=\"margin-bottom: 15px;\">
            <p style=\"margin: 0;\">With my background in ${firstSkill} and a track record of ${
              formData.summary?.substring(0, 60) || "delivering quality work"
            }, I am confident I would be an excellent fit for your team.</p>
          </div>

          <div style=\"margin-bottom: 15px;\">
            <p style=\"margin: 0;\"><strong>Key Qualifications:</strong></p>
            <ul style=\"margin: 8px 0 0 20px; font-size: 11px;\">
              ${
                topSkills.length
                  ? topSkills.map((s) => `<li>${s}</li>`).join("")
                  : "<li>Relevant technical skills</li>"
              }
            </ul>
          </div>

          <div style=\"margin-bottom: 15px;\">
            <p style=\"margin: 0;\">I am particularly drawn to this opportunity because of ${
              formData.jobDesc?.substring(0, 80) ||
              "the company's commitment to innovation"
            }. I am excited about the possibility of contributing to your team and would welcome the opportunity to discuss how my background aligns with your needs.</p>
          </div>

          <div style=\"margin-bottom: 15px;\">
            <p style=\"margin: 0;\">Thank you for considering my application. I look forward to speaking with you soon.</p>
          </div>

          <div style=\"margin-bottom: 20px;\">
            <p style=\"margin: 0;\">Best regards,</p>
          </div>

          <div>
            <p style=\"margin: 0;\"><strong>${formData.name}</strong></p>
            <p style=\"margin: 5px 0 0 0;\">${formData.email}</p>
          </div>
        </div>
      `;

      setPreviewContent(coverLetterHTML);
      setPreviewType("cover-letter");
      setMessage(
        "✓ Cover letter preview ready! This is what your actual project generates."
      );
      setStep("preview");
    } catch (err) {
      setMessage(
        `✗ ${err instanceof Error ? err.message : "Failed to generate preview"}`
      );
      setStep("collecting-info");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep("idle");
    setFormData({
      name: "",
      email: "",
      phone: "",
      linkedin: "",
      portfolio: "",
      jobTitle: "",
      summary: "",
      skills: "",
      experiences: "",
      certifications: "",
      education: "",
      company: "",
      jobDesc: "",
    });
    setMessage("");
    setPreviewContent("");
    setPreviewType(null);
  };

  if (step === "idle") {
    return (
      <div>
        {/* Professional Header */}
        <div className="mb-6 rounded-lg border border-slate-300 bg-slate-100 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-slate-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-slate-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-slate-400" />
            </div>
            <span className="text-sm font-medium text-slate-700">
              Resume Generator Demo
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="rounded-lg border border-slate-300 bg-slate-100 p-4">
            <h3 className="text-sm font-medium text-slate-800">
              AI Resume & Cover Letter Generator
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              Powered by Groq (Llama 3.3). See a sneak peak of what your actual
              project can generate!
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setStep("collecting-info")}
            className="w-full rounded-lg bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-800"
          >
            Generate Preview
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (step === "preview") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="rounded-lg border border-emerald-300/40 bg-emerald-50/40 p-6">
          <p className="text-sm font-medium text-emerald-900">
            ✓ {previewType === "resume" ? "Resume" : "Cover Letter"} Preview
          </p>
          <p className="mt-2 text-xs text-slate-600">{message}</p>
        </div>

        <div
          className="rounded-lg border border-slate-300 bg-white p-8 shadow-sm"
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          <div dangerouslySetInnerHTML={{ __html: previewContent }} />
        </div>

        <div className="space-y-3">
          {previewType === "resume" && (
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerateCoverLetter}
              className="w-full rounded-lg bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-800"
            >
              Generate Cover Letter Preview
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleReset}
            className="w-full rounded-lg border border-stone-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-stone-50"
          >
            Generate Another
          </motion.button>
        </div>

        <div className="rounded-lg border border-stone-300/40 bg-stone-50/30 p-4">
          <p className="text-xs text-slate-600">
            💡 <strong>About this demo:</strong> This is a sneak peak preview of
            what your actual Resume_Generator project can create. The real
            project generates full PDF files with AI-powered personalization
            using Groq's Llama 3.3 model.
          </p>
        </div>
      </motion.div>
    );
  }

  // Form for collecting info (shown for both collecting and generating steps)
  return (
    <div className="rounded-lg border border-slate-300 bg-slate-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`rounded-lg p-4 text-sm font-medium ${
              message.startsWith("✓")
                ? "border border-emerald-300/40 bg-emerald-50/40 text-emerald-900"
                : message.startsWith("✗")
                ? "border border-red-300/40 bg-red-50/40 text-red-900"
                : "border border-slate-300 bg-slate-50 text-slate-700"
            }`}
          >
            {message}
          </motion.div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            name="name"
            placeholder="Full name *"
            value={formData.name}
            onChange={handleInputChange}
            disabled={loading}
            className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder-slate-500 disabled:bg-slate-50"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={loading}
            className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder-slate-500 disabled:bg-slate-50"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={loading}
            className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder-slate-500 disabled:bg-slate-50"
          />
          <input
            type="url"
            name="linkedin"
            placeholder="LinkedIn URL"
            value={formData.linkedin}
            onChange={handleInputChange}
            disabled={loading}
            className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder-slate-500 disabled:bg-slate-50"
          />
        </div>

        <input
          type="url"
          name="portfolio"
          placeholder="Portfolio / Website"
          value={formData.portfolio}
          onChange={handleInputChange}
          disabled={loading}
          className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder-slate-500 disabled:bg-slate-50"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            name="jobTitle"
            placeholder="Target job title"
            value={formData.jobTitle}
            onChange={handleInputChange}
            disabled={loading}
            className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder-slate-500 disabled:bg-slate-50"
          />
          <input
            type="text"
            name="education"
            placeholder="Education summary"
            value={formData.education}
            onChange={handleInputChange}
            disabled={loading}
            className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder-slate-500 disabled:bg-slate-50"
          />
        </div>

        <textarea
          name="summary"
          placeholder="Professional summary (1-3 sentences)"
          value={formData.summary}
          onChange={handleInputChange}
          disabled={loading}
          rows={2}
          className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder-slate-500 disabled:bg-slate-50"
        />

        <textarea
          name="skills"
          placeholder="Skills (one per line, e.g., React, Python, TypeScript)"
          value={formData.skills}
          onChange={handleInputChange}
          disabled={loading}
          rows={3}
          className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder-slate-500 disabled:bg-slate-50"
        />

        <textarea
          name="experiences"
          placeholder="Work experience / job highlights (one per line)"
          value={formData.experiences}
          onChange={handleInputChange}
          disabled={loading}
          rows={3}
          className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder-slate-500 disabled:bg-slate-50"
        />

        <textarea
          name="certifications"
          placeholder="Certifications / Projects (one per line)"
          value={formData.certifications}
          onChange={handleInputChange}
          disabled={loading}
          rows={2}
          className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder-slate-500 disabled:bg-slate-50"
        />

        <div className="rounded-lg border border-stone-300/40 bg-stone-50/30 p-4">
          <h4 className="text-sm font-semibold text-slate-900">
            Cover Letter (Optional)
          </h4>
          <div className="mt-3 space-y-3">
            <input
              type="text"
              name="company"
              placeholder="Company name"
              value={formData.company}
              onChange={handleInputChange}
              disabled={loading}
              className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder-slate-500 disabled:bg-slate-50"
            />
            <textarea
              name="jobDesc"
              placeholder="Job description / summary"
              value={formData.jobDesc}
              onChange={handleInputChange}
              disabled={loading}
              rows={2}
              className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder-slate-500 disabled:bg-slate-50"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGenerateResume}
          disabled={loading || !formData.name.trim()}
          className="w-full rounded-lg bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "⏳ Generating..." : "Generate Resume Preview"}
        </motion.button>
      </motion.div>
    </div>
  );
}
