import React, { createContext, useCallback, useState } from "react";
import PropTypes from "prop-types";
import {
    validateMultipleRules,
    defaultErrorTranslator
} from "../../../core/validation";

const FormManagerContext = createContext({
    data: {},
    liveValid: false,
    updateData: (name, value) => {},
    validation: {},
    onErrorTranslator: (error, value = undefined) => {}
});

const useForm = (defaultValue, validator, liveValid) => {
    const [data, setData] = useState(defaultValue);
    const [validation, handleValid] = useValidator(validator);

    const updateData = useCallback(
        (name, value) => {
            setData({
                ...data,
                [name]: value
            });
            if (liveValid) {
                handleValid(name, value);
            }
        },
        [data, setData, handleValid, liveValid]
    );
    return [data, updateData, validation];
};

const useFormContextValue = (
    data,
    updateData,
    validation,
    onErrorTranslate
) => {
    return {
        data: data,
        updateData: updateData,
        liveValid: false,
        validation: validation,
        onErrorTranslator: onErrorTranslate
    };
};

const useValidator = (validator) => {
    const [validation, setValidation] = useState({});
    const handleValid = useCallback(
        (name, value) => {
            const status = validateMultipleRules(validator[name] || [], value);
            const validationCopy = { ...validation };
            delete validationCopy[name];
            if (status.length > 0) {
                validationCopy[name] = status;
            }
            setValidation(validationCopy);
        },
        [validation, validator]
    );
    return [validation, handleValid];
};

const FormManager = ({
                         children,
                         defaultValue = {},
                         validator = {},
                         liveValid = false,
                         onSubmit,
                         onErrorTranslate = defaultErrorTranslator
                     }) => {
    const [data, updateData, validation] = useForm(
        defaultValue,
        validator,
        liveValid
    );

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            onSubmit(data);
        },
        [data, onSubmit]
    );

    return (
        <FormManagerContext.Provider
            value={useFormContextValue(
                data,
                updateData,
                validation,
                onErrorTranslate
            )}
        >
            <form onSubmit={handleSubmit}>{children}</form>
        </FormManagerContext.Provider>
    );
};

FormManager.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
    onSubmit: PropTypes.func.isRequired
};

export { FormManager, FormManagerContext };
