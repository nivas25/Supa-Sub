export const clerkAppearance = {
  variables: {
    colorPrimary: "#000000", // Buttons and primary actions remain bold black
    colorBackground: "#ffffff",
    colorText: "#000000",
    fontFamily: "monospace", // Matches your Footer and Blueprint style
    borderRadius: "0px", // Neo-Brutalist uses sharp corners
  },
  elements: {
    // The main container box - matching your memberCard style
    card: "bg-white border-[4px] border-black shadow-[12px_12px_0px_#000000] rounded-none",

    // Header Title - matches your Section Titles
    headerTitle:
      "text-black font-[1000] uppercase text-3xl tracking-tighter leading-none",
    headerSubtitle:
      "text-black font-bold uppercase text-[12px] tracking-tight opacity-70",

    // Primary Action Button (Login/Signup) - matches your joinBtn
    formButtonPrimary:
      "bg-black text-white uppercase font-[1000] text-sm border-[3px] border-black rounded-none hover:bg-[#ff90e8] hover:text-black transition-all duration-200 shadow-[6px_6px_0px_#000000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",

    // Social Buttons (Google, Apple, Microsoft) - matches your filterBtn style
    socialButtonsBlockButton:
      "border-[3px] border-black rounded-none bg-white hover:bg-[#f0f0f0] transition-all shadow-[5px_5px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
    socialButtonsBlockButtonText:
      "font-black uppercase text-[11px] tracking-wide text-black",

    // Inputs - matches your newsletter input style
    formFieldInput:
      "border-[3px] border-black rounded-none bg-white text-black font-bold focus:ring-0 focus:border-[#ff90e8] placeholder:opacity-30",
    formFieldLabel:
      "text-black font-[1000] uppercase text-[11px] tracking-widest mb-1",

    // Branding & Footer
    footerActionLink:
      "text-black font-black hover:text-[#ff90e8] underline decoration-[2px]",
    identityPreviewText: "font-black text-black",
    userButtonPopoverCard:
      "border-[4px] border-black shadow-[8px_8px_0px_#000000] rounded-none",

    // Hide standard branding
    footer: "hidden",
  },
};
