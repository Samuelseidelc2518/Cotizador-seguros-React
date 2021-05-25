import React, { useState } from 'react'
import { calcularMarca, obtenerDiferenciaYear, obtenerPlan } from '../Helper'
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label = styled.label`
    flex: 0 0 100px;
`;
const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`;
const Radio = styled.input`
    margin: 0 1rem;
`;
const Boton = styled.button`
    background-color: #00838F;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color .2s ease;
    margin-top: 2rem;

    &:hover{
        cursor: pointer;
        background-color: #26C6DA;
    }

`;

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
`;

const Formulario = ({ setResumen, setLoading }) => {

    const [ datos, setDatos ] = useState({
        marca: '',
        year: '',
        plan: '.'
    });

    // state del error

    const [ error, setError ] = useState(false);

    // extraer los valores del state
    const { marca, year, plan } = datos;

    // setear el state

    const setearState = e =>{

        // cuando cambien el valor en el formulario

        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })

        // eliminar el error si ya esta lleno el formulario

        if(error === true){
            if( marca.trim() === '' || year.trim() === '' || plan.trim() === '' ){
                setError(true)
                return;
            }else{
                setError(false);
            }
        }
    }

    const cotizarSeguro = e =>{
        e.preventDefault();

        if( marca.trim() === '' || year.trim() === '' || plan.trim() === '' ){
            setError(true);
            return;
        }else{
            setError(false);
        }

        setLoading(true);

        

        // Base del precio
        let resultado = 2000;

        // obtener la diferencia de años

        const diferencia = obtenerDiferenciaYear(year);

        // por cada año hay que restar el 3%
        resultado-= (( diferencia * 3 ) * resultado) / 100;

        // Americano 15%
        // Asiatico 5%
        // Europeo 30%
        resultado *= calcularMarca(marca);

        // Basico aumenta 20%
        // Completo 50%
        const incrementoPlan = obtenerPlan(plan);
        
        resultado = parseFloat(incrementoPlan * resultado);

        setTimeout( () => setLoading(false), 2000 );
        //Total
        setTimeout( () => setResumen({
            cotizacion: resultado,
            datos
        }), 2000 );
        
        
        

        
    }

    return ( 
        <form 
            action=""
            onSubmit={cotizarSeguro}
        >
            { error ? <Error>Tienes que llenar todos los campos</Error> : null }
            <Campo>
                <Label htmlFor="seleccion">Marca</Label>
                <Select 
                    id="seleccion"
                    name="marca"
                    value={marca}
                    onChange={setearState}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Campo>
            <Campo>
                <Label htmlFor="seleccion2">Año</Label>
                <Select 
                    id="seleccion2"
                    name="year"
                    value={year}
                    onChange={setearState}
                >
                <option value="">-- Seleccione --</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Plan</Label>
                <Radio 
                    type="radio"
                    name="plan"
                    id="Plan"
                    value="basico"
                    checked={plan === "basico"}
                    onChange={setearState}
                /> <label htmlFor="Plan">Basico</label>
                <Radio 
                    type="radio"
                    name="plan"
                    id="Plan2"
                    value="completo"
                    checked={plan === "completo"}
                    onChange={setearState}
                /> <label htmlFor="Plan2">Completo</label>
            </Campo>

            <Boton
                type="submit"
            >Cotizar</Boton>
        </form>
    );
}
Formulario.propTypes = {
    setResumen: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired
}


export default Formulario;