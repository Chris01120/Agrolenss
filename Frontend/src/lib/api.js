import { useState, useEffect } from "react";
import { CROPS } from "./agrolens-data";

const BACKEND_BASE =
  import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";

// -------------------------
// Static Crop
// -------------------------

export function getStaticCrop(id) {
  return CROPS.find((crop) => crop.id === id) ?? null;
}

// -------------------------
// Crop List Hook
// -------------------------

export function useCropList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${BACKEND_BASE}/api/crops/`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error();

        const json = await res.json();

        setData(json.data ?? json);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { data, loading };
}

// -------------------------
// Crop Intelligence Hook
// -------------------------

export function useCropIntelligence(zone) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!zone) return;

    async function load() {
      try {
        const res = await fetch(
          `${BACKEND_BASE}/api/intelligence/?zone=${encodeURIComponent(zone)}`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error();

        const json = await res.json();

        setData(json.data ?? json);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [zone]);

  return { data, loading };
}

// -------------------------
// Crop Detail Hook
// -------------------------

export function useCropDetail(id, zone) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !zone) return;

    async function load() {
      try {
        const cropId =
          typeof id === "object"
            ? id.name ?? id.backendId ?? id.id
            : id;

        const res = await fetch(
          `${BACKEND_BASE}/api/crops/${encodeURIComponent(
            cropId
          )}/detail/?zone=${encodeURIComponent(zone)}`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error();

        const json = await res.json();

        setData(json.data ?? json);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id, zone]);

  return { data, loading };
}