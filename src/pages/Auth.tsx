import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, UserPlus, LogIn, Gamepad2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (isLogin: boolean, formData: FormData) => {
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      toast({
        title: isLogin ? "Login Successful!" : "Registration Successful!",
        description: `Welcome to Viking Protest Game! ${isLogin ? "Good to have you back!" : "Your account has been created."}`,
      });
      navigate("/character-select");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-game">
      <div className="w-full max-w-md animate-bounce-in">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-primary mr-3" />
            <Gamepad2 className="h-10 w-10 text-accent" />
          </div>
          <h1 className="text-hero mb-2">Viking Protest</h1>
          <p className="text-muted-foreground text-lg">Enter the revolution. Choose your side.</p>
        </div>

        <Card className="card-game">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Register
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleAuth(true, formData);
              }}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder="warrior@viking.game"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                      className="mt-1"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="btn-hero w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Entering..." : "Enter the Battle"}
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleAuth(false, formData);
              }}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="register-username">Username</Label>
                    <Input
                      id="register-username"
                      name="username"
                      type="text"
                      placeholder="Choose your warrior name"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      name="email"
                      type="email"
                      placeholder="warrior@viking.game"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      name="password"
                      type="password"
                      placeholder="Create a strong password"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-confirm">Confirm Password</Label>
                    <Input
                      id="register-confirm"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      required
                      className="mt-1"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="btn-hero w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Join the Revolution"}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Experience the ultimate protest game with Web3 features, NFTs, and blockchain integration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;