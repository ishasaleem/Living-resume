import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "typewriter-effect";
import { projects } from "../data/projects";
import { skillsByRole } from "../data/skills";
import { resumesByRole } from "../data/resumes";
import SkillSlider from "../components/SkillSlider";
import ProjectCard from "../components/ProjectCard";
import ResumeSections from "../components/ResumeSections";
import { educationData, experienceData, achievementsData } from "../data/data";

/* ================= ANIMATIONS ================= */

const float = {
  animate: {
    y: [0, -15, 0],
    rotate: [0, 1, -1, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const card = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", bounce: 0.3, duration: 0.7 },
  },
};

export default function ResumeView() {
  const [role, setRole] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState([]);

  // Combine all skills for "general" view
  const getAllSkills = () => {
    const all = [
      ...(skillsByRole.frontend || []),
      ...(skillsByRole.automation || []),
      ...(skillsByRole.general || []),
    ];

    return all.filter(
      (skill, index, self) =>
        index === self.findIndex((s) => s.name === skill.name)
    );
  };

  // Skills per role
  const skills =
    role === "frontend"
      ? skillsByRole.frontend || []
      : role === "automation"
      ? skillsByRole.automation || []
      : getAllSkills();

  // Filter projects by role
  const roleFilteredProjects = projects.filter((p) => {
    if (role === "frontend")
      return ["Frontend", "Full Stack"].includes(p.category);
    if (role === "automation")
      return ["Automation", "Full Stack"].includes(p.category);
    return true;
  });

  // Count skill usage across filtered projects
  const skillsWithUsage = skills.map((skill) => {
    const count = roleFilteredProjects.filter(
      (p) => p.technologies?.includes(skill.name)
    ).length;
    return { ...skill, count };
  });

  // Filter projects based on selected skill safely
  useEffect(() => {
    if (!selectedSkill) {
      setFilteredProjects(roleFilteredProjects);
    } else {
      setFilteredProjects(
        roleFilteredProjects.filter(
          (p) =>
            p.technologies && Array.isArray(p.technologies)
              ? p.technologies.includes(selectedSkill)
              : false
        )
      );
    }
  }, [role, selectedSkill]);

  return (
    <div className="relative min-h-screen px-6 py-16 mx-auto overflow-hidden max-w-7xl">

      {/* BACKGROUND GRADIENT */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "200% 200%" }}
        />
      </div>

      {/* HERO */}
      <AnimatePresence>
        {!role && (
          <motion.section
            className="flex flex-col items-center justify-center min-h-screen text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.h1
              className="mb-6 text-6xl font-black text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text"
              {...float}
            >
              Isha Saleem - Living Resume
            </motion.h1>

            <p className="mb-10 text-lg text-gray-600">
              <Typewriter
                options={{
                  strings: [
                    "I build engaging frontend apps…",
                    "I automate workflows efficiently…",
                    "I solve real-world problems…",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              {[
                { label: "Frontend Wizard ✨", value: "frontend" },
                { label: "Automation Brain 🤖", value: "automation" },
                { label: "Full Overview 🌟", value: "general" },
              ].map((btn) => (
                <motion.button
                  key={btn.value}
                  whileHover={{ scale: 1.08 }}
                  onClick={() => {
                    setRole(btn.value);
                    setSelectedSkill(null);
                  }}
                  className="px-10 py-4 text-lg font-bold text-white shadow-xl rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                >
                  {btn.label}
                </motion.button>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* MAIN */}
      {role && (
        <>
          {/* Header */}
          <motion.h2
            className="my-16 text-4xl font-black text-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {role.toUpperCase()} MODE ACTIVATED 🚀
          </motion.h2>

          {/* ROLE RESUME */}
          <motion.section className="p-8 mb-16 border shadow-lg bg-white/70 backdrop-blur-lg rounded-xl">
            <h3 className="mb-4 text-3xl font-bold">
              {resumesByRole[role]?.title}
            </h3>

            <p className="mb-6 text-gray-600">{resumesByRole[role]?.summary}</p>

            <ul className="mb-6 space-y-2">
              {resumesByRole[role]?.highlights.map((item, index) => (
                <li key={index}>✅ {item}</li>
              ))}
            </ul>

            <a
              href={resumesByRole[role]?.downloadLink}
              download
              className="inline-block px-8 py-3 font-bold text-white rounded-lg shadow-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            >
              Download Resume 📄
            </a>
          </motion.section>

          {/* SKILLS */}
          <section className="mb-20">
            <h3 className="mb-8 text-3xl font-bold text-center">Core Skills</h3>

            <motion.div
              className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {skillsWithUsage.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={card}
                  whileHover={{ y: -6, scale: 1.03 }}
                  className={`h-full p-4 bg-white/60 backdrop-blur-lg border shadow-md rounded-xl cursor-pointer ${
                    selectedSkill === skill.name ? "ring-4 ring-indigo-400" : ""
                  }`}
                  onClick={() =>
                    setSelectedSkill(
                      selectedSkill === skill.name ? null : skill.name
                    )
                  }
                >
                  <SkillSlider
                    name={skill.name}
                    level={skill.level}
                    usageCount={skill.count}
                  />
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* PROJECTS */}
          <section className="mb-24">
            <h3 className="mb-8 text-3xl font-bold">Projects</h3>

            <div className="grid gap-10 md:grid-cols-2">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={card}
                  whileHover={{ y: -6 }}
                  className="p-6 border shadow-lg bg-white/70 backdrop-blur-lg rounded-xl"
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </section>

          {/* RESUME SECTIONS */}
          <ResumeSections
            educationData={educationData}
            experienceData={experienceData}
            achievementsData={achievementsData}
          />
          <section className="py-20 text-center">
  <h3 className="mb-6 text-4xl font-black">Want to explore my full portfolio?</h3>
  <p className="mb-6 text-gray-600">
    My interactive resume highlights key skills and experience — and my full portfolio showcases detailed project work.
  </p>
  <a
    href="https://ishasaleemportfolio-c35mcy8mj-ishasaleems-projects.vercel.app/"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block px-10 py-4 text-xl font-bold text-white transition-transform rounded-full shadow-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105"
  >
    View Full Portfolio 🚀
  </a>
</section>

        </>

      )}
    </div>
    
  );
  
}
