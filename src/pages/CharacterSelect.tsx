import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Megaphone, Skull, Star, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Character {
  id: string;
  name: string;
  type: "police" | "protester" | "goon";
  description: string;
  icon: React.ReactNode;
  abilities: string[];
  stats: {
    strength: number;
    speed: number;
    stealth: number;
    resistance: number;
  };
  unlocked: boolean;
  rarity: "common" | "rare" | "legendary";
}

const characters: Character[] = [
  {
    id: "police-captain",
    name: "Captain Steel",
    type: "police",
    description: "Elite riot control officer with advanced tactical gear and leadership skills.",
    icon: <Shield className="h-8 w-8" />,
    abilities: ["Barrier Deployment", "Tear Gas Launch", "Tactical Command", "Vehicle Chase"],
    stats: { strength: 85, speed: 70, stealth: 40, resistance: 95 },
    unlocked: true,
    rarity: "rare"
  },
  {
    id: "protester-leader",
    name: "Freedom Fighter",
    type: "protester",
    description: "Charismatic leader rallying the masses for justice and change.",
    icon: <Megaphone className="h-8 w-8" />,
    abilities: ["Rally Cry", "Sign Shield", "Stone Throw", "Parkour Escape"],
    stats: { strength: 60, speed: 90, stealth: 75, resistance: 70 },
    unlocked: true,
    rarity: "common"
  },
  {
    id: "shadow-goon",
    name: "Shadow Reaper",
    type: "goon",
    description: "Mysterious operative with dark agenda and devastating combat skills.",
    icon: <Skull className="h-8 w-8" />,
    abilities: ["Stealth Strike", "Chaos Creation", "Loot Master", "Intimidation"],
    stats: { strength: 95, speed: 80, stealth: 100, resistance: 60 },
    unlocked: false,
    rarity: "legendary"
  }
];

const CharacterSelect = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [difficulty, setDifficulty] = useState<"easy" | "normal" | "hard" | "nightmare">("normal");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCharacterSelect = (character: Character) => {
    if (!character.unlocked) {
      toast({
        title: "Character Locked!",
        description: "Complete more missions or purchase NFT to unlock this character.",
        variant: "destructive"
      });
      return;
    }
    setSelectedCharacter(character);
  };

  const startGame = () => {
    if (!selectedCharacter) {
      toast({
        title: "Select a Character",
        description: "Choose your warrior before entering the battlefield!",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Entering the Battlefield!",
      description: `${selectedCharacter.name} is ready for action on ${difficulty} difficulty.`,
    });

    navigate("/game", { 
      state: { 
        character: selectedCharacter, 
        difficulty 
      } 
    });
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "bg-gray-500";
      case "rare": return "bg-blue-500";
      case "legendary": return "bg-gradient-nft";
      default: return "bg-gray-500";
    }
  };

  const getCharacterGradient = (type: string) => {
    switch (type) {
      case "police": return "bg-gradient-police";
      case "protester": return "bg-gradient-protester";
      case "goon": return "bg-gradient-goon";
      default: return "bg-gradient-game";
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-game">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-hero mb-4">Choose Your Fighter</h1>
          <p className="text-xl text-muted-foreground">
            Each character has unique abilities and challenges. Choose wisely.
          </p>
        </div>

        {/* Difficulty Selection */}
        <Card className="card-game mb-8 animate-bounce-in">
          <h3 className="text-game-title mb-4">Difficulty Level</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["easy", "normal", "hard", "nightmare"].map((level) => (
              <Button
                key={level}
                variant={difficulty === level ? "default" : "outline"}
                onClick={() => setDifficulty(level as any)}
                className={`capitalize ${difficulty === level ? "btn-hero" : "btn-game"}`}
              >
                {level}
              </Button>
            ))}
          </div>
        </Card>

        {/* Character Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {characters.map((character, index) => (
            <Card
              key={character.id}
              className={`card-character relative overflow-hidden ${
                selectedCharacter?.id === character.id ? "ring-4 ring-primary" : ""
              } ${!character.unlocked ? "opacity-60" : ""}`}
              onClick={() => handleCharacterSelect(character)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {!character.unlocked && (
                <div className="absolute top-2 right-2 z-10">
                  <Lock className="h-6 w-6 text-muted-foreground" />
                </div>
              )}

              <div className={`absolute inset-0 opacity-10 ${getCharacterGradient(character.type)}`} />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-primary">{character.icon}</div>
                  <Badge className={`${getRarityColor(character.rarity)} text-white`}>
                    <Star className="h-3 w-3 mr-1" />
                    {character.rarity}
                  </Badge>
                </div>

                <h3 className="text-character-name mb-2">{character.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {character.description}
                </p>

                {/* Stats */}
                <div className="space-y-3 mb-4">
                  {Object.entries(character.stats).map(([stat, value]) => (
                    <div key={stat}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="capitalize text-foreground">{stat}</span>
                        <span className="text-primary font-semibold">{value}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Abilities */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Special Abilities</h4>
                  <div className="flex flex-wrap gap-1">
                    {character.abilities.map((ability) => (
                      <Badge key={ability} variant="outline" className="text-xs">
                        {ability}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Selected Character Info */}
        {selectedCharacter && (
          <Card className="card-game mb-8 animate-bounce-in">
            <h3 className="text-game-title mb-4">Selected: {selectedCharacter.name}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Character Story</h4>
                <p className="text-muted-foreground">
                  {selectedCharacter.type === "police" 
                    ? "You are part of the elite force tasked with maintaining order. Your boss has given you specific instructions on handling the growing unrest. Use tactical equipment, deploy barriers, and coordinate with your team to control the situation."
                    : selectedCharacter.type === "protester"
                    ? "You fight for justice and change. Armed with nothing but determination and protest signs reading 'STOP KILLING US', you must navigate through obstacles, avoid police tactics, and rally others to your cause."
                    : "You operate in the shadows with your own agenda. Create chaos, exploit the situation for personal gain, and use your stealth abilities to outmaneuver both police and protesters."
                  }
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Mission Objectives</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {selectedCharacter.type === "police" 
                    ? ["Control riot zones", "Deploy tactical equipment", "Coordinate team movements", "Minimize casualties"]
                    : selectedCharacter.type === "protester"
                    ? ["Avoid police capture", "Rally support", "Navigate obstacles", "Spread awareness"]
                    : ["Create strategic chaos", "Exploit opportunities", "Evade all factions", "Maximize personal gain"]
                  }
                </ul>
              </div>
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={startGame}
            className="btn-hero px-12 py-4 text-lg"
            disabled={!selectedCharacter}
          >
            Start Mission
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/customize")}
            className="btn-game px-8 py-4"
          >
            Customize Character
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/multiplayer")}
            className="btn-game px-8 py-4"
          >
            Multiplayer Mode
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CharacterSelect;