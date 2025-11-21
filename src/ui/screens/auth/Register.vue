<template>
  <AuthLayout title="Create your account" subtitle="Start managing your projects today">
    <form @submit.prevent="handleRegister" class="space-y-6">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          v-model="form.name"
          label="Full name"
          type="text"
          placeholder="Enter your full name"
          :error="errors.name"
          :required="true"
          @blur="validateField('name')"
        >
          <template #icon>
            <UserIcon class="h-5 w-5 text-gray-400" />
          </template>
        </Input>

        <Input
          v-model="form.email"
          label="Email address"
          type="email"
          placeholder="Enter your email"
          :error="errors.email"
          :required="true"
          @blur="validateField('email')"
        >
          <template #icon>
            <EnvelopeIcon class="h-5 w-5 text-gray-400" />
          </template>
        </Input>
      </div>

      <Input
        v-model="form.password"
        label="Password"
        type="password"
        placeholder="Create a password"
        :error="errors.password"
        :required="true"
        @blur="validateField('password')"
        :helper="passwordHelper"
      >
        <template #icon>
          <LockClosedIcon class="h-5 w-5 text-gray-400" />
        </template>
      </Input>

      <Input
        v-model="form.password_confirmation"
        label="Confirm password"
        type="password"
        placeholder="Confirm your password"
        :error="errors.password_confirmation"
        :required="true"
        @blur="validateField('password_confirmation')"
      >
        <template #icon>
          <LockClosedIcon class="h-5 w-5 text-gray-400" />
        </template>
      </Input>

      <div class="flex items-center">
        <input
          id="terms"
          v-model="form.agree_terms"
          name="terms"
          type="checkbox"
          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label for="terms" class="ml-2 block text-sm text-gray-900">
          I agree to the
          <a href="#" class="text-blue-600 hover:text-blue-500">Terms and Conditions</a>
          and
          <a href="#" class="text-blue-600 hover:text-blue-500">Privacy Policy</a>
        </label>
      </div>
      <p v-if="errors.agree_terms" class="text-sm text-red-600">{{ errors.agree_terms }}</p>

      <div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          :loading="isLoading"
          loading-text="Creating account..."
          class="w-full"
        >
          Create account
        </Button>
      </div>

      <div v-if="error" class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <ExclamationTriangleIcon class="h-5 w-5 text-red-400" />
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">
              Registration failed
            </h3>
            <div class="mt-2 text-sm text-red-700">
              <p>{{ error }}</p>
            </div>
          </div>
        </div>
      </div>
    </form>

    <div class="mt-6">
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300" />
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-white text-gray-500">Already have an account?</span>
        </div>
      </div>

      <div class="mt-6">
        <router-link to="/login">
          <Button variant="outline" size="lg" class="w-full">
            Sign in to your account
          </Button>
        </router-link>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup>
import { reactive, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { UserIcon, EnvelopeIcon, LockClosedIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline';
import { useAuth } from '../../../lib/hooks/useAuth.js';
import { useForm } from '../../../lib/hooks/useForm.js';
import AuthLayout from '../../../lib/layouts/AuthLayout.vue';
import Input from '../../useable-components/Input.vue';
import Button from '../../useable-components/Button.vue';

const router = useRouter();
const { register, isLoading, error, clearError } = useAuth();

// Form validation rules
const validations = {
  name: {
    required: 'Full name is required',
    minLength: 2,
    minLengthMessage: 'Name must be at least 2 characters',
  },
  email: {
    required: 'Email is required',
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    patternMessage: 'Please enter a valid email address',
  },
  password: {
    required: 'Password is required',
    minLength: 8,
    minLengthMessage: 'Password must be at least 8 characters',
    custom: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value),
    customMessage: 'Password must contain uppercase, lowercase and numbers',
  },
  password_confirmation: {
    required: 'Please confirm your password',
    custom: (value, form) => value === form.password,
    customMessage: 'Passwords do not match',
  },
  agree_terms: {
    required: 'You must agree to the terms and conditions',
    custom: (value) => value === true,
    customMessage: 'You must agree to the terms and conditions',
  },
};

const { form, errors, validate, validateField } = useForm(
  {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    agree_terms: false,
  },
  validations
);

const passwordHelper = computed(() => {
  if (!form.password) return 'Must be at least 8 characters with uppercase, lowercase and numbers';
  
  const hasUpper = /[A-Z]/.test(form.password);
  const hasLower = /[a-z]/.test(form.password);
  const hasNumber = /\d/.test(form.password);
  const hasLength = form.password.length >= 8;
  
  if (hasUpper && hasLower && hasNumber && hasLength) {
    return 'Password meets all requirements';
  }
  
  const requirements = [];
  if (!hasUpper) requirements.push('uppercase letter');
  if (!hasLower) requirements.push('lowercase letter');
  if (!hasNumber) requirements.push('number');
  if (!hasLength) requirements.push('8 characters');
  
  return `Needs: ${requirements.join(', ')}`;
});

// Clear error when form changes
watch(
  () => [form.name, form.email, form.password, form.password_confirmation],
  () => {
    if (error.value) {
      clearError();
    }
  }
);

const handleRegister = async () => {
  if (!validate()) return;

  try {
    await register({
      name: form.name,
      email: form.email,
      password: form.password,
      password_confirmation: form.password_confirmation,
    });
    
    // Redirect to login on successful registration
    router.push('/login?registered=true');
  } catch (err) {
    // Error is handled by the store
    console.error('Registration error:', err);
  }
};
</script>