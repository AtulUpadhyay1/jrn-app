import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "@/components/ui/Button";
import { useEffect } from "react";
import { jobService } from "../../services/jobEngine";


const Matchmaking = () => {
  const navigate = useNavigate();
  
  // Mock data for engines and jobs
  const [engines, setEngines] = useState([
    {
      id: 5,
      title: "UX Designer",
      location: "Los Angeles, CA",
      contractType: "F", // Full-time
      experienceLevel: "2", // Entry Level
      workType: "3", // Hybrid
      publishedAt: "r2592000", // Past month
      created: "2024-08-25",
      isActive: false,
      matchCount: 8,
      
    }
  ]);

  // fetch engine from api
  useEffect(() => {
    const fetchEngines = async () => {
      const result = await jobService.fetchEngines();
      if (result.success) {
        setEngines(result.data);
      } else {
        console.error("Failed to fetch engines:", result.message);
      }
    };

    fetchEngines();
  }, []);


  // change engines status from api
  const changeEngineStatus = async (engineId, isActive) => {
    const result = await jobService.updateEngineStatus(engineId, isActive);
    if (result.success) {
      setEngines((prevEngines) =>
        prevEngines.map((engine) =>
          engine.id === engineId ? { ...engine, isActive } : engine
        )
      );
    } else {
      console.error("Failed to update engine status:", result.message);
    }
  };

  const [jobs, setJobs] = useState([
    {
  "id": "4298742978",
  "publishedAt": "2025-09-10",
  "salary": "",
  "title": "Customer Success Manager",
  "jobUrl": "https://www.linkedin.com/jobs/view/customer-success-manager-at-veriforce-4298742978?trk=public_jobs_topcard-title",
  "companyName": "Veriforce",
  "companyUrl": "https://www.linkedin.com/company/veriforce-llc?trk=public_jobs_topcard-org-name",
  "location": "The Woodlands, TX",
  "postedTime": "2 hours ago",
  "applicationsCount": "Be among the first 25 applicants",
  "description": "Veriforce is the fastest-growing SaaS-technology and services company in the global supply chain risk management market. We help industry-leading companies create and maintain operating cultures and work environments that optimize safety, promote sustainability, and foster collaboration across a broad spectrum of internal and external stakeholders. What separates Veriforce from the rest is our people. We hire highly-intelligent, growth-minded individuals that team well and continuously look for new, better ways of solving business challenges.\n\nThe Role You’ll Play\n\nJoin Veriforce's Customer Success team as a Customer Success Manager. In this role, you'll be the voice of our customers and a key face of our company. Your success will be measured by your ability to keep customers satisfied, expand their experience, and guide them through their journey with Veriforce. As the primary contact for our clients, you'll collaborate closely with all Veriforce teams, providing your expertise and innovative ideas to make informed decisions. At the same time, clients will look to you for advice on what's next, maximizing the value they get from our platform and services. As a Customer Success Manager, you'll play a vital role in building and nurturing customer relationships, ensuring their satisfaction and growth. You'll need to be a hands-on contributor, ready to tackle challenges with determination and creativity. Join us and be the bridge between our clients and Veriforce's success.\n\nYour Core Responsibilities Will Be\n\n\n * Take ownership of client relationships by thoroughly understanding their unique needs, objectives, and how they measure value and success\n * Actively manage client health by continuously monitoring and assessing account satisfaction, addressing any concerns, and implementing strategies to enhance the overall experience with Veriforce\n * Identify expansion opportunities and take ownership of the client renewal process to grow client relationships and ensure continued success\n * Apply strong process and project management skills to effectively navigate clients and internal teams through complex initiatives, ensuring successful outcomes\n * Conduct thorough business reviews and make on-site client visits to ensure that our clients’ evolving needs are met and to identify growth possibilities\n * Collaborate closely with Sales, Professional Services, Support, Finance, and Product to facilitate seamless handoffs and provide comprehensive guidance to clients throughout their journey\n * Develop deep and comprehensive industry and product knowledge\n * Serve as the voice of our customers, providing valuable insights to inform our sales processes and shape the product roadmap\n * Leverage data-driven insights to create strategic account plans and proactively deliver valuable information to customers, reinforcing the partnership's value, fostering trust, and nurturing customer advocacy\n   \n   \n\nYou’ll Bring These Attributes To The Table\n\n\n * Exceptional communication skills to foster trust among your client base and colleagues\n * Resilient and gritty attitude, ready to tackle unique challenges and secure long- term client satisfaction\n * Ability to proactively identify and address issues, preventing and resolving client concerns\n * Positive attitude and a track record of driving positive results through cross- functional collaboration\n * Proficiency in data-driven decision-making to drive long-term account success\n * Strategic planning skills alongside a proven ability to manage complex accounts collaboratively, efficiently, and effectively\n * Experience in managing enterprise clients and overseeing renewals preferably related to solutions in Health & Safety, Procurement, or Supply Chain\n   \n   \n\nHere are just a few of the great reasons you should join our team!\n\n\n * We are mission-focused and mission-driven to help bring worker home safe every Our training products and compliance platform help keep workers safe.\n * Work with a global team! We have colleagues and customers across North America and overseas.\n * Veriforce is a great place to work! Our leaders and teams cite culture as one of the top reasons this is a great place to\n * Veriforce provides:\n    * 100% paid employee medical and dental insurance\n    * Monthly contributions to Health Savings Accounts\n    * A 401(k) match that is immediately fully vested\n    * Outstanding time off benefits\n    * Paid time off for volunteer activities\n    * Remote work\n      \n\nAll job offers will be contingent on successful completion of a drug screen and background check.",
  "contractType": "Full-time",
  "experienceLevel": "Not Applicable",
  "workType": "Information Technology and Customer Service",
  "sector": "Software Development",
  "applyType": "EASY_APPLY",
  "applyUrl": "https://www.linkedin.com/jobs/view/customer-success-manager-at-veriforce-4298742978?trk=public_jobs_topcard-title",
  "descriptionHtml": "\n          Veriforce is the fastest-growing SaaS-technology and services company in the global supply chain risk management market. We help industry-leading companies create and maintain operating cultures and work environments that optimize safety, promote sustainability, and foster collaboration across a broad spectrum of internal and external stakeholders. What separates Veriforce from the rest is our people. We hire highly-intelligent, growth-minded individuals that team well and continuously look for new, better ways of solving business challenges.<br><br><strong>The Role You&#x2019;ll Play<br><br></strong>Join Veriforce&apos;s Customer Success team as a Customer Success Manager. In this role, you&apos;ll be the voice of our customers and a key face of our company. Your success will be measured by your ability to keep customers satisfied, expand their experience, and guide them through their journey with Veriforce. As the primary contact for our clients, you&apos;ll collaborate closely with all Veriforce teams, providing your expertise and innovative ideas to make informed decisions. At the same time, clients will look to you for advice on what&apos;s next, maximizing the value they get from our platform and services. As a Customer Success Manager, you&apos;ll play a vital role in building and nurturing customer relationships, ensuring their satisfaction and growth. You&apos;ll need to be a hands-on contributor, ready to tackle challenges with determination and creativity. Join us and be the bridge between our clients and Veriforce&apos;s success.<br><br><strong>Your Core Responsibilities Will Be<br><br></strong><ul><li>Take ownership of client relationships by thoroughly understanding their unique needs, objectives, and how they measure value and success</li><li>Actively manage client health by continuously monitoring and assessing account satisfaction, addressing any concerns, and implementing strategies to enhance the overall experience with Veriforce</li><li>Identify expansion opportunities and take ownership of the client renewal process to grow client relationships and ensure continued success</li><li>Apply strong process and project management skills to effectively navigate clients and internal teams through complex initiatives, ensuring successful outcomes</li><li>Conduct thorough business reviews and make on-site client visits to ensure that our clients&#x2019; evolving needs are met and to identify growth possibilities</li><li>Collaborate closely with Sales, Professional Services, Support, Finance, and Product to facilitate seamless handoffs and provide comprehensive guidance to clients throughout their journey</li><li>Develop deep and comprehensive industry and product knowledge</li><li>Serve as the voice of our customers, providing valuable insights to inform our sales processes and shape the product roadmap</li><li>Leverage data-driven insights to create strategic account plans and proactively deliver valuable information to customers, reinforcing the partnership&apos;s value, fostering trust, and nurturing customer advocacy<br><br></li></ul><strong>You&#x2019;ll Bring These Attributes To The Table<br><br></strong><ul><li>Exceptional communication skills to foster trust among your client base and colleagues</li><li>Resilient and gritty attitude, ready to tackle unique challenges and secure long- term client satisfaction</li><li>Ability to proactively identify and address issues, preventing and resolving client concerns</li><li>Positive attitude and a track record of driving positive results through cross- functional collaboration</li><li>Proficiency in data-driven decision-making to drive long-term account success</li><li>Strategic planning skills alongside a proven ability to manage complex accounts collaboratively, efficiently, and effectively</li><li>Experience in managing enterprise clients and overseeing renewals preferably related to solutions in Health &amp; Safety, Procurement, or Supply Chain<br><br></li></ul><strong>Here are just a few of the great reasons you should join our team</strong>!<br><br><ul><li>We are mission-focused and mission-driven to help bring worker home safe every Our training products and compliance platform help keep workers safe.</li><li>Work with a global team! We have colleagues and customers across North America and overseas.</li><li>Veriforce is a great place to work! Our leaders and teams cite culture as one of the top reasons this is a great place to</li><li>Veriforce provides:</li><ul><li>100% paid employee medical and dental insurance</li><li>Monthly contributions to Health Savings Accounts</li><li>A 401(k) match that is immediately fully vested</li><li>Outstanding time off benefits</li><li>Paid time off for volunteer activities</li><li>Remote work<br></li></ul></ul>All job offers will be contingent on successful completion of a drug screen and background check.\n        ",
  "companyId": "542961",
  "benefits": "",
  "posterProfileUrl": "",
  "posterFullName": ""
},
{
  "id": "4298768460",
  "publishedAt": "2025-09-10",
  "salary": "$76,670.00/yr - $90,200.00/yr",
  "title": "Architectural Drafter",
  "jobUrl": "https://www.linkedin.com/jobs/view/architectural-drafter-at-villa-4298768460?trk=public_jobs_topcard-title",
  "companyName": "Villa",
  "companyUrl": "https://www.linkedin.com/company/villa-prefab-homes?trk=public_jobs_topcard-org-name",
  "location": "Colorado, United States",
  "postedTime": "1 hour ago",
  "applicationsCount": "Be among the first 25 applicants",
  "description": "Who We Are\n\nVilla is building America’s leading next-generation homebuilding platform. With a mission to be the easiest, fastest and most cost-efficient way to build homes, Villa is a highly scalable new approach to offsite homebuilding and is critical in solving the many problems facing the U.S. housing market. Villa provides end-to-end services for customers that span feasibility, design, permitting, and construction of high-quality homes built using modern offsite construction. Villa is currently the largest ADU builder in California and is growing rapidly into other housing products and geographies.\n\nRole Overview\nWe are seeking an experienced and organized Architectural Drafter to join our growing team. This role focuses on designing residential urban infill projects using offsite construction methods. The ideal candidate will combine design expertise with strategic insight to develop scalable, impactful housing solutions.\n\nThis is a full-time, remote opportunity reporting to the Head of Product. We are currently considering candidates based in CA, CO, and TX.\n\nWhat You'll Do:\n\n\n\n * Develop architectural concepts for offsite factory partners, ensuring cost efficiency and manufacturability\n * Draft floor plans, elevations, sections, schedules, architectural details, construction set documentation, renderings and 3D models\n * Support the Site Design team to prepare documents and specifications for permitting and construction\n * Ensure all designs align with building codes, regulations, and manufacturing capabilities.\n * Address technical challenges to maintain design integrity\n * Stay up to date with offsite industry trends, materials, and technologies to bring fresh ideas to projects\n * Support the project team in maintaining schedules and delivering projects on time and within budget\n * Curate Villa’s model library\n   \n   \n   \n   \n\nWhat We're Looking For:\n\n\n\n * Minimum high school diploma or equivalent\n * 4+ years of architectural drafting experience with a focus on factory-built housing strongly preferred\n * Strong proficiency in Revit, AutoCAD and Bluebeam\n * Experience with BIM management\n * Expertise in architectural drawings, design, and renders\n * Experience with offsite construction methods\n * Strong understanding of IRC, CRC, and HUD building codes and permitting processes\n * Creative problem-solver with a passion for innovative design\n * Strong attention to detail and organizational skills\n * Excellent English communication and collaboration abilities\n * Growth mindset, adaptability, and willingness to tackle challenges outside of your comfort zone\n * Ability to work in the United States without sponsorship\n   \n   \n   \n   \n\nWe are focused on building a diverse and inclusive workforce. If you're excited about this role, but do not meet 100% of the qualifications, we encourage you to apply.\n\nVilla is an Equal Opportunity Employer and considers applicants for employment without regard to race, color, religion, sex, orientation, national origin, age, disability, genetics, or any other basis forbidden under federal, state, or local law. Pursuant to the San Francisco Fair Chance Ordinance and Los Angeles FCIHO, we will consider for employment qualified applicants with arrest and conviction records.\n\n--\n\nBy clicking \"Submit Application,\" you acknowledge that you have read Villa’s Privacy Policy.\n\nThe compensation band for this role is $76,670 - $90,200 in California (salary band dependent on location).",
  "contractType": "Full-time",
  "experienceLevel": "Not Applicable",
  "workType": "Design, Art/Creative, and Information Technology",
  "sector": "Transportation, Logistics, Supply Chain and Storage",
  "applyType": "EASY_APPLY",
  "applyUrl": "https://www.linkedin.com/jobs/view/architectural-drafter-at-villa-4298768460?trk=public_jobs_topcard-title",
  "descriptionHtml": "\n          Who We Are<br><br>Villa is building America&#x2019;s leading next-generation homebuilding platform. With a mission to be the easiest, fastest and most cost-efficient way to build homes, Villa is a highly scalable new approach to offsite homebuilding and is critical in solving the many problems facing the U.S. housing market. Villa provides end-to-end services for customers that span feasibility, design, permitting, and construction of high-quality homes built using modern offsite construction. Villa is currently the largest ADU builder in California and is growing rapidly into other housing products and geographies.<br><br><strong>Role Overview<br></strong>We are seeking an experienced and organized Architectural Drafter to join our growing team. This role focuses on designing residential urban infill projects using offsite construction methods. The ideal candidate will combine design expertise with strategic insight to develop scalable, impactful housing solutions.<br><br>This is a full-time, remote opportunity reporting to the Head of Product. We are currently considering candidates based in CA, CO, and TX.<br><br><strong>What You&apos;ll Do:<br><br><br></strong><ul><li>Develop architectural concepts for offsite factory partners, ensuring cost efficiency and manufacturability</li><li>Draft floor plans, elevations, sections, schedules, architectural details, construction set documentation, renderings and 3D models</li><li>Support the Site Design team to prepare documents and specifications for permitting and construction</li><li>Ensure all designs align with building codes, regulations, and manufacturing capabilities. </li><li>Address technical challenges to maintain design integrity</li><li>Stay up to date with offsite industry trends, materials, and technologies to bring fresh ideas to projects</li><li>Support the project team in maintaining schedules and delivering projects on time and within budget</li><li>Curate Villa&#x2019;s model library<br><br><br><br></li></ul><strong>What We&apos;re Looking For:<br><br><br></strong><ul><li>Minimum high school diploma or equivalent</li><li>4+ years of architectural drafting experience with a focus on factory-built housing strongly preferred</li><li>Strong proficiency in Revit, AutoCAD and Bluebeam</li><li>Experience with BIM management</li><li>Expertise in architectural drawings, design, and renders</li><li>Experience with offsite construction methods</li><li>Strong understanding of IRC, CRC, and HUD building codes and permitting processes</li><li>Creative problem-solver with a passion for innovative design</li><li>Strong attention to detail and organizational skills</li><li>Excellent English communication and collaboration abilities</li><li>Growth mindset, adaptability, and willingness to tackle challenges outside of your comfort zone</li><li>Ability to work in the United States without sponsorship<br><br><br><br></li></ul>We are focused on building a diverse and inclusive workforce. If you&apos;re excited about this role, but do not meet 100% of the qualifications, we encourage you to apply.<br><br>Villa is an Equal Opportunity Employer and considers applicants for employment without regard to race, color, religion, sex, orientation, national origin, age, disability, genetics, or any other basis forbidden under federal, state, or local law. Pursuant to the San Francisco Fair Chance Ordinance and Los Angeles FCIHO, we will consider for employment qualified applicants with arrest and conviction records.<br><br>--<br><br>By clicking &quot;Submit Application,&quot; you acknowledge that you have read Villa&#x2019;s Privacy Policy.<br><br>The compensation band for this role is &#x24;76,670 - &#x24;90,200 in California (salary band dependent on location).\n        ",
  "companyId": "53482651",
  "benefits": "",
  "posterProfileUrl": "",
  "posterFullName": ""
},
{
  "id": "4298390819",
  "publishedAt": "2025-09-10",
  "salary": "",
  "title": "Manager-Procurement & Supply Chain",
  "jobUrl": "https://www.linkedin.com/jobs/view/manager-procurement-supply-chain-at-bluechew-4298390819?trk=public_jobs_topcard-title",
  "companyName": "BlueChew",
  "companyUrl": "https://www.linkedin.com/company/bluechew?trk=public_jobs_topcard-org-name",
  "location": "Greater Chicago Area",
  "postedTime": "1 hour ago",
  "applicationsCount": "Be among the first 25 applicants",
  "description": "Meds.com is a rapidly growing consumer technology firm operating a suite of healthcare businesses, including our flagship brand BlueChew. Our mission is to better patients' lives through innovative healthcare solutions. With a team of 300 professionals across various specialties, we've built scalable pharmacy, telemedicine, and e-commerce platforms using cutting-edge technology. As we continue our accelerated growth trajectory, we're launching new products to expand our patient base and accelerate growth. Join us in tackling exciting challenges at the intersection of healthcare and technology.\n\nAs the Manager of Supply Chain and Procurement, you will report directly to our COO and will be responsible for overseeing and managing all aspects of the procurement process within our organization. Your primary objective will be to ensure that the company procures goods, services, and materials in accordance with company specs at the most competitive prices while adhering to established policies, procedures, and regulations. You will develop strategic procurement plans, cultivate supplier relationships, negotiate contracts, and drive cost-saving initiatives.\n\nThe ideal candidate will possess exceptional leadership, negotiation, and analytical skills, along with a strong understanding of procurement best practices, forecasting, and market trends.\n\nAs the company has grown, this role has become increasingly critical in ensuring that inventory and supply levels are properly maintained. This includes all aspects of inventory management. And just as important, the communication among stakeholders as it relates to tracking inventory movement from PO to customer delivery is always top of mind.\n\nThe role will include 5+ inventory locations. We currently use NetSuite as our ERP and inventory management system so experience with NetSuite and specifically the inventory module is critical. We’re looking for someone who genuinely wants to work in the office, not just tolerates it.\n\nWhat You'll Do\n\n\n * Assist the Operations, Quality and Finance and Pharmacy teams in the transition to and ongoing maintenance of NetSuite for all purchasing and inventory related functions\n * Develop and implement strategic procurement plans aligned with the company’s goals and objectives.\n * Oversee the entire procurement process, from sourcing suppliers to negotiating contracts and managing supplier relationships.\n * Collaborate with the team to understand their procurement needs and requirements, ensuring timely and cost-effective procurement of goods and services\n * Conduct market research and analysis to identify potential suppliers, assess market trends, and leverage opportunities for cost savings and process improvements.\n * Negotiate contracts and agreements with suppliers, ensuring favorable terms, pricing and conditions while mitigating risks.\n * Develop and maintain strong relationships with key suppliers and vendors, fostering collaboration, transparency, and mutual trust.\n * Monitor supplier performance and compliance with contractual obligations, addressing any issues or concerns as they arise.\n * Establish and maintain procurement policies, procedures, and controls to ensure compliance with legal and regulatory requirements.\n * Implement Supplier Relationship Manager to streamline processes, improve efficiency and enhance visibility into procurement activities.\n * Prepare and present periodic KPIs, other metrics, and analyses on procurement, transportation and inventory performance, highlighting achievements, challenges and opportunities for improvement.\n   \n   \n   \n   \n\nQualifications\n\n\n * NetSuite experience strongly preferred\n * Bachelor’s Degree in Business Administration, Supply Chain Management, or a related field\n * 5-10 years of proven experience in procurement or supply chain management, with a focus on strategic sourcing, contract negotiation and supplier management\n * Experience in the pharma industry a plus\n * Subject matter expertise in various categories including finance and operations, procurement best practices, market dynamics, inventory management, transportation and industry trends\n * Collaborative team player and leader, able to build a positive work environment\n * Strong sense of ownership and sense of urgency, driven and motivated\n * Ability to lead and influence change in the face of complexity and ambiguity\n * Effective communication and presentation competencies\n * Required proficiency in MS Office Suite (Excel, Word, PowerPoint)\n * Knowledge of internal sourcing/procurement procedures and processes, and of the external trends, and best practices\n * Effective relationship-building skills and the ability to work with people at all levels in the organization\n * Exceptional negotiation skills, analytical and problem-solving skills, with the ability to analyze data, identify opportunities, and drive informed decision-making\n * Spend analysis experience analyzing different channels\n   \n   \n   \n   \n\nPhysical Requirements\n\n\n * Prolonged periods sitting at a desk and working on a computer\n * Must be able to lift up to 15 pounds at times\n   \n   \n   \n   \n\nPerks\n\n\n\n * 100% company-paid Medical, Dental, Vision premium coverage plus Short-Term Disability and Life Insurance\n * 401K with company match to secure your future\n * Paid time off and company-paid holidays to help you unwind\n * Enjoy free daily lunch to keep you energized and focused\n   \n   \n   \n   \n\nWe are looking for top-talent that wants to make a measurable impact in an exciting, fast-paced environment. This role is full-time in Elmhurst, IL.\n\n",
  "contractType": "Full-time",
  "experienceLevel": "Mid-Senior level",
  "workType": "Purchasing and Supply Chain",
  "sector": "Hospitality, Food and Beverage Services, and Retail",
  "applyType": "EASY_APPLY",
  "applyUrl": "https://www.linkedin.com/jobs/view/manager-procurement-supply-chain-at-bluechew-4298390819?trk=public_jobs_topcard-title",
  "descriptionHtml": "\n          Meds.com is a rapidly growing consumer technology firm operating a suite of healthcare businesses, including our flagship brand BlueChew. Our mission is to better patients&apos; lives through innovative healthcare solutions. With a team of 300 professionals across various specialties, we&apos;ve built scalable pharmacy, telemedicine, and e-commerce platforms using cutting-edge technology. As we continue our accelerated growth trajectory, we&apos;re launching new products to expand our patient base and accelerate growth. Join us in tackling exciting challenges at the intersection of healthcare and technology.<br><br>As the Manager of Supply Chain and Procurement, you will report directly to our COO and will be responsible for overseeing and managing all aspects of the procurement process within our organization. Your primary objective will be to ensure that the company procures goods, services, and materials in accordance with company specs at the most competitive prices while adhering to established policies, procedures, and regulations. You will develop strategic procurement plans, cultivate supplier relationships, negotiate contracts, and drive cost-saving initiatives.<br><br>The ideal candidate will possess exceptional leadership, negotiation, and analytical skills, along with a strong understanding of procurement best practices, forecasting, and market trends.<br><br>As the company has grown, this role has become increasingly critical in ensuring that inventory and supply levels are properly maintained. This includes all aspects of inventory management. And just as important, the communication among stakeholders as it relates to tracking inventory movement from PO to customer delivery is always top of mind.<br><br>The role will include 5+ inventory locations. We currently use NetSuite as our ERP and inventory management system so experience with NetSuite and specifically the inventory module is critical. We&#x2019;re looking for someone who genuinely wants to work in the office, not just tolerates it.<br><br><strong>What You&apos;ll Do<br><br></strong><ul><li>Assist the Operations, Quality and Finance and Pharmacy teams in the transition to and ongoing maintenance of NetSuite for all purchasing and inventory related functions</li><li>Develop and implement strategic procurement plans aligned with the company&#x2019;s goals and objectives. </li><li>Oversee the entire procurement process, from sourcing suppliers to negotiating contracts and managing supplier relationships. </li><li>Collaborate with the team to understand their procurement needs and requirements, ensuring timely and cost-effective procurement of goods and services</li><li>Conduct market research and analysis to identify potential suppliers, assess market trends, and leverage opportunities for cost savings and process improvements. </li><li>Negotiate contracts and agreements with suppliers, ensuring favorable terms, pricing and conditions while mitigating risks. </li><li>Develop and maintain strong relationships with key suppliers and vendors, fostering collaboration, transparency, and mutual trust. </li><li>Monitor supplier performance and compliance with contractual obligations, addressing any issues or concerns as they arise. </li><li>Establish and maintain procurement policies, procedures, and controls to ensure compliance with legal and regulatory requirements. </li><li>Implement Supplier Relationship Manager to streamline processes, improve efficiency and enhance visibility into procurement activities. </li><li>Prepare and present periodic KPIs, other metrics, and analyses on procurement, transportation and inventory performance, highlighting achievements, challenges and opportunities for improvement. <br><br><br><br></li></ul><strong>Qualifications<br><br></strong><ul><li>NetSuite experience strongly preferred </li><li>Bachelor&#x2019;s Degree in Business Administration, Supply Chain Management, or a related field</li><li>5-10 years of proven experience in procurement or supply chain management, with a focus on strategic sourcing, contract negotiation and supplier management</li><li>Experience in the pharma industry a plus</li><li>Subject matter expertise in various categories including finance and operations, procurement best practices, market dynamics, inventory management, transportation and industry trends</li><li>Collaborative team player and leader, able to build a positive work environment</li><li>Strong sense of ownership and sense of urgency, driven and motivated</li><li>Ability to lead and influence change in the face of complexity and ambiguity</li><li>Effective communication and presentation competencies</li><li>Required proficiency in MS Office Suite (Excel, Word, PowerPoint) </li><li>Knowledge of internal sourcing/procurement procedures and processes, and of the external trends, and best practices</li><li>Effective relationship-building skills and the ability to work with people at all levels in the organization</li><li>Exceptional negotiation skills, analytical and problem-solving skills, with the ability to analyze data, identify opportunities, and drive informed decision-making</li><li>Spend analysis experience analyzing different channels<br><br><br><br></li></ul><strong>Physical Requirements<br><br></strong><ul><li>Prolonged periods sitting at a desk and working on a computer</li><li>Must be able to lift up to 15 pounds at times<br><br><br><br></li></ul><strong>Perks<br><br><br></strong><ul><li>100% company-paid Medical, Dental, Vision premium coverage plus Short-Term Disability and Life Insurance</li><li>401K with company match to secure your future</li><li>Paid time off and company-paid holidays to help you unwind</li><li>Enjoy free daily lunch to keep you energized and focused<br><br><br><br></li></ul>We are looking for top-talent that wants to make a measurable impact in an exciting, fast-paced environment. This role is full-time in Elmhurst, IL.<br><br>\n        ",
  "companyId": "89931472",
  "benefits": "",
  "posterProfileUrl": "https://www.linkedin.com/in/rubina-gul128",
  "posterFullName": "Rubina Gul"
},
{
  "id": "4298765050",
  "publishedAt": "2025-09-10",
  "salary": "$75,000.00/yr - $90,000.00/yr",
  "title": "Client Marketing and Strategy Coordinator",
  "jobUrl": "https://www.linkedin.com/jobs/view/client-marketing-and-strategy-coordinator-at-roku-4298765050?trk=public_jobs_topcard-title",
  "companyName": "Roku",
  "companyUrl": "https://www.linkedin.com/company/roku?trk=public_jobs_topcard-org-name",
  "location": "New York, NY",
  "postedTime": "1 hour ago",
  "applicationsCount": "Over 200 applicants",
  "description": "Teamwork makes the stream work.\n\n \n\nRoku is changing how the world watches TV\n\nRoku is the #1 TV streaming platform in the U.S., Canada, and Mexico, and we've set our sights on powering every television in the world. Roku pioneered streaming to the TV. Our mission is to be the TV streaming platform that connects the entire TV ecosystem. We connect consumers to the content they love, enable content publishers to build and monetize large audiences, and provide advertisers unique capabilities to engage consumers.\n\nFrom your first day at Roku, you'll make a valuable - and valued - contribution. We're a fast-growing public company where no one is a bystander. We offer you the opportunity to delight millions of TV streamers around the world while gaining meaningful experience across a variety of disciplines.\n\n \n\nAbout the team  \n\nAt Roku, we embody the mentality of a sports team, becoming our strongest when we work together (cross functionally) to reach an end goal. The Client Marketing and Strategy team acts as the quarterback to sales, helping to build long term strategies and solutions that ultimately aid in revenue growth and deepen partnerships with agency holding companies and priority accounts. In partnership with sales, we ensure our clients are constantly evolving to build successful CTV strategies, test and adopt new products, and build the future of TV together.  \n  \n\nAbout the role  \n\nRoku pioneered streaming to the TV and continues to innovate and lead the industry. While we are well-positioned to help shape the future of television – including TV advertising – around the world, continued success relies on building a marketing and ad strategy that grows Roku’s advertising business.  \n\nAs the Client Marketing and Strategy Coordinator, you will wear many hats supporting and leading strategic projects within the Client Marketing and Strategy team. This role is ideal for a strategic thinker who is proactive, solutions-oriented, and prides themselves on being an excellent communicator. \n\n For New York Only - The estimated annual salary for this position is between $75,000 - $90,000 annually.\n\nCompensation packages are based on factors unique to each candidate, including but not limited to skill set, certifications, and specific geographical location.\n\nThis role is eligible for health insurance, equity awards, life insurance, disability benefits, parental leave, wellness benefits, and paid time off.\n\n \n\nWhat You'll Be Doing  \n * Partner closely with the head of Client Marketing and Strategy, Events, and Sales on strategic tentpoles such as CES, Cannes, and Possible\n * Implement and execute scalable marketing programs to deepen and expand client relationships, as well as increase annual media commitments\n * Manage team repositories to ensure the latest narratives, insights, proposals, mocks, and case studies are up to date, organized, and easy to find\n * Quarterback the creation of custom sales collateral and proposals \n * Responsible for tracking changes and updates in Salesforce and Asana, and mining the data, to build an annual calendar and monthly reports of the team output\n * Act as the liaison between Client Marketing and Strategy, Demand Marketing, and Comms to ensure assets and approvals meet deadlines\n * Track changes and announcements across the industry to understand the key Holding Companies, Operating Companies, and client brands within their portfolio \n * Manage team-wide meetings  \n\n \n\nWe're Excited If You Have  \n * 2+ years of experience in marketing, media, or sales, ideally in an advertising team at a platform or publisher \n * Proven track record of successfully collaborating cross-functionally to bring complex programs to life\n * Strong project management skills with the ability to juggle multiple timelines and stakeholders\n * Executive presence and comfort working across Sales, Product, Data, Comms, and Events\n * Exceptional verbal and written communication and storytelling skills\n * A self-starter approach with the ability to identify gaps or problems and proactively take action\n * “No job is too big or too small” mentality -- you’re a long-term thinker and a short-term doer\n * A solutions-oriented mindset who can easily adapt to ever changing needs\n * College degree or equivalent\n\nBenefits\n\nRoku is committed to offering a diverse range of benefits as part of our compensation package to support our employees and their families. Our comprehensive benefits include global access to mental health and financial wellness support and resources. Local benefits include statutory and voluntary benefits which may include healthcare (medical, dental, and vision), life, accident, disability, commuter, and retirement options (401(k)/pension). Our employees can take time off work for vacation and other personal reasons to balance their evolving work and life needs. It's important to note that not every benefit is available in all locations or for every role. For details specific to your location, please consult with your recruiter.\n\n \n\nThe Roku Culture\n\nRoku is a great place for people who want to work in a fast-paced environment where everyone is focused on the company's success rather than their own. We try to surround ourselves with people who are great at their jobs, who are easy to work with, and who keep their egos in check. We appreciate a sense of humor. We believe a fewer number of very talented folks can do more for less cost than a larger number of less talented teams. We're independent thinkers with big ideas who act boldly, move fast and accomplish extraordinary things through collaboration and trust. In short, at Roku you'll be part of a company that's changing how the world watches TV. \n\nWe have a unique culture that we are proud of. We think of ourselves primarily as problem-solvers, which itself is a two-part idea. We come up with the solution, but the solution isn't real until it is built and delivered to the customer. That penchant for action gives us a pragmatic approach to innovation, one that has served us well since 2002. \n\nTo learn more about Roku, our global footprint, and how we've grown, visit https://www.weareroku.com/factsheet.\n\nBy providing your information, you acknowledge that you want Roku to contact you about job roles, that you have read Roku's Applicant Privacy Notice, and understand that Roku will use your information as described in that notice. If you do not wish to receive any communications from Roku regarding this role or similar roles in the future, you may unsubscribe here at any time.",
  "contractType": "Full-time",
  "experienceLevel": "Mid-Senior level",
  "workType": "Marketing and Sales",
  "sector": "Software Development",
  "applyType": "EASY_APPLY",
  "applyUrl": "https://www.linkedin.com/jobs/view/client-marketing-and-strategy-coordinator-at-roku-4298765050?trk=public_jobs_topcard-title",
  "descriptionHtml": "\n          Teamwork makes the stream work.<p>&#xa0;</p><strong>Roku is changing how the world watches TV</strong><p>Roku is the #1 TV streaming platform in the U.S., Canada, and Mexico, and we&apos;ve set our sights on powering every television in the world. Roku pioneered streaming to the TV. Our mission is to be the TV streaming platform that connects the entire TV ecosystem. We connect consumers to the content they love, enable content publishers to build and monetize large audiences, and provide advertisers unique capabilities to engage consumers.</p><p>From your first day at Roku, you&apos;ll make a valuable - and valued - contribution. We&apos;re a fast-growing public company where no one is a bystander. We offer you the opportunity to delight millions of TV streamers around the world while gaining meaningful experience across a variety of disciplines.</p><p>&#xa0;</p> About the team&#x202f;&#xa0;<p>At Roku, we embody the mentality of a sports team, becoming our strongest when we work together (cross functionally) to reach an end goal. The Client Marketing and Strategy team acts as the quarterback to sales, helping to build long term strategies and solutions that ultimately aid in revenue growth and deepen partnerships with agency holding companies and priority accounts. In partnership with sales, we ensure our clients are constantly evolving to build successful CTV strategies, test and adopt new products, and build the future of TV together.&#x202f;&#xa0;<br>&#x202f;&#xa0;</p>About the role&#x202f;&#xa0;<p>Roku pioneered streaming to the TV and continues to innovate and lead the industry. While we are well-positioned to help shape the future of television &#x2013; including TV advertising &#x2013; around the world, continued success relies on building a marketing and ad strategy that grows Roku&#x2019;s advertising business.&#x202f;&#xa0;</p><p>As the Client Marketing and Strategy Coordinator, you will wear many hats supporting and leading strategic projects within the Client Marketing and Strategy team. This role is ideal for a strategic thinker who is proactive, solutions-oriented, and prides themselves on being an excellent communicator.&#xa0;</p><p>&#x202f;For New York Only - The estimated annual salary for this position is between &#x24;75,000 - &#x24;90,000 annually.</p><p>Compensation packages are based on factors unique to each candidate, including but not limited to skill set, certifications, and specific geographical location.</p><p>This role is eligible for health insurance, equity awards, life insurance, disability benefits, parental leave, wellness benefits, and paid time off.</p><p>&#xa0;</p>What You&apos;ll Be Doing&#x202f;&#xa0;<ul><li>Partner closely with the head of Client Marketing and Strategy, Events, and Sales on strategic tentpoles such as CES, Cannes, and Possible</li><li>Implement and execute scalable marketing programs to deepen and expand client relationships, as well as increase annual media commitments</li><li>Manage team repositories to ensure the latest narratives, insights, proposals, mocks, and case studies are up to date, organized, and easy to find</li><li>Quarterback the creation of custom sales collateral and proposals&#xa0;</li><li>Responsible for tracking changes and updates in Salesforce and Asana, and mining the data, to build an annual calendar and monthly reports of the team output</li><li>Act as the liaison between Client Marketing and Strategy, Demand Marketing, and Comms to ensure assets and approvals meet deadlines</li><li>Track changes and announcements across the industry to understand the key Holding Companies, Operating Companies, and client brands within their portfolio&#xa0;</li><li>Manage team-wide meetings&#xa0;&#xa0;</li></ul><p>&#xa0;</p>We&apos;re Excited If You Have&#x202f;&#xa0;<ul><li>2+ years of experience in marketing, media, or sales, ideally in an advertising team at a platform or publisher&#xa0;</li><li>Proven track record of successfully collaborating cross-functionally to bring complex programs to life</li><li>Strong project management skills with the ability to juggle multiple timelines and stakeholders</li><li>Executive presence and comfort working across Sales, Product, Data, Comms, and Events</li><li>Exceptional verbal and written communication and storytelling skills</li><li>A self-starter approach with the ability to identify gaps or problems and proactively take action</li><li>&#x201c;No job is too big or too small&#x201d; mentality -- you&#x2019;re a long-term thinker and a short-term doer</li><li>A solutions-oriented mindset who can easily adapt to ever changing needs</li><li>College degree or equivalent</li></ul> <strong>Benefits</strong><p>Roku is committed to offering a diverse range of benefits as part of our compensation package to support our employees and their families. Our comprehensive benefits include global access to mental health and financial wellness support and resources. Local benefits include statutory and voluntary benefits which may include healthcare (medical, dental, and vision), life, accident, disability, commuter, and retirement options (401(k)/pension). Our employees can take time off work for vacation and other personal reasons to balance their evolving work and life needs. It&apos;s important to note that not every benefit is available in all locations or for every role. For details specific to your location, please consult with your recruiter.</p><p>&#xa0;</p><strong>The Roku Culture</strong><p>Roku is a great place for people who want to work in a fast-paced environment where everyone is focused on the company&apos;s success rather than their own. We try to surround ourselves with people who are great at their jobs, who are easy to work with, and who keep their egos in check. We appreciate a sense of humor. We believe a fewer number of very talented folks can do more for less cost than a larger number of less talented teams. We&apos;re independent thinkers with big ideas who act boldly, move fast and accomplish extraordinary things through collaboration and trust. In short, at Roku you&apos;ll be part of a company that&apos;s changing how the world watches TV.&#x202f;</p><p>We have a unique culture that we are proud of. We think of ourselves primarily as problem-solvers, which itself is a two-part idea. We come up with the solution, but the solution isn&apos;t real until it is built and delivered to the customer. That penchant for action gives us a pragmatic approach to innovation, one that has served us well since 2002.&#x202f;</p><p>To learn more about Roku, our global footprint, and how we&apos;ve grown, visit https://www.weareroku.com/factsheet.</p><p>By providing your information, you acknowledge that you want Roku to contact you about job roles, that you have read Roku&apos;s Applicant Privacy Notice, and understand that Roku will use your information as described in that notice. If you do not wish to receive any communications from Roku regarding this role or similar roles in the future, you may unsubscribe here at any time.</p>\n        ",
  "companyId": "50076",
  "benefits": "",
  "posterProfileUrl": "",
  "posterFullName": ""
},
{
  "id": "4297337033",
  "publishedAt": "2025-09-10",
  "salary": "$105,000.00/yr - $125,000.00/yr",
  "title": "Chief of Staff, Strategy and Business Operations",
  "jobUrl": "https://www.linkedin.com/jobs/view/chief-of-staff-strategy-and-business-operations-at-bergdorf-goodman-4297337033?trk=public_jobs_topcard-title",
  "companyName": "Bergdorf Goodman",
  "companyUrl": "https://www.linkedin.com/company/bergdorf-goodman?trk=public_jobs_topcard-org-name",
  "location": "New York, NY",
  "postedTime": "1 hour ago",
  "applicationsCount": "Over 200 applicants",
  "description": "WHO WE ARE:\n\nSaks Global is the largest multi-brand luxury retailer in the world, comprising Saks Fifth Avenue, Neiman Marcus, Bergdorf Goodman, Saks OFF 5TH, Last Call and Horchow. Its retail portfolio includes 70 full-line luxury locations, additional off-price locations and five distinct e-commerce experiences. With talented colleagues focused on delivering on our strategic vision, The Art of You, Saks Global is redefining luxury shopping by offering each customer a personalized experience that is unmistakably their own. By leveraging the most comprehensive luxury customer data platform in North America, cutting-edge technology, and strong partnerships with the world's most esteemed brands, Saks Global is shaping the future of luxury retail.\n\n\n\n\nSaks Global Properties & Investments includes Saks Fifth Avenue and Neiman Marcus flagship properties and represents nearly 13 million square feet of prime U.S. real estate holdings and investments in luxury markets.\n\n\n\n\nYOU WILL BE:\n\nThe Strategy & Business Operations Chief of Staff will report to the President, Bergdorf Goodman, and will have an immediate impact on the organization, responsible for increasing the effectiveness of group governance and decision-making, working with the group leadership team on strategy, and supporting the President. The ideal candidate will have proven experience in a business management / management consulting role, with a focus on driving executive-level decision-making and interdepartmental collaboration. This is an exciting opportunity for an individual with an entrepreneurial spirit to support key projects and initiatives across the company. The ideal candidate possesses strong leadership qualities and is detail-oriented, organized, analytical, and has a strong strategic skillset.\n\n\n\n\nWHAT YOU WILL DO:\n\n * Provides thought partnership to the President on the company’s strategic direction and the group leadership team’s priorities, including strategy development, evaluating new ideas and business opportunities, and conducting analysis and research to support key decisions\n * Leads special strategic projects that the President personally oversees (or has a keen interest in), including driving to successful outcomes\n * Drives content creation and briefs for key internal and external meetings/initiatives (contributes to SGMT materials, key client meetings, executive offsites, etc.)\n * Partners with BG leadership team to help drive performance goals that result in successful execution of strategic agenda\n * Partners with leaders and cross-functional teams to drive effective collaboration toward strategic goals and objectives\n * Drives successful execution of Bergdorf Goodman governance process, including all logistics coordination, content coordination, and critical decisioning\n * Oversee development of support structures, and support documents / templates\n * Drives accountability across key business leaders / key governance forums by tracking / monitoring progress toward key milestones / action items\n * Establishes and manages key meeting / communications cadences\n * Acts as a proxy for the President, advising key leaders on best practices for getting alignment on decisions\n * Prepares and facilitates senior leadership team meetings; accountable for setting the agenda, providing insights and analysis to inform strategic conversations, and capturing and ensuring action against next steps\n * Consolidates and synthesizes information across the business into digestible reports for the President\n * Helps complete priority items for the President to an appropriate level of quality\n * Identifies ways to improve the President office’s operational workflow and drive process improvements\n * Look holistically across workstreams to identify potential issues\n * Draft communications from the President and senior leaders to the organization\n\n\n\n\nWHAT YOU WILL BRING:\n\n * NYC based role\n * 10+ years in a Strategy / management consulting experience\n * Impeccable managerial and interpersonal skills\n * Proven track record of effectively interacting with senior management\n * Ability to work strategically and collaboratively across departments\n * Nimble business mind with a focus on developing creative solutions\n * Flexible, versatile, and action-oriented\n * Excellent communication skills\n * Ability to work independently\n * Detail oriented\n * Bachelor's degree from a four-year college or university\n * Experience with data analysis\n\n\n\n\nYOUR LIFE AND CAREER AT SAKS GLOBAL:\n\n\n\n\n * Opportunity to work in a dynamic fast paced environment at a company experiencing growth and transformation\n * Exposure to rewarding career advancement opportunities across the largest multi-brand luxury retailer from retail to distribution, to digital or corporate\n * Comprehensive benefits package for all eligible full-time employees (including medical, vision and dental)\n * An amazing employee discount\n\n\n\n\n\n\n\nBenefits: We offer the following benefits for this position, subject to applicable eligibility requirements: medical insurance, dental insurance, vision insurance, 401(k) retirement plan, basic life insurance, supplemental life insurance, disability insurance, and a variety of additional voluntary benefits (such as critical illness, hospital and accident insurance).\n\n\n\n\n\n\n\nIt is unlawful in Massachusetts to require or administer a lie detector test as a condition of employment or continued employment. An employer who violates this law shall be subject to criminal penalties and civil liability.\n\n\n\n\n\n\n\nSaks.com is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees.\n\n\n\n\n\n\n\n*The above expected salary range may have some variability based upon factors including, but not limited to, a candidate’s overall experience, qualifications, and geographic location. If you are interested in the role, we encourage you to apply and, if selected to move forward in the interview process, you will have a chance to speak with our recruitment team regarding your specific salary expectations.\n\n",
  "contractType": "Full-time",
  "experienceLevel": "Mid-Senior level",
  "workType": "Strategy/Planning",
  "sector": "Retail, Retail Luxury Goods and Jewelry, and Retail Apparel and Fashion",
  "applyType": "EASY_APPLY",
  "applyUrl": "https://www.linkedin.com/jobs/view/chief-of-staff-strategy-and-business-operations-at-bergdorf-goodman-4297337033?trk=public_jobs_topcard-title",
  "descriptionHtml": "\n          <p><strong>WHO WE ARE: </strong></p><p>Saks Global is the largest multi-brand luxury retailer in the world, comprising Saks Fifth Avenue, Neiman Marcus, Bergdorf Goodman, Saks OFF 5TH, Last Call and Horchow. Its retail portfolio includes 70 full-line luxury locations, additional off-price locations and five distinct e-commerce experiences. With talented colleagues focused on delivering on our strategic vision, <em>The Art of You,</em> Saks Global is redefining luxury shopping by offering each customer a personalized experience that is unmistakably their own<em>. </em>By leveraging the most comprehensive luxury customer data platform in North America, cutting-edge technology, and strong partnerships with the world&apos;s most esteemed brands, Saks Global is shaping the future of luxury retail.</p><p><br></p><p>Saks Global Properties &amp; Investments includes Saks Fifth Avenue and Neiman Marcus flagship properties and represents nearly 13 million square feet of prime U.S. real estate holdings and investments in luxury markets.</p><p><br></p><p><strong>YOU WILL BE: </strong></p><p>The Strategy &amp; Business Operations Chief of Staff will report to the President, Bergdorf Goodman, and will have an immediate impact on the organization, responsible for increasing the effectiveness of group governance and decision-making, working with the group leadership team on strategy, and supporting the President. The ideal candidate will have proven experience in a business management / management consulting role, with a focus on driving executive-level decision-making and interdepartmental collaboration. This is an exciting opportunity for an individual with an entrepreneurial spirit to support key projects and initiatives across the company. The ideal candidate possesses strong leadership qualities and is detail-oriented, organized, analytical, and has a strong strategic skillset.</p><p><br></p><p><strong>WHAT YOU WILL DO: </strong></p><ul><li>Provides thought partnership to the President on the company&#x2019;s strategic direction and the group leadership team&#x2019;s priorities, including strategy development, evaluating new ideas and business opportunities, and conducting analysis and research to support key decisions</li><li>Leads special strategic projects that the President personally oversees (or has a keen interest in), including driving to successful outcomes</li><li>Drives content creation and briefs for key internal and external meetings/initiatives (contributes to SGMT materials, key client meetings, executive offsites, etc.)</li><li>Partners with BG leadership team to help drive performance goals that result in successful execution of strategic agenda</li><li>Partners with leaders and cross-functional teams to drive effective collaboration toward strategic goals and objectives</li><li>Drives successful execution of Bergdorf Goodman governance process, including all logistics coordination, content coordination, and critical decisioning</li><li>Oversee development of support structures, and support documents / templates</li><li>Drives accountability across key business leaders / key governance forums by tracking / monitoring progress toward key milestones / action items</li><li>Establishes and manages key meeting / communications cadences</li><li>Acts as a proxy for the President, advising key leaders on best practices for getting alignment on decisions</li><li>Prepares and facilitates senior leadership team meetings; accountable for setting the agenda, providing insights and analysis to inform strategic conversations, and capturing and ensuring action against next steps</li><li>Consolidates and synthesizes information across the business into digestible reports for the President</li><li>Helps complete priority items for the President to an appropriate level of quality</li><li>Identifies ways to improve the President office&#x2019;s operational workflow and drive process improvements</li><li>Look holistically across workstreams to identify potential issues</li><li>Draft communications from the President and senior leaders to the organization</li></ul><p><br></p><p><strong>WHAT YOU WILL BRING: </strong></p><ul><li>NYC based role</li><li>10+ years in a Strategy / management consulting experience</li><li>Impeccable managerial and interpersonal skills</li><li>Proven track record of effectively interacting with senior management</li><li>Ability to work strategically and collaboratively across departments</li><li>Nimble business mind with a focus on developing creative solutions</li><li>Flexible, versatile, and action-oriented</li><li>Excellent communication skills</li><li>Ability to work independently</li><li>Detail oriented</li><li>Bachelor&apos;s degree from a four-year college or university</li><li>Experience with data analysis</li></ul><p><br></p><p><strong>YOUR LIFE AND CAREER AT SAKS GLOBAL:</strong></p><p><br></p><ul><li>Opportunity to work in a dynamic fast paced environment at a company experiencing growth and transformation</li><li>Exposure to rewarding career advancement opportunities across the largest multi-brand luxury retailer from retail to distribution, to digital or corporate</li><li>Comprehensive benefits package for all eligible full-time employees (including medical, vision and dental)</li><li>An amazing employee discount</li></ul><p><br></p><p><br></p><p>Benefits: We offer the following benefits for this position, subject to applicable eligibility requirements: medical insurance, dental insurance, vision insurance, 401(k) retirement plan, basic life insurance, supplemental life insurance, disability insurance, and a variety of additional voluntary benefits (such as critical illness, hospital and accident insurance).</p><p><br></p><p><br></p><p>It is unlawful in Massachusetts to require or administer a lie detector test as a condition of employment or continued employment. An employer who violates this law shall be subject to criminal penalties and civil liability.</p><p><br></p><p><br></p><p><em>Saks.com is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees. </em></p><p><br></p><p><br></p><p>*The above expected salary range may have some variability based upon factors including, but not limited to, a candidate&#x2019;s overall experience, qualifications, and geographic location. If you are interested in the role, we encourage you to apply and, if selected to move forward in the interview process, you will have a chance to speak with our recruitment team regarding your specific salary expectations.</p><p></p>\n        ",
  "companyId": "162692",
  "benefits": "Medical insurance\nVision insurance\nDental insurance\n401(k)\nPaid maternity leave\nPaid paternity leave",
  "posterProfileUrl": "https://www.linkedin.com/in/victoria-mcgannon-5432388b",
  "posterFullName": "Victoria McGannon"
},
{
  "id": "4298783055",
  "publishedAt": "2025-09-10",
  "salary": "$60,000.00/yr - $125,000.00/yr",
  "title": "Education Sales Consultant",
  "jobUrl": "https://www.linkedin.com/jobs/view/education-sales-consultant-at-finalsite-4298783055?trk=public_jobs_topcard-title",
  "companyName": "Finalsite",
  "companyUrl": "https://www.linkedin.com/company/finalsite?trk=public_jobs_topcard-org-name",
  "location": "United States",
  "postedTime": "22 minutes ago",
  "applicationsCount": "Be among the first 25 applicants",
  "description": "Finalsite is the first community relationship management platform for K-12 schools, transforming how schools attract students, engage families, build community — and thrive. More than 7,000 schools and districts worldwide trust Finalsite’s integrated platform for their websites, communications, mobile apps, enrollment, and marketing services. Finalsite is headquartered in Glastonbury, CT, USA with employees who work remotely in nearly every state in the U.S. as well as Europe, South America, and Asia. For more information, please visit www.finalsite.com.\n\nVISION\n\nFinalsite will transform the way school communities engage with their schools.\n\nSummary Of The Role\n\nThe Education Sales Consultant drives Finalsite’s revenue growth across the state of Texas and other areas as assigned by identifying, qualifying, and closing new sales opportunities of our communication solutions and digital marketing services.\n\nLOCATION\n\n100% Remote - Anywhere within the US\n\nResponsibilities\n\nEssential Functions\n\n\n * Communicate: Be a great phone, email, web meeting, and in-person conversationalist\n * Understand the K12 market: Engage with decision-makers to understand the unique challenges and needs of K-12 Public Schools.\n * Know the people: Understand, relate to, and develop executive-level relationships (e.g., Superintendent, Chief Communications Officer, Chief of Staff, Chief Technology Officer, Director of Communications, etc.) with key buyers and decision-makers\n * Listen: Strive to understand what makes each school district unique and the outcomes each prospective client is seeking to achieve through a multi-step, consultative sales process\n * Write: Stellar writing in a friendly, business-casual voice\n * Organize: Implement processes, details, and databases because they enable excellent personal service\n * Lead: Demonstrate Finalsite’s proven experience, technical prowess, and superior customer support in partnership with Solutions Engineers, Product Specialists, Sales Management, and other functional leads\n * Care: Believe in our cause and convincingly share your passion for it\n * Grow: Have a desire to learn and get better constantly. Be open to new selling styles and critical feedback, collaborate with coworkers across the organization, and implement new techniques and tactics into your process\n   \n   \n\nOther Functions\n\n\n * Consistently achieve and surpass sales targets and quotas.\n * Research and identify potential K-12 clients, including school districts and individual schools.\n * Build a pipeline of leads and opportunities through various channels, including cold outreach, educational conferences, and targeted networking.\n * Effectively communicate how our SaaS solutions address specific important outcomes for school districts.\n * Prospect consistently and confidently. Finalsite Marketing will provide generous leads as well, but the ultimate responsibility to find new business and build new relationships is yours\n * Effectively qualify and disqualify prospects. You must be able to ask the right questions to thoroughly understand each prospect’s process and timeline to identify if Finalsite is the right fit\n * Consistently nurture opportunities to drive closure\n * Drive the sales cycle from lead generation all the way through contracts, legal review and negotiation, and contract signature\n * Meticulously maintain and update opportunity pipeline in Salesforce, particularly probability to close and close date to ensure forecast is accurate\n * Develop and deliver compelling sales presentations and demonstrations customized to the K-12 Public Schools and specific client outcomes.\n * Communicate with internal departments on the expectations set in the sales cycle so each team can deliver those expectations\n   \n   \n\nQualifications And Skills\n\n\n * College degree preferred, or equivalent experience\n * Excellent oral, written, and presentation skills\n * Highly developed client service and client satisfaction focus\n * Proficiency in building a pipeline, moving opportunities through the sales cycle, and proposing, presenting, and discussing solutions with district administrators and executive decision-makers\n * Minimum five years of Edtech sales experience preferably with K12 Public Schools\n * Preferred (not required)resident of the state of Texas with a strong network of relationships with key decision makers across the state.\n * Experience making cold calls\n * Proficient with Salesforce, web meetings (Zoom), PowerPoint, Microsoft Office Products, and Google Suite\n * Ability to thrive in a fast-paced, multi-disciplinary environment with remote teams\n * Travel Required (approximately 25%)\n   \n   \n\nRESIDENCY REQUIREMENT\n\nFinalsite offers 100% fully remote employment opportunities, however, these opportunities are limited to permanent residents of the United States. Current residency, as well as continued residency, within the United States is required to obtain (and retain) employment with Finalsite.\n\nDISCLOSURES\n\nFinalsite is proud to be an equal opportunity workplace and is an affirmative action employer. We are committed to equal employment opportunity regardless of race, color, ancestry, religion, sex, national origin, sexual orientation, age, citizenship, marital status, disability, gender identity or Veteran status. We also consider qualified applicants regardless of criminal histories, consistent with legal requirements. EEO is the Law. If you have a disability or special need that requires accommodation, please contact Finalsite's People Operations Team. Finalsite is committed to the full inclusion of all qualified individuals. As part of this commitment, Finalsite will ensure that persons with disabilities or special needs are provided a reasonable accommodation. Ensure your Finalsite job offer is legitimate and don't fall victim to fraud. Ask your recruiter for a phone call or other type of verbal communication and ensure all email correspondence is from a finalsite.com email address. For added security, where possible, apply through our company website at finalsite.com/jobs.\n\nCompensation: From $60,000 to $125,000 per year",
  "contractType": "Full-time",
  "experienceLevel": "Mid-Senior level",
  "workType": "Sales",
  "sector": "Software Development",
  "applyType": "EASY_APPLY",
  "applyUrl": "https://www.linkedin.com/jobs/view/education-sales-consultant-at-finalsite-4298783055?trk=public_jobs_topcard-title",
  "descriptionHtml": "\n          <strong>Finalsite is the first community relationship management platform for K-12 schools, transforming how schools attract students, engage families, build community &#x2014; and thrive. More than 7,000 schools and districts worldwide trust Finalsite&#x2019;s integrated platform for their websites, communications, mobile apps, enrollment, and marketing services. Finalsite is headquartered in Glastonbury, CT, USA with employees who work remotely in nearly every state in the U.S. as well as Europe, South America, and Asia. For more information, please visit www.finalsite.com.<br><br></strong><strong>VISION<br><br></strong>Finalsite will transform the way school communities engage with their schools.<br><br><strong>Summary Of The Role<br><br></strong>The Education Sales Consultant drives Finalsite&#x2019;s revenue growth across the state of Texas and other areas as assigned by identifying, qualifying, and closing new sales opportunities of our communication solutions and digital marketing services.<br><br><strong>LOCATION<br><br></strong>100% Remote - Anywhere within the US<br><br><strong>Responsibilities<br><br></strong><strong>Essential Functions<br><br></strong><ul><li>Communicate: Be a great phone, email, web meeting, and in-person conversationalist</li><li>Understand the K12 market: Engage with decision-makers to understand the unique challenges and needs of K-12 Public Schools.</li><li>Know the people: Understand, relate to, and develop executive-level relationships (e.g., Superintendent, Chief Communications Officer, Chief of Staff, Chief Technology Officer, Director of Communications, etc.) with key buyers and decision-makers</li><li>Listen: Strive to understand what makes each school district unique and the outcomes each prospective client is seeking to achieve through a multi-step, consultative sales process</li><li>Write: Stellar writing in a friendly, business-casual voice</li><li>Organize: Implement processes, details, and databases because they enable excellent personal service</li><li>Lead: Demonstrate Finalsite&#x2019;s proven experience, technical prowess, and superior customer support in partnership with Solutions Engineers, Product Specialists, Sales Management, and other functional leads</li><li>Care: Believe in our cause and convincingly share your passion for it</li><li>Grow: Have a desire to learn and get better constantly. Be open to new selling styles and critical feedback, collaborate with coworkers across the organization, and implement new techniques and tactics into your process<br><br></li></ul><strong>Other Functions<br><br></strong><ul><li>Consistently achieve and surpass sales targets and quotas.</li><li>Research and identify potential K-12 clients, including school districts and individual schools.</li><li>Build a pipeline of leads and opportunities through various channels, including cold outreach, educational conferences, and targeted networking.</li><li>Effectively communicate how our SaaS solutions address specific important outcomes for school districts.</li><li>Prospect consistently and confidently. Finalsite Marketing will provide generous leads as well, but the ultimate responsibility to find new business and build new relationships is yours</li><li>Effectively qualify and disqualify prospects. You must be able to ask the right questions to thoroughly understand each prospect&#x2019;s process and timeline to identify if Finalsite is the right fit</li><li>Consistently nurture opportunities to drive closure</li><li>Drive the sales cycle from lead generation all the way through contracts, legal review and negotiation, and contract signature</li><li>Meticulously maintain and update opportunity pipeline in Salesforce, particularly probability to close and close date to ensure forecast is accurate</li><li>Develop and deliver compelling sales presentations and demonstrations customized to the K-12 Public Schools and specific client outcomes.</li><li>Communicate with internal departments on the expectations set in the sales cycle so each team can deliver those expectations<br><br></li></ul><strong>Qualifications And Skills<br><br></strong><ul><li>College degree preferred, or equivalent experience</li><li>Excellent oral, written, and presentation skills</li><li>Highly developed client service and client satisfaction focus</li><li>Proficiency in building a pipeline, moving opportunities through the sales cycle, and proposing, presenting, and discussing solutions with district administrators and executive decision-makers</li><li>Minimum five years of Edtech sales experience preferably with K12 Public Schools</li><li>Preferred (not required)resident of the state of Texas with a strong network of relationships with key decision makers across the state.</li><li>Experience making cold calls</li><li>Proficient with Salesforce, web meetings (Zoom), PowerPoint, Microsoft Office Products, and Google Suite</li><li>Ability to thrive in a fast-paced, multi-disciplinary environment with remote teams</li><li>Travel Required (approximately 25%)<br><br></li></ul><strong>RESIDENCY REQUIREMENT<br><br></strong>Finalsite offers 100% fully remote employment opportunities, however, these opportunities are limited to permanent residents of the United States. Current residency, as well as continued residency, within the United States is required to obtain (and retain) employment with Finalsite.<br><br><strong>DISCLOSURES<br><br></strong>Finalsite is proud to be an equal opportunity workplace and is an affirmative action employer. We are committed to equal employment opportunity regardless of race, color, ancestry, religion, sex, national origin, sexual orientation, age, citizenship, marital status, disability, gender identity or Veteran status. We also consider qualified applicants regardless of criminal histories, consistent with legal requirements. EEO is the Law. If you have a disability or special need that requires accommodation, please contact Finalsite&apos;s People Operations Team. Finalsite is committed to the full inclusion of all qualified individuals. As part of this commitment, Finalsite will ensure that persons with disabilities or special needs are provided a reasonable accommodation. Ensure your Finalsite job offer is legitimate and don&apos;t fall victim to fraud. Ask your recruiter for a phone call or other type of verbal communication and ensure all email correspondence is from a finalsite.com email address. For added security, where possible, apply through our company website at finalsite.com/jobs.<br><br>Compensation: From &#x24;60,000 to &#x24;125,000 per year\n        ",
  "companyId": "142477",
  "benefits": "",
  "posterProfileUrl": "",
  "posterFullName": ""
},
{
  "id": "4298775240",
  "publishedAt": "2025-09-10",
  "salary": "$76,670.00/yr - $90,200.00/yr",
  "title": "Architectural Drafter",
  "jobUrl": "https://www.linkedin.com/jobs/view/architectural-drafter-at-villa-4298775240?trk=public_jobs_topcard-title",
  "companyName": "Villa",
  "companyUrl": "https://www.linkedin.com/company/villa-prefab-homes?trk=public_jobs_topcard-org-name",
  "location": "California, United States",
  "postedTime": "1 hour ago",
  "applicationsCount": "Be among the first 25 applicants",
  "description": "Who We Are\n\nVilla is building America’s leading next-generation homebuilding platform. With a mission to be the easiest, fastest and most cost-efficient way to build homes, Villa is a highly scalable new approach to offsite homebuilding and is critical in solving the many problems facing the U.S. housing market. Villa provides end-to-end services for customers that span feasibility, design, permitting, and construction of high-quality homes built using modern offsite construction. Villa is currently the largest ADU builder in California and is growing rapidly into other housing products and geographies.\n\nRole Overview\nWe are seeking an experienced and organized Architectural Drafter to join our growing team. This role focuses on designing residential urban infill projects using offsite construction methods. The ideal candidate will combine design expertise with strategic insight to develop scalable, impactful housing solutions.\n\nThis is a full-time, remote opportunity reporting to the Head of Product. We are currently considering candidates based in CA, CO, and TX.\n\nWhat You'll Do:\n\n\n\n * Develop architectural concepts for offsite factory partners, ensuring cost efficiency and manufacturability\n * Draft floor plans, elevations, sections, schedules, architectural details, construction set documentation, renderings and 3D models\n * Support the Site Design team to prepare documents and specifications for permitting and construction\n * Ensure all designs align with building codes, regulations, and manufacturing capabilities.\n * Address technical challenges to maintain design integrity\n * Stay up to date with offsite industry trends, materials, and technologies to bring fresh ideas to projects\n * Support the project team in maintaining schedules and delivering projects on time and within budget\n * Curate Villa’s model library\n   \n   \n   \n   \n\nWhat We're Looking For:\n\n\n\n * Minimum high school diploma or equivalent\n * 4+ years of architectural drafting experience with a focus on factory-built housing strongly preferred\n * Strong proficiency in Revit, AutoCAD and Bluebeam\n * Experience with BIM management\n * Expertise in architectural drawings, design, and renders\n * Experience with offsite construction methods\n * Strong understanding of IRC, CRC, and HUD building codes and permitting processes\n * Creative problem-solver with a passion for innovative design\n * Strong attention to detail and organizational skills\n * Excellent English communication and collaboration abilities\n * Growth mindset, adaptability, and willingness to tackle challenges outside of your comfort zone\n * Ability to work in the United States without sponsorship\n   \n   \n   \n   \n\nWe are focused on building a diverse and inclusive workforce. If you're excited about this role, but do not meet 100% of the qualifications, we encourage you to apply.\n\nVilla is an Equal Opportunity Employer and considers applicants for employment without regard to race, color, religion, sex, orientation, national origin, age, disability, genetics, or any other basis forbidden under federal, state, or local law. Pursuant to the San Francisco Fair Chance Ordinance and Los Angeles FCIHO, we will consider for employment qualified applicants with arrest and conviction records.\n\n--\n\nBy clicking \"Submit Application,\" you acknowledge that you have read Villa’s Privacy Policy.\n\nThe compensation band for this role is $76,670 - $90,200 in California (salary band dependent on location).",
  "contractType": "Full-time",
  "experienceLevel": "Not Applicable",
  "workType": "Design, Art/Creative, and Information Technology",
  "sector": "Transportation, Logistics, Supply Chain and Storage",
  "applyType": "EASY_APPLY",
  "applyUrl": "https://www.linkedin.com/jobs/view/architectural-drafter-at-villa-4298775240?trk=public_jobs_topcard-title",
  "descriptionHtml": "\n          Who We Are<br><br>Villa is building America&#x2019;s leading next-generation homebuilding platform. With a mission to be the easiest, fastest and most cost-efficient way to build homes, Villa is a highly scalable new approach to offsite homebuilding and is critical in solving the many problems facing the U.S. housing market. Villa provides end-to-end services for customers that span feasibility, design, permitting, and construction of high-quality homes built using modern offsite construction. Villa is currently the largest ADU builder in California and is growing rapidly into other housing products and geographies.<br><br><strong>Role Overview<br></strong>We are seeking an experienced and organized Architectural Drafter to join our growing team. This role focuses on designing residential urban infill projects using offsite construction methods. The ideal candidate will combine design expertise with strategic insight to develop scalable, impactful housing solutions.<br><br>This is a full-time, remote opportunity reporting to the Head of Product. We are currently considering candidates based in CA, CO, and TX.<br><br><strong>What You&apos;ll Do:<br><br><br></strong><ul><li>Develop architectural concepts for offsite factory partners, ensuring cost efficiency and manufacturability</li><li>Draft floor plans, elevations, sections, schedules, architectural details, construction set documentation, renderings and 3D models</li><li>Support the Site Design team to prepare documents and specifications for permitting and construction</li><li>Ensure all designs align with building codes, regulations, and manufacturing capabilities. </li><li>Address technical challenges to maintain design integrity</li><li>Stay up to date with offsite industry trends, materials, and technologies to bring fresh ideas to projects</li><li>Support the project team in maintaining schedules and delivering projects on time and within budget</li><li>Curate Villa&#x2019;s model library<br><br><br><br></li></ul><strong>What We&apos;re Looking For:<br><br><br></strong><ul><li>Minimum high school diploma or equivalent</li><li>4+ years of architectural drafting experience with a focus on factory-built housing strongly preferred</li><li>Strong proficiency in Revit, AutoCAD and Bluebeam</li><li>Experience with BIM management</li><li>Expertise in architectural drawings, design, and renders</li><li>Experience with offsite construction methods</li><li>Strong understanding of IRC, CRC, and HUD building codes and permitting processes</li><li>Creative problem-solver with a passion for innovative design</li><li>Strong attention to detail and organizational skills</li><li>Excellent English communication and collaboration abilities</li><li>Growth mindset, adaptability, and willingness to tackle challenges outside of your comfort zone</li><li>Ability to work in the United States without sponsorship<br><br><br><br></li></ul>We are focused on building a diverse and inclusive workforce. If you&apos;re excited about this role, but do not meet 100% of the qualifications, we encourage you to apply.<br><br>Villa is an Equal Opportunity Employer and considers applicants for employment without regard to race, color, religion, sex, orientation, national origin, age, disability, genetics, or any other basis forbidden under federal, state, or local law. Pursuant to the San Francisco Fair Chance Ordinance and Los Angeles FCIHO, we will consider for employment qualified applicants with arrest and conviction records.<br><br>--<br><br>By clicking &quot;Submit Application,&quot; you acknowledge that you have read Villa&#x2019;s Privacy Policy.<br><br>The compensation band for this role is &#x24;76,670 - &#x24;90,200 in California (salary band dependent on location).\n        ",
  "companyId": "53482651",
  "benefits": "",
  "posterProfileUrl": "",
  "posterFullName": ""
},
{
  "id": "4298396459",
  "publishedAt": "2025-09-10",
  "salary": "",
  "title": "Analyst I - Criminal",
  "jobUrl": "https://www.linkedin.com/jobs/view/analyst-i-criminal-at-state-of-south-carolina-4298396459?trk=public_jobs_topcard-title",
  "companyName": "State of South Carolina",
  "companyUrl": "https://www.linkedin.com/company/state-of-south-carolina?trk=public_jobs_topcard-org-name",
  "location": "Columbia, SC",
  "postedTime": "2 hours ago",
  "applicationsCount": "Be among the first 25 applicants",
  "description": "Job Responsibilities\n\nAbout SLED\n\nThe South Carolina Law Enforcement Division (SLED) is a premier statewide law enforcement agency dedicated to serving and protecting the citizens of South Carolina. With a proud history rooted in integrity, professionalism, and public service, SLED is committed to providing high-quality investigative, intelligence, and forensic services to support law enforcement agencies across the state.\n\nAt SLED, we value dedication, ethical conduct, accountability, and a strong commitment to justice. Our agency plays a vital role in maintaining public safety and supporting criminal justice efforts at the local, state, and federal levels. From advanced forensic science to homeland security, criminal investigations, and criminal justice information systems, SLED's diverse responsibilities make it one of the most dynamic law enforcement agencies in the state.\n\nWe foster a professional work environment where teamwork, respect, and continuous improvement are fundamental. Our employees are held to the highest standards and are given opportunities to grow within a mission-driven organization that makes a meaningful difference in South Carolina communities.\n\nLearn more about why you should join our team at www.sled.sc.gov .\n\nGeneral Responsibility\n\nServe as a Criminal Analyst in the Fusion Center of the SC Law Enforcement Division.\n\nSpecific Duties\n\n\n * Operate in a fast-paced, team-oriented environment utilizing all-source research, collection, analysis, and reports to support federal, state, and local law enforcement. Provide ongoing analytical support throughout the investigative cycle, from initial stages to case closure.\n * Assist in the coordination of major case investigations by prioritizing collection of data, delegating assignments, conduct field and statistical research on potential and past crime targets. Develop investigative leads by connecting seemingly disparate pieces of information and identifying potential suspects.\n * Using open source information, criminal intelligence information, and criminal justice information, respond to requests from local, state, federal, and private investigative leads, and report activities in support of ongoing investigations. Support search warrant or major operations. Develop and prioritize problem areas, top offenders, crime projects, and recommend strategies regarding the allocations of resources. Assist investigators, operations, and management personnel in planning the deployment of resources.\n * Gather and organize information related to specific criminal or administrative investigations and disseminate information effectively and efficiently. Map crime, show correlations, and analyze crime-specific data. Monitor local, regional, and national crime trends. Conduct briefings and presentations. Work with investigators, other analysts, and external agencies to share information and coordinate efforts. Participate as a member in federal, state, and local law enforcement taskforces and partnerships. Conduct research, compile reports, and assist with various projects. Provide written or oral testimony in court.\n * Perform other duties as assigned.\n   \n   \n\nMinimum And Additional Requirements\n\n\n * A Bachelor of Science or Bachelor of Arts degree from an accredited college or university. A Master's degree may be substituted for the required experience.\n * Must have experience in collecting, analyzing, and presenting information.\n * Must have strong analytical skills with the ability to search a variety of databases to develop analytical reports.\n * Must be skilled in verbal and written communications including the preparation and presentation of analytical reports to facilitate information sharing with a variety of partners.\n * Ability to identify trends or patterns based on the analysis of collected information.\n * Knowledge of Microsoft products such as Work, Excel, and Publisher, and ability to use computer programs.\n * Position involves critical duties and responsibilities that must continue to be performed during crisis situations.\n * May require extended overnight travel and rotational hours of work on occasion.\n * Periodic on-call duty is required.\n * Must reside within 50 miles of SLED Headquarters in Columbia, SC.\n   \n   \n\nPreferred Qualifications\n\n\n * Experience in intelligence analysis and open source research preferred.\n   \n   \n\nAdditional Comments\n\nSouth Carolina Law Enforcement Division (SLED) is committed to providing equal employment opportunities to all applicants and does not discriminate on the basis of race, color, religion, sex (including pregnancy, childbirth, or related medical conditions, including, but not limited, to lactation), national origin, age (40 or older), disability or genetic information.\n\nSLED offers an exceptional benefits package for FTE positions that includes:\n\n\n * Health, Dental, Vision, Long Term Disability, and Life Insurance for Employee, Spouse, and Children\n * 15 days annual (vacation) leave per year\n * 15 days sick leave per year\n * 13 paid holidays\n * Paid Parental Leave\n * State Retirement Plan and Deferred Compensation Programs\n   \n   \n\nSupplemental questions are considered part of the official application. Any misrepresentation of yourself may be grounds for disqualification. Conditional selection based on candidate education, training, experience, oral interviews and clearance of background investigation.",
  "contractType": "Part-time",
  "experienceLevel": "Entry level",
  "workType": "Business Development and Sales",
  "sector": "Government Administration",
  "applyUrl": "https://www.governmentjobs.com/careers/sc/jobs/5071028/analyst-i-criminal",
  "applyType": "EXTERNAL",
  "descriptionHtml": "\n          <strong>Job Responsibilities<br><br></strong><strong>About SLED<br><br></strong>The South Carolina Law Enforcement Division (SLED) is a premier statewide law enforcement agency dedicated to serving and protecting the citizens of South Carolina. With a proud history rooted in integrity, professionalism, and public service, SLED is committed to providing high-quality investigative, intelligence, and forensic services to support law enforcement agencies across the state.<br><br>At SLED, we value dedication, ethical conduct, accountability, and a strong commitment to justice. Our agency plays a vital role in maintaining public safety and supporting criminal justice efforts at the local, state, and federal levels. From advanced forensic science to homeland security, criminal investigations, and criminal justice information systems, SLED&apos;s diverse responsibilities make it one of the most dynamic law enforcement agencies in the state.<br><br>We foster a professional work environment where teamwork, respect, and continuous improvement are fundamental. Our employees are held to the highest standards and are given opportunities to grow within a mission-driven organization that makes a meaningful difference in South Carolina communities.<br><br>Learn more about why you should join our team at www.sled.sc.gov .<br><br><strong>General Responsibility<br><br></strong>Serve as a Criminal Analyst in the Fusion Center of the SC Law Enforcement Division.<br><br><strong>Specific Duties<br><br></strong><ul><li>Operate in a fast-paced, team-oriented environment utilizing all-source research, collection, analysis, and reports to support federal, state, and local law enforcement. Provide ongoing analytical support throughout the investigative cycle, from initial stages to case closure. </li><li>Assist in the coordination of major case investigations by prioritizing collection of data, delegating assignments, conduct field and statistical research on potential and past crime targets. Develop investigative leads by connecting seemingly disparate pieces of information and identifying potential suspects. </li><li>Using open source information, criminal intelligence information, and criminal justice information, respond to requests from local, state, federal, and private investigative leads, and report activities in support of ongoing investigations. Support search warrant or major operations. Develop and prioritize problem areas, top offenders, crime projects, and recommend strategies regarding the allocations of resources. Assist investigators, operations, and management personnel in planning the deployment of resources. </li><li>Gather and organize information related to specific criminal or administrative investigations and disseminate information effectively and efficiently. Map crime, show correlations, and analyze crime-specific data. Monitor local, regional, and national crime trends. Conduct briefings and presentations. Work with investigators, other analysts, and external agencies to share information and coordinate efforts. Participate as a member in federal, state, and local law enforcement taskforces and partnerships. Conduct research, compile reports, and assist with various projects. Provide written or oral testimony in court. </li><li>Perform other duties as assigned. <br><br></li></ul><strong>Minimum And Additional Requirements<br><br></strong><ul><li> A Bachelor of Science or Bachelor of Arts degree from an accredited college or university. A Master&apos;s degree may be substituted for the required experience. </li><li> Must have experience in collecting, analyzing, and presenting information. </li><li> Must have strong analytical skills with the ability to search a variety of databases to develop analytical reports. </li><li> Must be skilled in verbal and written communications including the preparation and presentation of analytical reports to facilitate information sharing with a variety of partners. </li><li>Ability to identify trends or patterns based on the analysis of collected information.</li><li>Knowledge of Microsoft products such as Work, Excel, and Publisher, and ability to use computer programs.</li><li>Position involves critical duties and responsibilities that must continue to be performed during crisis situations. </li><li>May require extended overnight travel and rotational hours of work on occasion.</li><li>Periodic on-call duty is required.</li><li>Must reside within 50 miles of SLED Headquarters in Columbia, SC. <br><br></li></ul><strong>Preferred Qualifications<br><br></strong><ul><li> Experience in intelligence analysis and open source research preferred. <br><br></li></ul><strong>Additional Comments<br><br></strong>South Carolina Law Enforcement Division (SLED) is committed to providing equal employment opportunities to all applicants and does not discriminate on the basis of race, color, religion, sex (including pregnancy, childbirth, or related medical conditions, including, but not limited, to lactation), national origin, age (40 or older), disability or genetic information.<br><br><strong>SLED offers an exceptional benefits package for FTE positions that includes:<br><br></strong><ul><li>Health, Dental, Vision, Long Term Disability, and Life Insurance for Employee, Spouse, and Children</li><li>15 days annual (vacation) leave per year</li><li>15 days sick leave per year</li><li>13 paid holidays</li><li>Paid Parental Leave</li><li>State Retirement Plan and Deferred Compensation Programs<br><br></li></ul>Supplemental questions are considered part of the official application. Any misrepresentation of yourself may be grounds for disqualification. Conditional selection based on candidate education, training, experience, oral interviews and clearance of background investigation.\n        ",
  "companyId": "682329",
  "benefits": "",
  "posterProfileUrl": "",
  "posterFullName": ""
}
  ]);

  const [selectedEngine, setSelectedEngine] = useState(engines[0]);
  const [filter, setFilter] = useState("all"); // all, applied, notInterested

  const handleEngineToggle = (engineId) => {
    console.log("Toggling engine:", engineId);
    setEngines(engines.map(engine => 
      engine.id === engineId 
        ? { ...engine, isActive: !engine.isActive }
        : engine
    ));
    const engine = engines.find(e => e.id === engineId);
    changeEngineStatus(engineId, !engine.isActive);
  };

  const handleJobAction = (jobId, action) => {
    setJobs(jobs.map(job => 
      job.id === jobId 
        ? { 
            ...job, 
            applied: action === 'apply' ? true : job.applied,
            saved: action === 'save' ? !job.saved : job.saved,
            notInterested: action === 'notInterested' ? true : job.notInterested
          }
        : job
    ));
    
    // Optional: Show toast notification
    if (action === 'apply') {
      console.log(`Applied to job: ${jobs.find(j => j.id === jobId)?.title}`);
    } else if (action === 'save') {
      const job = jobs.find(j => j.id === jobId);
      console.log(`${job?.saved ? 'Removed from' : 'Added to'} saved jobs: ${job?.title}`);
    } else if (action === 'notInterested') {
      console.log(`Marked as not interested: ${jobs.find(j => j.id === jobId)?.title}`);
    }
  };

  const filteredJobs = jobs.filter(job => {
    if (filter === "applied") return job.applied;
    if (filter === "saved") return job.saved;
    if (filter === "notInterested") return job.notInterested;
    return !job.applied && !job.notInterested;
  });

  const getMatchColor = (percentage) => {
    if (percentage >= 90) return "text-green-600 bg-green-100";
    if (percentage >= 80) return "text-blue-600 bg-blue-100";
    if (percentage >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Matching Dashboard</h1>
          <p className="text-gray-600 mt-1">Find jobs that match your preferences and skills</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => navigate("/job-search")}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Icon icon="heroicons:plus-circle" className="w-5 h-5" />
            Create New Engine
          </Button>
        
        </div>
      </div>

      {/* Engines Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Icon icon="heroicons:cog-6-tooth" className="w-6 h-6 text-indigo-600" />
              Your Job Search Engines
            </h2>
            <p className="text-sm text-gray-600 mt-1">Configure and manage your automated job search preferences</p>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-500">{engines.length} engines created</span>
            <div className="text-xs text-gray-400 mt-1">
              {engines.filter(e => e.isActive).length} active • {engines.filter(e => !e.isActive).length} inactive
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {engines.map((engine) => (
            <div 
              key={engine.id}
              className={`p-5 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedEngine.id === engine.id 
                  ? 'border-indigo-500 bg-indigo-50 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
              onClick={() => setSelectedEngine(engine)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">{engine.title}</h3>
                  </div>
                <div className="flex items-center gap-2 ml-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    engine.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {engine.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEngineToggle(engine.id);
                    }}
                    className={`p-1 rounded-full transition-colors ${
                      engine.isActive 
                        ? 'text-green-600 hover:bg-green-100' 
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    <Icon icon={engine.isActive ? "heroicons:toggle-right" : "heroicons:toggle-left"} className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                {/* Job Criteria */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Icon icon="heroicons:map-pin" className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{engine.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Icon icon="heroicons:briefcase" className="w-4 h-4 text-gray-400" />
                    <span className="text-xs">
                      {engine.contractType === 'F' ? 'Full-time' : 
                       engine.contractType === 'P' ? 'Part-time' : 
                       engine.contractType === 'C' ? 'Contract' : 
                       engine.contractType === 'T' ? 'Temporary' : 
                       engine.contractType === 'I' ? 'Internship' : 'Volunteer'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Icon icon="heroicons:academic-cap" className="w-4 h-4 text-gray-400" />
                    <span className="text-xs">
                      {engine.experienceLevel === '1' ? 'Internship' :
                       engine.experienceLevel === '2' ? 'Entry Level' :
                       engine.experienceLevel === '3' ? 'Associate' :
                       engine.experienceLevel === '4' ? 'Mid-Senior' : 'Director'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Icon icon="heroicons:computer-desktop" className="w-4 h-4 text-gray-400" />
                    <span className="text-xs">
                      {engine.workType === '1' ? 'On-site' :
                       engine.workType === '2' ? 'Remote' : 'Hybrid'}
                    </span>
                  </div>
                </div>

                {/* Time Filter */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Icon icon="heroicons:clock" className="w-4 h-4 text-gray-400" />
                  <span>
                    {engine.publishedAt === 'r86400' ? 'Past 24 hours' :
                     engine.publishedAt === 'r604800' ? 'Past week' :
                     engine.publishedAt === 'r2592000' ? 'Past month' : 'Any time'}
                  </span>
                </div>

                {/* Match Count */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <Icon icon="heroicons:magnifying-glass" className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm font-medium text-gray-900">{engine.matchCount} matches found</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    Created {new Date(engine.created).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
          
            </div>
          ))}
        </div>
      </div>

      {/* Jobs Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Icon icon="material-symbols:work" className="w-6 h-6 text-indigo-600" />
              Matched Jobs for "{selectedEngine.title}"
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{filteredJobs.length} jobs found</span>
            </div>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex gap-2">
            {[
              { key: "all", label: "Available", count: jobs.filter(j => !j.applied && !j.notInterested).length },
              { key: "applied", label: "Applied", count: jobs.filter(j => j.applied).length },
              { key: "saved", label: "Saved", count: jobs.filter(j => j.saved).length },
              { key: "notInterested", label: "Not Interested", count: jobs.filter(j => j.notInterested).length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === tab.key
                    ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <Icon icon="material-symbols:work-off" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-500">
                {filter === "all" ? "Try adjusting your engine settings or create a new engine." : 
                 filter === "applied" ? "You haven't applied to any jobs yet." :
                 filter === "saved" ? "You haven't saved any jobs yet." :
                 "No jobs marked as not interested."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200 bg-white">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      {/* Company Logo Placeholder */}
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-semibold text-sm">
                          {job.companyName?.charAt(0) || 'C'}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg text-gray-900 hover:text-indigo-600 cursor-pointer transition-colors">
                                {job.title}
                              </h3>
                              {job.applyType === "EASY_APPLY" && (
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                                  Easy Apply
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <a 
                                href={job.companyUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                              >
                                {job.companyName}
                              </a>
                              {job.sector && (
                                <span className="text-gray-400">•</span>
                              )}
                              {job.sector && (
                                <span className="text-gray-600 text-sm">{job.sector}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3 flex-wrap">
                          <div className="flex items-center gap-1">
                            <Icon icon="heroicons:map-pin" className="w-4 h-4 text-gray-400" />
                            {job.location}
                          </div>
                          {job.salary && (
                            <div className="flex items-center gap-1">
                              <Icon icon="heroicons:currency-dollar" className="w-4 h-4 text-gray-400" />
                              {job.salary}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Icon icon="heroicons:briefcase" className="w-4 h-4 text-gray-400" />
                            {job.contractType}
                          </div>
                          {job.experienceLevel !== "Not Applicable" && (
                            <div className="flex items-center gap-1">
                              <Icon icon="heroicons:academic-cap" className="w-4 h-4 text-gray-400" />
                              {job.experienceLevel}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Icon icon="heroicons:clock" className="w-4 h-4 text-gray-400" />
                            {job.postedTime}
                          </div>
                        </div>
                        
                        {/* Job Description Preview */}
                        <p className="text-gray-700 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {job.description?.length > 200 
                            ? `${job.description.substring(0, 200)}...` 
                            : job.description
                          }
                        </p>
                        
                        {/* Work Type & Applications Count */}
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                          {job.workType && (
                            <span className="px-2 py-1 bg-gray-100 rounded-full">
                              {job.workType}
                            </span>
                          )}
                          {job.applicationsCount && (
                            <div className="flex items-center gap-1">
                              <Icon icon="heroicons:users" className="w-3 h-3" />
                              {job.applicationsCount}
                            </div>
                          )}
                        </div>
                        
                        {/* Benefits Preview */}
                        {job.benefits && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.benefits.split('\n').slice(0, 3).map((benefit, idx) => (
                              benefit.trim() && (
                                <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                                  {benefit.trim()}
                                </span>
                              )
                            ))}
                          </div>
                        )}
                        
                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 pt-2">
                          {!job.applied && !job.notInterested ? (
                            <>
                              <a
                                href={job.applyUrl || job.jobUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => handleJobAction(job.id, 'apply')}
                                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                              >
                                <Icon icon="heroicons:arrow-top-right-on-square" className="w-4 h-4" />
                                Apply Now
                              </a>
                              <button
                                onClick={() => navigate(`/jobs/${job.id}`)}
                                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                              >
                                <Icon icon="heroicons:eye" className="w-4 h-4" />
                                View Details
                              </button>
                              <button
                                onClick={() => handleJobAction(job.id, 'save')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  job.saved 
                                    ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100' 
                                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                }`}
                              >
                                <Icon icon={job.saved ? "heroicons:bookmark-solid" : "heroicons:bookmark"} className="w-4 h-4" />
                                {job.saved ? 'Saved' : 'Save'}
                              </button>
                              <button
                                onClick={() => handleJobAction(job.id, 'notInterested')}
                                className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                              >
                                <Icon icon="heroicons:x-mark" className="w-4 h-4" />
                                Not Interested
                              </button>
                            </>
                          ) : job.applied ? (
                            <div className="flex items-center gap-2 text-green-600">
                              <Icon icon="heroicons:check-circle" className="w-5 h-5" />
                              <span className="font-medium">Applied</span>
                              <span className="text-gray-400">•</span>
                              <span className="text-sm text-gray-600">
                                Applied on {new Date(job.publishedAt).toLocaleDateString()}
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-gray-500">
                              <Icon icon="heroicons:no-symbol" className="w-5 h-5" />
                              <span className="font-medium">Not Interested</span>
                            </div>
                          )}
                          
                          {/* Share & More Options */}
                          <div className="ml-auto flex items-center gap-2">
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                              <Icon icon="heroicons:share" className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                              <Icon icon="heroicons:ellipsis-horizontal" className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Matchmaking;
