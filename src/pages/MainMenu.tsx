import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Users, 
  Trophy, 
  Settings, 
  ShoppingCart,
  Palette,
  LogOut,
  Gamepad2,
  Shield,
  Megaphone,
  Skull,
  Coins
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const MainMenu = () => {
  const navigate = useNavigate();

  const gameFeatures = [
    {
      icon: <Shield className="h-6 w-6 text-blue-500" />,
      title: "Police Force",
      description: "Control riots, deploy tactical equipment, and maintain order",
      color: "bg-gradient-police"
    },
    {
      icon: <Megaphone className="h-6 w-6 text-red-500" />,
      title: "Protesters",
      description: "Fight for justice with 'STOP KILLING US' signs and rally others",
      color: "bg-gradient-protester"
    },
    {
      icon: <Skull className="h-6 w-6 text-purple-500" />,
      title: "Shadow Goons",
      description: "Create chaos, loot, and exploit the situation for personal gain",
      color: "bg-gradient-goon"
    },
    {
      icon: <Coins className="h-6 w-6 text-yellow-500" />,
      title: "NFT Integration",
      description: "Collect rare items, trade on blockchain, and unlock characters",
      color: "bg-gradient-nft"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-game p-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-bounce-in">
          <div className="flex items-center justify-center mb-6">
            <Gamepad2 className="h-16 w-16 text-primary mr-4" />
            <div>
              <h1 className="text-hero">Viking Protest</h1>
              <p className="text-xl text-muted-foreground">Web3 Action Game</p>
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mb-8">
            <Badge className="bg-primary text-primary-foreground px-4 py-2">
              Blockchain Powered
            </Badge>
            <Badge className="bg-accent text-accent-foreground px-4 py-2">
              Multiplayer Ready
            </Badge>
            <Badge className="bg-success text-success-foreground px-4 py-2">
              NFT Integration
            </Badge>
          </div>
        </div>

        {/* Main Action Buttons */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="card-character text-center" onClick={() => navigate("/auth")}>
            <Play className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-character-name mb-2">Quick Start</h3>
            <p className="text-sm text-muted-foreground">Jump into action immediately</p>
          </Card>

          <Card className="card-character text-center" onClick={() => navigate("/character-select")}>
            <Palette className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-character-name mb-2">Character Select</h3>
            <p className="text-sm text-muted-foreground">Choose your fighter and difficulty</p>
          </Card>

          <Card className="card-character text-center" onClick={() => navigate("/multiplayer")}>
            <Users className="h-12 w-12 text-success mx-auto mb-4" />
            <h3 className="text-character-name mb-2">Multiplayer</h3>
            <p className="text-sm text-muted-foreground">Local WiFi/Hotspot battles</p>
          </Card>

          <Card className="card-character text-center" onClick={() => navigate("/leaderboard")}>
            <Trophy className="h-12 w-12 text-warning mx-auto mb-4" />
            <h3 className="text-character-name mb-2">Leaderboard</h3>
            <p className="text-sm text-muted-foreground">Blockchain verified rankings</p>
          </Card>
        </div>

        {/* Game Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            Choose Your Path
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gameFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="card-character relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 opacity-10 ${feature.color}`} />
                <div className="relative z-10 text-center">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-character-name mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Secondary Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="card-game">
            <div className="flex items-center gap-4">
              <ShoppingCart className="h-8 w-8 text-primary" />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">NFT Marketplace</h3>
                <p className="text-sm text-muted-foreground">Trade rare items and characters</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => navigate("/nft-marketplace")}
                className="btn-nft"
              >
                Visit
              </Button>
            </div>
          </Card>

          <Card className="card-game">
            <div className="flex items-center gap-4">
              <Palette className="h-8 w-8 text-accent" />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Customize</h3>
                <p className="text-sm text-muted-foreground">Personalize your character</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => navigate("/customize")}
                className="btn-game"
              >
                Edit
              </Button>
            </div>
          </Card>

          <Card className="card-game">
            <div className="flex items-center gap-4">
              <Settings className="h-8 w-8 text-muted-foreground" />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Settings</h3>
                <p className="text-sm text-muted-foreground">Configure game preferences</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => navigate("/settings")}
                className="btn-game"
              >
                Open
              </Button>
            </div>
          </Card>
        </div>

        {/* Game Info */}
        <Card className="card-game text-center">
          <h3 className="text-game-title mb-4">About Viking Protest</h3>
          <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
            Experience the ultimate action-packed protest simulation with cutting-edge Web3 integration. 
            Choose between Police, Protesters, or Shadow Goons, each with unique abilities and storylines. 
            Compete on blockchain-verified leaderboards, collect rare NFTs, and participate in local multiplayer battles.
          </p>
          
          <div className="flex justify-center gap-4">
            <Button 
              className="btn-hero"
              onClick={() => navigate("/auth")}
            >
              Start Playing Now
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/auth")}
              className="btn-game flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Login/Register
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MainMenu;