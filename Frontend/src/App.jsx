import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
// Import Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LoginScreen from "./components/LoginSCreens/Login";
import RegisterScreen from "./components/LoginSCreens/RegisterScreen";
import HeroSection from "./components/HomePage/HeroSection";
import VideoWithPlayButton from "./components/HomePage/VideoWithPlayButton";
import BenefitsSection from "./components/HomePage/BenefitsSection";
import CourseSection from "./components/HomePage/CourseSection";
import Testimonials from "./components/HomePage/Testimonials";
import FAQ from "./components/HomePage/FAQ";
import Video from "./components/SCreen3/Video";
import ChillGy from "./components/SCreen3/ChillGuy";
import PracticeQuiz from "./components/QuizSCreen/PracticeQuiz";
import WhoWeAre from "./components/WhoWeAre/WhoWeAre";
import Achievements from "./components/WhoWeAre/Acievements";
import Goals from "./components/WhoWeAre/Goals";
import AiHeader from "./components/Ai/AIHeader";
import ContactUs from "./components/Contact/Contactus";
import Course from "./components/CoursePage/Course";
import CourseViewer from "./components/CoursePage/CourseViewer";
import Header from "./components/JobPage/Header";
import CourseHeader from "./components/CoursePage/CourseHeader";
import JobApplyPage from "./components/JobPage/JobApplyPage";
import RecommendedJobs from "./components/JobPage/RecommendedJobs";
import JobHeader from "./components/Jobposting/JobHeader";
import JobPostingForm from "./components/Jobposting/JobPostingForm";
import VideoCallHeader from "./components/Videocall/VideoCallHeader";
import MentorCard from "./components/Videocall/MentorCard";
import QuoteSection from "./components/Videocall/QuoteSection";
import MCQ from "./components/ModuleQuiz/MCQ";
import ContactHeader from "./components/Contact/ContactHeader";
import TeamSection from "./components/Contact/TeamSection";
import ResumeBuilder from "./components/Resume/Resumebuilder";
import Mockinterview from "./components/Resume/Mockinterview";
import InterviewComponent from "./components/Resume/InterviewComponent";
import LessonList from "./components/PreviewPage.jsx/LessonsList";
import Lessonheader from "./components/PreviewPage.jsx/Lessonheader";
import Mainheader from "./components/PreviewPage.jsx/Mainheader";
import Publish from "./components/CoursePublish/Publish";
import Resumeheader from "./components/Resume/ResumeHeader";
import Quizdesign from "./components/QUizdesining/Quizdesign";
import FeedbackForm from "./components/Feedback/Feedbackform";
import { AuthProvider } from "../src/AuthContext";

import PaymentSuccess from "./components/payment/UpiPaymentScreen";
import GeminiAssistant from "./components/Ai/GeminiAssistant";
import Wallet from "./components/payment/Wallet";
import Certificate from "./components/Certificates/Certificate";
import CertificateVerification from "./components/Certificates/CertificateVerification.jsx";
import StudentDashboard from "./components/Dashboard/StudentDashboard.jsx";
import Sublime from "./components/Sublime text/Sublime.jsx";
import Courseweb from "./components/MasterUnion/Courseweb.jsx";
const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();
const App = () => {
  const [questions, setQuestions] = useState([]);
  return (
   
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <AuthProvider>
    <Router>
      {/* Navbar always visible */}
      <Navbar />

      {/* Define Routes */}
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <div>
              <HeroSection />
              <QuoteSection/>
              
              <BenefitsSection />
              <CourseSection />
              <Testimonials />
              <QuoteSection/>
              <Sublime/>
            
              <FAQ />
            </div>
          }
        />

        {/* Course section */}
         <Route
            path="/Courses"
            element={
              <div>
                <CourseHeader/>
                {/* <Course /> */}
                <CourseViewer /> 
                <QuoteSection/>
              </div>
            }
          />
         <Route
            path="/publish"
            element={
              <div>
                <Publish/>
                
              
              </div>
            }
          />
         <Route
            path="/view-course"
            element={
              <div>
                <Mainheader/>
                <Lessonheader/>
                <LessonList/>
              </div>
            }
          />
           <Route path="/payment-success" element={<PaymentSuccess />} />

        {/* Login/Register Page */}
        <Route
          path="/login"
          element={
            <div>
              <LoginScreen />
           
             
            </div>
          }
        />
        <Route
          path="/pay"
          element={
            <div>
              <Wallet />
           
             
            </div>
          }
        />
        <Route
          path="/feedback"
          element={
            <div>
              <FeedbackForm />
           
             
            </div>
          }
        />
        
        <Route
          path="/Jobposting"
          element={
            <div>
              <JobHeader />
              <JobPostingForm />
           
             
            </div>
          }
        />
        <Route
          path="/video-call"
          element={
            <div>
              <VideoCallHeader />
              <MentorCard />
              <QuoteSection />
             
           
             
            </div>
          }
        />
        <Route
          path="/certification"
          element={
            <div>
             <Certificate
  userName="Alice Smith"
  courseTitle="Advanced React"
  issueDate="2025-02-16"
  geminiApiKey="AIzaSyAtV8nuqqKXDNbJ3yahxqGfzWxMBB-RmvU"
/>
<CertificateVerification/>
             
            </div>
          }
        />
        <Route
          path="/dashboard"
          element={
            <div>
              
              <StudentDashboard />
           
             
            </div>
          }
        />
        
        <Route
          path="/signup"
          element={
            <div>
      <RegisterScreen />
           
             
            </div>
          }
        />

        {/* Who We Are Page */}
        <Route
          path="/who-we-are"
          element={
            <div>
              <WhoWeAre />
              <QuoteSection/>
              <Achievements />
              <Goals />
            </div>
          }
        />

        {/* Screen 3 Page */}
        

        {/* Quiz Page */}
        <Route
          path="/quiz"
          element={
            <div>
              <PracticeQuiz />
            </div>
          }
        />

        {/* New Page 1 */}
        
        
       
        
        <Route
          path="/contact"
          element={
            <div>
              <ContactHeader/>
              <TeamSection/>
              <ContactUs/>
            
            </div>
          }
        />
        <Route
          path="/job"
          element={
            <div>
              <Header/>
              
              <JobApplyPage/>
              <RecommendedJobs/>
            </div>
          }
        />
        <Route
          path="/quiz-design"
          element={
            <div>
            <Quizdesign/>
            
            </div>
          }
        />
        <Route
          path="/ai"
          element={
            <div>
              <AiHeader/>
              
              <GeminiAssistant/>
            </div>
          }
        />

        {/* New Page 2 */}
        <Route
          path="/resume"
          element={
            <div>
              <Resumeheader/>
              <ResumeBuilder/>
              <Courseweb/>
              
              
            </div>
          }
        />
        <Route
          path="/mock-interview"
          element={
            <div>
              
              <Mockinterview/>
             
            
            </div>
          }
        />
        <Route
          path="/ai-auto-grade-test"
          element={
            <div>
              
             
              <InterviewComponent/>
            
            </div>
          }
        />
      </Routes>

      {/* Footer always visible */}
      <Footer />
    </Router>
    </AuthProvider>
    </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
   
  );
};

export default App;
