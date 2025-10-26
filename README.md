# Herbal Healer App

A comprehensive React application for disease identification using symptoms or images, herbal remedy recommendations, and doctor consultation booking.

## Features

- **Disease Identification**: Enter symptoms OR upload/capture images to identify diseases
- **Image Analysis**: Upload from gallery or take photo using camera
- **12+ Diseases Covered**: Common Cold, Headache, Indigestion, Cough, Acidity, Constipation, Joint Pain, Insomnia, Skin Allergies, Anxiety, Fever, and Diabetes symptoms
- **Herbal Remedies**: 3 detailed remedies per disease with usage instructions
- **Browse Diseases**: Search and view all diseases with symptoms
- **Doctor Consultation**: Book appointments with herbal medicine specialists
- **Responsive Design**: Works on desktop and mobile devices

## Installation Steps

### 1. Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### 2. Create React App
```bash
# Create a new React app
npx create-react-app herbal-healer-app

# Navigate to project directory
cd herbal-healer-app
```

### 3. Install Dependencies
```bash
npm install react-router-dom
```

### 4. Project Structure
Create the following folder structure:

```
herbal-healer-app/
├── public/
│   └── index.html
├── src/
│   ├── data/
│   │   └── diseaseData.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── BrowsePage.js
│   │   ├── RemedyPage.js
│   │   ├── DoctorsPage.js
│   │   └── DoctorDetailPage.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

### 5. Copy Files
Copy all the provided code files to their respective locations as shown in the structure above.

### 6. Run the Application
```bash
npm start
```

The app will open at `http://localhost:3000`

## Usage Guide

### Disease Identification
1. Go to Home page
2. Enter symptoms in the text area (comma-separated) OR
3. Upload an image from gallery OR capture using camera
4. Click "Identify Disease" button
5. View matched diseases with confidence scores
6. Click on any disease to view remedies

### Browse Diseases
1. Click "Browse" in navigation
2. Use search bar to find specific diseases
3. Click on any disease card to view details and remedies

### Consult Doctor
1. Click "Doctors" in navigation
2. Browse available doctors
3. Click "Book Appointment" on any doctor
4. Fill in appointment details
5. Confirm booking

## Image Upload Features

### Upload from Gallery
- Click "Upload Image" button
- Select image from device
- View preview and remove if needed

### Capture with Camera
- Click "Take Photo" button
- Allow camera access when prompted
- Take photo directly
- View preview and remove if needed

## Important Notes

### Image Analysis
The current implementation uses **simulated AI analysis** for demonstration purposes. In a production environment, you would integrate with:

- **Google Cloud Vision API**
- **TensorFlow.js**
- **Custom ML Models**
- **Medical imaging APIs**

### Real Implementation Example
To integrate real image analysis:

```javascript
// Install TensorFlow.js
npm install @tensorflow/tfjs

// In HomePage.js, replace analyzeImage function with:
import * as tf from '@tensorflow/tfjs';

const analyzeImage = async (imageData) => {
  // Load your trained model
  const model = await tf.loadLayersModel('path/to/model.json');
  
  // Preprocess image
  const img = tf.browser.fromPixels(imageElement);
  const resized = tf.image.resizeBilinear(img, [224, 224]);
  const normalized = resized.div(255.0).expandDims(0);
  
  // Make prediction
  const predictions = await model.predict(normalized).data();
  
  // Process results
  return processedResults;
};
```

## Customization

### Adding New Diseases
Edit `src/data/diseaseData.js`:

```javascript
'New Disease Name': {
  symptoms: ['symptom1', 'symptom2'],
  description: 'Description here',
  herbalRemedies: [
    { 
      name: 'Remedy Name', 
      usage: 'How to use', 
      benefits: 'Benefits' 
    }
  ],
  prevention: 'Prevention tips',
  imageKeywords: ['keyword1', 'keyword2']
}
```

### Adding New Doctors
Edit `src/data/diseaseData.js` doctors array:

```javascript
{ 
  id: 6, 
  name: 'Dr. Name', 
  specialization: 'Specialization',
  experience: 'X years',
  rating: 4.9,
  location: 'City, State',
  availability: 'Days, Time',
  fee: '₹XXX',
  image: '👨‍⚕️'
}
```

## Technologies Used

- React 18
- React Router DOM 6
- CSS3
- JavaScript ES6+

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag and drop 'build' folder to Netlify
```

## Future Enhancements

- [ ] Real AI/ML image analysis integration
- [ ] User authentication
- [ ] Save favorite remedies
- [ ] Appointment reminders
- [ ] Multiple language support
- [ ] Dark mode
- [ ] Progressive Web App (PWA)
- [ ] Video consultation feature

## License

This project is for educational purposes.

## Support

For issues or questions, please create an issue in the repository.

---

**Note**: This app provides general health information and is not a substitute for professional medical advice. Always consult healthcare professionals for medical concerns.