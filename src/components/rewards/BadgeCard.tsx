
import React from "react";
import { Badge as BadgeType } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, LockIcon } from "lucide-react";

interface BadgeCardProps {
  badge: BadgeType;
}

const BadgeCard = ({ badge }: BadgeCardProps) => {
  const { name, description, isUnlocked, points, category } = badge;
  
  return (
    <Card className={`overflow-hidden h-full flex flex-col transition-all duration-300 ${isUnlocked ? 'card-hover-effect border-primary/30' : 'opacity-70 border-dashed'}`}>
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
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${isUnlocked ? 'bg-primary/10' : 'bg-muted'}`}>
            {isUnlocked ? (
              <div className="text-3xl text-primary">
                {badge.icon === 'star' && <Star className="w-8 h-8" />}
                {badge.icon !== 'star' && <span>{badge.icon}</span>}
              </div>
            ) : (
              <LockIcon className="w-6 h-6 text-muted-foreground" />
            )}
          </div>
          <p className="text-sm text-center text-muted-foreground">
            {description}
          </p>
        </div>
      </CardContent>
      <CardFooter className={`bg-muted/30 text-xs ${isUnlocked ? 'text-primary' : 'text-muted-foreground'}`}>
        {isUnlocked ? "Achieved" : "Continue using Period Pal to unlock"}
      </CardFooter>
    </Card>
  );
};

export default BadgeCard;
