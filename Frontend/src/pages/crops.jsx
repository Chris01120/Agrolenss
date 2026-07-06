import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import { AppShell } from "@/components/agrolens/AppShell";
import { CROPS, scoreLabel, ZONES } from "@/lib/agrolens-data";
import { useCropIntelligence, useCropList } from "@/lib/api";
import { useDerivedAgroLens } from "@/lib/agrolens-store";

import { Search, ArrowRight } from "lucide-react";

function normalizeCropId(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function CropsPage() {
  const navigate = useNavigate();
  const { setCropId, region } = useDerivedAgroLens();

  const [q, setQ] = useState("");

  // ✅ FIX 1: loading state (you were missing this)
  const [loading, setLoading] = useState(true);

  // ✅ FIX 2: API data stored separately
  const [apiCrops, setApiCrops] = useState([]);

  useEffect(() => {
    fetch("https://agrolenss.onrender.com/api/crops/")
      .then((res) => res.json())
      .then((data) => {
        console.log("CROPS DATA:", data);
        setApiCrops(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching crops:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    document.title = "Crop Search — AGROLENS";
  }, []);

  const zoneName =
    ZONES.find((z) => z.id === region.primaryZone)?.name ??
    region.primaryZone;

  const { data: remote } = useCropList();
  const { data: intelligence } = useCropIntelligence(zoneName);

  const intelligenceScores = useMemo(() => {
    return new Map(
      Object.entries(intelligence?.scores ?? {}).map(([crop, score]) => [
        crop.toLowerCase(),
        score,
      ])
    );
  }, [intelligence]);

  // ✅ FIX 3: NO REDECLARATION OF "crops"
  const baseCrops = remote || apiCrops || CROPS;

  const processedCrops = baseCrops.map((crop) => {
    const local = CROPS.find(
      (c) =>
        c.id === crop.id ||
        c.name.toLowerCase() === crop.name.toLowerCase()
    );

    const id = local
      ? local.id
      : normalizeCropId(crop.name || String(crop.id));

    const merged = local
      ? {
          ...local,
          ...crop,
          id,
          backendId: crop.id,
          growthDays: local.growthDays ?? crop.growth_duration_days,
        }
      : {
          ...crop,
          id,
          backendId: crop.id,
          emoji: crop.emoji ?? "🌱",
          growthDays: crop.growth_duration_days ?? 0,
        };

    return {
      ...merged,
      scoreOverride:
        merged.scores?.[region.primaryZone] ??
        merged.scores?.[zoneName] ??
        intelligenceScores.get(merged.name.toLowerCase()),
    };
  });

  const filtered = processedCrops.filter((c) =>
    c.name.toLowerCase().includes(q.toLowerCase())
  );

  function handleSelect(id, override = null) {
    setCropId(id, override);
    navigate("/analysis");
  }

  if (loading) {
    return (
      <AppShell>
        <p className="p-6">Loading crops...</p>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6 px-4 py-6 md:px-8">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            Crop Search
          </h1>

          <p className="text-sm text-muted-foreground">
            Pick a crop to analyze its fit for {region.name},{" "}
            {region.country}.
          </p>
        </div>

        {/* Search */}
        <div className="surface-elevated p-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ag-cyan" />

            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search crops..."
              className="w-full rounded-xl border border-transparent bg-transparent py-4 pl-12 pr-4 text-lg focus:outline-none"
            />
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => {
            const score =
              c.scoreOverride ??
              c.scores?.[region.primaryZone] ??
              0;

            const { label, tone } = scoreLabel(score);

            const color =
              tone === "success"
                ? "var(--ag-green)"
                : tone === "warning"
                ? "var(--ag-amber)"
                : "var(--ag-red)";

            const tags = c.tags ?? [];

            return (
              <button
                key={c.id}
                onClick={() => handleSelect(c.id, c)}
                className="surface-card group relative flex flex-col gap-3 overflow-hidden p-5 text-left"
                style={{ borderTop: `2px solid ${color}` }}
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl">{c.emoji ?? "🌱"}</span>

                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                    style={{ backgroundColor: color }}
                  >
                    {score}/10
                  </span>
                </div>

                <h3 className="text-lg font-semibold">{c.name}</h3>

                <p className="text-xs text-muted-foreground">
                  {c.growthDays ?? c.growth_duration_days ?? "?"} day cycle
                </p>

                <p className="text-xs" style={{ color }}>
                  {label} in {region.primaryZone.replace("-", " ")}
                </p>

                <span className="text-xs font-semibold" style={{ color }}>
                  Analyze <ArrowRight className="inline h-3 w-3" />
                </span>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            No crops match "{q}"
          </p>
        )}
      </div>
    </AppShell>
  );
}