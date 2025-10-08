// lib/goneLinks.js

// exact path matches (pathname only, no query)
// always list them LOWERCASE and WITHOUT trailing slash (except "/")
export const gonePaths = new Set([
  "/blog/short-courses-in-karachi/python-programming-course-in-karachi",
  "/blog/marketing/short-courses-in-sialkot",
  "/mastery-packaging--label-design-bootcamp",
  "/ado",
  "/blog/short-course-in-sialkot/short-courses-in-sialkot",
  "/digital-media-marketing-",
  "/blog/education/onajahcom-the-inauguration-ceremony",
  "/blog/short-courses-in-karachi/seo-short-course-in-karachi-and-its-scope",
  "/app-store-optimization-training-course",
  "/shopify-",
  "/blog/short-courses-in-karachi/social-media-marketing-short-course-in-karachi",
  "/computer-vision-and-deep-learning-using-python",
  "/blog/technology/top-7--information-technology-skills-in-demand-2020",
  "/ceh-ethical-",
  "/master-the-art-of-affiliate-marketing",
  "/php-my-sql-boot-camp",
  "/layout-design-prototype-to-web-design---2-months-in-lahore-pakistan",
  "/advanced-android-development-with-java-2.0-course-in-lahore",
  "/fundamentals-of-branding-marketing-communication-and-advertising-course-in-lahore-pakistan",
  "/blog/business/good-news-for-freelancers--withdraw-funds-from-payoneer-to-jazz-cash",
  "/1-year-",
  "/blog/marketing/maximizing-your-business-reach--a-guide-to-tiktok-marketing",
  "/shopify-2.0-drop-shipping-and-local-branding-course-in-lahore",
  "/power-of-c-mastering-bootcamp-in-lahore",
  "/3d-modeling-with-rhinoceros-basic-to-advance-course",
  "/wordpress-and-shopify-course-in-lahore",
  "/google-scholarship-certification-in-lahore-pakistan",
  "/allcourses",
  "/1-year-diploma-in-network-and-cyber-security-fundamentals-prerequisites-in-lahore-pakistan",
  "/learn-e-commerce-grow-your-business-worldwide-on-amazon-ebay-shopify-daraz",
  "/advance-digital-marketing-with-artificial-intelligence-and-project-management-course-in-lahore",
  "/null",
  "/how-apply",
  "/core-",
  "/cdn-cgi/l/email-protection",
  "/brochure/undefined",
  "/student_login",
  "/web-and-graphics-online-course-for-children-in-pakistan",
  "/ceh-ethical-hacking-",
  "/blog/marketing/to-catch-how-much-traffic-a-website-gets-3-ways-compared.html",
  "/chinese-language-",
  "/digital",
  "/best-seo-training-ins",
  "/office-",
  "/professional-diploma-",
  "/city/pearson-test-of-english-course-in-lahore-pakistan",
  "/core-python-",
  "/blog/marketing/unlock-the-power-of-seo-elevate-your-business-visibility-and-credibility.html",
  "/professional-baking-expert-course-in-lahore-pakistan/1000",
  "/blog/education/pny-",
  "/city/spoken-english-pny-trainings",
  "/python-course-in-",
])

// any path that STARTS with one of these should 410 (wildcard behavior)
export const gonePrefixes = [
  "/undefined",           // 410 for /undefined/* (covers all your undefined/* links)
  "/blog/short-course-in-sialkot/short-courses-in-sialkot/", // covers trailing-slash variant
]

// query-specific rules (only 410 when query contains these)
export const goneQueryRules = [
  { path: "/", includes: ["ref=steemhunt"] },
  { path: "/blog", includes: ["category=design"] },
  // if you only want the _rsc one gone (and not the whole page), uncomment:
  // { path: "/mastery-packaging--label-design-bootcamp", includes: ["_rsc="] },
]
