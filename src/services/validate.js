const validator = ({ errForm, rules }) => {
    let isValid = true;

    for (const rule of rules) {
        const msgForm = rule.target.nextElementSibling.classList.contains(errForm)
            ? rule.target.nextElementSibling
            : undefined;
        const msg = rule.test(rule.target, rule?.minLength);

        if (msg) {
            msgForm.innerHTML = msg;
            isValid = false;
            break;
        } else {
            msgForm.innerHTML = '';
        }
    }

    return isValid;
};

validator.isRequired = (target) => {
    return {
        target,
        test: function () {
            return target.value.length <= 0 || target.value === undefined ? 'This field cannot be empty' : '';
        },
    };
};

validator.exceedMinLength = (target, minLength) => {
    return {
        target,
        test: function () {
            return target.value.length < minLength && target.value.length >= 1
                ? `This field should contain ${minLength} characters`
                : '';
        },
    };
};

validator.isEmail = (target) => {

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return {
        target,
        test: function () {
            return !validRegex.test(target.value) ? 'This is not an email' : '';
        },
    };
};

export default validator;
