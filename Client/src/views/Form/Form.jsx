import { useEffect, useState } from 'react';
import style from './Form.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getTeams, postDriver } from '../../redux/actions';

const Form = () => {

    const teams = useSelector(state => state.teams)
    const dispatch = useDispatch();

    const nationalities = [
        // A
        "Afghan", "Albanian", "Algerian", "American",
        "Andorran", "Angolan", "Anguillan", "Citizen of Antigua and Barbuda",
        "Argentine", "Armenian", "Australian", "Austrian",
        "Azerbaijani",
        // B
        "Bahamian", "Bahraini", "Bangladeshi", "Barbadian",
        "Belarusian", "Belgian", "Belizean", "Beninese",
        "Bermudian", "Bhutanese", "Bolivian", "Citizen of Bosnia and Herzegovina",
        "Botswanan", "Brazilian", "British", "British Virgin Islander",
        "Bruneian", "Bulgarian", "Burkinan", "Burmese",
        "Burundian",
        // C
        "Cambodian", "Cameroonian", "Canadian", "Cape Verdean",
        "Cayman Islander", "Central African", "Chadian", "Chilean",
        "Chinese", "Colombian", "Comoran", "Congolese (Congo)",
        "Congolese (DRC)", "Cook Islander", "Costa Rican", "Croatian",
        "Cuban", "Cymraes", "Cymro", "Cypriot",
        "Czech",
        // D
        "Danish", "Djiboutian", "Dominican", "Citizen of the Dominican Republic",
        "Dutch",
        // E
        "East Timorese", "Ecuadorean", "Egyptian", "Emirati",
        "English", "Equatorial Guinean", "Eritrean", "Estonian",
        "Ethiopian",
        // F
        "Faroese", "Fijian", "Filipino", "Finnish",
        "French",
        // G
        "Gabonese", "Gambian", "Georgian", "German",
        "Ghanaian", "Gibraltarian", "Greek", "Greenlandic",
        "Grenadian", "Guamanian", "Guatemalan", "Citizen of Guinea-Bissau",
        "Guinean", "Guyanese",
        // H
        "Haitian", "Honduran", "Hong Konger", "Hungarian",
        // I
        "Icelandic", "Indian", "Indonesian", "Iranian",
        "Iraqi", "Irish", "Israeli", "Italian",
        "Ivorian",
        // J
        "Jamaican", "Japanese", "Jordanian",
        // K
        "Kazakh", "Kenyan", "Kittitian", "Citizen of Kiribati",
        "Kosovan", "Kuwaiti", "Kyrgyz",
        // L
        "Lao", "Latvian", "Lebanese", "Liberian",
        "Libyan", "Liechtenstein citizen", "Lithuanian", "Luxembourger",
        // M
        "Macanese", "Macedonian", "Malagasy", "Malawian",
        "Malaysian", "Maldivian", "Malian", "Maltese",
        "Marshallese", "Martiniquais", "Mauritanian", "Mauritian",
        "Mexican", "Micronesian", "Moldovan", "Monegasque",
        "Mongolian", "Montenegrin", "Montserratian", "Moroccan",
        "Mosotho", "Mozambican",
        // N
        "Namibian", "Nauruan", "Nepalese", "New Zealander",
        "Nicaraguan", "Nigerian", "Nigerien", "Niuean",
        "North Korean", "Northern Irish", "Norwegian",
        // O
        "Omani",
        // P
        "Pakistani", "Palauan", "Palestinian", "Panamanian",
        "Papua New Guinean", "Paraguayan", "Peruvian", "Pitcairn Islander",
        "Polish", "Portuguese", "Prydeinig", "Puerto Rican",
        // Q
        "Qatari",
        // R
        "Romanian", "Russian", "Rwandan",
        // S
        "Salvadorean", "Sammarinese", "Samoan", "Sao Tomean",
        "Saudi Arabian", "Scottish", "Senegalese", "Serbian",
        "Citizen of Seychelles", "Sierra Leonean", "Singaporean", "Slovak",
        "Slovenian", "Solomon Islander", "Somali", "South African",
        "South Korean", "South Sudanese", "Spanish", "Sri Lankan",
        "St Helenian", "St Lucian", "Stateless", "Sudanese",
        "Surinamese", "Swazi", "Swedish", "Swiss",
        "Syrian",
        // T
        "Taiwanese", "Tajik", "Tanzanian", "Thai",
        "Togolese", "Tongan", "Trinidadian", "Tristanian",
        "Tunisian", "Turkish", "Turkmen", "Turks and Caicos Islander",
        "Tuvaluan",
        // U
        "Ugandan", "Ukrainian", "Uruguayan", "Uzbek",
        // V
        "Vatican citizen", "Citizen of Vanuatu", "Venezuelan", "Vietnamese",
        "Vincentian",
        // W
        "Wallisian", "Welsh",
        // Y
        "Yemeni",
        // Z
        "Zambian", "Zimbabwean"
    ];

    useEffect(() => {
        dispatch(getTeams())
    }, [])

    const [form, setForm] = useState({
        name: '',
        surname: '',
        nationality: '',
        image: '',
        dob: '',
        description: '',
        teams: [],
    })


    const [errors, setErrors] = useState({
        name: '',
        surname: '',
        nationality: '',
        image: '',
        dob: '',
        description: '',
        teams: '',
    })

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        if (property === "teams") {
            // Verifica si el valor ya está presente en el array
            const teamId = Number(value);
            if (form.teams.includes(teamId)) {
                // Si ya está presente, elimínalo del array
                const updatedTeams = form.teams.filter((team) => team !== teamId);
                setForm({ ...form, [property]: updatedTeams });
            } else {
                // Si no está presente, agrégalo al array
                setForm({ ...form, [property]: [...form.teams, teamId] });
            }
        } else {
            validate({ ...form, [property]: value });
            setForm({ ...form, [property]: value });
        }
    };

    const validate = (form) => {
        const isNameValid = /^[a-zA-Z]+$/.test(form.name);
        const isSurnameValid = /^[a-zA-Z]+$/.test(form.surname);

        setErrors({
            ...errors,
            name: isNameValid ? '' : 'Nombre incorrecto',
            surname: isSurnameValid ? '' : 'Apellido incorrecto'
        });
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        await dispatch(postDriver(form))
    }

    return (
        <div className={style.container}>
            <div className={style.masthead}>
            </div>
            <h1 className={style.mastheadTitle}>CREATE</h1>
            <h2 className={style.welcomeTitle}>Create your own F1® driver.</h2>
            <div className={style.divider}></div>

            <form onSubmit={submitHandler} className={style.formContainer}>
                <div className={style.sectionForm}>
                    <label htmlFor="" className={style.labelText}>First name *</label>
                    <label htmlFor="" className={style.label}>
                        <input type="text" value={form.name} onChange={changeHandler} name='name' className={`${style.input} ${errors.name ? style.error : style.success}`} placeholder='John' />
                    </label>
                    <label htmlFor="" className={style.labelText}>Last name *</label>
                    <label htmlFor="" className={style.label}>
                        <input type="text" value={form.surname} onChange={changeHandler} name='surname' className={`${style.input} ${errors.surname ? style.error : style.success}`} placeholder='Smith' />
                    </label>
                    <label htmlFor="" className={style.labelText}>Image URL</label>
                    <label htmlFor="" className={style.label}>
                        <input type="text" value={form.image} onChange={changeHandler} name='image' className={style.input} placeholder='https://url.com/image.jpg' />
                    </label>
                    <label htmlFor="" className={style.labelText}>Description *</label>
                    <label htmlFor="" className={style.label}>
                        <input type="text" value={form.description} onChange={changeHandler} name='description' className={style.input} placeholder='' />
                    </label>
                    <label htmlFor="" className={style.labelText}>Birthdate *</label>
                    <label htmlFor="" className={style.label}>
                        <input type="date" value={form.dob} onChange={changeHandler} name='dob' className={style.input} placeholder='mm/dd/yyyy' />
                    </label>
                    <label htmlFor="" className={style.labelText}>Nationality *</label>
                    <label htmlFor="nationality" className={style.label}>
                        <select
                            id="nationality"
                            name="nationality"
                            value={form.nationality}
                            onChange={changeHandler}
                            className={style.selectNationality}
                        >
                            <option value="" disabled>Select Nationality</option>
                            {nationalities.map((nationality) => (
                                <option key={nationality} value={nationality}>{nationality}</option>
                            ))}
                        </select>
                    </label>
                    <label htmlFor="" className={style.labelText}>Team *</label>
                    <label htmlFor="" className={style.label}>
                        <select name="teams" id="" value={form.teams} onChange={changeHandler} multiple className={style.select}>
                            {teams.map((team) => (
                                <option key={team.id} value={team.id} className={style.option}>{team.name}</option>
                            ))}
                        </select>
                    </label>
                    <button type="submit" className={style.button}>Create</button>
                </div>
            </form>
        </div>
    )
}

export default Form;

