import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg shadow-background/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto max-w-6xl flex items-center justify-between h-16 px-6">
        <a href="/" className="font-display font-bold text-lg text-gradient-primary">
          InterviewAI
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {["Features", "How It Works", "Pricing"].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
            >
              {item}
            </motion.a>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-3"
        >
          {user ? (
            <>
              <span className="text-sm border border-zinc-800 px-3 py-1 rounded-full text-zinc-300 mr-2 bg-zinc-900/50">Credits: {user.credits}</span>
              <Button variant="ghost" size="sm" className="text-sm" onClick={logout}>Log Out</Button>
              <Link to="/history">
                <Button variant="hero" size="sm" className="text-sm">Dashboard</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-sm">Log In</Button>
              </Link>
              <Link to="/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="hero" size="sm" className="text-sm">Get Started</Button>
                </motion.div>
              </Link>
            </>
          )}
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
