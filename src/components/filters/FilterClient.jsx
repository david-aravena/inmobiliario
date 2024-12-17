"use client"

import { useState } from 'react';
import {filterItems} from 'app/serverless/utils/db/'

const FilterClient = ({setResult, styles, obj}) => {
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
                <select name="type" onChange={handleChange} value={filters.type} className={styles.select}>
                    <option value="">Tipo</option>
                    <option value="casa">Comprador</option>
                    <option value="departamento">Vendedor</option>
                </select>
                <button className={styles.buttonSubmit} type="submit">Buscar</button>
            </form>
        </div>
    );
};

export default FilterClient;
