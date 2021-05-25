import React from 'react';
import { primerMayus } from '../Helper';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ContenedorResumen = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #00838f;
    color: #fff;
    margin-top: 1rem;
`;

const Resumen = ({datos}) => {

    const {marca, year, plan} = datos;

    if(marca === '' || year === '' || plan === '' ) return null;

    return ( 
        <ContenedorResumen>
            <h2>Resumen de Cotizacion</h2>
        <ul>
            <li>Marca: {primerMayus(marca)}</li>
            <li>Plan: {primerMayus(plan)}</li>
            <li>Año del auto: {year}</li>
        </ul>
        </ContenedorResumen>
    );
}

Resumen.propTypes = {
    datos: PropTypes.object.isRequired
}

export default Resumen;