import { useState } from "react";
import Selector from "../../components/Buttons/Selector/Selector";
import Input from "../../components/ReusableComponents/Input";

function CreatorLeagueOption({i, options, onSelectorChange}) {
    const [league, setLeague] = useState();

  return (
    <div>
      <label>{i + 1} LIGA</label>
      <Selector
        key={i}
        placeholder="Wybierz lige"
        options={options}
        onChange={(e) => {
            setLeague(e.value);
        }}
      />
      <form>
        {i+1!==1 ? (<><label>Ilosc awansujacych (max5)</label><Input></Input></>) : (<></>)}
        {i+1!==5 ? (        <div>
        <label>Ilosc spadkowiczow (max3)</label>
        <Input>
        </Input>
        </div>) : (<></>)}

      </form>
    </div>
  );
}

export default CreatorLeagueOption
