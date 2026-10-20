// Site-wide switch for commercial scaffolding (client login, demo requests,
// enquiry CTAs, access requests, NDA offers). Keep false while the site is
// operating purely as a research publication. Flip to true only when the
// business is registered and cleared to trade.
export const COMMERCIAL = false;

// Single public contact route while COMMERCIAL is false:
// press, corrections and methodology questions only.
export const RESEARCH_EMAIL = 'fysh@narrows.io';
