"use client";

import { useEffect, useMemo, useState } from "react";
import {
  useFetchClubsQuery,
  useGetLeagueTablesQuery,
  useStartNextSeasonMutation,
  useUpdateLeagueProgressionMutation,
  type SeasonData,
  type SeasonLeague,
} from "@/store";
import Button from "../../components/ReusableComponents/Button";
import Input from "../../components/ReusableComponents/Input";

interface DraftProgression {
  advances: string;
  relegation: string;
}

interface ClubLite {
  _id: string;
  name: string;
}

interface RankedRow {
  club: string;
  clubName: string;
  points: number;
  goalsDif: number;
  wonGames: number;
  goalsShot: number;
}

function rankTable(rows: RankedRow[]): RankedRow[] {
  return [...rows].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalsDif !== a.goalsDif) return b.goalsDif - a.goalsDif;
    if (b.wonGames !== a.wonGames) return b.wonGames - a.wonGames;
    return b.goalsShot - a.goalsShot;
  });
}

function LeagueRow({
  league,
  upperLeague,
  lowerLeague,
  draft,
  setDraft,
  clubsById,
}: {
  league: SeasonLeague;
  upperLeague?: SeasonLeague;
  lowerLeague?: SeasonLeague;
  draft: DraftProgression;
  setDraft: (next: DraftProgression) => void;
  clubsById: Map<string, ClubLite>;
}) {
  const { data: tableData } = useGetLeagueTablesQuery(league._id);

  const ranked = useMemo<RankedRow[]>(() => {
    if (!tableData) return [];
    return rankTable(
      (tableData as RankedRow[]).map((t) => ({
        club: t.club,
        clubName: t.clubName,
        points: t.points,
        goalsDif: t.goalsDif,
        wonGames: t.wonGames,
        goalsShot: t.goalsShot,
      }))
    );
  }, [tableData]);

  const adv = Number(draft.advances) || 0;
  const rel = Number(draft.relegation) || 0;

  // Effective swap counts with neighbours (clamped by neighbour values).
  const swapUp = upperLeague
    ? Math.min(Number(upperLeague.relegation ?? 0), adv)
    : 0;
  const swapDown = lowerLeague
    ? Math.min(rel, Number(lowerLeague.advances ?? 0))
    : 0;

  const promotedToHigher = ranked.slice(0, swapUp);
  const relegatedToLower = ranked.slice(
    Math.max(0, ranked.length - swapDown)
  );

  return (
    <div className="bg-slate-800 rounded p-3">
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="font-medium">
            poziom {league.tier}: {league.name}
          </span>
          {league.complete ? (
            <span className="ml-2 text-emerald-300 text-xs">✓ ukończona</span>
          ) : (
            <span className="ml-2 text-amber-300 text-xs">
              ! niedokończona
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs text-slate-200 mb-2">
        <label>
          Ile awansuje wyżej
          <Input
            value={draft.advances}
            onChange={(e) =>
              setDraft({ ...draft, advances: e.target.value })
            }
          />
        </label>
        <label>
          Ile spada niżej
          <Input
            value={draft.relegation}
            onChange={(e) =>
              setDraft({ ...draft, relegation: e.target.value })
            }
          />
        </label>
      </div>

      <div className="text-xs text-slate-300 space-y-1">
        {upperLeague && swapUp > 0 && promotedToHigher.length > 0 && (
          <div>
            <span className="text-emerald-300">↑ Awansują</span> do „
            {upperLeague.name}":{" "}
            {promotedToHigher
              .map((r) => clubsById.get(r.club)?.name ?? r.clubName)
              .join(", ")}
          </div>
        )}
        {upperLeague && swapUp === 0 && adv > 0 && (
          <div className="text-amber-300">
            Ta liga awansuje {adv}, ale wyższa „{upperLeague.name}" ma spadki ={" "}
            {upperLeague.relegation ?? 0} — wynikowa liczba zamian to 0.
          </div>
        )}
        {lowerLeague && swapDown > 0 && relegatedToLower.length > 0 && (
          <div>
            <span className="text-rose-300">↓ Spadają</span> do „
            {lowerLeague.name}":{" "}
            {relegatedToLower
              .map((r) => clubsById.get(r.club)?.name ?? r.clubName)
              .join(", ")}
          </div>
        )}
        {lowerLeague && swapDown === 0 && rel > 0 && (
          <div className="text-amber-300">
            Ta liga spada {rel}, ale niższa „{lowerLeague.name}" ma awanse ={" "}
            {lowerLeague.advances ?? 0} — wynikowa liczba zamian to 0.
          </div>
        )}
        {!upperLeague && adv > 0 && (
          <div className="text-amber-300">
            Brak wyższej ligi — drużyny z czołówki nie mają gdzie awansować.
          </div>
        )}
        {!lowerLeague && rel > 0 && (
          <div className="text-amber-300">
            Brak niższej ligi — drużyny z dołu nie mają gdzie spaść.
          </div>
        )}
      </div>
    </div>
  );
}

function NextSeasonPreview({
  season,
  onCancel,
  onCreated,
}: {
  season: SeasonData;
  onCancel: () => void;
  onCreated: () => void;
}) {
  const [name, setName] = useState(`Sezon ${season.number + 1}`);
  const [drafts, setDrafts] = useState<Record<string, DraftProgression>>({});
  const [error, setError] = useState<string | null>(null);

  const [updateProgression, { isLoading: isSaving }] =
    useUpdateLeagueProgressionMutation();
  const [startNext, { isLoading: isStarting }] = useStartNextSeasonMutation();
  const { data: clubsData } = useFetchClubsQuery();

  const clubsById = useMemo(() => {
    const map = new Map<string, ClubLite>();
    if (clubsData) {
      for (const c of clubsData as ClubLite[]) map.set(c._id, c);
    }
    return map;
  }, [clubsData]);

  useEffect(() => {
    const initial: Record<string, DraftProgression> = {};
    for (const l of season.leagues) {
      initial[l._id] = {
        advances: String(l.advances ?? 0),
        relegation: String(l.relegation ?? 0),
      };
    }
    setDrafts(initial);
  }, [season]);

  const sortedLeagues = [...season.leagues].sort((a, b) => a.tier - b.tier);

  const handleConfirm = async () => {
    setError(null);
    try {
      // Save any changed progression values first.
      for (const league of season.leagues) {
        const draft = drafts[league._id];
        if (!draft) continue;
        const adv = Number(draft.advances) || 0;
        const rel = Number(draft.relegation) || 0;
        if (
          adv !== (league.advances ?? 0) ||
          rel !== (league.relegation ?? 0)
        ) {
          await updateProgression({
            leagueId: league._id,
            advances: adv,
            relegation: rel,
          }).unwrap();
        }
      }
      await startNext({ seasonId: season._id, name: name.trim() }).unwrap();
      onCreated();
    } catch (err) {
      const message =
        err && typeof err === "object" && "data" in err
          ? (err.data as { message?: string })?.message
          : undefined;
      setError(message ?? "Nie udało się utworzyć kolejnego sezonu");
    }
  };

  const allComplete = season.leagues.every((l) => l.complete);
  const busy = isSaving || isStarting;

  return (
    <div className="bg-slate-900 border border-slate-600 rounded p-4 mt-3 text-white">
      <h3 className="text-lg font-semibold mb-3">Podgląd kolejnego sezonu</h3>

      <label className="block text-sm mb-1">Nazwa nowego sezonu</label>
      <Input
        placeholder="np. Sezon 2026/27"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="mt-4 text-sm text-slate-300 mb-2">
        Sprawdź awanse i spadki dla każdej ligi. Wartości można zmienić — będą
        zapisane przed utworzeniem nowego sezonu.
      </div>

      {!allComplete && (
        <div className="text-amber-300 text-xs mb-2">
          Uwaga: nie wszystkie ligi są ukończone — start nowego sezonu zostanie
          odrzucony przez serwer.
        </div>
      )}

      <div className="flex flex-col gap-2">
        {sortedLeagues.map((l, idx) => (
          <LeagueRow
            key={l._id}
            league={l}
            upperLeague={idx > 0 ? sortedLeagues[idx - 1] : undefined}
            lowerLeague={
              idx < sortedLeagues.length - 1
                ? sortedLeagues[idx + 1]
                : undefined
            }
            draft={
              drafts[l._id] ?? {
                advances: String(l.advances ?? 0),
                relegation: String(l.relegation ?? 0),
              }
            }
            setDraft={(next) =>
              setDrafts((prev) => ({ ...prev, [l._id]: next }))
            }
            clubsById={clubsById}
          />
        ))}
      </div>

      {error && <div className="text-red-300 mt-2 text-sm">{error}</div>}

      <div className="flex gap-2 mt-4">
        <Button
          primary
          rounded
          onClick={handleConfirm}
          disabled={busy || name.trim().length === 0}
        >
          {busy ? "Tworzenie..." : "Potwierdź i utwórz sezon"}
        </Button>
        <Button rounded onClick={onCancel} disabled={busy}>
          Anuluj
        </Button>
      </div>
    </div>
  );
}

export default NextSeasonPreview;
