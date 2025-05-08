
import React from "react";
import { Badge as BadgeType } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, LockIcon, Search } from "lucide-react";

interface BadgeCardProps {
  badge: BadgeType;
}

const BadgeCard = ({ badge }: BadgeCardProps) => {
  const { name, description, isUnlocked, points, category } = badge;
  
  return (
    <Card className={`overflow-hidden h-full flex flex-col transition-all duration-300 ${
      isUnlocked 
        ? 'card-hover-effect border-primary/30 bg-primary/5' 
        : 'opacity-80 border-dashed bg-muted/50'
    }`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className={`text-lg ${isUnlocked ? 'text-primary' : 'text-muted-foreground'}`}>
            {name}
          </CardTitle>
          <Badge variant={isUnlocked ? "default" : "outline"} className="ml-2">
            {isUnlocked ? `+${points} pts` : "Locked"}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-2 text-xs">
          <span className="capitalize">{category}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4 flex-grow">
        <div className="flex flex-col items-center justify-center py-4">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${
            isUnlocked 
              ? 'bg-primary/20' 
              : 'bg-muted'
          }`}>
            {isUnlocked ? (
              <div className="text-4xl text-primary">
                {badge.icon === 'star' && <Star className="w-12 h-12" />}
                {badge.icon === '🔍' && <Search className="w-12 h-12" />}
                {badge.icon !== 'star' && badge.icon !== '🔍' && <span className="text-4xl">{badge.icon}</span>}
              </div>
            ) : (
              <LockIcon className="w-10 h-10 text-muted-foreground" />
            )}
          </div>
          <p className="text-sm text-center text-muted-foreground">
            {description}
          </p>
        </div>
      </CardContent>
      <CardFooter className={`bg-muted/50 text-xs ${isUnlocked ? 'text-primary' : 'text-muted-foreground'}`}>
        {isUnlocked ? "Achieved" : "Continue using Period Pal to unlock"}
      </CardFooter>
    </Card>
  );
};

export default BadgeCard;
