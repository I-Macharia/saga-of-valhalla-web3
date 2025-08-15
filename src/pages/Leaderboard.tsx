import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Medal, 
  Crown, 
  Star,
  TrendingUp,
  Users,
  Target,
  Zap,
  Shield,
  Swords
} from "lucide-react";

interface Player {
  id: string;
  username: string;
  score: number;
  character: "police" | "protester" | "goon";
  level: number;
  wins: number;
  gamesPlayed: number;
  avatar: string;
  verified: boolean;
  country: string;
}

const mockPlayers: Player[] = [
  {
    id: "1",
    username: "VikingWarrior",
    score: 125000,
    character: "police",
    level: 45,
    wins: 89,
    gamesPlayed: 102,
    avatar: "🛡️",
    verified: true,
    country: "🇺🇸"
  },
  {
    id: "2",
    username: "ProtestKing",
    score: 118500,
    character: "protester",
    level: 42,
    wins: 76,
    gamesPlayed: 95,
    avatar: "📢",
    verified: true,
    country: "🇬🇧"
  },
  {
    id: "3",
    username: "ShadowReaper",
    score: 112300,
    character: "goon",
    level: 40,
    wins: 82,
    gamesPlayed: 98,
    avatar: "💀",
    verified: false,
    country: "🇯🇵"
  },
  {
    id: "4",
    username: "JusticeSeeker",
    score: 95800,
    character: "protester",
    level: 38,
    wins: 65,
    gamesPlayed: 87,
    avatar: "✊",
    verified: true,
    country: "🇨🇦"
  },
  {
    id: "5",
    username: "TacticalOps",
    score: 89200,
    character: "police",
    level: 36,
    wins: 58,
    gamesPlayed: 79,
    avatar: "🚔",
    verified: true,
    country: "🇦🇺"
  }
];

const Leaderboard = () => {
  const [selectedTab, setSelectedTab] = useState("global");
  const [timeframe, setTimeframe] = useState("all-time");

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Medal className="h-6 w-6 text-amber-600" />;
      default: return <span className="text-lg font-bold text-muted-foreground">#{position}</span>;
    }
  };

  const getCharacterColor = (character: string) => {
    switch (character) {
      case "police": return "text-blue-500";
      case "protester": return "text-red-500";
      case "goon": return "text-purple-500";
      default: return "text-muted-foreground";
    }
  };

  const getWinRate = (wins: number, games: number) => {
    return games > 0 ? Math.round((wins / games) * 100) : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-game p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-hero">Leaderboard</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Blockchain-verified rankings of the greatest warriors
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="card-game text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-primary">12,847</h3>
            <p className="text-sm text-muted-foreground">Total Players</p>
          </Card>
          
          <Card className="card-game text-center">
            <Swords className="h-8 w-8 text-accent mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-accent">89,432</h3>
            <p className="text-sm text-muted-foreground">Battles Fought</p>
          </Card>
          
          <Card className="card-game text-center">
            <Target className="h-8 w-8 text-success mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-success">156,789</h3>
            <p className="text-sm text-muted-foreground">Total Score</p>
          </Card>
          
          <Card className="card-game text-center">
            <Zap className="h-8 w-8 text-warning mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-warning">2,345</h3>
            <p className="text-sm text-muted-foreground">Active Today</p>
          </Card>
        </div>

        {/* Timeframe Selection */}
        <Card className="card-game mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <h3 className="text-game-title">Ranking Period:</h3>
            <div className="flex gap-2">
              {["all-time", "monthly", "weekly", "daily"].map((period) => (
                <Button
                  key={period}
                  variant={timeframe === period ? "default" : "outline"}
                  onClick={() => setTimeframe(period)}
                  className={`capitalize ${timeframe === period ? "btn-hero" : "btn-game"}`}
                  size="sm"
                >
                  {period.replace("-", " ")}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Leaderboard Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="global">Global</TabsTrigger>
            <TabsTrigger value="police">Police</TabsTrigger>
            <TabsTrigger value="protester">Protesters</TabsTrigger>
            <TabsTrigger value="goon">Goons</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab}>
            {/* Top 3 Podium */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {mockPlayers.slice(0, 3).map((player, index) => (
                <Card 
                  key={player.id} 
                  className={`card-character text-center relative overflow-hidden ${
                    index === 0 ? "shadow-nft ring-2 ring-primary" : 
                    index === 1 ? "shadow-character" : "shadow-game"
                  }`}
                >
                  {index === 0 && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-nft h-2"></div>
                  )}
                  
                  <div className="relative z-10">
                    <div className="mb-4">
                      {getRankIcon(index + 1)}
                    </div>
                    
                    <div className="text-4xl mb-3">{player.avatar}</div>
                    
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <h3 className="text-character-name">{player.username}</h3>
                      {player.verified && (
                        <Badge className="bg-primary text-primary-foreground">
                          <Star className="h-3 w-3" />
                        </Badge>
                      )}
                      <span className="text-lg">{player.country}</span>
                    </div>
                    
                    <Badge className={`${getCharacterColor(player.character)} bg-background border mb-4`}>
                      {player.character}
                    </Badge>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Score:</span>
                        <span className="font-bold text-primary">{player.score.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Level:</span>
                        <span className="font-semibold">{player.level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Win Rate:</span>
                        <span className="font-semibold text-success">
                          {getWinRate(player.wins, player.gamesPlayed)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Detailed Rankings */}
            <Card className="card-game">
              <h3 className="text-game-title mb-6">Complete Rankings</h3>
              
              <div className="space-y-4">
                {mockPlayers.map((player, index) => (
                  <div 
                    key={player.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border transition-colors hover:bg-muted/50 ${
                      index < 3 ? "bg-card border-primary/20" : "bg-background border-border"
                    }`}
                  >
                    {/* Rank */}
                    <div className="w-12 text-center">
                      {index < 3 ? getRankIcon(index + 1) : (
                        <span className="text-lg font-bold text-muted-foreground">
                          #{index + 1}
                        </span>
                      )}
                    </div>

                    {/* Player Info */}
                    <div className="flex items-center gap-3 flex-1">
                      <div className="text-3xl">{player.avatar}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-foreground">{player.username}</h4>
                          {player.verified && (
                            <Badge className="bg-primary text-primary-foreground text-xs">
                              <Star className="h-3 w-3" />
                            </Badge>
                          )}
                          <span className="text-sm">{player.country}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`${getCharacterColor(player.character)} bg-background border text-xs`}>
                            {player.character}
                          </Badge>
                          <span className="text-xs text-muted-foreground">Level {player.level}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 text-center">
                      <div>
                        <div className="text-lg font-bold text-primary">{player.score.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Score</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-success">{getWinRate(player.wins, player.gamesPlayed)}%</div>
                        <div className="text-xs text-muted-foreground">Win Rate</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-foreground">{player.wins}</div>
                        <div className="text-xs text-muted-foreground">Wins</div>
                      </div>
                    </div>

                    {/* Trend Indicator */}
                    <div className="w-8">
                      <TrendingUp className="h-4 w-4 text-success" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Achievement Showcase */}
        <Card className="card-game mt-8">
          <h3 className="text-game-title mb-6 flex items-center gap-2">
            <Shield className="h-6 w-6 text-success" />
            Recent Achievements
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-3xl mb-2">🏆</div>
              <h4 className="font-semibold text-foreground">VikingWarrior</h4>
              <p className="text-sm text-muted-foreground">Reached Level 45</p>
              <Badge className="bg-success text-success-foreground mt-2">New Record</Badge>
            </div>
            
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-semibold text-foreground">ProtestKing</h4>
              <p className="text-sm text-muted-foreground">100 Win Streak</p>
              <Badge className="bg-primary text-primary-foreground mt-2">Legendary</Badge>
            </div>
            
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-3xl mb-2">⚡</div>
              <h4 className="font-semibold text-foreground">ShadowReaper</h4>
              <p className="text-sm text-muted-foreground">10,000 Total Score</p>
              <Badge className="bg-accent text-accent-foreground mt-2">Elite</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;