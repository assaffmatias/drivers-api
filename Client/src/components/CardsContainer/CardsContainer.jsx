import style from "./CardsContainer.module.css"
import Card from "../Card/Card"
import Paginated from "../Paginated/Paginated";
import Filter from "../Filter/Filter"
import Order from "../Order/Order";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { deleteDriver } from "../../redux/actions";
import swal from 'sweetalert';

const CardsContainer = () => {

    const drivers = useSelector(state => state.drivers);
    const filterCreated = useSelector((state) => state.filterCreated);
    const selectedTeam = useSelector(state => state.selectedTeam)
    const dispatch = useDispatch()

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5)

    const filteredDrivers = drivers.filter((driver) => {
        const meetsCreationFilter = filterCreated === null || driver.created === filterCreated;
        const meetsTeamFilter = !selectedTeam || (driver.teams && driver.teams.includes(selectedTeam));

        return meetsCreationFilter && meetsTeamFilter;
    });

    const max = Math.ceil(filteredDrivers.length / perPage);

    const onClose = (id) => {
        swal({
            title: "Are you sure?",
            text: "This pilot will be deleted",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    dispatch(deleteDriver(id))
                    swal("The pilot was deleted", {
                        icon: "success",
                    });
                } else {
                    swal("Operation cancelled");
                }
            });        
     }

    return (
        <div className={style.container}>
            <div className={style.masthead}>
            </div>
            <h1 className={style.mastheadTitle}>DRIVERS</h1>
            <h2 className={style.welcomeTitle}>Discover information about F1® drivers.</h2>
            <div className={style.filterContent}>
                <Filter onFilterChange={() => setPage(1)} />
            </div>
            <div className={style.orderSection}>
                <h3 className={style.driverText}>Driver</h3>
                <div className={style.orderForDesktop}>
                    <Order />
                </div>
                <h3 className={style.nationalityText}>Nationality</h3>
            </div>

            <div className={style.orderForMobile}>
                <Order></Order>
            </div>

            <section className={style.driverSection}>
                {filteredDrivers.length === 0 ? <p className={style.p}>No pilots found</p> : filteredDrivers
                    .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
                    .map((driver, index) => {
                        const backgroundColor = index % 2 === 0 ? 'transparent' : '#181d29';
                        return (
                            <Card
                                id={driver.id}
                                name={driver.name}
                                surname={driver.surname.toUpperCase()}
                                image={driver.image}
                                nationality={driver.nationality}
                                backgroundColor={backgroundColor}
                                onClose={onClose}
                            />
                        )
                    })}
            </section>
            <div>
                <Paginated page={page} setPage={setPage} max={max} />
            </div>
        </div>
    )
};

export default CardsContainer;