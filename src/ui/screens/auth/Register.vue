<template>
  <AuthLayout 
    title="Create your account" 
    subtitle="Demo registration - use predefined test accounts"
  >
    <!-- Demo Info -->
    <div class="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
      <div class="flex">
        <InformationCircleIcon class="h-5 w-5 text-blue-400" />
        <div class="ml-3">
          <h3 class="text-sm font-medium text-blue-800">
            Demo Registration Info
          </h3>
          <div class="mt-2 text-sm text-blue-700">
            <p class="font-medium">Use these test credentials:</p>
            <p>Email: <strong>eve.holt@reqres.in</strong></p>
            <p>Password: <strong>pistol</strong></p>
            <p class="mt-1 text-xs">Data is stored temporarily in browser only</p>
          </div>
        </div>
      </div>
    </div>

    <form @submit.prevent="handleRegister" class="space-y-6">
      <div class="grid grid-cols-2 gap-4">
        <Input
          v-model="form.first_name"
          label="First name"
          type="text"
          placeholder="Enter your first name"
          :error="errors.first_name"
          :required="true"
        />

        <Input
          v-model="form.last_name"
          label="Last name"
          type="text"
          placeholder="Enter your last name"
          :error="errors.last_name"
          :required="true"
        />
      </div>

      <Input
        v-model="form.email"
        label="Email address"
        type="email"
        placeholder="eve.holt@reqres.in"
        :error="errors.email"
        :required="true"
      >
        <template #icon>
          <EnvelopeIcon class="h-5 w-5 text-gray-400" />
        </template>
      </Input>

      <Input
        v-model="form.password"
        label="Password"
        type="password"
        placeholder="pistol"
        :error="errors.password"
        :required="true"
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
      >
        <template #icon>
          <LockClosedIcon class="h-5 w-5 text-gray-400" />
        </template>
      </Input>

      <div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          :loading="isLoading"
          loading-text="Creating account..."
          class="w-full"
        >
          Create Demo Account
        </Button>
      </div>

      <!-- Success Message -->
      <div v-if="successMessage" class="rounded-md bg-green-50 p-4">
        <div class="flex">
          <CheckCircleIcon class="h-5 w-5 text-green-400" />
          <div class="ml-3">
            <h3 class="text-sm font-medium text-green-800">
              Demo Account Created
            </h3>
            <div class="mt-2 text-sm text-green-700">
              <p>{{ successMessage }}</p>
              <p class="mt-1">Redirecting to dashboard...</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="error" class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <ExclamationTriangleIcon class="h-5 w-5 text-red-400" />
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">
              Registration Failed
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
            Sign in to existing account
          </Button>
        </router-link>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { 
  EnvelopeIcon, 
  LockClosedIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/vue/24/outline';
import { useAuth } from 'hooks/useAuth.js';
import { useForm } from 'hooks/useForm.js';
import AuthLayout from 'layouts/AuthLayout.vue';
import Input from '../../useable-components/Input.vue';
import Button from '../../useable-components/Button.vue';

const router = useRouter();
const { register, isLoading, error, clearError } = useAuth();
const successMessage = ref('');

// Form validation rules
const validations = {
  first_name: {
    required: 'First name is required',
  },
  last_name: {
    required: 'Last name is required',
  },
  email: {
    required: 'Email is required',
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    patternMessage: 'Please enter a valid email address',
  },
  password: {
    required: 'Password is required',
    minLength: 6,
    minLengthMessage: 'Password must be at least 6 characters',
  },
  password_confirmation: {
    required: 'Please confirm your password',
    match: 'password',
    matchMessage: 'Passwords do not match',
  },
};

const { form, errors, validate, validateField } = useForm(
  {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  },
  validations
);

// Clear errors when form changes
watch(
  () => [form.email, form.password, form.first_name, form.last_name, form.password_confirmation],
  () => {
    if (error.value) clearError();
    if (successMessage.value) successMessage.value = '';
  }
);

const handleRegister = async () => {
  if (!validate()) return;

  try {
    const result = await register({
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      password: form.password,
    });
    
    // Mostrar mensaje de éxito
    successMessage.value = result.message;
    
    // Redirigir después de 2 segundos
    setTimeout(() => router.push('/dashboard'), 2000);
    
  } catch (err) {
    console.error('Registration error:', err);
  }
};
</script>