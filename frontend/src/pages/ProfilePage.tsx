import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { User, Mail, CreditCard, Hash, LogOut, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/landing/Navbar";

const ProfilePage = () => {
  const { user, logout } = useAuth();

  if (!user) return null; // Should be handled by ProtectedRoute, but adding for type safety.

  const userInfo = [
    { label: "Full Name", value: user.name, icon: User },
    { label: "Email Address", value: user.email, icon: Mail },
    { label: "Available Credits", value: user.credits.toString(), icon: CreditCard },
    { label: "User ID", value: user._id, icon: Hash },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <Navbar />

      {/* Decorative background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <main className="flex-1 container mx-auto max-w-4xl px-6 pt-32 pb-16 relative z-10 flex flex-col">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Left Column: Avatar & Basic Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-1/3 glass rounded-2xl p-8 flex flex-col items-center text-center border border-white/5"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent p-1 mb-6 shadow-xl shadow-primary/20">
              <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center border-4 border-background">
                <User className="w-12 h-12 text-zinc-400" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold mb-1 tracking-tight">{user.name}</h1>
            <p className="text-muted-foreground text-sm mb-6">{user.email}</p>
            
            <div className="w-full h-px bg-white/5 mb-6"></div>

            <div className="w-full bg-zinc-900/50 rounded-lg p-4 border border-white/5 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Credits</span>
                <CreditCard className="w-4 h-4 text-primary" />
              </div>
              <div className="text-3xl font-bold text-left">{user.credits}</div>
            </div>

            <Button variant="destructive" className="w-full mt-auto" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </motion.div>

          {/* Right Column: Detailed Info Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {userInfo.map((info, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className="glass rounded-xl p-6 border border-white/5 hover:border-primary/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-zinc-900/80 flex items-center justify-center mb-4 border border-white/5 group-hover:scale-110 group-hover:border-primary/50 transition-all">
                  <info.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">{info.label}</h3>
                <p className="text-lg font-semibold truncate" title={info.value}>{info.value}</p>
              </motion.div>
            ))}
            
            {/* Quick Actions Card */}
            <motion.div
              variants={item}
              className="sm:col-span-2 glass rounded-xl p-6 border border-white/5 mt-4"
            >
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-4">
                <Link to="/interview">
                  <Button variant="hero">Start New Interview</Button>
                </Link>
                <Link to="/history">
                  <Button variant="heroOutline">View Interview History</Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
