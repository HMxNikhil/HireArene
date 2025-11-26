/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        platinum: "#EEE2DF",
        thistle: "#DEC1DB",
        liberty: "#5B61B2",
        bleuDeFrance: "#2F80E4",
        littleBoyBlue: "#6DA0E1",
        // Semantic mapping
        primary: "#2F80E4", // Bleu de France
        secondary: "#5B61B2", // Liberty
        accent: "#6DA0E1", // Little Boy Blue
        background: "#EEE2DF", // Platinum
        surface: "#ffffff",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
      },
      backgroundImage: {
        "sky-gradient":
          "linear-gradient(to bottom right, #EEE2DF, #DEC1DB, #6DA0E1)",
        "blue-gradient": "linear-gradient(135deg, #2F80E4 0%, #6DA0E1 100%)",
        "card-gradient":
          "linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.5) 100%)",
        glass:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.3) 100%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSlow: {
          "0%": { opacity: 0.95 },
          "50%": { opacity: 1 },
          "100%": { opacity: 0.95 },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideLeft: {
          "0%": { opacity: 0, transform: "translateX(24px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [import("tailwindcss-animate")],
};
