import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, TrendingUp, Shield } from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero"></div>
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-slide-up">
            AI-Powered
            <span className="block text-accent">Startup Evaluation</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto animate-slide-up">
            Transform hours of manual analysis into minutes of AI-driven insights. 
            Evaluate startups with the precision of top-tier investment firms.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-scale-in">
            <Button 
              size="xl" 
              variant="glass"
              onClick={onGetStarted}
              className="text-lg"
            >
              Start Analysis <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="xl" 
              variant="outline"
              className="text-lg border-white/30 text-primary-foreground hover:bg-white/10"
            >
              Watch Demo
            </Button>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in">
            <div className="glass-card p-6 rounded-xl">
              <Zap className="h-8 w-8 text-accent mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-primary-foreground mb-2">Lightning Fast</h3>
              <p className="text-primary-foreground/80">Complete analysis in under 5 minutes</p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <TrendingUp className="h-8 w-8 text-accent mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-primary-foreground mb-2">Market Insights</h3>
              <p className="text-primary-foreground/80">Real-time benchmarking against industry data</p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <Shield className="h-8 w-8 text-accent mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-primary-foreground mb-2">Risk Assessment</h3>
              <p className="text-primary-foreground/80">AI-driven red flag detection</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};