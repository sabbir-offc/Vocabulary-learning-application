import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const LessonPage = () => {
  const { lessonNo } = useParams(); // Get lesson number from URL parameter
  const [vocabularies, setVocabularies] = useState([]); // Vocabulary for the current lesson
  const [currentIndex, setCurrentIndex] = useState(0); // For pagination (tracking current vocabulary)

  // Example vocabulary data for the lesson (This can be fetched from an API)
  const lessonVocabularies = [
    {
      word: "こんにちは",
      pronunciation: "Konnichiwa",
      whenToSay: "Used for greeting",
    },
    {
      word: "ありがとう",
      pronunciation: "Arigatou",
      whenToSay: "Used for thanking",
    },
    {
      word: "さようなら",
      pronunciation: "Sayounara",
      whenToSay: "Used for saying goodbye",
    },
    // Add more vocabularies as needed
  ];

  useEffect(() => {
    // Fetch vocabularies for the selected lesson (Here, we just use a static array for the lesson)
    setVocabularies(lessonVocabularies);
  }, [lessonNo]);

  // Function to play pronunciation using SpeechSynthesis API
  const playPronunciation = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "ja-JP"; // Japanese language
    window.speechSynthesis.speak(utterance);
  };

  // Next vocabulary pagination
  const nextVocabulary = () => {
    if (currentIndex < vocabularies.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Previous vocabulary pagination
  const previousVocabulary = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (!vocabularies.length) return <div>Loading lesson...</div>;

  const currentVocabulary = vocabularies[currentIndex];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Lesson {lessonNo}</h1>

      <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Vocabulary: {currentVocabulary.word}
        </h2>
        <p>
          <strong>Pronunciation:</strong> {currentVocabulary.pronunciation}
        </p>
        <p>
          <strong>When to Say:</strong> {currentVocabulary.whenToSay}
        </p>

        <button
          onClick={() => playPronunciation(currentVocabulary.word)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Play Pronunciation
        </button>

        <div className="mt-6">
          <button
            onClick={previousVocabulary}
            className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Previous
          </button>
          <button
            onClick={nextVocabulary}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
