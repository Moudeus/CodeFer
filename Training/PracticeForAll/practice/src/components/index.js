// Layout Components
export { default as Header } from "./layout/Header";
export { default as Footer } from "./layout/Footer";

// UI Components
export { default as Button } from "./ui/Button";
export { default as Card } from "./ui/Card";
export { default as Alert } from "./ui/Alert";

// Forms Components - Sẽ thêm sau khi implement
// export { default as Input } from './forms/Input';
// export { default as Form } from './forms/Form';
// export { default as Select } from './forms/Select';

// Navigation Components - Sẽ thêm sau khi implement
// export { default as Navbar } from './navigation/Navbar';
// export { default as Sidebar } from './navigation/Sidebar';
// export { default as Menu } from './navigation/Menu';

// Auth Components - Sẽ thêm sau khi implement
// export { default as LoginForm } from './auth/LoginForm';
// export { default as RegisterForm } from './auth/RegisterForm';
// export { default as ForgotPasswordForm } from './auth/ForgotPasswordForm';

// Quiz Components - Sẽ thêm sau khi implement
// export { default as Quiz } from './quiz/Quiz';
// export { default as Question } from './quiz/Question';
// export { default as QuizResults } from './quiz/QuizResults';

// Constants and Types
export const BUTTON_VARIANTS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  SUCCESS: "success",
  DANGER: "danger",
  WARNING: "warning",
  INFO: "info",
  LIGHT: "light",
  DARK: "dark",
  LINK: "link",
};

export const BUTTON_SIZES = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
};

export const ALERT_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

// Utilities for components - Có thể thêm sau khi cần
// export * from './utils';
