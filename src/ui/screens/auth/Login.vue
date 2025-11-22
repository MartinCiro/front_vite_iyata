<template>
  <AuthLayout
    title="Sign in to your account"
    subtitle="Or start your 14-day free trial"
  >
    <form @submit.prevent="handleLogin" class="space-y-6">
      <Input
        :model-value="form.email"
        @update:model-value="(value) => (form.email = value)"
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

      <Input
        :model-value="form.password"
        @update:model-value="(value) => (form.password = value)"
        label="Password"
        type="password"
        placeholder="Enter your password"
        :error="errors.password"
        :required="true"
        @blur="() => validateField('password')"
      >
        <template #icon>
          <LockClosedIcon class="h-5 w-5 text-gray-400" />
        </template>
      </Input>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input
            id="remember-me"
            v-model="form.remember"
            name="remember-me"
            type="checkbox"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label for="remember-me" class="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        <div class="text-sm">
          <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          :loading="isLoading"
          loading-text="Signing in..."
          class="w-full"
        >
          Sign in
        </Button>
      </div>

      <div v-if="error" class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <ExclamationTriangleIcon class="h-5 w-5 text-red-400" />
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Sign in failed</h3>
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
          <span class="px-2 bg-white text-gray-500">New to Iyata?</span>
        </div>
      </div>

      <div class="mt-6">
        <router-link to="/register">
          <Button variant="outline" size="lg" class="w-full">
            Create your account
          </Button>
        </router-link>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup>
import { reactive, watch } from "vue";
import { useRouter } from "vue-router";
import {
  EnvelopeIcon,
  LockClosedIcon,
  ExclamationTriangleIcon,
} from "@heroicons/vue/24/outline";
import { useAuth } from "hooks/useAuth.js";
import { useForm } from "hooks/useForm.js";
import AuthLayout from "layouts/AuthLayout.vue";
import Input from "useable/Input.vue";
import Button from "useable/Button.vue";

const router = useRouter();
const { login, isLoading, error, clearError } = useAuth();

// Form validation rules
const validations = {
  email: {
    required: "Email is required",
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    patternMessage: "Please enter a valid email address",
  },
  password: {
    required: "Password is required",
    minLength: 6,
    minLengthMessage: "Password must be at least 6 characters",
  },
};

const { form, errors, validate, validateField } = useForm(
  {
    email: "",
    password: "",
    remember: false,
  },
  validations
);

// Clear error when form changes
watch(
  () => [form.email, form.password],
  () => {
    if (error.value) clearError();
  }
);

const handleLogin = async () => {
  if (!validate()) return;

  try {
    await login({
      email: form.email,
      password: form.password,
    });

    // Redirect to dashboard on successful login
    router.push("/dashboard");
  } catch (err) {
    // Error is handled by the store
    console.error("Login error:", err);
  }
};
</script>
