import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  Coins, 
  ShoppingCart, 
  TrendingUp, 
  Filter,
  Search,
  Eye,
  Heart,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NFTItem {
  id: string;
  name: string;
  image: string;
  price: number;
  rarity: "common" | "rare" | "epic" | "legendary";
  category: "character" | "weapon" | "ability" | "collectible";
  seller: string;
  views: number;
  likes: number;
  inStock: number;
}

const mockNFTs: NFTItem[] = [
  {
    id: "1",
    name: "Elite Police Captain",
    image: "🛡️",
    price: 2.5,
    rarity: "legendary",
    category: "character",
    seller: "OfficerAlpha",
    views: 1250,
    likes: 89,
    inStock: 1
  },
  {
    id: "2",
    name: "Protest Leader's Megaphone",
    image: "📢",
    price: 0.8,
    rarity: "epic",
    category: "weapon",
    seller: "VoiceOfChange",
    views: 834,
    likes: 124,
    inStock: 5
  },
  {
    id: "3",
    name: "Shadow Goon Stealth Cloak",
    image: "🌑",
    price: 1.2,
    rarity: "rare",
    category: "ability",
    seller: "DarkOperative",
    views: 567,
    likes: 67,
    inStock: 3
  },
  {
    id: "4",
    name: "Golden Viking Helmet",
    image: "👑",
    price: 5.0,
    rarity: "legendary",
    category: "collectible",
    seller: "NorseLegend",
    views: 2100,
    likes: 245,
    inStock: 1
  },
  {
    id: "5",
    name: "Riot Shield of Justice",
    image: "🛡️",
    price: 0.5,
    rarity: "common",
    category: "weapon",
    seller: "ProtectorGuild",
    views: 445,
    likes: 32,
    inStock: 15
  },
  {
    id: "6",
    name: "Chaos Energy Boost",
    image: "⚡",
    price: 0.3,
    rarity: "common",
    category: "ability",
    seller: "PowerSource",
    views: 234,
    likes: 18,
    inStock: 20
  }
];

const NFTMarketplace = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRarity, setSelectedRarity] = useState("all");
  const { toast } = useToast();

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "bg-gray-500";
      case "rare": return "bg-blue-500";
      case "epic": return "bg-purple-500";
      case "legendary": return "bg-gradient-nft";
      default: return "bg-gray-500";
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case "legendary": return "shadow-nft";
      case "epic": return "shadow-character";
      default: return "";
    }
  };

  const filteredNFTs = mockNFTs.filter(nft => {
    const matchesSearch = nft.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = selectedTab === "all" || nft.category === selectedTab;
    const matchesRarity = selectedRarity === "all" || nft.rarity === selectedRarity;
    return matchesSearch && matchesTab && matchesRarity;
  });

  const handlePurchase = (nft: NFTItem) => {
    toast({
      title: "NFT Purchased!",
      description: `You successfully bought ${nft.name} for ${nft.price} ETH`,
    });
  };

  const handleLike = (nftId: string) => {
    toast({
      title: "Added to Wishlist",
      description: "NFT saved to your favorites!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-game p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-hero mb-4">NFT Marketplace</h1>
          <p className="text-xl text-muted-foreground">
            Trade rare characters, weapons, and collectibles on the blockchain
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="card-game mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search NFTs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value)}
                className="bg-background border border-border rounded-lg px-3 py-2 text-foreground"
              >
                <option value="all">All Rarities</option>
                <option value="common">Common</option>
                <option value="rare">Rare</option>
                <option value="epic">Epic</option>
                <option value="legendary">Legendary</option>
              </select>
              
              <Button variant="outline" className="btn-game">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Category Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="character">Characters</TabsTrigger>
            <TabsTrigger value="weapon">Weapons</TabsTrigger>
            <TabsTrigger value="ability">Abilities</TabsTrigger>
            <TabsTrigger value="collectible">Collectibles</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredNFTs.map((nft, index) => (
                <Card 
                  key={nft.id} 
                  className={`card-character relative overflow-hidden ${getRarityGlow(nft.rarity)}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Rarity indicator */}
                  <div className="absolute top-3 right-3 z-10">
                    <Badge className={`${getRarityColor(nft.rarity)} text-white`}>
                      <Star className="h-3 w-3 mr-1" />
                      {nft.rarity}
                    </Badge>
                  </div>

                  {/* NFT Image */}
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-2">{nft.image}</div>
                    <h3 className="text-character-name">{nft.name}</h3>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{nft.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      <span>{nft.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>{nft.inStock} left</span>
                    </div>
                  </div>

                  {/* Price and seller */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-primary flex items-center gap-1">
                        <Coins className="h-5 w-5" />
                        {nft.price} ETH
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Sold by: <span className="text-foreground font-medium">{nft.seller}</span>
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <Button 
                      className="btn-nft flex-1"
                      onClick={() => handlePurchase(nft)}
                      disabled={nft.inStock === 0}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {nft.inStock === 0 ? "Sold Out" : "Buy Now"}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleLike(nft.id)}
                      className="btn-game w-10 h-10 p-0"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {filteredNFTs.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No NFTs Found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Trending Section */}
        <Card className="card-game">
          <h3 className="text-game-title mb-6 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-success" />
            Trending This Week
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">👑</div>
              <h4 className="font-semibold text-foreground">Golden Viking Helmet</h4>
              <p className="text-sm text-muted-foreground">+340% price increase</p>
              <Badge className="bg-success text-success-foreground mt-2">Hot</Badge>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-2">🛡️</div>
              <h4 className="font-semibold text-foreground">Elite Police Gear</h4>
              <p className="text-sm text-muted-foreground">Most traded this week</p>
              <Badge className="bg-primary text-primary-foreground mt-2">Popular</Badge>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-2">⚡</div>
              <h4 className="font-semibold text-foreground">Power Abilities</h4>
              <p className="text-sm text-muted-foreground">High demand items</p>
              <Badge className="bg-accent text-accent-foreground mt-2">Rising</Badge>
            </div>
          </div>
        </Card>

        {/* Create NFT CTA */}
        <div className="text-center mt-12">
          <Card className="card-game max-w-2xl mx-auto">
            <h3 className="text-game-title mb-4">Create Your Own NFT</h3>
            <p className="text-muted-foreground mb-6">
              Turn your in-game achievements into valuable NFTs. Mint unique items, characters, and abilities.
            </p>
            <Button className="btn-hero">
              <Zap className="h-4 w-4 mr-2" />
              Start Creating
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NFTMarketplace;