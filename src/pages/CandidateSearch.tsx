import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import CandidateCard from "../components/CandidateCard";
import { Candidate } from "../interfaces/Candidate.interface";

const CandidateSearch = () => {
  const [candidateList, setCandidateList] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  async function fetchUsers() {
    const data = await searchGithub();
    const candidateDetails = await Promise.all(
      data.map((candidate) => searchGithubUser(candidate.login))
    );
    setCandidateList(candidateDetails);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("savedCandidates");
    if (saved) {
      setSavedCandidates(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
  }, [savedCandidates]);

  const handleSkipClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % candidateList.length);
  };

  const handleSaveClick = () => {
    const currentCandidate = candidateList[currentIndex];
    setSavedCandidates((prevSaved) => {
      if (
        prevSaved.some(
          (candidate) => candidate.login === currentCandidate.login
        )
      ) {
        return prevSaved;
      }
      return [...prevSaved, currentCandidate];
    });
    setCurrentIndex((prevIndex) => (prevIndex + 1) % candidateList.length);
  };

  const currentCandidate = candidateList[currentIndex];

  return (
    <div>
      <header className="text-center mb-4">
        <h1>Candidate Search</h1>
      </header>
      <div className="d-flex justify-content-center">
        <CandidateCard
          candidate={currentCandidate}
          handleSkipClick={handleSkipClick}
          handleSaveClick={handleSaveClick}
        />
      </div>
    </div>
  );
};

export default CandidateSearch;
