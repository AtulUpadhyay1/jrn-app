import React, { useState } from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";

const JobCopilotConfig = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1
    workLocation: 'remote',
    locationTags: ['Worldwide'],
    jobTypes: ['fulltime'],
    jobTitles: ['Mobile Developer'],
    
    // Step 2
    increaseJobMatch: true,
    jobMatchLevel: 'higher',
    seniority: ['entry-level'],
    timeZones: [],
    industry: [],
    jobDescLanguages: [],
    includeKeywords: '',
    excludeKeywords: '',
    excludeCompanies: '',
    
    // Step 3 (Resume Preview - no inputs)
    resumeUploaded: false,
    
    // Step 4
    operationMode: 'auto-save-review',
    writingStyle: '',
    coverLetterOption: 'auto-generate',
    phoneNumber: '',
    country: 'India',
    city: '',
    state: '',
    postcode: '',
    
    // Personal Info (Step 4 extended)
    disability: '',
    military: '',
    racialBackground: '',
    drivingLicenses: '',
    securityClearance: '',
    remotePreference: 'open-hybrid',
    travelComfortable: 'yes',
    relocationOpen: 'yes',
    languages: [],
    dateOfBirth: '21/08/2025',
    gpaScore: '',
    ageVerification: true,
    nationality: [],
    currentSalary: '1',
    expectedSalary: '1',
    linkedinProfile: '',
    experienceSummary: '',
    currentJobTitle: '',
    availability: 'immediately',
    eligibleCountries: ['India'],
    visaSponsorship: 'no'
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field, item) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }));
  };

  const removeTag = (field, item) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter(i => i !== item)
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const RadioButton = ({ name, value, checked, onChange, children }) => (
    <label className="flex items-center space-x-2 cursor-pointer">
      <div className="relative">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div className={`w-5 h-5 rounded-full border-2 ${checked ? 'border-slate-600 bg-slate-600' : 'border-gray-300'}`}>
          {checked && <Icon icon="check" className="w-3 h-3 text-white absolute top-0.5 left-0.5" />}
        </div>
      </div>
      <span className="text-gray-700">{children}</span>
    </label>
  );

  const Checkbox = ({ checked, onChange, children }) => (
    <label className="flex items-center space-x-2 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div className={`w-5 h-5 rounded border-2 ${checked ? 'border-slate-600 bg-slate-600' : 'border-gray-300'}`}>
          {checked && <Icon icon="check" className="w-3 h-3 text-white absolute top-0.5 left-0.5" />}
        </div>
      </div>
      <span className="text-gray-700">{children}</span>
    </label>
  );

  const Button = ({ variant = 'primary', onClick, children, disabled = false }) => {
    const baseClasses = "px-6 py-3 rounded-full font-medium transition-all duration-200 disabled:opacity-50";
    const variants = {
      primary: "bg-slate-600 text-white hover:bg-slate-700",
      secondary: "border-2 border-slate-600 text-slate-600 hover:bg-slate-50",
      pill: "bg-slate-600 text-white px-4 py-2 text-sm rounded-full",
      pillOutline: "border-2 border-gray-300 text-gray-700 px-4 py-2 text-sm rounded-full hover:border-slate-600"
    };

    return (
      <button
        className={`${baseClasses} ${variants[variant]}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  };

  const Select = ({ value, onChange, placeholder, options = [], children }) => (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg appearance-none bg-white focus:border-slate-600 focus:outline-none"
      >
        <option value="">{placeholder}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
        {children}
      </select>
      <Icon icon="chevron-down" className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
    </div>
  );

  const Input = ({ type = "text", placeholder, value, onChange, iconName }) => (
    <div className="relative">
      {iconName && <Icon icon={iconName} className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none ${iconName ? 'pl-12' : ''}`}
      />
    </div>
  );

  const renderStep1 = () => (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Copilot Configuration</h1>
        <p className="text-gray-600">Step 1 of 4</p>
        <p className="text-lg text-gray-700 mt-2">First, select the Work Location and Jobs you are looking for</p>
      </div>

      <div className="bg-white rounded-lg p-8 shadow-sm border">
        <div className="space-y-8">
          {/* Work Location */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Icon icon="map-pin" className="w-5 h-5 mr-2" />
              Work Location
            </h3>
            <p className="text-gray-600 mb-4">Are you looking for jobs that are remote, have a physical location, or both?</p>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="workLocation"
                  value="remote"
                  checked={formData.workLocation === 'remote'}
                  onChange={(e) => updateFormData('workLocation', e.target.value)}
                  className="sr-only"
                />
                <Button
            
                  variant={formData.workLocation === 'remote' ? 'pill' : 'pillOutline'}
                  onClick={() => updateFormData('workLocation', 'remote')}
                >
                  <Icon icon="check" className="w-4 h-4 mr-1" />
                  Remote Jobs
                </Button>
              </div>
              
              {formData.workLocation === 'remote' && (
                <div className="ml-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.locationTags.map(tag => (
                      <span key={tag} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center">
                        {tag}
                        <Icon icon="x-mark" className="w-4 h-4 ml-1 cursor-pointer" onClick={() => removeTag('locationTags', tag)} />
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center">
                <Button
                  variant={formData.workLocation === 'onsite' ? 'pill' : 'pillOutline'}
                  onClick={() => updateFormData('workLocation', 'onsite')}
                >
                  On-site Jobs / Hybrid
                </Button>
              </div>
            </div>
          </div>

          {/* Job Types */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Icon icon="briefcase" className="w-5 h-5 mr-2" />
              Job Types
            </h3>
            <p className="text-gray-600 mb-4">What job types are you looking for? Select at least one.</p>
            
            <div className="flex flex-wrap gap-3">
              {['fulltime', 'part-time', 'contractor', 'internship'].map(type => (
                <Button
                  key={type}
                  variant={formData.jobTypes.includes(type) ? 'pill' : 'pillOutline'}
                  onClick={() => toggleArrayItem('jobTypes', type)}
                >
                  <Icon icon="check" className="w-4 h-4 mr-1" />
                  {type === 'fulltime' ? 'Fulltime' : 
                   type === 'part-time' ? 'Part-Time' :
                   type === 'contractor' ? 'Contractor / Temp' : 'Internship'}
                </Button>
              ))}
            </div>
          </div>

          {/* Job Titles */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Icon icon="target" className="w-5 h-5 mr-2" />
              Job Titles
            </h3>
            <p className="text-gray-600 mb-4">What job titles are you looking for? Type in and select up to 5</p>
            
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.jobTitles.map(title => (
                  <span key={title} className="bg-purple-100 text-slate-700 px-3 py-1 rounded-full text-sm flex items-center">
                    {title}
                    <Icon icon="x-mark" className="w-4 h-4 ml-1 cursor-pointer" onClick={() => removeTag('jobTitles', title)} />
                  </span>
                ))}
              </div>
              <Input placeholder="Job titles / keywords" />
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg flex items-start">
              <Icon icon="target" className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-blue-800 text-sm">
                  Tip: Adding similar job titles helps to find more jobs - don't miss out!
                </p>
                <button className="text-blue-600 text-sm font-medium mt-1 hover:underline">
                  Click to add similar job titles
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <div></div>
        <div className="flex space-x-4">
          <Button variant="secondary">Save & Close</Button>
          <Button onClick={nextStep}>Next: Optional Filters</Button>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Copilot Configuration</h1>
        <p className="text-gray-600">Step 2 of 4</p>
        <p className="text-lg text-gray-700 mt-2">Next, narrow your search with optional filters</p>
      </div>

      <div className="bg-white rounded-lg p-8 shadow-sm border">
        <div className="space-y-8">
          {/* Increase Job Match */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Icon icon="target" className="w-5 h-5 mr-2" />
                Increase Job Match
              </h3>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={formData.increaseJobMatch}
                  onChange={(e) => updateFormData('increaseJobMatch', e.target.checked)}
                  className="sr-only"
                />
                <div
                  onClick={() => updateFormData('increaseJobMatch', !formData.increaseJobMatch)}
                  className={`w-12 h-6 rounded-full cursor-pointer transition-colors ${
                    formData.increaseJobMatch ? 'bg-slate-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform transform ${
                      formData.increaseJobMatch ? 'translate-x-6' : 'translate-x-0.5'
                    } mt-0.5`}
                  />
                </div>
              </div>
            </div>
            
            {formData.increaseJobMatch && (
              <div>
                <div className="flex items-center space-x-8 mb-4">
                  <span>High</span>
                  <div className="flex-1 relative">
                    <input
                      type="range"
                      min="0"
                      max="2"
                      value={formData.jobMatchLevel === 'high' ? 0 : formData.jobMatchLevel === 'higher' ? 1 : 2}
                      onChange={(e) => {
                        const levels = ['high', 'higher', 'highest'];
                        updateFormData('jobMatchLevel', levels[e.target.value]);
                      }}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <span>Highest</span>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg flex items-start">
                  <Icon icon="target" className="w-5 h-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    Your copilot will <strong>only</strong> apply to jobs where you meet <strong>most</strong> of the key requirements.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Seniority */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Icon icon="users" className="w-5 h-5 mr-2" />
              Seniority <span className="text-gray-500 font-normal">(optional)</span>
            </h3>
            <p className="text-gray-600 mb-4">
              Filter jobs by seniority. <button className="text-slate-600 underline">View an explanation of each level.</button>
            </p>
            
            <div className="flex flex-wrap gap-3 mb-4">
              {['entry-level', 'associate', 'mid-senior', 'director'].map(level => (
                <Button
                  key={level}
                  variant={formData.seniority.includes(level) ? 'pill' : 'pillOutline'}
                  onClick={() => toggleArrayItem('seniority', level)}
                >
                  <Icon icon="check" className="w-4 h-4 mr-1" />
                  {level === 'entry-level' ? 'Entry Level' :
                   level === 'associate' ? 'Associate Level' :
                   level === 'mid-senior' ? 'Mid-to-Senior Level' : 'Director Level and above'}
                </Button>
              ))}
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg flex items-start">
              <Icon icon="target" className="w-5 h-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                For entry level positions, we recommend you lower the threshold to "High" instead of "Higher". Also make sure you add enough information in your CV that is relevant to the jobs you are searching for.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg flex items-start mt-3">
              <Icon icon="target" className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-blue-800 text-sm">
                Tip: Add at least 2 seniorities – employers are usually flexible with years of experience
              </p>
            </div>
          </div>

          {/* Time Zones */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Icon icon="clock" className="w-5 h-5 mr-2" />
              Time Zones <span className="text-gray-500 font-normal">(optional)</span>
            </h3>
            <p className="text-gray-600 mb-4">Filter remote jobs by time zone.</p>
            
            <Select placeholder="Select your preferred work time zones" />
          </div>

          {/* Advanced Filters */}
          <div className="border-t pt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold flex items-center">
                <Icon icon="funnel" className="w-5 h-5 mr-2" />
                Advanced Filters
              </h3>
              <Icon icon="chevron-down" className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-6">
              {/* Industry */}
              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <Icon icon="building-office-2" className="w-4 h-4 mr-2" />
                  Industry <span className="text-gray-500 font-normal">(optional)</span>
                </h4>
                <Select placeholder="Select your preferred industries / sectors" />
              </div>

              {/* Job Description Language */}
              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <Icon icon="language" className="w-4 h-4 mr-2" />
                  Job Description Language <span className="text-gray-500 font-normal">(optional)</span>
                </h4>
                <p className="text-gray-600 text-sm mb-3">Only apply to jobs in the following languages:</p>
                <Select placeholder="" />
              </div>

              {/* Job Description Keywords */}
              <div>
                <h4 className="font-medium mb-2">
                  Job Description Keywords <span className="text-gray-500 font-normal">(optional)</span>
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <span className="text-green-600 font-medium">INCLUDE</span>
                      <Icon icon="target" className="w-4 h-4 ml-2 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Only apply to jobs that include <strong>ANY</strong> of these keywords in the job description.</p>
                    <Input placeholder="Type in keywords separated by commas" />
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <span className="text-red-600 font-medium">EXCLUDE</span>
                      <Icon icon="target" className="w-4 h-4 ml-2 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Exclude jobs that contain <strong>ANY</strong> of these keywords in the job description.</p>
                    <Input placeholder="Type in keywords separated by commas" />
                  </div>
                </div>
              </div>

              {/* Exclude Companies */}
              <div>
                <h4 className="font-medium mb-2">
                  Exclude Companies <span className="text-gray-500 font-normal">(optional)</span>
                </h4>
                <p className="text-gray-600 text-sm mb-3">Select companies to exclude so that your copilot doesn't apply for any jobs at these companies.</p>
                <Input placeholder="Type in and select companies to exclude" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="secondary" onClick={prevStep}>
          <Icon icon="arrow-left" className="w-4 h-4 mr-1" />
          Back
        </Button>
        <div className="flex space-x-4">
          <Button variant="secondary">Save & Close</Button>
          <Button onClick={nextStep}>Next: Resume Preview</Button>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Copilot Configuration</h1>
        <p className="text-gray-600">Step 3 of 4</p>
        <p className="text-lg text-gray-700 mt-2">Resume Preview</p>
        <p className="text-gray-600">Review your resume information that will be used for applications</p>
      </div>

      <div className="bg-white rounded-lg p-8 shadow-sm border">
        <div className="space-y-8">
          {/* Resume Header */}
          <div className="text-center border-b pb-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Icon icon="user" className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">John Doe</h2>
            <p className="text-gray-600 mb-2">Mobile Developer</p>
            <div className="flex justify-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <Icon icon="mail" className="w-4 h-4 mr-1" />
                john.doe@email.com
              </span>
              <span className="flex items-center">
                <Icon icon="phone" className="w-4 h-4 mr-1" />
                +91 9876543210
              </span>
              <span className="flex items-center">
                <Icon icon="map-pin" className="w-4 h-4 mr-1" />
                Mumbai, India
              </span>
            </div>
          </div>

          {/* Resume Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Professional Summary */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Icon icon="user-circle" className="w-5 h-5 mr-2 text-purple-600" />
                  Professional Summary
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Experienced Mobile Developer with 3+ years of expertise in React Native and Flutter development. 
                  Proven track record of delivering high-quality mobile applications with excellent user experience. 
                  Strong problem-solving skills and passion for creating innovative mobile solutions.
                </p>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Icon icon="cog" className="w-5 h-5 mr-2 text-slate-600" />
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['React Native', 'Flutter', 'JavaScript', 'TypeScript', 'iOS Development', 'Android Development', 'Firebase', 'REST APIs'].map(skill => (
                    <span key={skill} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Icon icon="academic-cap" className="w-5 h-5 mr-2 text-slate-600" />
                  Education
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-800">Bachelor of Technology</h4>
                    <p className="text-sm text-gray-600">Computer Science Engineering</p>
                    <p className="text-sm text-gray-500">XYZ University • 2018-2022</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Work Experience */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Icon icon="briefcase" className="w-5 h-5 mr-2 text-purple-600" />
                  Work Experience
                </h3>
                <div className="space-y-4">
                  <div className="border-l-2 border-slate-200 pl-4">
                    <h4 className="font-medium text-gray-800">Senior Mobile Developer</h4>
                    <p className="text-sm text-slate-600 font-medium">TechCorp Solutions</p>
                    <p className="text-sm text-gray-500 mb-2">Jan 2022 - Present</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Led development of 3 major mobile applications</li>
                      <li>• Improved app performance by 40% through optimization</li>
                      <li>• Mentored junior developers and code reviews</li>
                    </ul>
                  </div>

                  <div className="border-l-2 border-gray-200 pl-4">
                    <h4 className="font-medium text-gray-800">Mobile Developer</h4>
                    <p className="text-sm text-slate-600 font-medium">StartupXYZ</p>
                    <p className="text-sm text-gray-500 mb-2">Jun 2020 - Dec 2021</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Developed cross-platform mobile apps using React Native</li>
                      <li>• Integrated third-party APIs and payment gateways</li>
                      <li>• Collaborated with design team for UI/UX implementation</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Icon icon="folder" className="w-5 h-5 mr-2 text-purple-600" />
                  Key Projects
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-800">E-commerce Mobile App</h4>
                    <p className="text-sm text-gray-600">React Native • iOS & Android</p>
                    <p className="text-xs text-gray-500">Complete shopping app with payment integration</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Fitness Tracking App</h4>
                    <p className="text-sm text-gray-600">Flutter • Cross-platform</p>
                    <p className="text-xs text-gray-500">Health monitoring with real-time data sync</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resume Actions */}
          <div className="border-t pt-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" className="flex items-center">
                <Icon icon="pencil" className="w-4 h-4 mr-2" />
                Edit Resume
              </Button>
            
            </div>
          </div>

          {/* Resume Status */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
            <Icon icon="check-circle" className="w-5 h-5 text-green-600 mr-3" />
            <div>
              <p className="text-green-800 font-medium">Resume Ready</p>
              <p className="text-green-700 text-sm">Your resume is optimized and ready for job applications</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="secondary" onClick={prevStep}>
          <Icon icon="arrow-left" className="w-4 h-4 mr-1" />
          Back
        </Button>
        <div className="flex space-x-4">
          <Button variant="secondary">Save & Close</Button>
          <Button onClick={nextStep}>Next: Final Configuration</Button>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Copilot Configuration</h1>
        <p className="text-gray-600">Step 4 of 4</p>
        <p className="text-lg text-gray-700 mt-2">Final Step!</p>
      </div>

      <div className="bg-white rounded-lg p-8 shadow-sm border">
        <div className="space-y-8">
          {/* Operation Mode */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Icon icon="cog" className="w-5 h-5 mr-2" />
              Choose how JobCopilot works for you:
              <span className="ml-2 text-slate-600 cursor-pointer">?</span>
            </h3>
            
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <RadioButton
                  name="operationMode"
                  value="auto-save-review"
                  checked={formData.operationMode === 'auto-save-review'}
                  onChange={(e) => updateFormData('operationMode', e.target.value)}
                >
                  <div>
                    <div className="font-medium flex items-center">
                      Auto-Save & Manual Review: 
                      <span className="ml-2 text-purple-600">⚡</span>
                    </div>
                    <div className="text-sm text-gray-600">your copilot auto-fills application forms but does not submit them. You can review jobs and answers before submitting, this allows you to train your copilot</div>
                    <div className="text-green-600 text-sm italic mt-1">Recommended for new users</div>
                  </div>
                </RadioButton>
              </div>
              
              <div className="border rounded-lg p-4">
                <RadioButton
                  name="operationMode"
                  value="full-auto"
                  checked={formData.operationMode === 'full-auto'}
                  onChange={(e) => updateFormData('operationMode', e.target.value)}
                >
                  <div>
                    <div className="font-medium">Full Auto-Apply:</div>
                    <div className="text-sm text-gray-600">your copilot auto-fills and automatically submits applications.</div>
                  </div>
                </RadioButton>
              </div>
            </div>
          </div>

          {/* Writing Style */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Icon icon="file-text" className="w-5 h-5 mr-2" />
              Writing Style <span className="text-gray-500 font-normal">(optional)</span>
            </h3>
            <p className="text-gray-600 mb-4">Describe your writing style or tone for cover letters and application responses</p>
            <textarea
              placeholder="e.g., Professional and formal, Casual and friendly, Creative and engaging..."
              value={formData.writingStyle}
              onChange={(e) => updateFormData('writingStyle', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none"
              rows={3}
            />
          </div>

          {/* Personal Information Toggle */}
          <div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer" 
                 onClick={() => setShowPersonalInfo(!showPersonalInfo)}>
              <div className="flex items-center">
                <Icon icon="user" className="w-5 h-5 mr-2" />
                <span className="font-medium">Personal Information & Screening Questions</span>
                <span className="ml-2 text-sm text-gray-500">(Click to expand)</span>
              </div>
              <Icon icon="chevron-down" className={`w-5 h-5 text-gray-400 transform transition-transform ${showPersonalInfo ? 'rotate-180' : ''}`} />
            </div>

            {showPersonalInfo && (
              <div className="mt-6 space-y-6 border-l-4 border-purple-200 pl-6">
                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium mb-2">Date of Birth</label>
                  <Input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                    iconName="calendar"
                  />
                </div>

                {/* Salary Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Current Salary (Annual)</label>
                    <Input
                      placeholder="e.g., 50000"
                      value={formData.currentSalary}
                      onChange={(e) => updateFormData('currentSalary', e.target.value)}
                      iconName="dollar-sign"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Expected Salary (Annual)</label>
                    <Input
                      placeholder="e.g., 60000"
                      value={formData.expectedSalary}
                      onChange={(e) => updateFormData('expectedSalary', e.target.value)}
                      iconName="dollar-sign"
                    />
                  </div>
                </div>

                {/* LinkedIn Profile */}
                <div>
                  <label className="block text-sm font-medium mb-2">LinkedIn Profile</label>
                  <Input
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={formData.linkedinProfile}
                    onChange={(e) => updateFormData('linkedinProfile', e.target.value)}
                    iconName="globe"
                  />
                </div>

                {/* Current Job Title */}
                <div>
                  <label className="block text-sm font-medium mb-2">Current Job Title</label>
                  <Input
                    placeholder="e.g., Software Engineer"
                    value={formData.currentJobTitle}
                    onChange={(e) => updateFormData('currentJobTitle', e.target.value)}
                    iconName="briefcase"
                  />
                </div>

                {/* Experience Summary */}
                <div>
                  <label className="block text-sm font-medium mb-2">Experience Summary</label>
                  <textarea
                    placeholder="Brief summary of your professional experience..."
                    value={formData.experienceSummary}
                    onChange={(e) => updateFormData('experienceSummary', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none"
                    rows={4}
                  />
                </div>

                {/* Work Preferences */}
                <div>
                  <h4 className="font-medium mb-4">Work Preferences</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Remote Work Preference</label>
                      <Select
                        value={formData.remotePreference}
                        onChange={(e) => updateFormData('remotePreference', e.target.value)}
                        placeholder="Select preference"
                        options={[
                          { value: 'remote-only', label: 'Remote Only' },
                          { value: 'open-hybrid', label: 'Open to Hybrid' },
                          { value: 'office-preferred', label: 'Office Preferred' },
                          { value: 'no-preference', label: 'No Preference' }
                        ]}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Comfortable with Travel?</label>
                      <div className="flex space-x-4">
                        <RadioButton
                          name="travelComfortable"
                          value="yes"
                          checked={formData.travelComfortable === 'yes'}
                          onChange={(e) => updateFormData('travelComfortable', e.target.value)}
                        >
                          Yes
                        </RadioButton>
                        <RadioButton
                          name="travelComfortable"
                          value="no"
                          checked={formData.travelComfortable === 'no'}
                          onChange={(e) => updateFormData('travelComfortable', e.target.value)}
                        >
                          No
                        </RadioButton>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Open to Relocation?</label>
                      <div className="flex space-x-4">
                        <RadioButton
                          name="relocationOpen"
                          value="yes"
                          checked={formData.relocationOpen === 'yes'}
                          onChange={(e) => updateFormData('relocationOpen', e.target.value)}
                        >
                          Yes
                        </RadioButton>
                        <RadioButton
                          name="relocationOpen"
                          value="no"
                          checked={formData.relocationOpen === 'no'}
                          onChange={(e) => updateFormData('relocationOpen', e.target.value)}
                        >
                          No
                        </RadioButton>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Availability to Start</label>
                      <Select
                        value={formData.availability}
                        onChange={(e) => updateFormData('availability', e.target.value)}
                        placeholder="Select availability"
                        options={[
                          { value: 'immediately', label: 'Immediately' },
                          { value: 'within-week', label: 'Within a week' },
                          { value: 'within-month', label: 'Within a month' },
                          { value: 'more-than-month', label: 'More than a month' }
                        ]}
                      />
                    </div>
                  </div>
                </div>

                {/* Visa Sponsorship */}
                <div>
                  <label className="block text-sm font-medium mb-2">Do you require visa sponsorship?</label>
                  <div className="flex space-x-4">
                    <RadioButton
                      name="visaSponsorship"
                      value="yes"
                      checked={formData.visaSponsorship === 'yes'}
                      onChange={(e) => updateFormData('visaSponsorship', e.target.value)}
                    >
                      Yes
                    </RadioButton>
                    <RadioButton
                      name="visaSponsorship"
                      value="no"
                      checked={formData.visaSponsorship === 'no'}
                      onChange={(e) => updateFormData('visaSponsorship', e.target.value)}
                    >
                      No
                    </RadioButton>
                  </div>
                </div>

                {/* Age Verification */}
                <div>
                  <Checkbox
                    checked={formData.ageVerification}
                    onChange={(e) => updateFormData('ageVerification', e.target.checked)}
                  >
                    I confirm that I am 18 years or older
                  </Checkbox>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="secondary" onClick={prevStep}>
          <Icon icon="arrow-left" className="w-4 h-4 mr-1" />
          Back
        </Button>
        <div className="flex space-x-4">
          <Button variant="secondary">Save & Close</Button>
          <Button onClick={() => alert('Configuration Complete!')}>Complete Setup</Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
      {currentStep === 4 && renderStep4()}
    </div>
  );
};

export default JobCopilotConfig;