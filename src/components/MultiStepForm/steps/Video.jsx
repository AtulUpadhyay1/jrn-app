import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Textarea from "@/components/ui/Textarea";

const schema = yup.object().shape({
  videoIntroduction: yup.string().max(500, "Description must be less than 500 characters"),
});

const Video = ({ data, updateFormData, onNext, onPrevious, onStepSubmit, currentStep, totalSteps, submitting }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const recordedVideoRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: data.video || {},
  });

  // Update form when data changes (e.g., when API data is loaded)
  useEffect(() => {
    if (data.video) {
      reset(data.video);
      // If there's a video file path from API, you might want to display it
      if (data.video.videoIntroduction) {
        // You can set some indicator that a video exists
        // setUploadedVideo({ name: "Previously uploaded video", fromServer: true });
      }
    }
  }, [data.video, reset]);

  const startRecording = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      
      setStream(mediaStream);
      videoRef.current.srcObject = mediaStream;
      
      const recorder = new MediaRecorder(mediaStream);
      const chunks = [];
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const videoUrl = URL.createObjectURL(blob);
        setRecordedVideo({ blob, url: videoUrl });
        mediaStream.getTracks().forEach(track => track.stop());
        setStream(null);
      };
      
      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Could not access camera. Please check your permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  const retakeVideo = () => {
    if (recordedVideo) {
      URL.revokeObjectURL(recordedVideo.url);
    }
    setRecordedVideo(null);
    setUploadedVideo(null);
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setUploadedVideo({ file, url: videoUrl });
      setRecordedVideo(null);
    }
  };

  const onSubmit = async (formData) => {
    try {
      const videoData = {
        ...formData,
        videoIntroduction: uploadedVideo ? uploadedVideo.file?.name : 
                          recordedVideo ? "recorded_video.webm" : 
                          data.video?.videoIntroduction || "",
      };
      
      // Submit data to API through parent component
      await onStepSubmit('video', videoData);
      
      // If successful, proceed to next step
      onNext();
    } catch (error) {
      console.error("Failed to submit video data:", error);
      // You can add error handling UI here
    }
  };

  const skipVideo = async () => {
    try {
      const videoData = { skipped: true, videoIntroduction: "" };
      
      // Submit skip data to API through parent component
      await onStepSubmit('video', videoData);
      
      // If successful, proceed to next step
      onNext();
    } catch (error) {
      console.error("Failed to skip video step:", error);
      // You can add error handling UI here
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          Video Introduction
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Record or upload a brief video introduction (optional but recommended)
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          {/* Video Recording/Upload Section */}
          <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6">
            {!recordedVideo && !uploadedVideo && !isRecording && (
              <div className="text-center space-y-6">
                <div className="bg-white dark:bg-slate-700 rounded-lg p-8 border-2 border-dashed border-gray-300 dark:border-slate-600">
                  <Icon icon="heroicons:video-camera" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Create Your Video Introduction
                  </h3>
                  <p className="text-sm text-slate-500 mb-6">
                    Share a brief 1-2 minute introduction about yourself, your goals, and what makes you unique.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      type="button"
                      text="Record Video"
                      className="btn-primary"
                      onClick={startRecording}
                      icon="heroicons:video-camera"
                    />
                    
                    <div className="relative">
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Button
                        type="button"
                        text="Upload Video"
                        className="btn-outline-primary w-full"
                        icon="heroicons:arrow-up-tray"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recording Interface */}
            {isRecording && (
              <div className="text-center space-y-4">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full max-w-md mx-auto rounded-lg bg-black"
                />
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-red-600 dark:text-red-400">
                    Recording...
                  </span>
                </div>
                <Button
                  type="button"
                  text="Stop Recording"
                  className="btn-danger"
                  onClick={stopRecording}
                  icon="heroicons:stop"
                />
              </div>
            )}

            {/* Recorded Video Preview */}
            {recordedVideo && (
              <div className="text-center space-y-4">
                <video
                  ref={recordedVideoRef}
                  src={recordedVideo.url}
                  controls
                  className="w-full max-w-md mx-auto rounded-lg"
                />
                <div className="flex justify-center space-x-4">
                  <Button
                    type="button"
                    text="Retake"
                    className="btn-outline-primary"
                    onClick={retakeVideo}
                    icon="heroicons:arrow-path"
                  />
                  <Button
                    type="button"
                    text="Use This Video"
                    className="btn-success"
                    icon="heroicons:check"
                  />
                </div>
              </div>
            )}

            {/* Uploaded Video Preview */}
            {uploadedVideo && (
              <div className="text-center space-y-4">
                <video
                  src={uploadedVideo.url}
                  controls
                  className="w-full max-w-md mx-auto rounded-lg"
                />
                <div className="flex justify-center space-x-4">
                  <Button
                    type="button"
                    text="Choose Different File"
                    className="btn-outline-primary"
                    onClick={retakeVideo}
                    icon="heroicons:arrow-path"
                  />
                  <Button
                    type="button"
                    text="Use This Video"
                    className="btn-success"
                    icon="heroicons:check"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Video Description */}
          {(recordedVideo || uploadedVideo) && (
            <div>
              <Textarea
                label="Video Description (Optional)"
                placeholder="Add a brief description of what you covered in your video..."
                name="videoIntroduction"
                register={register}
                error={errors.videoIntroduction}
                rows={3}
              />
            </div>
          )}

          {/* Video Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h4 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-3">
              Video Tips
            </h4>
            <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <li className="flex items-start">
                <Icon icon="heroicons:light-bulb" className="w-4 h-4 mt-0.5 mr-2 text-blue-500" />
                Keep it concise (1-2 minutes is ideal)
              </li>
              <li className="flex items-start">
                <Icon icon="heroicons:light-bulb" className="w-4 h-4 mt-0.5 mr-2 text-blue-500" />
                Speak clearly and maintain good eye contact with the camera
              </li>
              <li className="flex items-start">
                <Icon icon="heroicons:light-bulb" className="w-4 h-4 mt-0.5 mr-2 text-blue-500" />
                Introduce yourself, your background, and your career goals
              </li>
              <li className="flex items-start">
                <Icon icon="heroicons:light-bulb" className="w-4 h-4 mt-0.5 mr-2 text-blue-500" />
                Choose a quiet location with good lighting
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button
            type="button"
            text="Previous"
            className="btn-outline-dark"
            onClick={onPrevious}
            disabled={submitting}
          />
          <div className="flex space-x-4">
            <Button
              type="button"
              text={submitting ? "Saving..." : "Skip Video"}
              className="btn-outline-secondary"
              onClick={skipVideo}
              disabled={submitting}
            />
            <Button
              type="submit"
              text={submitting ? "Saving..." : "Next: Social Links"}
              className="btn-primary"
              disabled={submitting}
            />
          </div>
        </div>

        <div className="text-center text-sm text-slate-500 dark:text-slate-400">
          Step {currentStep} of {totalSteps}
        </div>
      </form>
    </div>
  );
};

export default Video;
