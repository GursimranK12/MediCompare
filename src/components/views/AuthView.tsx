import React, { useState, useMemo } from 'react';
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Sparkles,
  Loader2,
  HeartPulse,
  ShieldCheck,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import './AuthView.css';

interface AuthViewProps {
  onLogin: (userData?: { name: string; email: string }) => void;
}

export default function AuthView({ onLogin }: AuthViewProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  // Password strength calculation for Sign Up
  const passwordStrength = useMemo(() => {
    const pwd = formData.password;
    if (!pwd) return { score: 0, label: '', color: 'bg-slate-200' };

    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/\d/.test(pwd)) score += 1;
    if (/[^a-zA-Z0-9]/.test(pwd)) score += 1;

    switch (score) {
      case 1:
        return { score: 25, label: 'Weak', color: 'bg-rose-500', text: 'text-rose-500' };
      case 2:
        return { score: 50, label: 'Fair', color: 'bg-amber-500', text: 'text-amber-500' };
      case 3:
        return { score: 75, label: 'Good', color: 'bg-teal-500', text: 'text-teal-500' };
      case 4:
        return { score: 100, label: 'Strong', color: 'bg-emerald-600', text: 'text-emerald-600' };
      default:
        return { score: 0, label: 'Very Weak', color: 'bg-rose-400', text: 'text-rose-400' };
    }
  }, [formData.password]);

  // Client-side validation
  const validateForm = (): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;

    if (!isLogin && formData.name.trim().length < 2) {
      return 'Please enter your full name (minimum 2 characters).';
    }

    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      return 'Please enter a valid email address.';
    }

    if (isLogin) {
      // In Login mode: only ensure the password was entered
      if (!formData.password) {
        return 'Please enter your password.';
      }
    } else {
      // In Sign-Up mode: strictly validate password complexity
      if (!strongPasswordRegex.test(formData.password)) {
        return 'Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.';
      }

      if (formData.password !== formData.confirmPassword) {
        return 'Passwords do not match. Please verify your password.';
      }
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    // Simulate realistic async network authorization delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin({
        name: formData.name.trim() || 'Dr. Alex Taylor',
        email: formData.email.trim(),
      });
    }, 550);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setFormData({
      name: 'Dr. Alex Taylor',
      email: 'demo@medicompare.health',
      password: 'DemoPassword123!',
      confirmPassword: 'DemoPassword123!',
    });
    setError('');

    setTimeout(() => {
      setIsLoading(false);
      onLogin({
        name: 'Dr. Alex Taylor',
        email: 'demo@medicompare.health',
      });
    }, 400);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResetSent(true);
      setError('');
    }, 500);
  };

  const resetMode = (loginMode: boolean) => {
    setIsLogin(loginMode);
    setIsForgotPassword(false);
    setResetSent(false);
    setError('');
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 py-10 bg-gradient-to-br from-slate-50 via-teal-50/20 to-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Background ambient medical glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md shadow-2xl shadow-teal-950/5 border border-slate-200/90 bg-white/95 backdrop-blur-sm">
        {/* Brand Header */}
        <div className="pt-8 px-6 pb-2 text-center">
          <div className="inline-flex items-center justify-center mb-3">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white shadow-lg shadow-teal-600/30">
              <HeartPulse className="w-6 h-6 stroke-[2.2]" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-teal-300 rounded-full border-2 border-white animate-pulse" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="font-extrabold text-2xl tracking-tight text-slate-900 font-['Outfit',sans-serif]">
              Medi<span className="text-teal-600">Compare</span>
            </span>
            <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-700 rounded-md border border-teal-200/70">
              PRO
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium tracking-wide">
            Healthcare Decision Platform
          </p>
        </div>

        {isForgotPassword ? (
          /* ================= FORGOT PASSWORD VIEW ================= */
          <>
            <CardHeader className="text-center pt-2 pb-4">
              <CardTitle className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
                {resetSent ? 'Check Your Inbox' : 'Reset Password'}
              </CardTitle>
              <CardDescription className="text-slate-500 text-xs sm:text-sm mt-1.5 max-w-xs mx-auto">
                {resetSent
                  ? `We've sent a secure password recovery link to ${formData.email}. Please follow the instructions to regain access.`
                  : 'Enter your verified email address to receive password reset instructions.'}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {error && (
                <div className="animate-auth-shake flex items-center gap-2.5 p-3 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              {resetSent ? (
                <div className="space-y-4 pt-1">
                  <div className="flex items-center justify-center p-3 rounded-xl bg-teal-50 border border-teal-100 text-teal-800 text-xs gap-2">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                    <span>Password reset instructions dispatched successfully!</span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => resetMode(true)}
                  >
                    Return to Sign In
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="reset-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <Input
                        id="reset-email"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10"
                        autoComplete="email"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Link...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Reset Link</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>

            <CardFooter className="justify-center border-t border-slate-100/80 bg-slate-50/50 py-4 rounded-b-2xl">
              {!resetSent && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-slate-600 hover:text-teal-700 text-xs"
                  onClick={() => resetMode(true)}
                >
                  Back to Sign In
                </Button>
              )}
            </CardFooter>
          </>
        ) : (
          /* ================= SIGN IN & SIGN UP VIEWS ================= */
          <>
            <CardHeader className="text-center pt-2 pb-4">
              <CardTitle className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
                {isLogin ? 'Welcome Back' : 'Create an Account'}
              </CardTitle>
              <CardDescription className="text-slate-500 text-xs sm:text-sm mt-1">
                {isLogin
                  ? 'Sign in to access your saved providers, comparisons, and appointments'
                  : 'Join MediCompare to search, compare, and book verified healthcare services'}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {error && (
                <div className="animate-auth-shake flex items-center gap-2.5 p-3 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Full Name (Sign Up only) */}
                {!isLogin && (
                  <div className="space-y-1">
                    <Label htmlFor="auth-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <Input
                        id="auth-name"
                        type="text"
                        name="name"
                        placeholder="Dr. Alex Taylor"
                        value={formData.name}
                        onChange={handleChange}
                        className="pl-10"
                        autoComplete="name"
                        required={!isLogin}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                )}

                {/* Email Address */}
                <div className="space-y-1">
                  <Label htmlFor="auth-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <Input
                      id="auth-email"
                      type="email"
                      name="email"
                      placeholder="alex.taylor@medicompare.health"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10"
                      autoComplete="email"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auth-password">Password</Label>
                    {isLogin && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsForgotPassword(true);
                          setError('');
                        }}
                        className="text-xs font-semibold text-teal-600 hover:text-teal-700 hover:underline cursor-pointer bg-transparent border-none p-0"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <Input
                      id="auth-password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder={isLogin ? 'Enter your password' : 'Create a secure password'}
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 pr-10"
                      autoComplete={isLogin ? 'current-password' : 'new-password'}
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none p-1 rounded-md"
                      title={showPassword ? 'Hide password' : 'Show password'}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Password Strength Meter (Sign Up Only) */}
                  {!isLogin && formData.password && (
                    <div className="pt-1.5 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-medium">Password Strength:</span>
                        <span className={`font-semibold ${passwordStrength.text}`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 rounded-full ${passwordStrength.color}`}
                          style={{ width: `${passwordStrength.score}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-slate-400 leading-tight">
                        Must contain at least 8 chars, 1 uppercase, 1 number, and 1 special symbol.
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password (Sign Up only) */}
                {!isLogin && (
                  <div className="space-y-1 pt-0.5">
                    <Label htmlFor="auth-confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <Input
                        id="auth-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Re-enter your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="pl-10 pr-10"
                        autoComplete="new-password"
                        required={!isLogin}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none p-1 rounded-md"
                        title={showConfirmPassword ? 'Hide password' : 'Show password'}
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full mt-2"
                  disabled={isLoading}
                  id="auth-submit-btn"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{isLogin ? 'Sign In to MediCompare' : 'Create Free Account'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>

              {/* Quick Demo Login Option (Sign In mode only) */}
              {isLogin && (
                <div className="pt-2">
                  <div className="relative flex items-center justify-center my-3">
                    <div className="border-t border-slate-200 w-full" />
                    <span className="bg-white px-2.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider absolute">
                      Or Test Prototype
                    </span>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-teal-200/80 bg-teal-50/50 hover:bg-teal-50 text-teal-800 hover:text-teal-900 flex items-center justify-center gap-2 group"
                    onClick={handleDemoLogin}
                    disabled={isLoading}
                    id="auth-demo-btn"
                  >
                    <Sparkles className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-xs">Quick Demo Login (Dr. Alex Taylor)</span>
                  </Button>
                </div>
              )}
            </CardContent>

            {/* Toggle Sign In / Sign Up Footer */}
            <CardFooter className="justify-center border-t border-slate-100 bg-slate-50/60 py-4 rounded-b-2xl">
              <button
                type="button"
                className="text-xs text-slate-600 hover:text-teal-700 font-medium transition-colors cursor-pointer bg-transparent border-none p-0 flex items-center gap-1.5"
                onClick={() => resetMode(!isLogin)}
                id="toggle-auth-mode-btn"
              >
                <span>{isLogin ? "Don't have an account?" : 'Already have an account?'}</span>
                <span className="font-bold text-teal-600 hover:underline">
                  {isLogin ? 'Create one now' : 'Sign In here'}
                </span>
              </button>
            </CardFooter>
          </>
        )}
      </Card>

      {/* Security Trust Badge */}
      <div className="mt-6 mb-2 flex items-center gap-1.5 text-[11px] text-slate-400 font-medium select-none">
        <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
        <span>256-bit Encrypted Healthcare Session</span>
      </div>
    </div>
  );
}