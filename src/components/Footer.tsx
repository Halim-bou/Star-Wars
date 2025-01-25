import React from 'react';
import { Github, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Developer Contact</h3>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/Halim-bou"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-yellow-400 transition-colors"
              >
                <Github className="h-5 w-5 mr-2" />
                <span>Halim-bou</span>
              </a>
              <a
                href="hbouaami@gmail.com"
                className="flex items-center hover:text-yellow-400 transition-colors"
              >
                <Mail className="h-5 w-5 mr-2" />
                <span>hbouaami@gmail.com</span>
              </a>
            </div>
            <p className="mt-2">Created by Abdelhalim Elbouaami</p>
          </div>
          <div className="text-sm text-gray-400">
            <p>This is a fan-studie-made website.</p>
            <p>Star Wars and all associated names are copyright Lucasfilm Ltd.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;