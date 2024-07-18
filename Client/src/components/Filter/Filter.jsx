import style from "./Filter.module.css"
import { useDispatch, useSelector } from "react-redux";
import { filterDrivers, selectTeam } from "../../redux/actions";
import { useState, useEffect } from 'react';

const Filter = ({onFilterChange}) => {
    const teams = useSelector(state => state.teams)
    const dispatch = useDispatch();
    const [selectedFilter, setSelectedFilter] = useState(null);

    const handleFilter = (value) => {
        setSelectedFilter(value)
        dispatch(filterDrivers(value))
        if (onFilterChange) {
            onFilterChange();
          }
    };

    const handleFilterTeam = (event) => {
        const teamName = event.target.value;
        dispatch(selectTeam(teamName))
        if (onFilterChange) {
            onFilterChange();
        }
    };

    useEffect(() => {
        setSelectedFilter("all");
      }, [teams]);

    return (
        <>
            <div className={style.selectContent}>
                <select className={style.select} name="" id="" onChange={handleFilterTeam}>
                <option value="">Select Team</option>
                    {teams.map((team) => (
                        <option key={team.name} value={team.name}>
                            {team.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className={style.input}>
                <button className={`${style.value} ${selectedFilter === 'all' && style.selected}`} onClick={() => handleFilter("all")}>All Drivers</button>
                <button className={`${style.value} ${selectedFilter === 'created' && style.selected}`} onClick={() => handleFilter("created")}>Created</button>
                <button className={`${style.value} ${selectedFilter === 'notCreated' && style.selected}`} onClick={() => handleFilter("notCreated")}>Not Created</button>
            </div>
        </>
    )
}

export default Filter;