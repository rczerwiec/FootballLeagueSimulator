"use client";

import { useState } from "react";
import { type SeasonData } from "@/store";
import Button from "../../components/ReusableComponents/Button";
import NextSeasonPreview from "./NextSeasonPreview";

function SeasonCard({ season }: { season: SeasonData }) {
  const [showPreview, setShowPreview] = useState(false);

  const allLeaguesComplete =
    season.leagues.length > 0 && season.leagues.every((l) => l.complete);

  return (
    <div className="bg-slate-700 border border-slate-600 rounded p-4 text-white">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-xl font-semibold">
            #{season.number} — {season.name}
          </div>
          <div className="text-xs text-slate-300">
            {season.complete ? "Zakończony" : "Aktywny"}
            {season.championClubId && season.complete && (
              <span> · Mistrz: {season.championClubId.slice(0, 8)}…</span>
            )}
          </div>
        </div>
        {season.complete ? (
          <span className="text-emerald-300 text-sm">✓ Zakończony</span>
        ) : (
          allLeaguesComplete &&
          !showPreview && (
            <Button
              primary
              rounded
              onClick={() => setShowPreview(true)}
            >
              Rozpocznij kolejny sezon
            </Button>
          )
        )}
      </div>

      <div className="mt-3">
        <div className="text-sm text-slate-300 mb-1">Ligi w sezonie:</div>
        <ol className="list-decimal list-inside text-slate-100">
          {season.leagues.map((l) => (
            <li key={l._id}>
              <span className="font-medium">{l.name}</span>
              <span className="text-xs text-slate-300 ml-2">
                (poziom {l.tier}
                {l.advances ? ` · awanse: ${l.advances}` : ""}
                {l.relegation ? ` · spadki: ${l.relegation}` : ""})
              </span>
              {l.complete && (
                <span className="ml-2 text-emerald-300 text-xs">
                  ✓ ukończona
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>

      {!season.complete && !allLeaguesComplete && (
        <div className="text-xs text-slate-400 mt-2">
          Rozegraj wszystkie mecze we wszystkich ligach, aby rozpocząć kolejny
          sezon.
        </div>
      )}

      {showPreview && (
        <NextSeasonPreview
          season={season}
          onCancel={() => setShowPreview(false)}
          onCreated={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}

export default SeasonCard;
