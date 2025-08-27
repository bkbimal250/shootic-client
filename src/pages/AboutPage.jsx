import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { 
  Camera, 
  Heart, 
  Star, 
  Award, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Clock,
  Zap,
  Shield,
  Palette,
  Target,
  TrendingUp,
  Globe,
  Phone,
  Mail,
  MapPin
} from 'lucide-react'

const AboutPage = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 })
  const { ref: storyRef, inView: storyInView } = useInView({ threshold: 0.1 })
  const { ref: valuesRef, inView: valuesInView } = useInView({ threshold: 0.1 })
  const { ref: teamRef, inView: teamInView } = useInView({ threshold: 0.1 })

  const stats = [
    { number: "500+", label: "Happy Clients", icon: Heart },
    { number: "1000+", label: "Sessions Completed", icon: Camera },
    { number: "4.9", label: "Star Rating", icon: Star },
    { number: "5+", label: "Years Experience", icon: Award }
  ]

  const values = [
    {
      icon: Heart,
      title: "Passion for Photography",
      description: "We're not just photographers, we're storytellers who capture life's precious moments with love and dedication.",
      color: "pink"
    },
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description: "Every image is crafted with professional standards. We don't deliver until we're 100% satisfied with the results.",
      color: "blue"
    },
    {
      icon: Users,
      title: "Client-First Approach",
      description: "Your satisfaction is our priority. We work closely with you to understand your vision and bring it to life.",
      color: "green"
    },
    {
      icon: Palette,
      title: "Creative Excellence",
      description: "We blend technical expertise with artistic vision to create stunning, unique photographs that tell your story.",
      color: "purple"
    }
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "Lead Photographer & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "With over 8 years of experience, Sarah specializes in family and portrait photography. Her gentle approach makes everyone feel comfortable in front of the camera.",
      specialties: ["Family Portraits", "Newborn Photography", "Wedding Photography"],
      social: { instagram: "@sarahjohnson_photo", email: "sarah@shootic.com" }
    },
    {
      name: "Michael Chen",
      role: "Senior Photographer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Michael brings a modern, artistic perspective to every shoot. His expertise in lighting and composition creates stunning visual stories.",
      specialties: ["Product Photography", "Corporate Headshots", "Event Photography"],
      social: { instagram: "@michaelchen_photo", email: "michael@shootic.com" }
    },
    {
      name: "Emma Rodriguez",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Emma oversees the creative direction and ensures every client receives a unique, personalized photography experience.",
      specialties: ["Creative Direction", "Styling", "Photo Editing"],
      social: { instagram: "@emmarodriguez_creative", email: "emma@shootic.com" }
    }
  ]

  const achievements = [
    {
      icon: Award,
      title: "Best Photography Studio 2023",
      description: "Awarded by Photography Excellence Association",
      year: "2023"
    },
    {
      icon: Star,
      title: "5-Star Service Rating",
      description: "Consistently rated 5 stars by our clients",
      year: "2023"
    },
    {
      icon: TrendingUp,
      title: "500+ Happy Clients",
      description: "Successfully served over 500 families",
      year: "2023"
    },
    {
      icon: Globe,
      title: "Featured in Photography Magazine",
      description: "Our work featured in leading photography publications",
      year: "2022"
    }
  ]

  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-12 sm:py-16 lg:py-24 overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23purple' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 text-purple-600 px-4 py-2 mb-4 rounded-full text-sm font-semibold border border-purple-200 shadow-lg">
              📸 About Shootic Photography
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-4 sm:mb-6 lg:mb-8">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                Capturing Life's
              </span>{" "}
              <span className="text-gray-900">Beautiful Moments</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 lg:mb-12 leading-relaxed px-4">
              We're passionate photographers dedicated to bringing professional studio-quality photography 
              <span className="text-purple-600 font-semibold"> right to your doorstep! ✨</span>
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="card p-4 sm:p-6 text-center group"
                >
                  <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-gray-900 mb-1 sm:mb-2">{stat.number}</div>
                  <p className="text-sm sm:text-base text-gray-600 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section 
        ref={storyRef}
        className="py-12 sm:py-16 lg:py-24 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 text-purple-600 px-4 py-2 mb-4 rounded-full text-sm font-semibold border border-purple-200">
                🎯 Our Story
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-4 sm:mb-6">
                From <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">Passion</span> to{" "}
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">Profession</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 leading-relaxed">
                Shootic Photography was born from a simple belief: everyone deserves access to professional-quality photography without the hassle of traveling to a studio.
              </p>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 leading-relaxed">
                What started as a small home-based photography service has grown into a trusted name in mobile photography, serving hundreds of families across the city.
              </p>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                <span className="text-purple-600 font-semibold">Our mission is simple:</span> Bring the studio to you, capture your precious moments, and deliver memories that last a lifetime.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/booking"
                  className="relative group inline-block"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-full blur-lg group-hover:blur-xl transition-all duration-300 opacity-75 group-hover:opacity-100"></div>
                  <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white px-6 py-3 rounded-full font-bold shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105 inline-flex items-center">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Book Your Session
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
                <Link
                  to="/contact"
                  className="btn-secondary inline-flex items-center justify-center"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Us
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=400&fit=crop"
                  alt="Our Photography Story"
                  className="w-full h-64 sm:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-2">Capturing Life's Beautiful Moments</h3>
                  <p className="text-white/90 text-sm sm:text-base">Every click tells a story</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section 
        ref={valuesRef}
        className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-purple-50"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-block bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 text-purple-600 px-4 py-2 mb-4 rounded-full text-sm font-semibold border border-purple-200">
              💎 Our Values
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-4 sm:mb-6">
              What Makes Us <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">Different</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Our core values guide everything we do, ensuring you get the best photography experience possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card p-6 sm:p-8 group hover:scale-105 transition-transform duration-500"
              >
                <div className={`bg-gradient-to-r from-${value.color}-100 to-${value.color}-200 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className={`h-8 w-8 text-${value.color}-600`} />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section 
        ref={teamRef}
        className="py-12 sm:py-16 lg:py-24 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-block bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 text-purple-600 px-4 py-2 mb-4 rounded-full text-sm font-semibold border border-purple-200">
              👥 Meet Our Team
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-4 sm:mb-6">
              The <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">Talented</span> People Behind the Lens
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Our team of professional photographers brings years of experience and a passion for creating beautiful memories.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card overflow-hidden group hover:scale-105 transition-transform duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-purple-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600 mb-6 leading-relaxed">{member.bio}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-3">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, idx) => (
                        <span key={idx} className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{member.social.instagram}</span>
                    <a href={`mailto:${member.social.email}`} className="text-purple-600 hover:text-purple-700">
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-block bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 text-purple-600 px-4 py-2 mb-4 rounded-full text-sm font-semibold border border-purple-200">
              🏆 Our Achievements
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-4 sm:mb-6">
              Recognition & <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">Success</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              We're proud of our achievements and the trust our clients place in us.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card p-6 sm:p-8 text-center group hover:scale-105 transition-transform duration-500"
              >
                <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <achievement.icon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-2">{achievement.title}</h3>
                <p className="text-gray-600 mb-3 text-sm sm:text-base">{achievement.description}</p>
                <div className="text-purple-600 font-bold">{achievement.year}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="card p-8 sm:p-12 max-w-4xl mx-auto">
              <div className="inline-block bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 text-purple-600 px-4 py-2 mb-4 rounded-full text-sm font-semibold border border-purple-200">
                🎯 Ready to Work With Us?
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-4 sm:mb-6">
                Let's Create <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">Beautiful Memories</span> Together
              </h3>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Join hundreds of happy families who have trusted us to capture their precious moments!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/booking"
                  className="relative group inline-block"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-full blur-lg group-hover:blur-xl transition-all duration-300 opacity-75 group-hover:opacity-100"></div>
                  <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg sm:text-xl shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-105 inline-flex items-center">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Book Your Session
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
                <Link
                  to="/contact"
                  className="btn-secondary inline-flex items-center justify-center"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Get in Touch
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
