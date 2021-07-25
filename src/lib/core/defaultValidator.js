const minLengthStrict = (min = 0) => {
    if (min < 0) {
        throw new Error("Min value must superior than 0");
    }
    return {
        type: "custom",
        name: `length.min(min=${min})`,
        value: (value) => {
            return value !== undefined && value !== null && value.length > min;
        }
    };
};

const minLength = (min = 0) => {
    const rule = {
        type: "custom",
        name: `length.min(min=${min})`,
        value: (value) => {
            return true;
        }
    };

    if (min === 0) {
        return rule;
    }

    rule.value = (value) => {
        return value !== undefined && value !== null && value.length >= min;
    };

    return minLengthStrict(min - 1);
};

const maxLengthStrict = (max = 0) => {
    if (max <= 0) {
        throw new Error("Max value must strictly superior than 0");
    }
    return {
        type: "custom",
        name: `length.max(max=${max})`,
        value: (value) => {
            return value !== undefined && value !== null && value.length < max;
        }
    };
};

const maxLength = (max = 1) => {
    return maxLengthStrict(max + 1);
};

export { minLength, minLengthStrict, maxLength, maxLengthStrict };
