
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const EducationalContent = () => {
  const { language } = useLanguage();
  
  // Educational content in both languages
  const content = {
    en: {
      title: "Learn About Menstrual Health",
      description: "Important information about menstruation and self-care",
      tabs: {
        basics: "Basics",
        hygiene: "Hygiene",
        myths: "Myth Busting",
        resources: "Resources"
      },
      basics: [
        {
          title: "What is menstruation?",
          content: "Menstruation is a natural monthly process where the body prepares for pregnancy. If pregnancy doesn't occur, the lining of the uterus sheds through the vagina as blood. This typically lasts 3-7 days and occurs approximately every 28 days, although the time between periods can vary from person to person."
        },
        {
          title: "When do periods start?",
          content: "Most girls get their first period between ages 10-15. This first period is called menarche. It's completely normal if yours starts earlier or later. Before your first period, you might notice white or yellowish vaginal discharge, which is normal and healthy."
        },
        {
          title: "What to expect?",
          content: "During your period, you might experience symptoms like cramping, tender breasts, fatigue, and mood changes. These are normal but vary from person to person. You'll need to use menstrual products like pads, tampons, or menstrual cups to absorb the flow."
        }
      ],
      hygiene: [
        {
          title: "Keeping clean",
          content: "During your period, it's important to wash your genital area with mild soap and water at least once a day. Always wipe from front to back after using the toilet. Change your pad, tampon, or other menstrual product regularly (every 4-8 hours)."
        },
        {
          title: "Using pads",
          content: "Pads stick to your underwear and absorb menstrual flow. To use one, remove the backing strip and attach it to your underwear with the sticky side down. Make sure it's centered properly. Change your pad every 4-6 hours, or more often if it becomes full."
        },
        {
          title: "Disposing of products",
          content: "Never flush pads, tampons, or their wrappers down the toilet as they can cause blockages. Instead, wrap used products in toilet paper or their wrappers and place them in a bin. Many public restrooms have special disposal bins in each stall."
        }
      ],
      myths: [
        {
          title: "Myth: You can't shower during your period",
          content: "Truth: It's perfectly safe and hygienically recommended to shower or bathe during your period. In fact, warm showers can help relieve menstrual cramps and make you feel fresher."
        },
        {
          title: "Myth: Exercise is harmful during menstruation",
          content: "Truth: Exercise is actually beneficial during your period! Physical activity can help reduce cramps and improve your mood through the release of endorphins. Choose what feels comfortable for you."
        },
        {
          title: "Myth: Girls who have their period should be isolated",
          content: "Truth: There is absolutely no health reason to isolate menstruating girls or women. Menstruation is a normal, healthy biological process, not an illness or a source of impurity. Girls should continue with school, social activities, and daily life."
        }
      ]
    },
    am: {
      title: "ስለ ወር አበባ ጤና ይማሩ",
      description: "ስለ ወር አበባ እና ራስን መንከባከብ አስፈላጊ መረጃዎች",
      tabs: {
        basics: "መሰረታዊ",
        hygiene: "ንጽህና",
        myths: "አፍራሽ አመለካከቶች",
        resources: "ምንጮች"
      },
      basics: [
        {
          title: "ወር አበባ ምንድን ነው?",
          content: "ወር አበባ ሰውነት ለእርግዝና የሚዘጋጅበት ተፈጥሯዊ የወር ሂደት ነው። እርግዝና ካልተከሰተ፣ የማህጸን ውስጠኛ ክፍል በደም መልክ ይወጣል። ይህ በአብዛኛው ከ3-7 ቀናት ይቆያል እና በግምት በየ28 ቀናት ይከሰታል፣ ቢሆንም የወር አበባ መካከል ያለው ጊዜ ከሰው ወደ ሰው ሊለያይ ይችላል።"
        },
        {
          title: "ወር አበባ መቼ ይጀምራል?",
          content: "አብዛኛዎቹ ሴቶች የመጀመሪያ ወር አበባቸውን በ10-15 ዓመታቸው ይጀምራሉ። ይህ የመጀመሪያ ወር አበባ menarche ይባላል። የእርስዎ ቀደም ብሎ ወይም ዘግይቶ መጀመሩ ሙሉ በሙሉ ተፈጥሯዊ ነው። ከመጀመሪያ ወር አበባዎ በፊት፣ ነጭ ወይም ቢጫማ የሴት ብልት ፈሳሽ ሊያስተውሉ ይችላሉ፣ ይህም ተፈጥሯዊ እና ጤናማ ነው።"
        },
        {
          title: "ምን መጠበቅ እንደሚገባ?",
          content: "በወር አበባዎ ወቅት፣ እንደ ሆድ ማመም፣ የጡት ጫፍ መሸበት፣ ድካም እና የስሜት ለውጦች የመሳሰሉ ምልክቶችን ሊያጋጥሙዎት ይችላሉ። እነዚህ ተፈጥሯዊ ናቸው ግን ከሰው ወደ ሰው ይለያያሉ። የምርቱን ፍሰት ለመቆጣጠር የወር አበባ ፓድ፣ ታምፖን ወይም የወር አበባ ኩባያዎችን መጠቀም ያስፈልጋል።"
        }
      ],
      hygiene: [
        {
          title: "ንፁህ መሆን",
          content: "በወር አበባ ወቅት፣ የብልትዎን አካባቢ በቀለጠ ሳሙና እና ውሃ በቀን ቢያንስ አንድ ጊዜ ማጠብ አስፈላጊ ነው። ሽንት ቤት ከተጠቀሙ በኋላ ሁልጊዜ ከፊት ወደ ኋላ ይጠርጉ። ፓድዎን፣ ታምፖንዎን ወይም ሌላ የወር አበባ ምርትዎን በመደበኛነት ይቀይሩ (በየ 4-8 ሰዓታት)።"
        },
        {
          title: "ፓዶችን መጠቀም",
          content: "ፓዶች በሚስጥር ልብስዎ ላይ ይለጠፋሉ እና የወር አበባ ፍሰትን ይወስዳሉ። አንዱን ለመጠቀም፣ የኋላ ማሸጊያውን ያስወግዱ እና ፓዱን በሚስጥር ልብስዎ ላይ ከማጣበቂያው ጎን ጋር ያያይዙ። በአግባቡ መሃል ላይ መሆኑን ያረጋግጡ። ፓድዎን በየ 4-6 ሰዓታት ይቀይሩ፣ ወይም ከሞላ በተደጋጋሚ።"
        },
        {
          title: "ምርቶችን ማስወገድ",
          content: "ፓዶችን፣ ታምፖኖችን ወይም እነሱን የሚሸፍኑ ነገሮችን በሽንት ቤቱ አይጣሉ፣ መደፈን ሊያስከትሉ ይችላሉና። ይልቁንም ጥቅም ላይ የዋሉ ምርቶችን በሽንት ቤት ወረቀት ወይም የአዲስ ምርት እሽግ ይጠቀልሉ እና በቆሻሻ ማጠራቀሚያ ውስጥ ያስቀምጡ። ብዙ የህዝብ መጸዳጃ ቤቶች በየካቢናቸው ልዩ የማስወገጃ ማጠራቀሚያዎች ይኖራቸዋል።"
        }
      ],
      myths: [
        {
          title: "አፍራሽ አመለካከት: በወር አበባ ጊዜ መታጠብ አትችሉም",
          content: "እውነት: በወር አበባዎ ወቅት መታጠብ ወይም መታጠብ ሙሉ በሙሉ ደህንነቱ የተጠበቀ እና በንፅህና የሚመከር ነው። በእውነቱ፣ የሙቀት መታጠቢያዎች የወር አበባ ሆድ ህመምን ለማስታገስ እና የበለጠ ንጹህ እንዲሰማዎት ሊያደርጉ ይችላሉ።"
        },
        {
          title: "አፍራሽ አመለካከት: በወር አበባ ጊዜ መደበኛ ልምምድ ጎጂ ነው",
          content: "እውነት: በወር አበባዎ ወቅት መደበኛ ልምምድ በትክክል ጠቃሚ ነው! አካላዊ እንቅስቃሴ የሆድ ህመምን ለመቀነስ እና የስሜት መፈጠሪያ ሆርሞኖችን በማስለቀቅ የእርስዎን ስሜት ሊያሻሽል ይችላል። ለእርስዎ የሚመች ሆኖ የሚሰማዎትን ይምረጡ።"
        },
        {
          title: "አፍራሽ አመለካከት: ወር አበባ ያላቸው ልጃገረዶች መነጠል አለባቸው",
          content: "እውነት: የወር አበባ ያላቸውን ልጃገረዶች ወይም ሴቶችን ለመለየት ምንም የጤና ምክንያት የለም። የወር አበባ ተፈጥሯዊ እና ጤናማ የሆነ ስነ-ህይወታዊ ሂደት እንጂ በሽታ ወይም የእርክስ ምንጭ አይደለም። ልጃገረዶች ትምህርት ቤት፣ ማህበራዊ እንቅስቃሴዎች እና ዕለት ተዕለት ኑሮዋቸውን መቀጠል አለባቸው።"
        }
      ]
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-primary/10 rounded-t-lg">
        <CardTitle className="text-primary">{content[language].title}</CardTitle>
        <CardDescription>
          {content[language].description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="basics">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="basics">{content[language].tabs.basics}</TabsTrigger>
            <TabsTrigger value="hygiene">{content[language].tabs.hygiene}</TabsTrigger>
            <TabsTrigger value="myths">{content[language].tabs.myths}</TabsTrigger>
            <TabsTrigger value="resources">{content[language].tabs.resources}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basics" className="space-y-4">
            {content[language].basics.map((item, index) => (
              <div key={index}>
                <h3 className="font-medium text-lg">{item.title}</h3>
                <p className="text-muted-foreground">
                  {item.content}
                </p>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="hygiene" className="space-y-4">
            {content[language].hygiene.map((item, index) => (
              <div key={index}>
                <h3 className="font-medium text-lg">{item.title}</h3>
                <p className="text-muted-foreground">
                  {item.content}
                </p>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="myths" className="space-y-4">
            {content[language].myths.map((item, index) => (
              <div key={index}>
                <h3 className="font-medium text-lg">{item.title}</h3>
                <p className="text-muted-foreground">
                  {item.content}
                </p>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-4">
            <div>
              <h3 className="font-medium text-lg mb-2">
                {language === 'en' ? 'External Learning Resources' : 'ውጫዊ የመማሪያ ምንጮች'}
              </h3>
              <div className="grid gap-3">
                <a href="https://www.who.int/health-topics/menstruation" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-secondary/10 rounded-md hover:bg-secondary/20 transition-colors">
                  <span className="font-medium">
                    {language === 'en' ? 'World Health Organization - Menstruation' : 'የዓለም ጤና ድርጅት - የወር አበባ'}
                  </span>
                  <ExternalLink size={16} />
                </a>
                
                <a href="https://www.unfpa.org/menstruation" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-secondary/10 rounded-md hover:bg-secondary/20 transition-colors">
                  <span className="font-medium">
                    {language === 'en' ? 'UNFPA - Menstruation and human rights' : 'UNFPA - የወር አበባ እና የሰብዓዊ መብቶች'}
                  </span>
                  <ExternalLink size={16} />
                </a>
                
                <a href="https://www.unicef.org/ethiopia/reports/menstrual-hygiene-management-ethiopia" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-secondary/10 rounded-md hover:bg-secondary/20 transition-colors">
                  <span className="font-medium">
                    {language === 'en' ? 'UNICEF Ethiopia - Menstrual hygiene management' : 'ዩኒሴፍ ኢትዮጵያ - የወር አበባ ንጽህና አያያዝ'}
                  </span>
                  <ExternalLink size={16} />
                </a>
                
                <a href="https://www.plan-international.org/sexual-health/menstruation/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-secondary/10 rounded-md hover:bg-secondary/20 transition-colors">
                  <span className="font-medium">
                    {language === 'en' ? 'Plan International - Menstrual Health' : 'ፕላን ኢንተርናሽናል - የወር አበባ ጤና'}
                  </span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">
                {language === 'en' ? 'Local Ethiopian Resources' : 'የአካባቢ ኢትዮጵያዊ ምንጮች'}
              </h3>
              <div className="grid gap-3">
                <a href="https://www.lilypad.org.et" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-secondary/10 rounded-md hover:bg-secondary/20 transition-colors">
                  <span className="font-medium">
                    {language === 'en' ? 'Lily Pad Ethiopia - Menstrual Health Initiative' : 'ሊሊ ፓድ ኢትዮጵያ - የወር አበባ ጤና ተነሳሽነት'}
                  </span>
                  <ExternalLink size={16} />
                </a>
                
                <a href="https://www.ethiopianwomen.org" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-secondary/10 rounded-md hover:bg-secondary/20 transition-colors">
                  <span className="font-medium">
                    {language === 'en' ? 'Ethiopian Women\'s Association' : 'የኢትዮጵያ ሴቶች ማህበር'}
                  </span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EducationalContent;
