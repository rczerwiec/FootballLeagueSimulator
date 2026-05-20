"use client";

import { useState } from "react";
import { useGetSeasonsQuery } from "@/store";
import Button from "../../components/ReusableComponents/Button";
import Spinner from "../../components/Spinner/Spinner";
import SeasonCreator from "./SeasonCreator";
import SeasonCard from "./SeasonCard";

function Seasons() {
  const { data, error, isLoading } = useGetSeasonsQuery();
  const [creating, setCreating] = useState(false);

  if (isLoading) return <Spinner />;
  if (error) {
    return <div className="text-red-300 p-4">Błąd podczas wczytywania sezonów.</div>;
  }

  const seasons = data ?? [];
  const activeSeason = seasons.find((s) => !s.complete);

  if (creating) {
    return (
      <div>
        <SeasonCreator
          onCreated={() => setCreating(false)}
          onCancel={() => setCreating(false)}
        />
      </div>
    );
  }

  return (
    <div className="p-4 text-left">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl text-white">Sezony</h2>
        {!activeSeason && (
          <Button primary rounded onClick={() => setCreating(true)}>
            + Utwórz sezon
          </Button>
        )}
      </div>

      {seasons.length === 0 && (
        <div className="text-slate-200 p-4">
          Brak sezonów. Najpierw utwórz kluby i ligi, a potem rozpocznij sezon.
        </div>
      )}

      <div className="flex flex-col gap-3">
        {seasons.map((s) => (
          <SeasonCard key={s._id} season={s} />
        ))}
      </div>
    </div>
  );
}

export default Seasons;
