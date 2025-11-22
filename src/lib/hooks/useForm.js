import { reactive } from 'vue';

export function useForm(initialValues = {}, validations = {}) {
  const form = reactive({ ...initialValues });
  const errors = reactive({});

  const validateField = (fieldName) => {
    const value = form[fieldName];
    const rules = validations[fieldName];
    
    // Limpiar error anterior
    errors[fieldName] = '';

    if (!rules) return true;

    // Validación required
    if (rules.required && (!value || value.toString().trim() === '')) {
      errors[fieldName] = rules.required;
      return false;
    }

    // Validación pattern (email)
    if (rules.pattern && value && !rules.pattern.test(value)) {
      errors[fieldName] = rules.patternMessage;
      return false;
    }

    // Validación minLength
    if (rules.minLength && value && value.length < rules.minLength) {
      errors[fieldName] = rules.minLengthMessage;
      return false;
    }

    return true;
  };

  const validate = () => {
    let isValid = true;
    Object.keys(validations).forEach(field => {
      if (!validateField(field)) isValid = false;
    });
    return isValid;
  };

  return {
    form,
    errors,
    validate,
    validateField
  };
}