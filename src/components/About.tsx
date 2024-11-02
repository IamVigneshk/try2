import React, { useState } from 'react';
import { Shield, Book, School, User, Github } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  github: string;
  contributions: string[];
}

export default function About() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const teamMembers: TeamMember[] = [
    {
      name: 'Vignesh',
      role: 'Project Lead & Designer',
      github: 'https://github.com/IamVigneshk',
      contributions: [
        'Led overall project architecture and design',
        'Implemented core security scanning modules',
        'Designed user interface and experience',
        'Managed project development lifecycle'
      ]
    },
    {
      name: 'Suneel',
      role: 'Security Researcher & Developer',
      github: 'https://github.com/suneelnalla',
      contributions: [
        'Developed vulnerability assessment modules',
        'Implemented security testing features',
        'Conducted security research and analysis',
        'Backend system architecture'
      ]
    },
    {
      name: 'Jagadish',
      role: 'Frontend Developer',
      github: '#',
      contributions: [
        'Built responsive user interfaces',
        'Implemented frontend features',
        'Created interactive components',
        'UI/UX optimizations'
      ]
    },
    {
      name: 'Yatish',
      role: 'Developer & Tester',
      github: '#',
      contributions: [
        'Quality assurance and testing',
        'Bug fixing and optimization',
        'Feature implementation',
        'Performance testing'
      ]
    }
  ];

  return (
    <div id="about" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            About The Project
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto">
            Academic Capstone Project in Cybersecurity
          </p>
        </div>

        <div className="mt-16">
          <div className="bg-gray-800 rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-700 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <School className="h-5 w-5 text-cyan-500" />
                  Institution
                </h4>
                <p className="text-gray-300">
                  Vellore Institute of Technology, Andhra Pradesh (VITAP)
                </p>
              </div>
              <div className="bg-gray-700 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-cyan-500" />
                  Faculty Mentor
                </h4>
                <p className="text-gray-300">
                  Prof. Sibi Chakravarty
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-6">Development Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="bg-gray-700 rounded-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-gray-600"
                  onClick={() => setSelectedMember(member)}
                >
                  <h4 className="text-lg font-semibold text-white">{member.name}</h4>
                  <p className="text-gray-400">{member.role}</p>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-400"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                </div>
              ))}
            </div>

            <div className="bg-gray-700 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Book className="h-5 w-5 text-cyan-500" />
                Project Overview
              </h4>
              <p className="text-gray-300 mb-4">
                This project represents a comprehensive academic endeavor in cybersecurity, developed as a capstone project at VITAP. It demonstrates practical application of security concepts through automated attack surface analysis and vulnerability assessment.
              </p>
              <p className="text-gray-300">
                The platform integrates multiple security modules to provide a holistic approach to cybersecurity assessment, making it valuable for both educational purposes and practical security testing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Member Details Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div
              className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75"
              onClick={() => setSelectedMember(null)}
            />
            
            <div className="relative inline-block w-full max-w-lg p-6 overflow-hidden text-left align-middle transition-all transform bg-gray-800 rounded-lg shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">{selectedMember.name}</h3>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-lg text-cyan-500">{selectedMember.role}</p>
                <a
                  href={selectedMember.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-400"
                >
                  <Github className="h-4 w-4" />
                  View GitHub Profile
                </a>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Contributions</h4>
                <ul className="space-y-2">
                  {selectedMember.contributions.map((contribution, index) => (
                    <li key={index} className="text-gray-300 flex items-start gap-2">
                      <span className="text-cyan-500">•</span>
                      {contribution}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}