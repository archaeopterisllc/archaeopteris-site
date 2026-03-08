export function Footer() {
  return (
    <footer className="py-8 bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Company Details */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center">
                <span className="text-primary font-bold text-sm">A</span>
              </div>
              <span className="text-sm font-medium text-foreground">Archaeopteris LLC</span>
            </div>
            <p className="text-sm text-muted-foreground">Wyoming, United States</p>
            <a 
              href="mailto:contact@archaeopteris.us" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              contact@archaeopteris.us
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Archaeopteris LLC. All rights reserved.
          </p>

          {/* Nav Links */}
          <nav className="flex items-center flex-wrap justify-center gap-x-6 gap-y-2">
            <a 
              href="#services" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Services
            </a>
            <a 
              href="#about" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </a>
            <a 
              href="#contact" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
            <a 
              href="/privacy" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="/terms" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
            <a 
              href="/disclaimer" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Disclaimer
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
