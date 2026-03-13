import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { 
  User, 
  BookOpen, 
  Briefcase, 
  Stethoscope, 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  ChevronRight,
  Menu,
  X,
  Languages,
  Activity,
  Award,
  ArrowRight,
  ChevronDown,
  Send,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react'

// ── EmailJS Config ──────────────────────────────────────────────
// Replace these with your actual EmailJS values from emailjs.com
const EMAILJS_SERVICE_ID  = 'service_9tegoy8'   // ✅ Updated to latest from screenshot
const EMAILJS_TEMPLATE_ID = 'template_sbjvd89'  // ✅ from template page screenshot
const EMAILJS_PUBLIC_KEY  = 'vX2iv0IV07K9I-Jgr'   // ✅ provided by user
// ───────────────────────────────────────────────────────────────

// Animation Variants
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 1, 0.5, 1],
      staggerChildren: 0.1
    } 
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

// Wrapper for Section with "Page Turn" animation on scroll
const AnimatedSection = ({ children, id, className }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  
  return (
    <motion.section
      id={id}
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`py-12 lg:py-20 flex flex-col justify-center ${className}`}
    >
      {children}
    </motion.section>
  )
}

// Top slogan — plain text at the very top
const TopBanner = () => (
  <div className="w-full bg-white flex items-center justify-center gap-3 pt-6 pb-2">
    <Heart size={14} className="text-medical-600 flex-shrink-0" fill="currentColor" />
    <p className="text-slate-800 text-sm md:text-base font-black uppercase tracking-[0.25em] text-center mb-0 leading-none">
      Let's Save a Life, Together
    </p>
    <Heart size={14} className="text-medical-600 flex-shrink-0" fill="currentColor" />
  </div>
)

// Components
const Navbar = ({ isVisible }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-2' : 'bg-white py-4'}`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-8 h-8 bg-medical-600 rounded-lg flex items-center justify-center text-white">
              <Activity size={20} />
            </div>
            <span className="text-lg font-black text-slate-900 tracking-tight">Mei<span className="text-medical-600">Portfolio</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-medical-600 transition-colors">
                {link.name}
              </a>
            ))}
            <a href="#contact" className="btn-primary py-2 px-6 text-[10px] uppercase tracking-widest">
              Contact
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            type="button"
            className="lg:hidden w-10 h-10 flex items-center justify-center bg-slate-100 rounded-lg text-slate-800"
            onClick={(e) => {
              e.preventDefault()
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-white z-[200] lg:hidden flex flex-col overflow-y-auto pb-8"
          >
            {/* Header */}
            <div className="flex justify-between items-center py-5 px-6 mt-2">
               <span className="text-lg font-black text-slate-800">Navigation</span>
               <button 
                 type="button" 
                 onClick={(e) => {
                   e.preventDefault();
                   setIsMobileMenuOpen(false);
                 }} 
                 className="p-2 bg-slate-50 rounded-lg text-slate-600 shadow-sm"
               >
                 <X size={20} />
               </button>
            </div>
            
            {/* Menu Links */}
            <div className="flex flex-col border-t border-slate-100">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[1.05rem] font-extrabold text-[#5a1c24] py-5 px-6 border-b border-red-50 hover:bg-slate-50 hover:text-medical-600 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Bottom Button */}
            <div className="mt-8 px-6">
              <a 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="w-full bg-medical-600 text-white rounded-xl flex items-center justify-center py-4 text-sm tracking-widest uppercase font-black shadow-lg shadow-medical-600/20"
              >
                Send Message
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const Landing = () => {
  return (
    <section className="relative flex flex-col items-center justify-start overflow-hidden bg-white pb-12 lg:pb-24 pt-8 lg:pt-16">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q25,0 50,50 T100,50" fill="none" stroke="#ef4444" strokeWidth="0.5" />
          <path d="M0,60 Q25,10 50,60 T100,60" fill="none" stroke="#ef4444" strokeWidth="0.2" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto w-full px-6 md:px-10 lg:px-16 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center z-10">
        <div className="text-center lg:text-left order-2 lg:order-1">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="text-medical-600 font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4"
          >
            Meiyazhagan R — Registered Nurse Professional
          </motion.h2>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-tight tracking-tight mb-8"
          >
            Compassion <br/>In <span className="text-medical-600">Care.</span> 
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-slate-500 font-bold text-sm md:text-lg mb-10 max-w-xl self-center lg:self-start uppercase tracking-widest"
          >
            "Excellence in Nursing through clinical precision and heart-led service."
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#about" 
              className="btn-primary px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl"
            >
              Discover Identity
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf" 
              download 
              className="btn-secondary px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em]"
            >
              Access Resume
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-1 lg:order-2 flex justify-center"
        >
          <div className="w-64 h-64 md:w-[500px] md:h-[500px] rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(239,68,68,0.2)] bg-slate-50 border-[20px] border-white">
            <img 
              src="/mei 2.webp" 
              alt="Meiyazhagan R" 
              className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-1000"
            />
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-medical-600 to-transparent" />
      </motion.div>
    </section>
  )
}

const About = () => {
  return (
    <AnimatedSection id="about" className="bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto w-full px-6 md:px-10 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image LEFT */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/5]">
              <img src="/mei.jpeg" className="w-full h-full object-cover object-top" />
              {/* Overlay bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent p-8">
                <p className="text-white font-black text-lg uppercase tracking-tight">Meiyazhagan R</p>
                <p className="text-medical-400 text-[10px] font-black uppercase tracking-widest">BSc Nursing Graduate</p>
              </div>
            </div>
            {/* Floating stat badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -top-6 -right-6 bg-medical-600 text-white px-6 py-5 rounded-3xl shadow-2xl"
            >
              <p className="text-4xl font-black leading-none">4+</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-white/70 mt-1">Yrs Training</p>
            </motion.div>
          </motion.div>

          {/* Content RIGHT */}
          <motion.div variants={itemVariants} className="flex flex-col gap-8">
            <div>
              <span className="inline-flex items-center gap-2 text-[10px] font-black text-medical-600 uppercase tracking-widest mb-5">
                <span className="w-8 h-px bg-medical-600" /> Professional Identity
              </span>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-6">
                Dedicated to <span className="text-medical-600">Compassionate</span> Patient Care
              </h3>
              <p className="text-slate-500 leading-relaxed font-medium text-base">
                A passionate and dedicated BSc Nursing graduate, committed to delivering excellence in clinical care. Proven ability to thrive in high-pressure environments, manage emergency protocols, and build trust with patients and teams.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { num: "4+", label: "Years\nTraining" },
                { num: "3", label: "Hospital\nInternships" },
                { num: "100%", label: "Dedication\nto Care" },
              ].map((s, i) => (
                <div key={i} className="p-5 bg-slate-50 rounded-2xl text-center border border-slate-100 hover:border-medical-600 hover:bg-medical-50 transition-all">
                  <p className="text-2xl font-black text-medical-600 mb-1">{s.num}</p>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest whitespace-pre-line leading-tight">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <MapPin size={16}/>, label: "Based In", val: "Salem, Tamil Nadu" },
                { icon: <Briefcase size={16}/>, label: "Working At", val: "GKNM Hospital, CBE" },
              ].map((box, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-medical-600 transition-colors">
                  <div className="w-9 h-9 bg-medical-50 text-medical-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-medical-600 group-hover:text-white transition-all">{box.icon}</div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{box.label}</p>
                    <p className="font-bold text-slate-800 text-xs">{box.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}

const Education = () => {
  const steps = [
    { title: "BSc Nursing", sub: "Sresakthimayeil Institute", date: "2020 – 2025", loc: "Namakkal" },
    { title: "HSC", sub: "S.K.T Matric Higher Sec", date: "2019 – 2020", loc: "Score: 54%" },
    { title: "SSLC", sub: "S.K.T Matric Higher Sec", date: "2017 – 2018", loc: "Score: 83%" },
  ]

  return (
    <AnimatedSection id="education" className="bg-white">
      <div className="max-w-6xl mx-auto w-full px-6 md:px-10 lg:px-16 text-center lg:text-left">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-1/3">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase mb-6 leading-tight">Global <br/><span className="text-medical-600">Education</span></h2>
            <p className="text-slate-500 font-medium mb-8">Comprehensive academic training in healthcare, nursing protocols, and clinical diagnostics.</p>
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 italic font-bold text-slate-600">
               "Education is the most powerful weapon which you can use to change the world."
            </div>
          </div>
          <div className="lg:w-2/3 w-full grid gap-4">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-xl transition-all group"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-medical-600 shadow-sm font-black text-sm">{idx + 1}</div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase">{step.title}</h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{step.sub}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-medical-600 mb-1">{step.date}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{step.loc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

const Experience = () => {
  const exps = [
    {
      hosp: "Mannian Hospital",
      role: "Clinical Intern",
      period: "2024",
      skills: ["Poison Care", "Trauma", "Emergency"],
      desc: "Hands-on internship in emergency medicine, providing critical care to trauma and poison cases."
    },
    {
      hosp: "Erode Government Hospital",
      role: "Clinical Training",
      period: "2021 – 2024",
      skills: ["Patient Care", "Assessment", "Diagnostics"],
      desc: "Tri-year government hospital training across general wards, OPD and patient monitoring."
    },
    {
      hosp: "Adhma Mind City",
      role: "Psychiatric Posting",
      period: "2023",
      skills: ["Mental Health", "Medication Admin", "Counseling"],
      desc: "Specialized psychiatric posting managing mental health cases and therapeutic intervention."
    },
  ]

  return (
    <AnimatedSection id="experience" className="bg-slate-50">
      <div className="max-w-6xl mx-auto w-full px-6 md:px-10 lg:px-16">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-[10px] font-black text-medical-600 uppercase tracking-widest mb-4">
            <span className="w-6 h-px bg-medical-600" /> Career Timeline <span className="w-6 h-px bg-medical-600" />
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight uppercase leading-tight">
            Clinical <span className="text-medical-600">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 hidden md:block" />

          {exps.map((exp, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`relative flex flex-col md:flex-row items-start gap-6 mb-12 ${
                idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Card */}
              <div className={`md:w-5/12 ${ idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-xl hover:border-medical-600 transition-all"
                >
                  <p className="text-[9px] font-black text-medical-600 uppercase tracking-widest mb-2">{exp.period}</p>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-1">{exp.role}</h3>
                  <p className="text-sm font-bold text-slate-500 mb-4">{exp.hosp}</p>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed mb-5">{exp.desc}</p>
                  <div className={`flex flex-wrap gap-2 justify-start ${ idx % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                    {exp.skills.map((s, i) => (
                      <span key={i} className="px-3 py-1 bg-medical-50 text-medical-700 rounded-full text-[9px] font-black uppercase tracking-wider">{s}</span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Center dot */}
              <div className="hidden md:flex md:w-2/12 justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: idx * 0.15, type: 'spring', stiffness: 200 }}
                  className="w-12 h-12 bg-medical-600 rounded-full flex items-center justify-center shadow-lg shadow-medical-600/30 z-10 flex-shrink-0 mt-2"
                >
                  <Briefcase size={16} className="text-white" />
                </motion.div>
              </div>

              {/* Empty space for alternating */}
              <div className="md:w-5/12 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

const Skills = () => {
  const skills = [
    { icon: <Heart size={22}/>, title: "Critical Patient Care", desc: "Compassionate bedside care and holistic wellbeing" },
    { icon: <Activity size={22}/>, title: "Emergency Response", desc: "Rapid interventions in trauma and code situations" },
    { icon: <Stethoscope size={22}/>, title: "Medication Admin", desc: "Precise dosage, IV therapy & pharmacological safety" },
    { icon: <Award size={22}/>, title: "Vitals & Assessment", desc: "Continuous monitoring and clinical data interpretation" },
    { icon: <User size={22}/>, title: "Clinical Communication", desc: "Effective liaison with doctors, families and teams" },
    { icon: <Briefcase size={22}/>, title: "Team Collaboration", desc: "High-performance teamwork in medical environments" },
  ]

  const languages = [
    { lang: "Tamil", native: "தமிழ்", flag: "TA" },
    { lang: "English", native: "English", flag: "EN" },
    { lang: "German", native: "Deutsch", flag: "DE" },
  ]

  return (
    <AnimatedSection id="skills" className="bg-white">
      <div className="max-w-6xl mx-auto w-full px-6 md:px-10 lg:px-16">
        {/* Skill cards */}
        <motion.div variants={itemVariants} className="mb-12">
          <p className="text-[10px] font-black text-medical-600 uppercase tracking-widest mb-8 flex items-center gap-2">
            <span className="w-8 h-px bg-medical-600" /> Clinical Competencies
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((sk, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-medical-600 hover:bg-white hover:shadow-xl transition-all cursor-default group"
              >
                <div className="w-12 h-12 bg-medical-50 text-medical-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-medical-600 group-hover:text-white transition-all">
                  {sk.icon}
                </div>
                <h3 className="font-black text-slate-800 text-sm uppercase tracking-tight mb-2">{sk.title}</h3>
                <p className="text-slate-400 text-xs font-medium leading-relaxed">{sk.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Language cards individually */}
        <motion.div variants={itemVariants}>
          <p className="text-[10px] font-black text-medical-600 uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="w-8 h-px bg-medical-600" /> Languages Spoken
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {languages.map((l, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="flex items-center gap-5 p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-medical-600 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 flex-shrink-0 bg-medical-50 text-medical-600 font-black text-lg rounded-2xl flex items-center justify-center group-hover:bg-medical-600 group-hover:text-white transition-all">
                  {l.flag}
                </div>
                <div>
                  <p className="font-black text-slate-900 text-sm uppercase tracking-tight">{l.lang}</p>
                  <p className="text-slate-400 text-xs font-medium">{l.native}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

const Contact = () => {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { 
          // EmailJS template variables from your screenshot:
          name: form.name,
          user_name: form.name, 
          email: form.email,
          user_email: form.email, 
          phone: form.phone,
          user_phone: form.phone,
          message: form.message 
        },
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden">
      {/* Full-bleed background split */}
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-medical-600" />
        <div className="bg-white" />
      </div>

      <div className="relative max-w-6xl mx-auto w-full px-6 md:px-10 lg:px-16 py-16 lg:py-24 grid lg:grid-cols-2 gap-0 items-center">
        {/* Left — bold red panel */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-white pr-0 lg:pr-16 py-8"
        >
          <div className="w-10 h-1 bg-white/40 mb-8" />
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-[0.9] mb-8">
            Let's <br/><span className="text-white/60">Connect</span>
          </h2>
          <p className="text-white/70 font-medium text-lg mb-12 leading-relaxed max-w-sm">
            Available for clinical roles, hospital collaboration, and healthcare opportunities across Tamil Nadu and beyond.
          </p>
          <div className="space-y-4">
            <a href="mailto:rajameiyazhagan66@gmail.com" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-white/10 group-hover:bg-white rounded-2xl flex items-center justify-center transition-all">
                <Mail size={20} className="group-hover:text-medical-600 transition-colors" />
              </div>
              <div>
                <p className="text-[9px] font-black text-white/50 uppercase tracking-widest">Email</p>
                <p className="font-bold text-sm text-white group-hover:text-white/80 transition-colors">rajameiyazhagan66@gmail.com</p>
              </div>
            </a>
            <a href="tel:+919790002565" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-white/10 group-hover:bg-white rounded-2xl flex items-center justify-center transition-all">
                <Phone size={20} className="group-hover:text-medical-600 transition-colors" />
              </div>
              <div>
                <p className="text-[9px] font-black text-white/50 uppercase tracking-widest">Phone</p>
                <p className="font-bold text-sm text-white group-hover:text-white/80 transition-colors">+91 97900 02565</p>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Right — white form card */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="lg:pl-16 py-8"
        >
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100">
            <p className="text-[9px] font-black text-medical-600 uppercase tracking-widest mb-2">Get In Touch</p>
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-8">Send a Message</h3>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-4 py-12 text-center"
              >
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h4 className="text-xl font-black text-slate-900 uppercase">Message Sent!</h4>
                <p className="text-slate-400 font-medium text-sm">Thank you for reaching out. I'll get back to you shortly.</p>
                <button onClick={() => setStatus('idle')} className="mt-4 text-medical-600 font-black text-xs uppercase tracking-widest hover:underline">Send Another</button>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Your Name</label>
                    <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="Full name" required className="w-full px-5 py-4 bg-slate-50 rounded-2xl font-semibold text-sm text-slate-700 placeholder-slate-300 outline-none focus:ring-2 focus:ring-medical-600 transition-all" />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Email Address</label>
                    <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="your@email.com" required className="w-full px-5 py-4 bg-slate-50 rounded-2xl font-semibold text-sm text-slate-700 placeholder-slate-300 outline-none focus:ring-2 focus:ring-medical-600 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Phone Number</label>
                  <input name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="+91 97900..." required className="w-full px-5 py-4 bg-slate-50 rounded-2xl font-semibold text-sm text-slate-700 placeholder-slate-300 outline-none focus:ring-2 focus:ring-medical-600 transition-all" />
                </div>
                <div>
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your requirements or opportunity..." rows="4" required className="w-full px-5 py-4 bg-slate-50 rounded-2xl font-semibold text-sm text-slate-700 placeholder-slate-300 outline-none focus:ring-2 focus:ring-medical-600 transition-all resize-none"></textarea>
                </div>
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-500 text-xs font-bold">
                    <AlertCircle size={14} /> Failed to send. Please try again or email directly.
                  </div>
                )}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-5 bg-slate-900 hover:bg-medical-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-medical-600/30 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {status === 'sending' ? (
                    <><Loader size={16} className="animate-spin" /> Sending...</>
                  ) : (
                    <><Send size={16} /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const Footer = () => (
  <footer className="py-12 bg-white border-t border-slate-100">
    <div className="max-w-6xl mx-auto w-full px-6 md:px-10 lg:px-16 flex flex-col items-center gap-6 text-center md:text-left">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 w-full">
        <div className="flex items-center gap-2">
          <Activity className="text-medical-600" size={24} />
          <span className="text-xl font-black">Mei<span className="text-medical-600">Portfolio</span></span>
        </div>
        <p className="text-[9px] font-black text-slate-400 md:text-slate-500 uppercase tracking-widest italic">© 2026 Meiyazhagan R • All Clinical Professionalism Maintained</p>
        <div className="flex gap-4">
          {[Activity, Heart, User].map((Icon, i) => (
            <div key={i} className="text-slate-400 md:text-slate-500 hover:text-medical-600 transition-colors cursor-pointer"><Icon size={20}/></div>
          ))}
        </div>
      </div>
      
      {/* Portfolio Link Credit */}
      <div className="pt-6 border-t border-slate-50 w-full text-center mt-2">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest inline-flex items-center gap-1 justify-center">
          Designed and Developed by {' '}
          <a 
            href="https://portfolio-new-six-brown.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-medical-600 hover:text-medical-700 underline decoration-medical-100 hover:decoration-medical-600 underline-offset-4 transition-all"
          >
            Santhoshini
          </a>
        </p>
      </div>
    </div>
  </footer>
)

function App() {
  const [showNav, setShowNav] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowNav(window.scrollY > window.innerHeight * 0.4)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="selection:bg-medical-100 selection:text-medical-700 font-sans overflow-x-hidden">
      <TopBanner />
      <Navbar isVisible={showNav} />
      <main className="snap-y snap-mandatory">
        <Landing />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
