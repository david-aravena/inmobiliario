"use client"
import { useState } from 'react';
import {filterItems} from 'app/serverless/utils/db/'

const Filter = ({setResult, styles, obj}) => {
    const [filters, setFilters] = useState(obj);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(filters).some(filter => filter)) {
            filterItems(filters)
                .then((result) => {
                    console.log("result: ", result);
                    setResult(result);
                })
        } else {
            alert("Por favor, completa al menos un filtro.");
        }
    };

    return (
        <div className={styles.filter}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="ubication"
                    placeholder="Ubicación"
                    value={filters.ubication}
                    onChange={handleChange}
                    className={styles.select}
                    onClick={() => alert("boton no habilitado")}
                />
                <select name="type" onChange={handleChange} value={filters.type} className={styles.select}>
                    <option value="">Tipo</option>
                    <option value="casa">Casa</option>
                    <option value="departamento">Departamento</option>
                    <option value="terreno">Terreno</option>
                    <option value="oficina">Oficina</option>
                </select>
                <select name="state" onChange={handleChange} value={filters.state} className={styles.select}> 
                    <option value="">Estado</option>
                    <option value="venta">Venta</option>
                    <option value="arriendo">Arriendo</option>
                </select>
                <select name="condition" onChange={handleChange} value={filters.condition} className={styles.select}>
                    <option value="">Condición</option>
                    <option value="nuevo">Nuevo</option>
                    <option value="usado">Usado</option>
                </select>
                <button className={styles.buttonSubmit} type="submit">Buscar</button>
            </form>
        </div>
    );
};

export default Filter;
