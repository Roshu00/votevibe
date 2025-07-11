"use client";

import { Vote, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Container } from "./ui/container";

export function Header() {
  return (
    <header className="py-6">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Vote className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">VoteVibe</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Contact
            </a>
            <Button variant="default" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-8">
                  <a
                    href="#features"
                    className="text-lg font-medium hover:text-blue-600 transition-colors"
                  >
                    Features
                  </a>
                  <a
                    href="#about"
                    className="text-lg font-medium hover:text-blue-600 transition-colors"
                  >
                    About
                  </a>
                  <a
                    href="#contact"
                    className="text-lg font-medium hover:text-blue-600 transition-colors"
                  >
                    Contact
                  </a>
                  <Button variant="default" className="mt-4">
                    Get Started
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </Container>
    </header>
  );
}
