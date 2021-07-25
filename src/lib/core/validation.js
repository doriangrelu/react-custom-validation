const validateSingleRule = (rule, value) => {
    switch (rule) {
        case "email":
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(value);
        case "required":
            return value !== undefined && value !== null && value !== "";
        case "notEmpty":
            return value !== undefined && clean(value) !== "";
        default:
            return validateComplexeType(rule, value);
    }
};

const validateComplexeType = (rule, value) => {
    if (typeof rule !== "object") {
        return false;
    }

    const ruleType = rule.type || undefined;
    const ruleName = rule.name || undefined;
    const ruleValue = rule.value || undefined;

    if (
        ruleType === undefined ||
        ruleValue === undefined ||
        ruleName === undefined
    ) {
        throw new Error("Missing required rule name and rule value, and rule type");
    }

    switch (ruleType) {
        case "custom":
            return ruleValue(value);
        case "pattern":
            return ruleValue.test(value);
        default:
            return false;
    }
};

const validateMultipleRules = (rules, value) => {
    return rules
        .map((r) => {
            return validateSingleRule(r, value)
                ? undefined
                : extractErrorType(r, value);
        })
        .filter((e) => e !== undefined);
};

const clean = (value) => {
    return value.trim();
};

const extractErrorType = (rule, value) => {
    if (typeof rule === "object") {
        return rule.name || undefined;
    }
    return rule.replaceAll("%value%", value);
};

const defaultErrorTranslator = (errorKey, value = undefined) => {
    switch (parseError(errorKey)) {
        case "required":
            return "Ce champs est recquis";
        case "notEmpty":
            return "Ce champs ne doit pas être vide";
        case "email":
            return "Merci de fournir une adresse email valide";
        case "length.min":
            return parsePhrase(errorKey, "Doit être supérieur à {min}");
        case "length.max":
            return parsePhrase(errorKey, "Doit être inférieure à {max}");

        default:
            return "Oups une erreur est survenue";
    }
};

const parseError = (error) => {
    const globalArgs = /([a-zA-Z0-9.\-_]+)\((.+)\)/;
    const groups = error.toString().match(globalArgs) || [];
    return groups.length === 3 ? groups[1] : error;
};

const parsePhrase = (error, phrase) => {
    const globalArgs = /([a-zA-Z0-9.\-_]+)\((.+)\)/;
    let result = phrase;
    const groups = [...error.toString().match(globalArgs)] || [];

    if (groups.length === 3) {
        const matchArg = /([a-z0-9\\\-_/]+)=([\w\d/\\\-_+^]+)/;
        groups[2]
            .toString()
            .split(",")
            .forEach((v) => {
                const r = [...v.trim().match(matchArg)] || [];
                if (r.length === 3) {
                    result = result.replaceAll("{" + r[1] + "}", r[2]);
                }
            });
    }

    return result;
};

export {
    validateSingleRule,
    validateMultipleRules,
    defaultErrorTranslator,
    parseError,
    parsePhrase
};
