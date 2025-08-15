import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Pause, 
  Play, 
  RotateCcw, 
  Home, 
  Settings, 
  Trophy,
  Heart,
  Zap,
  Coins,
  Target,
  Shield,
  Flame,
  Skull
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GameState {
  health: number;
  energy: number;
  score: number;
  coins: number;
  level: number;
  isPaused: boolean;
  gameTime: number;
  inventory: string[];
  abilities: { [key: string]: number };
}

interface Character {
  id: string;
  name: string;
  type: "police" | "protester" | "goon";
}

const Game = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const character: Character = location.state?.character;
  const difficulty: string = location.state?.difficulty || "normal";

  const [gameState, setGameState] = useState<GameState>({
    health: 100,
    energy: 100,
    score: 0,
    coins: 0,
    level: 1,
    isPaused: false,
    gameTime: 0,
    inventory: [],
    abilities: {
      ability1: 0,
      ability2: 0,
      ability3: 0,
      ability4: 0
    }
  });

  const [activeNPCs, setActiveNPCs] = useState<any[]>([]);
  const [gameEvents, setGameEvents] = useState<string[]>([]);

  // Game timer
  useEffect(() => {
    if (!gameState.isPaused) {
      const timer = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          gameTime: prev.gameTime + 1
        }));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameState.isPaused]);

  // Redirect if no character selected
  useEffect(() => {
    if (!character) {
      navigate("/character-select");
    }
  }, [character, navigate]);

  const togglePause = () => {
    setGameState(prev => ({
      ...prev,
      isPaused: !prev.isPaused
    }));
    
    toast({
      title: gameState.isPaused ? "Game Resumed" : "Game Paused",
      description: gameState.isPaused ? "Back to action!" : "Game paused successfully"
    });
  };

  const useAbility = useCallback((abilityKey: string) => {
    if (gameState.energy < 20) {
      toast({
        title: "Not Enough Energy!",
        description: "Wait for energy to recharge before using abilities.",
        variant: "destructive"
      });
      return;
    }

    setGameState(prev => ({
      ...prev,
      energy: Math.max(0, prev.energy - 20),
      abilities: {
        ...prev.abilities,
        [abilityKey]: prev.abilities[abilityKey] + 1
      }
    }));

    // Add game event based on character type and ability
    const abilityNames = {
      police: ["Deploy Barrier", "Launch Tear Gas", "Call Backup", "Vehicle Chase"],
      protester: ["Rally Cry", "Sign Shield", "Stone Throw", "Parkour Escape"],
      goon: ["Stealth Strike", "Create Chaos", "Loot", "Intimidate"]
    };

    const abilityName = abilityNames[character?.type]?.[parseInt(abilityKey.slice(-1)) - 1] || "Special Ability";
    
    setGameEvents(prev => [`${character?.name} used ${abilityName}!`, ...prev.slice(0, 4)]);
    
    toast({
      title: `${abilityName} Activated!`,
      description: `${character?.name} successfully used ${abilityName}.`
    });
  }, [gameState.energy, character, toast]);

  const handleGameAction = (action: string) => {
    if (gameState.isPaused) return;

    let scoreGain = 0;
    let healthChange = 0;
    let coinGain = 0;

    switch (action) {
      case "jump":
        scoreGain = 10;
        setGameEvents(prev => [`${character?.name} jumped over obstacle!`, ...prev.slice(0, 4)]);
        break;
      case "duck":
        scoreGain = 15;
        setGameEvents(prev => [`${character?.name} ducked to avoid projectile!`, ...prev.slice(0, 4)]);
        break;
      case "attack":
        scoreGain = 25;
        setGameEvents(prev => [`${character?.name} attacked successfully!`, ...prev.slice(0, 4)]);
        break;
      case "collect":
        scoreGain = 5;
        coinGain = 1;
        setGameEvents(prev => [`${character?.name} collected item!`, ...prev.slice(0, 4)]);
        break;
    }

    setGameState(prev => ({
      ...prev,
      score: prev.score + scoreGain,
      health: Math.max(0, Math.min(100, prev.health + healthChange)),
      coins: prev.coins + coinGain,
      energy: Math.min(100, prev.energy + 1) // Slowly regenerate energy
    }));
  };

  const restartGame = () => {
    setGameState({
      health: 100,
      energy: 100,
      score: 0,
      coins: 0,
      level: 1,
      isPaused: false,
      gameTime: 0,
      inventory: [],
      abilities: {
        ability1: 0,
        ability2: 0,
        ability3: 0,
        ability4: 0
      }
    });
    setGameEvents([]);
    toast({
      title: "Game Restarted",
      description: "Fresh start! Good luck warrior!"
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!character) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-game p-4">
      <div className="max-w-7xl mx-auto">
        {/* HUD Header */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Character Info */}
          <Card className="hud-element">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-primary-foreground">
                  {character.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{character.name}</h3>
                <Badge variant="outline" className="text-xs">{character.type}</Badge>
              </div>
            </div>
          </Card>

          {/* Health & Energy */}
          <Card className="hud-element">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">Health</span>
                <span className="text-sm text-muted-foreground ml-auto">{gameState.health}%</span>
              </div>
              <Progress value={gameState.health} className="h-2" />
              
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Energy</span>
                <span className="text-sm text-muted-foreground ml-auto">{gameState.energy}%</span>
              </div>
              <Progress value={gameState.energy} className="h-2" />
            </div>
          </Card>

          {/* Score & Stats */}
          <Card className="hud-element">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">Score</span>
                </div>
                <span className="font-bold text-primary">{gameState.score.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium">Coins</span>
                </div>
                <span className="font-bold text-yellow-500">{gameState.coins}</span>
              </div>
            </div>
          </Card>

          {/* Game Controls */}
          <Card className="hud-element">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Time: {formatTime(gameState.gameTime)}</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={togglePause}
                  className="h-8 w-8 p-0"
                >
                  {gameState.isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={restartGame}
                  className="h-8 w-8 p-0"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Game Area */}
          <div className="lg:col-span-3">
            <Card className="card-game h-96 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900">
                {/* Game World Background */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10"></div>
                
                {!gameState.isPaused && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center animate-pulse-glow">
                      <div className="text-6xl mb-4">🏃‍♂️</div>
                      <h3 className="text-xl font-semibold text-primary">Game Active</h3>
                      <p className="text-muted-foreground">Use controls to navigate and fight!</p>
                    </div>
                  </div>
                )}

                {gameState.isPaused && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="text-center">
                      <Pause className="h-16 w-16 text-primary mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-primary mb-2">Game Paused</h3>
                      <p className="text-muted-foreground">Press pause to continue</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Game Action Buttons */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="grid grid-cols-4 gap-2">
                  <Button 
                    className="btn-game"
                    onClick={() => handleGameAction("jump")}
                    disabled={gameState.isPaused}
                  >
                    Jump
                  </Button>
                  <Button 
                    className="btn-game"
                    onClick={() => handleGameAction("duck")}
                    disabled={gameState.isPaused}
                  >
                    Duck
                  </Button>
                  <Button 
                    className="btn-game"
                    onClick={() => handleGameAction("attack")}
                    disabled={gameState.isPaused}
                  >
                    Attack
                  </Button>
                  <Button 
                    className="btn-game"
                    onClick={() => handleGameAction("collect")}
                    disabled={gameState.isPaused}
                  >
                    Collect
                  </Button>
                </div>
              </div>
            </Card>

            {/* Special Abilities */}
            <Card className="card-game mt-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500" />
                Special Abilities
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(gameState.abilities).map(([key, count], index) => {
                  const abilityNames = {
                    police: ["Deploy Barrier", "Launch Tear Gas", "Call Backup", "Vehicle Chase"],
                    protester: ["Rally Cry", "Sign Shield", "Stone Throw", "Parkour Escape"],
                    goon: ["Stealth Strike", "Create Chaos", "Loot", "Intimidate"]
                  };
                  
                  const abilityName = abilityNames[character.type]?.[index] || `Ability ${index + 1}`;
                  const canUse = gameState.energy >= 20 && !gameState.isPaused;

                  return (
                    <Button
                      key={key}
                      variant="outline"
                      className={`p-3 h-auto flex flex-col gap-1 ${canUse ? "hover:bg-primary/10" : "opacity-50"}`}
                      onClick={() => useAbility(key)}
                      disabled={!canUse}
                    >
                      <span className="text-xs font-medium">{abilityName}</span>
                      <div className="flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        <span className="text-xs">{count}</span>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-4">
            {/* Game Events */}
            <Card className="hud-element">
              <h3 className="font-semibold mb-3">Recent Events</h3>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {gameEvents.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No events yet...</p>
                ) : (
                  gameEvents.map((event, index) => (
                    <div key={index} className="text-sm p-2 bg-muted/50 rounded">
                      {event}
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="hud-element">
              <h3 className="font-semibold mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => navigate("/inventory")}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Inventory
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => navigate("/leaderboard")}
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  Leaderboard
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => navigate("/nft-marketplace")}
                >
                  <Coins className="h-4 w-4 mr-2" />
                  NFT Market
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => navigate("/")}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Main Menu
                </Button>
              </div>
            </Card>

            {/* Mission Objectives */}
            <Card className="hud-element">
              <h3 className="font-semibold mb-3">Mission Objectives</h3>
              <div className="space-y-2 text-sm">
                {character.type === "police" ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Shield className="h-3 w-3 text-blue-500" />
                      <span>Control riot zones</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-3 w-3 text-green-500" />
                      <span>Deploy barriers: {gameState.abilities.ability1}/5</span>
                    </div>
                  </>
                ) : character.type === "protester" ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Flame className="h-3 w-3 text-red-500" />
                      <span>Spread awareness</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-3 w-3 text-green-500" />
                      <span>Rally supporters: {gameState.abilities.ability1}/3</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <Skull className="h-3 w-3 text-purple-500" />
                      <span>Create chaos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-3 w-3 text-green-500" />
                      <span>Loot items: {gameState.abilities.ability3}/10</span>
                    </div>
                  </>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;