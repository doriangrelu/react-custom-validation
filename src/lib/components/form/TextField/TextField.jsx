import React, { useCallback, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {FormManagerContext} from "../FormManager/FormManager";


const useValidation = (name) => {
    const { validation } = useContext(FormManagerContext);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (validation[name] !== undefined && validation[name].length > 0) {
            setErrors(validation[name]);
        }
    }, [validation, setErrors, name]);

    return [errors];
};

const ErrorsDisplay = ({ errors, value }) => {
    const { onErrorTranslator } = useContext(FormManagerContext);

    if (errors === undefined || errors.length === 0) {
        return <></>;
    }

    return (
        <>
            {errors.map((e, k) => (
                <li key={k}>{onErrorTranslator(e, value)}</li>
            ))}
        </>
    );
};

const TextField = ({ name, children }) => {
    const { data, updateData } = useContext(FormManagerContext);
    const [errors] = useValidation(name);

    const handleChange = useCallback(
        (e) => {
            updateData(name, e.target.value);
        },
        [name, updateData]
    );

    return (
        <div>
            <input
                onChange={handleChange}
                name={name}
                placeholder={children}
                value={data[name] || ""}
            />
            <ErrorsDisplay errors={errors} value={data[name] || ""} />
        </div>
    );
};

TextField.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired
};

export { TextField };
