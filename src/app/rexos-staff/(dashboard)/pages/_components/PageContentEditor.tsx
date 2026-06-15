"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateHomeContent, updateAboutContent } from "../_actions";
import type { HomeContent, AboutContent } from "@/lib/page-content";

// ─── Small presentational helpers ────────────────────
const inputCls =
  "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20";

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">
      <h3 className="text-sm font-semibold text-navy uppercase tracking-wider">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-navy mb-1">
        {label}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className={inputCls}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
        />
      )}
    </div>
  );
}

function Banner({ error, success }: { error: string; success: string }) {
  if (!error && !success) return null;
  return error ? (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
      {error}
    </div>
  ) : (
    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
      {success}
    </div>
  );
}

function SaveButton({ pending, label }: { pending: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-navy text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
    >
      {pending ? "Saving..." : label}
    </button>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-xs text-red-600 hover:underline"
    >
      Remove
    </button>
  );
}

function AddButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-sm text-navy font-semibold hover:underline"
    >
      + {label}
    </button>
  );
}

// ─── Home form ───────────────────────────────────────
function HomeForm({ initial }: { initial: HomeContent }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [c, setC] = useState<HomeContent>(initial);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    start(async () => {
      try {
        await updateHomeContent(c);
        setSuccess("Home page content saved.");
        router.refresh();
        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Save failed");
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-3xl">
      <Banner error={error} success={success} />

      <Card title="Hero">
        <Field
          label="Headline"
          value={c.hero.headline}
          onChange={(v) => setC({ ...c, hero: { ...c.hero, headline: v } })}
        />
        <Field
          label="Info card title"
          value={c.hero.cardTitle}
          onChange={(v) => setC({ ...c, hero: { ...c.hero, cardTitle: v } })}
        />
        <Field
          label="Info card text"
          textarea
          value={c.hero.cardText}
          onChange={(v) => setC({ ...c, hero: { ...c.hero, cardText: v } })}
        />
        <Field
          label="Info card button label"
          value={c.hero.cardCta}
          onChange={(v) => setC({ ...c, hero: { ...c.hero, cardCta: v } })}
        />
      </Card>

      <Card title="Services">
        {c.services.map((s, i) => (
          <div
            key={i}
            className="border border-gray-100 rounded-lg p-4 space-y-3 bg-gray-50"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-dark">
                Service {i + 1}
              </span>
              {c.services.length > 1 && (
                <RemoveButton
                  onClick={() =>
                    setC({
                      ...c,
                      services: c.services.filter((_, j) => j !== i),
                    })
                  }
                />
              )}
            </div>
            <Field
              label="Title"
              value={s.title}
              onChange={(v) => {
                const services = [...c.services];
                services[i] = { ...services[i], title: v };
                setC({ ...c, services });
              }}
            />
            <Field
              label="Description"
              textarea
              rows={2}
              value={s.description}
              onChange={(v) => {
                const services = [...c.services];
                services[i] = { ...services[i], description: v };
                setC({ ...c, services });
              }}
            />
          </div>
        ))}
        <AddButton
          label="Add service"
          onClick={() =>
            setC({
              ...c,
              services: [...c.services, { title: "", description: "" }],
            })
          }
        />
      </Card>

      <Card title="Milestones">
        <Field
          label="Heading"
          value={c.milestones.heading}
          onChange={(v) =>
            setC({ ...c, milestones: { ...c.milestones, heading: v } })
          }
        />
        <Field
          label="Description"
          textarea
          value={c.milestones.description}
          onChange={(v) =>
            setC({ ...c, milestones: { ...c.milestones, description: v } })
          }
        />
        <div className="space-y-3">
          {c.milestones.stats.map((stat, i) => (
            <div
              key={i}
              className="border border-gray-100 rounded-lg p-4 bg-gray-50 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-dark">
                  Stat {i + 1}
                </span>
                {c.milestones.stats.length > 1 && (
                  <RemoveButton
                    onClick={() =>
                      setC({
                        ...c,
                        milestones: {
                          ...c.milestones,
                          stats: c.milestones.stats.filter((_, j) => j !== i),
                        },
                      })
                    }
                  />
                )}
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-navy mb-1">
                    Number
                  </label>
                  <input
                    type="number"
                    value={stat.target}
                    onChange={(e) => {
                      const stats = [...c.milestones.stats];
                      stats[i] = {
                        ...stats[i],
                        target: Number(e.target.value) || 0,
                      };
                      setC({ ...c, milestones: { ...c.milestones, stats } });
                    }}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy mb-1">
                    Suffix
                  </label>
                  <input
                    type="text"
                    value={stat.suffix}
                    onChange={(e) => {
                      const stats = [...c.milestones.stats];
                      stats[i] = { ...stats[i], suffix: e.target.value };
                      setC({ ...c, milestones: { ...c.milestones, stats } });
                    }}
                    className={inputCls}
                  />
                </div>
                <div className="col-span-3 sm:col-span-1">
                  <label className="block text-xs font-semibold text-navy mb-1">
                    Label
                  </label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => {
                      const stats = [...c.milestones.stats];
                      stats[i] = { ...stats[i], label: e.target.value };
                      setC({ ...c, milestones: { ...c.milestones, stats } });
                    }}
                    className={inputCls}
                  />
                </div>
              </div>
            </div>
          ))}
          <AddButton
            label="Add stat"
            onClick={() =>
              setC({
                ...c,
                milestones: {
                  ...c.milestones,
                  stats: [
                    ...c.milestones.stats,
                    { target: 0, suffix: "+", label: "" },
                  ],
                },
              })
            }
          />
        </div>
      </Card>

      <Card title="FAQ">
        <Field
          label="Heading"
          value={c.faq.heading}
          onChange={(v) => setC({ ...c, faq: { ...c.faq, heading: v } })}
        />
        <Field
          label="Description"
          textarea
          value={c.faq.description}
          onChange={(v) => setC({ ...c, faq: { ...c.faq, description: v } })}
        />
        <div className="space-y-3">
          {c.faq.items.map((item, i) => (
            <div
              key={i}
              className="border border-gray-100 rounded-lg p-4 bg-gray-50 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-dark">
                  Question {i + 1}
                </span>
                {c.faq.items.length > 1 && (
                  <RemoveButton
                    onClick={() =>
                      setC({
                        ...c,
                        faq: {
                          ...c.faq,
                          items: c.faq.items.filter((_, j) => j !== i),
                        },
                      })
                    }
                  />
                )}
              </div>
              <Field
                label="Question"
                value={item.question}
                onChange={(v) => {
                  const items = [...c.faq.items];
                  items[i] = { ...items[i], question: v };
                  setC({ ...c, faq: { ...c.faq, items } });
                }}
              />
              <Field
                label="Answer"
                textarea
                value={item.answer}
                onChange={(v) => {
                  const items = [...c.faq.items];
                  items[i] = { ...items[i], answer: v };
                  setC({ ...c, faq: { ...c.faq, items } });
                }}
              />
            </div>
          ))}
          <AddButton
            label="Add question"
            onClick={() =>
              setC({
                ...c,
                faq: {
                  ...c.faq,
                  items: [...c.faq.items, { question: "", answer: "" }],
                },
              })
            }
          />
        </div>
      </Card>

      <SaveButton pending={pending} label="Save Home Page" />
    </form>
  );
}

// ─── About form ──────────────────────────────────────
function AboutForm({ initial }: { initial: AboutContent }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [c, setC] = useState<AboutContent>(initial);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    start(async () => {
      try {
        await updateAboutContent(c);
        setSuccess("About page content saved.");
        router.refresh();
        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Save failed");
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-3xl">
      <Banner error={error} success={success} />

      <Card title="Banner">
        <Field
          label="Banner heading"
          value={c.bannerHeading}
          onChange={(v) => setC({ ...c, bannerHeading: v })}
        />
      </Card>

      <Card title="Introduction">
        {c.intro.map((p, i) => (
          <div
            key={i}
            className="border border-gray-100 rounded-lg p-4 bg-gray-50 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-dark">
                Paragraph {i + 1}
              </span>
              {c.intro.length > 1 && (
                <RemoveButton
                  onClick={() =>
                    setC({ ...c, intro: c.intro.filter((_, j) => j !== i) })
                  }
                />
              )}
            </div>
            <textarea
              value={p}
              onChange={(e) => {
                const intro = [...c.intro];
                intro[i] = e.target.value;
                setC({ ...c, intro });
              }}
              rows={3}
              className={inputCls}
            />
          </div>
        ))}
        <AddButton
          label="Add paragraph"
          onClick={() => setC({ ...c, intro: [...c.intro, ""] })}
        />
      </Card>

      <Card title="Vision & Mission">
        <Field
          label="Our Vision"
          textarea
          value={c.vision}
          onChange={(v) => setC({ ...c, vision: v })}
        />
        <Field
          label="Our Mission"
          textarea
          value={c.mission}
          onChange={(v) => setC({ ...c, mission: v })}
        />
      </Card>

      <Card title="Team Section">
        <Field
          label="Heading"
          value={c.teamHeading}
          onChange={(v) => setC({ ...c, teamHeading: v })}
        />
        <Field
          label="Subtext"
          textarea
          rows={2}
          value={c.teamSubtext}
          onChange={(v) => setC({ ...c, teamSubtext: v })}
        />
        <p className="text-xs text-gray-dark">
          Team members themselves are managed under the Team section.
        </p>
      </Card>

      <SaveButton pending={pending} label="Save About Page" />
    </form>
  );
}

// ─── Tabbed wrapper ──────────────────────────────────
export default function PageContentEditor({
  home,
  about,
}: {
  home: HomeContent;
  about: AboutContent;
}) {
  const [tab, setTab] = useState<"home" | "about">("home");

  return (
    <div>
      <div className="flex gap-2 mb-8 border-b border-gray-200">
        {(["home", "about"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-semibold -mb-px border-b-2 transition-colors ${
              tab === t
                ? "border-navy text-navy"
                : "border-transparent text-gray hover:text-navy"
            }`}
          >
            {t === "home" ? "Home Page" : "About Us"}
          </button>
        ))}
      </div>

      {tab === "home" ? (
        <HomeForm initial={home} />
      ) : (
        <AboutForm initial={about} />
      )}
    </div>
  );
}
