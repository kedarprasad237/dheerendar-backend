import mongoose from 'mongoose';
import User from '../models/User.js';
import Course from '../models/Course.js';
import Instructor from '../models/Instructor.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vmss';

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Instructor.deleteMany({});

    // Create admin user
    const admin = new User({
      email: 'admin@vmss.com',
      password: 'admin123'
    });
    await admin.save();
    console.log('Admin user created');

    // Create sample courses
    const courses = [
      {
        title: "Cloud Computing & Infrastructure",
        description: "Master AWS, Azure, Google Cloud platforms with hands-on experience in cloud architecture, deployment, and management.",
        courses: "5 Courses",
        icon: "☁️"
      },
      {
        title: "Artificial Intelligence & Machine Learning",
        description: "Dive deep into AI/ML algorithms, neural networks, deep learning, and practical implementation of intelligent systems.",
        courses: "5 Courses",
        icon: "🧠"
      }
    ];

    await Course.insertMany(courses);
    console.log('Sample courses created');

    // Create sample instructors
    const instructors = [
      {
        name: "Samay Jain",
        title: "Founder & CEO",
        description: "Founder and CEO of VMSS Technologies with extensive experience in enterprise cloud migrations and digital transformation.",
        expertise: "AWS, Azure, Google Cloud",
        experience: "12+ years experience"
      },
      {
        name: "Sanket Jain",
        title: "Co-Founder & CTO",
        description: "Co-Founder and CTO of VMSS Technologies, specializing in cloud architecture and ServiceNow platform implementations.",
        expertise: "Cloud Architecture, ServiceNow Platform",
        experience: "Expert experience"
      }
    ];

    await Instructor.insertMany(instructors);
    console.log('Sample instructors created');

    console.log('Seed data created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();

