import React from "react";

const teamMembers = [
  {
    name: "Kanishka Pandey",
    role: "UI/UX Designer, AI Lead",
    experience:
      "With over 10 years of experience in digital marketing, Kanishka leverages his dual expertise as a UI/UX Designer and AI Lead to create intuitive interfaces and cutting-edge AI solutions. An alumnus of NIT Surathkal, he has participated in 12+ international hackathons, winning 3, which underscores his innovative approach and commitment to excellence.",
    image: "./src/assets/Images/kani.jpg",
    linkedin: "https://www.linkedin.com/in/kanishka-pandey-b0277b292/"
  },
  {
    name: "Urvashi Marmat",
    role: "Frontend Lead",
    experience:
      "With 7+ years of experience in project management and team leadership, Urvashi excels as a Frontend Lead by combining technical acumen with creative design. She is also the first track prize winner at NIT Surathkal, a testament to her innovative spirit and dedication.",
    image: "./src/assets/Images/Screenshot 2025-02-16 083643.png",
    linkedin: "https://www.linkedin.com/in/urvashi-marmat-b1b691290/"
  },
  {
    name: "Mufaddal Ratlamwala",
    role: "Backend Lead",
    experience:
      "With 5+ years of experience in backend development, Mufaddal is adept at building robust and scalable systems. His passion for innovation is further highlighted by his participation in 14+ hackathons, where he secured 3 wins.",
    image: "./src/assets/Images/Screenshot 2025-02-16 083123.png",
    linkedin: "https://www.linkedin.com/in/mufaddal-ratlamwala/"
  },
  {
    name: "Maneet Singh Chabra",
    role: "Backend Developer, Blockchain Developer",
    experience:
      "With 3+ years of experience in backend and blockchain development, Maneet specializes in creating secure and efficient decentralized solutions.",
    image: "./src/assets/Images/Screenshot 2025-02-16 083114.png",
    linkedin: "https://www.linkedin.com/in/maneet-singh-chhabra-b6bb35249/"
  }
];

const TeamSection = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 md:px-12">
      <h1 className="text-center text-2xl md:text-4xl lg:text-5xl text-orange-500 font-light leading-relaxed tracking-wide">
        PEOPLE BEHIND SKILLSENSIE
      </h1>
      <p className="text-center text-gray-700 mb-8">
        Meet the skilled and experienced team behind our successful digital marketing strategies
      </p>
      {/* Changed grid layout to 1 column on extra small screens and 2 columns on small screens and up */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="relative w-full bg-white shadow-lg rounded-xl p-6 border border-gray-200 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            {/* LinkedIn Badge on the Top Right Corner */}
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-2 right-2"
            >
              <div className="bg-black text-white w-7 h-7 flex items-center justify-center rounded-full shadow-md">
                <span className="text-orange-500 text-xs font-bold">in</span>
              </div>
            </a>
            <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
              <p className="text-gray-500 text-sm">{member.role}</p>
              <hr className="my-3 border-gray-300" />
              <p className="text-gray-600 text-sm">{member.experience}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
