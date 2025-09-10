# Multi-Step Profile Setup Form

This is a comprehensive multi-step form component for user profile setup after login, built with React and Tailwind CSS.

## Features

### 8-Step Process:
1. **Basic Profile** - Personal information, contact details
2. **Career Preferences** - Job preferences, skills, experience level
3. **Purpose & Pathways** - Career goals, motivations, learning preferences
4. **Resume & Portfolio** - File upload, LinkedIn, portfolio links
5. **Video Introduction** - Record or upload video (optional)
6. **Social Media Links** - Professional social profiles (optional)
7. **Subscriptions** - Choose subscription plan
8. **Summary** - Review all information before submission

### Key Components:
- **StepNavigation** - Visual progress indicator with clickable steps
- **Form Validation** - Using react-hook-form with Yup validation
- **File Upload** - Drag & drop resume upload
- **Video Recording** - Browser-based video recording
- **Responsive Design** - Mobile-friendly layout

## Usage

### 1. Basic Integration

```jsx
import MultiStepForm from "@/components/MultiStepForm";

const ProfileSetup = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <MultiStepForm />
    </div>
  );
};
```

### 2. After Login Redirect

Add to your authentication flow:

```jsx
// After successful login
if (user.profileIncomplete) {
  navigate('/profile-setup');
} else {
  navigate('/dashboard');
}
```

### 3. Route Configuration

Add to your router (already added in App.jsx):

```jsx
<Route path="profile-setup" element={<ProfileSetup />} />
```

## Navigation Structure

The step navigation follows your requested HTML structure with these features:

- **Visual Progress** - Numbered circles with completion status
- **Clickable Steps** - Users can navigate between completed steps
- **Status Indicators** - Active, completed, and inactive states
- **Responsive Layout** - Adapts to mobile screens

## Form Data Structure

The form collects data in this structure:

```javascript
{
  basicProfile: {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1234567890",
    // ...
  },
  careerPreferences: {
    currentRole: "Software Developer",
    desiredRole: "Senior Developer",
    // ...
  },
  // ... other sections
}
```

## Customization

### Adding New Steps

1. Create a new step component in `src/components/MultiStepForm/steps/`
2. Add the step to the `steps` array in the main component
3. Update the form data structure

### Styling

The component uses Tailwind CSS classes and follows the existing design system:
- Primary colors for active states
- Success colors for completed states
- Gray colors for inactive states
- Dark mode support

### Validation

Each step has its own validation rules using Yup schemas. To modify validation:

```jsx
const schema = yup.object().shape({
  fieldName: yup.string().required("Field is required"),
  // Add more validation rules
});
```

## Dependencies

- React Hook Form - Form state management and validation
- Yup - Schema validation
- Tailwind CSS - Styling
- Heroicons - Icons

## File Structure

```
src/components/MultiStepForm/
├── index.jsx                 # Main component
├── StepNavigation.jsx        # Progress navigation
└── steps/
    ├── BasicProfile.jsx      # Step 1
    ├── CareerPreferences.jsx # Step 2
    ├── PurposePathways.jsx   # Step 3
    ├── Resume.jsx            # Step 4
    ├── Video.jsx             # Step 5
    ├── Social.jsx            # Step 6
    ├── Subscriptions.jsx     # Step 7
    └── Summary.jsx           # Step 8
```

## Browser Support

- Modern browsers with ES6+ support
- Camera/microphone access for video recording
- File upload support for resume upload

## Features in Detail

### Step Navigation
- Matches your requested HTML structure
- Smooth transitions between steps
- Visual feedback for completion status
- Mobile responsive design

### Form Validation
- Real-time validation feedback
- Step-by-step validation prevents incomplete submissions
- User-friendly error messages

### File Handling
- Resume upload with drag & drop
- Video recording using browser APIs
- File type and size validation

### Data Persistence
- Form data persists across steps
- Users can navigate back and forth
- Data is maintained until final submission

## Getting Started

1. The component is already integrated into your project
2. Navigate to `/profile-setup` after login
3. Users will be guided through the 8-step process
4. Data is collected and can be submitted to your backend

## API Integration

To integrate with your backend, modify the `handleSubmit` function in the main component:

```jsx
const handleSubmit = async () => {
  try {
    const response = await fetch('/api/profile-setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      navigate('/dashboard');
    }
  } catch (error) {
    console.error('Profile setup failed:', error);
  }
};
```
