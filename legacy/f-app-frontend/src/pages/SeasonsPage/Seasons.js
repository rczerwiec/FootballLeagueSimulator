import { useGetSeasonsQuery } from "../../store";
import SeasonCreator from "./SeasonCreator";

function Seasons(){
    const {data, error, isLoading} = useGetSeasonsQuery();

    let content;
    if(!isLoading && !error){
        if (data.seasons.length === 0){
            content = <SeasonCreator/>
        }
        else{
            content = <div>
                Sezony
            </div>
        }
    }

    return <div>
        {content}
    </div>
}

export default Seasons;