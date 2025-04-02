"use client";
import { useState, useRef } from "react";
import Image from "next/image";
    
export default function Footer() {
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current); // Clears timeouts
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        // Adds a delay before hiding
        timeoutRef.current = setTimeout(() => setIsHovered(false), 200);
    };

return(
    <footer className="w-full p-4 text-white">
      <div className="z-10 flex gap-6 flex-wrap items-center justify-center p-4 text-white w-full">
      <a
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
          href="https://github.com/Gsus-tech"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/github.svg"
            alt="GitHub icon"
            width={20}
            height={20}
          />
          GitHub
        </a>

        <a
          className="z-10 flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
          href="https://www.linkedin.com/in/jesus-morales-villar-0777a3242/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/linkedin.svg"
            alt="LinkedIn icon"
            width={20}
            height={20}
          />
          LinkedIn
        </a>

        <div className="z-10 relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {/* Other Sites Button */}
        <a
            className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
            target="_blank"
            rel="noopener noreferrer"
        >
            <Image aria-hidden src="/website.svg" alt="Website icon" width={20} height={20} />
            Other Sites
        </a>

        {/* Other Sites Images Preview Container */}
        {isHovered && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-auto p-4 bg-gray-300 border border-gray-600 rounded-lg shadow-lg">
              {/* <h3 className="font-semibold text-gray-800 mb-2">Preview Sites</h3> */}
              <div className="flex gap-4">
                {/* Portfolio preview */}
                <div className="cursor-pointer relative w-20 h-20 bg-gray-600 rounded-lg overflow-hidden transition-transform duration-250 hover:scale-120 group">
                    <a
                    href="https://morales-tech.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    >
                    <Image
                        src="/main-site.webp"
                        alt="Site Preview"
                        fill
                        className="object-cover rounded-lg transition-transform duration-300 hover:scale-110"
                        sizes="80px"
                    />
                    </a>

                    {/* Tooltip (appears on hover, fixed position) */}
                    <span className="pointer-events-none fixed left-1/2 transform -translate-x-1/2 p-1 px-2 w-auto text-xs text-gray-800 bg-gradient-to-t from-gray-200 to-gray-300 rounded-lg shadow-md opacity-0 visibility-hidden group-hover:opacity-100 group-hover:visibility-visible transition-opacity duration-300 ease-in-out">
                        Portfolio
                    </span>
                </div>

                <div className="cursor-pointer relative w-20 h-20 bg-gray-600 rounded-lg overflow-hidden transition-transform duration-250 hover:scale-120 group">
                    <a
                    href="https://todo-full-web.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    >
                    <Image
                        src="/todo-app.webp"
                        alt="Site Preview"
                        fill
                        className="object-cover rounded-lg transition-transform duration-300 hover:scale-110"
                        sizes="80px"
                    />
                    </a>

                    {/* Tooltip (appears on hover, fixed position) */}
                    <span className="pointer-events-none fixed left-1/2 transform -translate-x-1/2 p-1 px-2 w-auto text-xs text-gray-800 bg-gradient-to-t from-gray-200 to-gray-300 rounded-lg shadow-md opacity-0 visibility-hidden group-hover:opacity-100 group-hover:visibility-visible transition-opacity duration-300 ease-in-out">
                        ToDo App
                    </span>
                </div>
                
              </div>
            </div>
        )}
        </div>
        </div>
        
        <div className="z-10 flex justify-end items-end mt-4">
          <p className="text-sm text-gray-400 text-right">
            Created with Next.js, styled with Tailwind CSS, and deployed using GCP <br />
            Developed by 
            <a href="https://morales-tech.net" className="text-blue-500 hover:underline cursor-pointer"> morales-tech.net</a>
          </p>
        </div>
      </footer>
    );
}