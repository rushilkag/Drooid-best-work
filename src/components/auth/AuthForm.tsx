import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Eye, EyeOff, Mail, User, BookOpen, GraduationCap } from "lucide-react";

interface AuthFormProps {
  onSubmit?: (data: {
    email: string;
    password: string;
    name?: string;
    role: "professor" | "student";
    isLogin: boolean;
  }) => void;
  isLoading?: boolean;
}

const AuthForm = ({
  onSubmit = () => {},
  isLoading = false,
}: AuthFormProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [role, setRole] = useState<"professor" | "student">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      email,
      password,
      name: activeTab === "signup" ? name : undefined,
      role,
      isLogin: activeTab === "login",
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {activeTab === "login" ? "Welcome Back" : "Create Account"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "login" | "signup")}
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Mail size={18} />
                  </div>
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <User size={18} />
                  </div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div
                    className={`flex-1 p-3 border rounded-md cursor-pointer flex items-center justify-center space-x-2 ${role === "student" ? "bg-blue-50 border-blue-300" : "bg-white"}`}
                    onClick={() => setRole("student")}
                  >
                    <BookOpen size={18} />
                    <span>Student</span>
                  </div>
                  <div
                    className={`flex-1 p-3 border rounded-md cursor-pointer flex items-center justify-center space-x-2 ${role === "professor" ? "bg-blue-50 border-blue-300" : "bg-white"}`}
                    onClick={() => setRole("professor")}
                  >
                    <GraduationCap size={18} />
                    <span>Professor</span>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Processing..." : "Login"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <User size={18} />
                  </div>
                  <Input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Mail size={18} />
                  </div>
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <User size={18} />
                  </div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div
                    className={`flex-1 p-3 border rounded-md cursor-pointer flex items-center justify-center space-x-2 ${role === "student" ? "bg-blue-50 border-blue-300" : "bg-white"}`}
                    onClick={() => setRole("student")}
                  >
                    <BookOpen size={18} />
                    <span>Student</span>
                  </div>
                  <div
                    className={`flex-1 p-3 border rounded-md cursor-pointer flex items-center justify-center space-x-2 ${role === "professor" ? "bg-blue-50 border-blue-300" : "bg-white"}`}
                    onClick={() => setRole("professor")}
                  >
                    <GraduationCap size={18} />
                    <span>Professor</span>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Processing..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-gray-500">
        {activeTab === "login" ? (
          <p>
            Don't have an account?{" "}
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => setActiveTab("signup")}
            >
              Sign up
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
