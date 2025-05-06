
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EducationalContent = () => {
  return (
    <Card className="w-full">
      <CardHeader className="bg-primary/10 rounded-t-lg">
        <CardTitle className="text-primary">Learn About Menstrual Health</CardTitle>
        <CardDescription>
          Important information about menstruation and self-care
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="basics">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="hygiene">Hygiene</TabsTrigger>
            <TabsTrigger value="myths">Myth Busting</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basics" className="space-y-4">
            <div>
              <h3 className="font-medium text-lg">What is menstruation?</h3>
              <p className="text-muted-foreground">
                Menstruation is a natural monthly process where the body prepares for pregnancy. 
                If pregnancy doesn't occur, the lining of the uterus sheds through the vagina as blood.
                This typically lasts 3-7 days and occurs approximately every 28 days, although the time 
                between periods can vary from person to person.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg">When do periods start?</h3>
              <p className="text-muted-foreground">
                Most girls get their first period between ages 10-15. This first period is called menarche.
                It's completely normal if yours starts earlier or later. Before your first period, you might 
                notice white or yellowish vaginal discharge, which is normal and healthy.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg">What to expect?</h3>
              <p className="text-muted-foreground">
                During your period, you might experience symptoms like cramping, tender breasts, 
                fatigue, and mood changes. These are normal but vary from person to person. You'll need
                to use menstrual products like pads, tampons, or menstrual cups to absorb the flow.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="hygiene" className="space-y-4">
            <div>
              <h3 className="font-medium text-lg">Keeping clean</h3>
              <p className="text-muted-foreground">
                During your period, it's important to wash your genital area with mild soap and water 
                at least once a day. Always wipe from front to back after using the toilet. Change your
                pad, tampon, or other menstrual product regularly (every 4-8 hours).
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg">Using pads</h3>
              <p className="text-muted-foreground">
                Pads stick to your underwear and absorb menstrual flow. To use one, remove the backing 
                strip and attach it to your underwear with the sticky side down. Make sure it's centered 
                properly. Change your pad every 4-6 hours, or more often if it becomes full.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg">Disposing of products</h3>
              <p className="text-muted-foreground">
                Never flush pads, tampons, or their wrappers down the toilet as they can cause blockages.
                Instead, wrap used products in toilet paper or their wrappers and place them in a bin. 
                Many public restrooms have special disposal bins in each stall.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="myths" className="space-y-4">
            <div>
              <h3 className="font-medium text-lg">Myth: You can't shower during your period</h3>
              <p className="text-muted-foreground">
                <strong>Truth:</strong> It's perfectly safe and hygienically recommended to shower or bathe 
                during your period. In fact, warm showers can help relieve menstrual cramps and 
                make you feel fresher.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg">Myth: Exercise is harmful during menstruation</h3>
              <p className="text-muted-foreground">
                <strong>Truth:</strong> Exercise is actually beneficial during your period! Physical activity 
                can help reduce cramps and improve your mood through the release of endorphins. 
                Choose what feels comfortable for you.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg">Myth: Girls who have their period should be isolated</h3>
              <p className="text-muted-foreground">
                <strong>Truth:</strong> There is absolutely no health reason to isolate menstruating girls or women.
                Menstruation is a normal, healthy biological process, not an illness or a source of impurity. 
                Girls should continue with school, social activities, and daily life.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EducationalContent;
