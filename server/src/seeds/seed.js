import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import {
  User, Banner, Project, Leader, Partner,
  Milestone, SuccessStory, GalleryItem, ContactMessage,
  SiteSetting, AppConfig, FocusArea, ImpactHighlight,
} from '../models/index.js';

dotenv.config();

async function seed() {
  await connectDB();

  console.log('Clearing existing data...');
  await Promise.all([
    User.deleteMany({}),
    Banner.deleteMany({}),
    Project.deleteMany({}),
    Leader.deleteMany({}),
    Partner.deleteMany({}),
    Milestone.deleteMany({}),
    SuccessStory.deleteMany({}),
    GalleryItem.deleteMany({}),
    ContactMessage.deleteMany({}),
    SiteSetting.deleteMany({}),
    AppConfig.deleteMany({}),
    FocusArea.deleteMany({}),
    ImpactHighlight.deleteMany({}),
  ]);

  /* ---- Focus Areas ---- */
  await FocusArea.insertMany([
    { title: 'Community Health & Nutrition', description: 'Mobile health camps, maternal care awareness, and nutrition drives for under-served mothers and children.', icon: 'Heart', order: 1, isActive: true },
    { title: 'Safe Water & Sanitation', description: 'Installing sustainable filtration units and promoting community hygiene standards in saline-affected coastal zones.', icon: 'Droplets', order: 2, isActive: true },
    { title: 'Climate Resilience & Livelihoods', description: 'Alternative livelihood training, homestead agriculture, and disaster preparedness for vulnerable households.', icon: 'Sprout', order: 3, isActive: true },
    { title: 'Women & Youth Development', description: 'Skill development, micro-enterprise training, and human rights advocacy.', icon: 'Users', order: 4, isActive: true },
  ]);
  console.log('Focus areas seeded (4).');

  /* ---- Impact Highlights ---- */
  await ImpactHighlight.insertMany([
    { value: 20000, suffix: '+', label: 'Households Reached Across Coastal Khulna', order: 1, isActive: true },
    { value: 15, suffix: '+', label: 'Years of Community-Led Field Service', order: 2, isActive: true },
    { value: 35, suffix: '+', label: 'Villages Provided Access to Safe Drinking Water', order: 3, isActive: true },
    { value: 100, suffix: '%', label: 'Locally Driven Development Initiatives', order: 4, isActive: true },
  ]);
  console.log('Impact highlights seeded (4).');

  /* ---- Admin user ---- */
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await User.create({
    name: 'Admin',
    email: 'admin@gonomukti-bd.org',
    passwordHash,
    role: 'admin',
    isActive: true,
  });
  console.log('Admin user created: admin@gonomukti-bd.org');

  /* ---- AppConfig ---- */
  await AppConfig.create({
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || '',
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || '',
    clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
    jwtSecret: process.env.JWT_SECRET || 'fallback-dev-secret',
  });
  console.log('App config seeded.');

  /* ---- Banners ---- */
  await Banner.insertMany([
    {
      title: 'Empowering Coastal Communities, Transforming Grassroots Lives.',
      subtitle: 'Building sustainable livelihoods, resilient health systems, and social equity in southwestern Bangladesh.',
      image: 'https://images.pexels.com/photos/37436612/pexels-photo-37436612.jpeg?auto=compress&cs=tinysrgb&w=1920',
      ctaText: 'Our Projects', ctaLink: '/projects', order: 1, isActive: true,
    },
    {
      title: 'Safe Water, Resilient Health, Dignified Lives.',
      subtitle: 'From rainwater harvesting systems to mobile health camps — serving 35 villages across coastal Khulna.',
      image: 'https://images.pexels.com/photos/28101461/pexels-photo-28101461.jpeg?auto=compress&cs=tinysrgb&w=1920',
      ctaText: 'Support Us', ctaLink: '/contact', order: 2, isActive: true,
    },
    {
      title: 'Two Decades of Community-Led Development.',
      subtitle: 'Founded in 2006. Registered with NGO Affairs Bureau (Reg. No. 2067). Locally driven, impact-focused.',
      image: 'https://images.pexels.com/photos/35633360/pexels-photo-35633360.jpeg?auto=compress&cs=tinysrgb&w=1920',
      ctaText: 'About Us', ctaLink: '/about/overview', order: 3, isActive: true,
    },
  ]);
  console.log('Banners seeded (3).');

  /* ---- Projects ---- */
  await Project.insertMany([
    {
      slug: 'maternal-child-health',
      title: 'Maternal, Child Health & Nutrition Program',
      icon: 'Heart',
      focus: 'Reducing infant and maternal mortality through preventive care and community mobilization.',
      activities: [
        'Community health awareness workshops on hygiene, nutrition, and maternal care.',
        'Distribution of hygiene kits and nutritional supplements to pregnant and lactating mothers.',
        'Coordination with local government health complexes for immunizations and antenatal care.',
      ],
      coverImage: 'https://images.pexels.com/photos/37234313/pexels-photo-37234313.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gallery: [
        'https://images.pexels.com/photos/37234313/pexels-photo-37234313.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/19550816/pexels-photo-19550816.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/4882629/pexels-photo-4882629.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/27087130/pexels-photo-27087130.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
      order: 1, isFeatured: true, isActive: true,
    },
    {
      slug: 'coastal-wash',
      title: 'Coastal WASH & Salinity Management',
      icon: 'Droplets',
      focus: 'Addressing acute drinking water shortages caused by coastal water salinity and environmental degradation.',
      activities: [
        'Installation and maintenance of Rainwater Harvesting Systems (RWHS) and ponds-and-filters.',
        'Hygiene education programs in rural schools and community centers.',
        'Formation of village water management committees for infrastructure maintenance.',
      ],
      coverImage: 'https://images.pexels.com/photos/28101461/pexels-photo-28101461.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gallery: [
        'https://images.pexels.com/photos/28101461/pexels-photo-28101461.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/13613219/pexels-photo-13613219.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/37268660/pexels-photo-37268660.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/20008982/pexels-photo-20008982.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
      order: 2, isFeatured: true, isActive: true,
    },
    {
      slug: 'climate-resilience',
      title: 'Climate Resilience & Coastal Livelihoods',
      icon: 'Sprout',
      focus: 'Building household resilience against cyclones, tidal surges, and soil salinity.',
      activities: [
        'Training marginal farmers in saline-tolerant crop production and homestead gardening.',
        'Capacity building for alternative income-generating activities (poultry rearing, handicrafts, small trades).',
        'Disaster preparedness drills and emergency response coordination.',
      ],
      coverImage: 'https://images.pexels.com/photos/36811391/pexels-photo-36811391.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gallery: [
        'https://images.pexels.com/photos/36811391/pexels-photo-36811391.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/36726788/pexels-photo-36726788.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/35188819/pexels-photo-35188819.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/28220703/pexels-photo-28220703.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
      order: 3, isFeatured: true, isActive: true,
    },
    {
      slug: 'gender-equality',
      title: 'Gender Equality & Human Rights',
      icon: 'Users',
      focus: 'Ending gender-based violence and fostering female leadership in grassroots governance.',
      activities: [
        'Legal aid awareness and support networks for rural women.',
        'Micro-enterprise incubator programs for female entrepreneurs.',
        'Advocacy against early child marriage through youth clubs.',
      ],
      coverImage: 'https://images.pexels.com/photos/37784297/pexels-photo-37784297.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gallery: [
        'https://images.pexels.com/photos/37784297/pexels-photo-37784297.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/36746080/pexels-photo-36746080.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/35633360/pexels-photo-35633360.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/33786726/pexels-photo-33786726.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
      order: 4, isFeatured: true, isActive: true,
    },
  ]);
  console.log('Projects seeded (4).');

  /* ---- Leaders ---- */
  await Leader.insertMany([
    { name: 'Dr. Md. Mostafa Kamal', designation: 'Chief Executive Officer', specialization: 'Program Strategy & Organizational Governance', photo: 'https://images.pexels.com/photos/37234313/pexels-photo-37234313.jpeg?auto=compress&cs=tinysrgb&w=600', order: 1, isActive: true },
    { name: 'Jenifer Binte Anis', designation: 'Director \u2013 Programs', specialization: 'Community Health & WASH Initiatives', photo: 'https://images.pexels.com/photos/27087130/pexels-photo-27087130.jpeg?auto=compress&cs=tinysrgb&w=600', order: 2, isActive: true },
    { name: 'Flora Jebin', designation: 'Head of Accounts', specialization: 'Financial Governance & Compliance', photo: 'https://images.pexels.com/photos/15517435/pexels-photo-15517435.jpeg?auto=compress&cs=tinysrgb&w=600', order: 3, isActive: true },
    { name: 'Ratan Kundhu', designation: 'Advisor Development', specialization: 'Public Policy & Strategic Planning', photo: 'https://images.pexels.com/photos/36811391/pexels-photo-36811391.jpeg?auto=compress&cs=tinysrgb&w=600', order: 4, isActive: true },
  ]);
  console.log('Leaders seeded (4).');

  /* ---- Partners ---- */
  await Partner.insertMany([
    { name: 'NGO Affairs Bureau (NGOAB), Prime Minister\u2019s Office', role: 'Regulatory & Oversight Compliance', type: 'institutional', order: 1, isActive: true },
    { name: 'Bangladesh NGO Foundation (BNF), Ministry of Finance', role: 'Project Funding & Institutional Support', type: 'institutional', order: 2, isActive: true },
    { name: 'Local Government Institutions (Union Parishad & Upazila Administration)', role: 'Field Implementation Support', type: 'institutional', order: 3, isActive: true },
  ]);
  console.log('Partners seeded (3).');

  /* ---- Milestones ---- */
  await Milestone.insertMany([
    { value: 35000, suffix: '+', label: 'Individuals provided with health and hygiene education', order: 1, isActive: true },
    { value: 12000, suffix: '+', label: 'Coastal residents granted access to safe drinking water infrastructure', order: 2, isActive: true },
    { value: 1500, suffix: '+', label: 'Women trained in sustainable homestead farming and small business management', order: 3, isActive: true },
    { value: 20, suffix: '+', label: 'Years of continuous service in Rupsha Upazila and surrounding areas', order: 4, isActive: true },
  ]);
  console.log('Milestones seeded (4).');

  /* ---- Success Stories ---- */
  await SuccessStory.create({
    label: 'Field Success Story',
    title: 'Transforming Water Access in Pitabogh Village',
    location: 'Pitabogh Village, Rupsha, Khulna',
    body: 'Before Gonomukti installed a community rainwater harvesting unit, families in Pitabogh had to walk over 3 kilometers daily for non-saline drinking water. Today, 120 households have year-round access to clean water near their homes, significantly reducing waterborne illnesses among young children.',
    image: 'https://images.pexels.com/photos/11461856/pexels-photo-11461856.jpeg?auto=compress&cs=tinysrgb&w=1200',
    stats: ['3 km daily walk eliminated', '120 households'],
    isFeatured: true,
    isActive: true,
  });
  console.log('Success stories seeded (1).');

  /* ---- Gallery Items ---- */
  await GalleryItem.insertMany([
    { image: 'https://images.pexels.com/photos/37234313/pexels-photo-37234313.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Maternal health camp in coastal Khulna', category: 'health', order: 1, isActive: true },
    { image: 'https://images.pexels.com/photos/19550816/pexels-photo-19550816.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Newborn care training for community health workers', category: 'health', order: 2, isActive: true },
    { image: 'https://images.pexels.com/photos/27087130/pexels-photo-27087130.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Mother and child wellness session', category: 'health', order: 3, isActive: true },
    { image: 'https://images.pexels.com/photos/4882629/pexels-photo-4882629.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Safe motherhood outreach program', category: 'health', order: 4, isActive: true },
    { image: 'https://images.pexels.com/photos/28101461/pexels-photo-28101461.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Clean drinking water access in a coastal village', category: 'wash', order: 5, isActive: true },
    { image: 'https://images.pexels.com/photos/13613219/pexels-photo-13613219.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Children collecting safe water from a community tap', category: 'wash', order: 6, isActive: true },
    { image: 'https://images.pexels.com/photos/37268660/pexels-photo-37268660.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Water collection point serving multiple households', category: 'wash', order: 7, isActive: true },
    { image: 'https://images.pexels.com/photos/20008982/pexels-photo-20008982.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Hand pump maintained by village water committee', category: 'wash', order: 8, isActive: true },
    { image: 'https://images.pexels.com/photos/36811391/pexels-photo-36811391.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Farmers trained in saline-tolerant agriculture', category: 'livelihoods', order: 9, isActive: true },
    { image: 'https://images.pexels.com/photos/36726788/pexels-photo-36726788.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Homestead farming support for rural households', category: 'livelihoods', order: 10, isActive: true },
    { image: 'https://images.pexels.com/photos/35188819/pexels-photo-35188819.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Rural market access for smallholder farmers', category: 'livelihoods', order: 11, isActive: true },
    { image: 'https://images.pexels.com/photos/28220703/pexels-photo-28220703.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Women farmers in coastal agricultural fields', category: 'livelihoods', order: 12, isActive: true },
    { image: 'https://images.pexels.com/photos/37784297/pexels-photo-37784297.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Women\u2019s empowerment through rural livelihoods', category: 'gender-youth', order: 13, isActive: true },
    { image: 'https://images.pexels.com/photos/36746080/pexels-photo-36746080.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Female farmer leading community agriculture', category: 'gender-youth', order: 14, isActive: true },
    { image: 'https://images.pexels.com/photos/35633360/pexels-photo-35633360.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Women-led harvest in coastal Bangladesh', category: 'gender-youth', order: 15, isActive: true },
    { image: 'https://images.pexels.com/photos/33786726/pexels-photo-33786726.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Traditional farming skills training for women', category: 'gender-youth', order: 16, isActive: true },
  ]);
  console.log('Gallery items seeded (16).');

  /* ---- Site Settings ---- */
  await SiteSetting.create({
    heroHeadline: 'Empowering Coastal Communities, Transforming Grassroots Lives.',
    heroSubheadline: 'Building sustainable livelihoods, resilient health systems, and social equity in southwestern Bangladesh.',
    impactHighlights: [
      { value: 20000, suffix: '+', label: 'Households Reached Across Coastal Khulna' },
      { value: 15, suffix: '+', label: 'Years of Community-Led Field Service' },
      { value: 35, suffix: '+', label: 'Villages Provided Access to Safe Drinking Water' },
      { value: 100, suffix: '%', label: 'Locally Driven Development Initiatives' },
    ],
    focusAreas: [
      { title: 'Community Health & Nutrition', description: 'Mobile health camps, maternal care awareness, and nutrition drives for under-served mothers and children.', icon: 'Heart' },
      { title: 'Safe Water & Sanitation', description: 'Installing sustainable filtration units and promoting community hygiene standards in saline-affected coastal zones.', icon: 'Droplets' },
      { title: 'Climate Resilience & Livelihoods', description: 'Alternative livelihood training, homestead agriculture, and disaster preparedness for vulnerable households.', icon: 'Sprout' },
      { title: 'Women & Youth Development', description: 'Skill development, micro-enterprise training, and human rights advocacy.', icon: 'Users' },
    ],
    briefAbout: 'Gonomukti is a non-governmental development organization rooted in the coastal belt of Khulna, Bangladesh. Established in 2006, Gonomukti works at the intersection of public health, climate adaptation, livelihoods, and social inclusion to empower marginalized rural families.',
    briefAboutImage: 'https://images.pexels.com/photos/37436613/pexels-photo-37436613.jpeg?auto=compress&cs=tinysrgb&w=1200',
    establishedYear: 2006,
    vision: 'A equitable, resilient, and self-sustaining society where vulnerable coastal communities live with dignity, health, and economic security.',
    mission: 'To improve the quality of life for marginalized rural populations in Bangladesh by facilitating accessible healthcare, safe water access, climate-resilient livelihoods, and socio-economic empowerment through grassroots mobilization.',
    values: [
      { title: 'Integrity & Accountability', description: 'Maintaining transparent operations in all community programs and donor partnerships.', icon: 'ShieldCheck' },
      { title: 'Community Ownership', description: 'Designing solutions with, by, and for local residents.', icon: 'HandHeart' },
      { title: 'Inclusivity & Gender Equity', description: 'Ensuring equal opportunities for women, children, and persons with disabilities.', icon: 'Scale' },
      { title: 'Sustainability', description: 'Prioritizing environmentally sound practices in coastal development.', icon: 'Leaf' },
    ],
    directorMessage: {
      title: 'Message from the Executive Director',
      body: 'Since 2006, Gonomukti has been a steadfast force for grassroots development in Rupsha, Khulna, empowering climate-vulnerable communities across southwestern Bangladesh. Officially registered with the NGO Affairs Bureau (Reg. No. 2067) and the Bangladesh NGO Foundation, our work targets critical regional challenges through safe water access (WASH), maternal and child healthcare, climate-resilient livelihoods, and women\u2019s empowerment. To date, we have delivered clean drinking water to over 12,000 coastal residents, reached 35,000 mothers and children with health services, and trained 1,500 rural households in sustainable agriculture. However, rising salinity and extreme weather continue to threaten lives. To scale our clean water systems, launch mobile health clinics, and reach more families, Gonomukti relies on the generosity of partners and donors. Your contribution directly funds vital field operations\u2014turning hardship into lasting self-reliance. Join us today in building a dignified, resilient future for coastal Bangladesh.',
      name: 'Dr. Md. Mostafa Kamal',
      designation: 'Chief Executive Officer',
      photo: 'https://images.pexels.com/photos/37234313/pexels-photo-37234313.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    leadershipIntro: 'Gonomukti is governed by a General Body and an Executive Committee comprising social activists, community leaders, and development professionals.',
    historyText: [
      'Gonomukti was founded with a singular conviction: lasting social change begins when grassroots communities are given the tools and resources to drive their own development.',
      'Operating primarily from Rupsha Upazila in Khulna district, Gonomukti has spent nearly two decades addressing systemic poverty, environmental vulnerability, and healthcare gaps in southwestern Bangladesh. Through participatory field interventions and partnerships with local government and national networks, the organization continues to advance sustainable development at the village level.',
    ],
    timeline: [
      { year: '2006', title: 'Founded in Rupsha, Khulna' },
      { year: '2007', title: 'NGO Affairs Bureau registration (Reg. No. 2067)' },
      { year: '2009', title: 'Safe water initiatives begin' },
      { year: '2012', title: 'Mobile health camps launched' },
      { year: '2018', title: 'Climate resilience and livelihood programs expand' },
      { year: 'Today', title: '20,000+ households reached' },
    ],
    alliancesText: 'Gonomukti actively participates in regional development networks, health alliances, and climate action coalitions across southwestern Bangladesh to amplify grassroots advocacy.',
    donate: {
      title: 'Support Gonomukti',
      text: 'Your support enables Gonomukti to deliver safe drinking water, essential healthcare, and climate-resilient livelihoods to vulnerable coastal communities in Khulna. Every donation directly transforms lives and builds lasting self-reliance where help is needed most.',
      subText: 'If you are interested in making a donation or partnering with our cause, please feel free to contact us.',
      buttonText: 'Contact Us',
    },
    contact: {
      address: 'Gonomukti Head Office, 1st Floor, Mollah Commercial Complex, Holding No. 142, Ward No. 03, Near Alipur Bazar Main Road (Opposite Pitabogh Primary School), Village: Pitabogh, Post Office: Alipur \u2013 9241, Upazila: Rupsha, District: Khulna, Division: Khulna, Bangladesh',
      hotline: '+880 19 7188 7629',
      workingHours: 'Sunday \u2013 Thursday: 9:00 AM \u2013 5:00 PM (BST)',
      emails: [
        { email: 'contact@gonomukti-bd.org', label: 'General Inquiries' },
        { email: 'ceo@gonomukti-bd.org', label: 'Chief Executive Officer' },
        { email: 'programs@gonomukti-bd.org', label: 'Programs' },
        { email: 'somi@gonomukti-bd.org', label: 'Other' },
      ],
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58941.61758189828!2d89.5!3d22.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff8e1e6e2e1e3b%3A0x0!2sRupsha%2C%20Khulna!5e0!3m2!1sen!2sbd!4v1700000000000',
    },
    registrationText: 'Registered with NGO Affairs Bureau (Reg. No. 2067) and Bangladesh NGO Foundation.',
    socialLinks: [
      { name: 'Facebook', url: '#' },
      { name: 'Twitter', url: '#' },
      { name: 'Instagram', url: '#' },
      { name: 'YouTube', url: '#' },
    ],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58941.61758189828!2d89.5!3d22.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff8e1e6e2e1e3b%3A0x0!2sRupsha%2C%20Khulna!5e0!3m2!1sen!2sbd!4v1700000000000',
    footerAbout: 'Gonomukti is a grassroots development organization empowering coastal communities in Khulna, Bangladesh since 2006.',
  });
  console.log('Site settings seeded.');

  console.log('\n========================================');
  console.log('     SEEDING COMPLETE!');
  console.log('========================================');
  console.log('Admin login: admin@gonomukti-bd.org');
  console.log('Password: set in ADMIN_PASSWORD in server/.env');
  console.log('Cloudinary: set in .env or via Admin Panel > Configuration');
  console.log('========================================');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
