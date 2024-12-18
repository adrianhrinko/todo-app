import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Github, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-background border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-base">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-base">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-base">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-base">Connect</h3>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" aria-label="GitHub" className="hover:bg-muted">
                  <Github className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Twitter" className="hover:bg-muted">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="LinkedIn" className="hover:bg-muted">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Acme Inc. All rights reserved.
          </div>
        </div>
    </footer>
  );
}
