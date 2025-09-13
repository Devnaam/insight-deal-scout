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
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 animate-slide-up text-3d-xl">
            AI-Powered
            <span className="block text-accent animate-glow">Startup Evaluation</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto animate-slide-up font-medium">
            Transform hours of manual analysis into minutes of AI-driven insights. 
            Evaluate startups with the precision of top-tier investment firms.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-scale-in">
            <Button 
              size="xl" 
              variant="glass"
              onClick={onGetStarted}
              className="text-lg font-semibold shadow-elevated hover:shadow-glow"
            >
              Start Analysis <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="xl" 
              variant="outline"
              className="text-lg font-semibold border-accent/30 text-primary-foreground hover:bg-accent/10 hover:border-accent/50 terminal-border"
            >
              Watch Demo
            </Button>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fade-in">
            <div className="glass-panel p-8 rounded-2xl hover:shadow-glow transition-all duration-500 group">
              <Zap className="h-10 w-10 text-accent mb-6 mx-auto animate-float group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-primary-foreground mb-3 text-3d">Lightning Fast</h3>
              <p className="text-primary-foreground/80 font-medium">Complete analysis in under 5 minutes</p>
            </div>
            
            <div className="glass-panel p-8 rounded-2xl hover:shadow-glow transition-all duration-500 group">
              <TrendingUp className="h-10 w-10 text-accent mb-6 mx-auto animate-float group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-primary-foreground mb-3 text-3d">Market Insights</h3>
              <p className="text-primary-foreground/80 font-medium">Real-time benchmarking against industry data</p>
            </div>
            
            <div className="glass-panel p-8 rounded-2xl hover:shadow-glow transition-all duration-500 group">
              <Shield className="h-10 w-10 text-accent mb-6 mx-auto animate-float group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-primary-foreground mb-3 text-3d">Risk Assessment</h3>
              <p className="text-primary-foreground/80 font-medium">AI-driven red flag detection</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};