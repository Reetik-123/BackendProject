import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["3 mock interviews/month", "Basic feedback reports", "Interview history (7 days)", "Community support"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    features: ["Unlimited mock interviews", "Advanced AI feedback & code review", "Full analytics dashboard", "All interview types & roles", "Priority support"],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$49",
    period: "/seat/mo",
    features: ["Everything in Pro", "Team analytics & benchmarks", "Custom question banks", "Admin dashboard", "SSO & invoicing"],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const featureItem = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 },
};

const PricingSection = () => {
  return (
    <section id="pricing" className="section-padding">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Simple, transparent <span className="text-gradient-primary">pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg">Start free. Upgrade when you're ready.</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={card}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className={`rounded-xl p-6 flex flex-col cursor-default ${
                plan.highlighted
                  ? "glass border-primary/40 glow-primary"
                  : "glass"
              }`}
            >
              <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
              <div className="mb-6">
                <motion.span
                  className="text-4xl font-bold inline-block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  {plan.price}
                </motion.span>
                <span className="text-muted-foreground text-sm ml-1">{plan.period}</span>
              </div>

              <motion.ul
                className="space-y-3 mb-8 flex-1"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } } }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {plan.features.map((f) => (
                  <motion.li
                    key={f}
                    variants={featureItem}
                    className="flex items-start gap-2 text-sm"
                  >
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full">
                <Link to="/interview" className="w-full block">
                  <Button variant={plan.highlighted ? "hero" : "heroOutline"} className="w-full">
                    {plan.cta}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
