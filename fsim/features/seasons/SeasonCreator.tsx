"use client";

import { useEffect, useMemo, useState } from "react";
import {
  useCreateSeasonMutation,
  useFetchLeaguesQuery,
  useUpdateLeagueProgressionMutation,
} from "@/store";
import Button from "../../components/ReusableComponents/Button";
import Input from "../../components/ReusableComponents/Input";
import Spinner from "../../components/Spinner/Spinner";

interface SeasonCreatorProps {
  onCreated?: () => void;
  onCancel?: () => void;
}

interface AvailableLeague {
  _id: string;
  name: string;
  seasonId?: string | null;
  advances?: number | null;
  relegation?: number | null;
}

interface DraftProgression {
  advances: string;
  relegation: string;
}

function SeasonCreator({ onCreated, onCancel }: SeasonCreatorProps) {
  const { data, error, isLoading } = useFetchLeaguesQuery();
  const [createSeason, { isLoading: isSubmitting }] =
    useCreateSeasonMutation();
  const [updateProgression] = useUpdateLeagueProgressionMutation();

  const [name, setName] = useState("");
  const [selectedLeagueIds, setSelectedLeagueIds] = useState<string[]>([]);
  const [drafts, setDrafts] = useState<Record<string, DraftProgression>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const availableLeagues: AvailableLeague[] = useMemo(() => {
    if (!data) return [];
    return (data as AvailableLeague[]).filter((l) => !l.seasonId);
  }, [data]);

  useEffect(() => {
    if (!data) return;
    setDrafts((prev) => {
      const next = { ...prev };
      for (const l of data as AvailableLeague[]) {
        if (!next[l._id]) {
          next[l._id] = {
            advances: String(l.advances ?? 0),
            relegation: String(l.relegation ?? 0),
          };
        }
      }
      return next;
    });
  }, [data]);

  const toggleLeague = (id: string) => {
    setSelectedLeagueIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const moveLeague = (id: string, direction: -1 | 1) => {
    setSelectedLeagueIds((prev) => {
      const idx = prev.indexOf(id);
      if (idx < 0) return prev;
      const newIdx = idx + direction;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      const copy = [...prev];
      [copy[idx], copy[newIdx]] = [copy[newIdx], copy[idx]];
      return copy;
    });
  };

  const setDraftField = (
    id: string,
    field: keyof DraftProgression,
    value: string
  ) => {
    setDrafts((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? { advances: "0", relegation: "0" }), [field]: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    try {
      for (let i = 0; i < selectedLeagueIds.length; i++) {
        const id = selectedLeagueIds[i];
        const draft = drafts[id];
        if (!draft) continue;
        await updateProgression({
          leagueId: id,
          advances: Number(draft.advances) || 0,
          relegation: Number(draft.relegation) || 0,
        }).unwrap();
      }
      await createSeason({
        name: name.trim(),
        leagueIds: selectedLeagueIds,
      }).unwrap();
      onCreated?.();
    } catch (err) {
      const message =
        err && typeof err === "object" && "data" in err
          ? (err.data as { message?: string })?.message
          : undefined;
      setSubmitError(message ?? "Nie udało się utworzyć sezonu");
    }
  };

  if (isLoading) return <Spinner />;
  if (error) {
    return (
      <div className="text-red-300 p-4">Błąd podczas wczytywania lig.</div>
    );
  }

  const canSubmit =
    name.trim().length > 0 && selectedLeagueIds.length > 0 && !isSubmitting;

  return (
    <div className="p-6 max-w-2xl mx-auto text-left text-white">
      <h2 className="text-2xl mb-4">Utwórz sezon</h2>

      {availableLeagues.length === 0 ? (
        <div className="text-slate-200 mb-4">
          Brak dostępnych lig. Utwórz ligę, która nie należy jeszcze do żadnego
          sezonu.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label className="block mb-1">Nazwa sezonu</label>
          <Input
            placeholder="np. Sezon 2026"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="mt-4">
            <div className="mb-2">
              Wybierz ligi (kolejność = poziom, 1 = najwyższa):
            </div>
            <div className="text-xs text-slate-300 mb-2">
              Drużyny z dołu wyższej ligi spadają do niższej; drużyny z czołówki
              niższej ligi awansują wyżej. Liczba zamian to{" "}
              <em>min(spadki górnej, awanse dolnej)</em>.
            </div>
            <div className="flex flex-col gap-2">
              {availableLeagues.map((l) => {
                const order = selectedLeagueIds.indexOf(l._id);
                const isSelected = order >= 0;
                const draft = drafts[l._id] ?? { advances: "0", relegation: "0" };
                return (
                  <div
                    key={l._id}
                    className="bg-slate-700 rounded p-2"
                  >
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleLeague(l._id)}
                        />
                        <span>
                          {isSelected && (
                            <span className="text-emerald-300 mr-2">
                              #{order + 1}
                            </span>
                          )}
                          {l.name}
                        </span>
                      </label>
                      {isSelected && (
                        <div className="flex gap-1">
                          <button
                            type="button"
                            className="px-2 py-1 bg-slate-500 rounded"
                            onClick={() => moveLeague(l._id, -1)}
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            className="px-2 py-1 bg-slate-500 rounded"
                            onClick={() => moveLeague(l._id, 1)}
                          >
                            ↓
                          </button>
                        </div>
                      )}
                    </div>
                    {isSelected && (
                      <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-slate-200">
                        <label>
                          Ile awansuje wyżej
                          <Input
                            value={draft.advances}
                            onChange={(e) =>
                              setDraftField(
                                l._id,
                                "advances",
                                e.target.value
                              )
                            }
                          />
                        </label>
                        <label>
                          Ile spada niżej
                          <Input
                            value={draft.relegation}
                            onChange={(e) =>
                              setDraftField(
                                l._id,
                                "relegation",
                                e.target.value
                              )
                            }
                          />
                        </label>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {submitError && (
            <div className="text-red-300 mt-3 text-sm">{submitError}</div>
          )}

          <div className="flex gap-2 mt-6">
            <Button secondary rounded type="submit" disabled={!canSubmit}>
              {isSubmitting ? "Tworzenie..." : "Utwórz sezon"}
            </Button>
            {onCancel && (
              <Button rounded onClick={onCancel} type="button">
                Anuluj
              </Button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

export default SeasonCreator;
