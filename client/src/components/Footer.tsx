import { BookOpen } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-surface py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-heading font-bold text-xl">SatQuery AI</span>
          </div>
          <p className="text-textMuted max-w-xs">
            Smart, personalized education for every child. Built for SIH 2026.
          </p>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-4">Platform</h4>
          <ul className="space-y-2 text-sm text-textMuted">
            <li><a href="#" className="hover:text-primary">Features</a></li>
            <li><a href="#" className="hover:text-primary">Pricing</a></li>
            <li><a href="#" className="hover:text-primary">About Us</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-textMuted">
            <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
            <li><a href="#" className="hover:text-primary">Parental Consent</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t text-center text-sm text-textMuted">
        &copy; 2026 Team IdeaIgniters. <span className="text-primary font-bold">Created by Harsha Kudupudi.</span> All rights reserved.
      </div>
    </footer>
  );
}
